# ============================================================
# tally_sync.ps1 — Proalfa Tally → Supabase Sync
# Run inside Tally Cloud session (PowerShell 5.1+)
# TallyPrime must be open, acting as Server on port 9000
# ============================================================

$ErrorActionPreference = "Continue"

# ── CONFIG ────────────────────────────────────────────────────
$TALLY_URL    = "http://localhost:9000"
$SUPABASE_URL = "https://gzjzuudhtvljpwcqygtk.supabase.co"
$SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6anp1dWRodHZsanB3Y3F5Z3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzOTY4NTksImV4cCI6MjA5Mzk3Mjg1OX0.pCBKZwMDvu8UAfKEXL8_hgkuG95A-MtVKK6sM2qFxEs"
$FY_START     = "20250401"
$FY_END       = "20260331"
$TODAY        = (Get-Date).Date
$SYNC_TS      = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss")

$SB_HDR = @{
    "apikey"        = $SUPABASE_KEY
    "Authorization" = "Bearer $SUPABASE_KEY"
    "Content-Type"  = "application/json"
}

# ── TALLY HTTP ────────────────────────────────────────────────
function Invoke-Tally([string]$Xml) {
    try {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($Xml.Trim())
        $r = Invoke-WebRequest -Uri $TALLY_URL -Method POST `
                 -Body $bytes -ContentType "application/xml" `
                 -TimeoutSec 60 -UseBasicParsing
        return $r.Content
    } catch {
        Write-Host "`n❌  Cannot connect to TallyPrime on port 9000." -ForegroundColor Red
        Write-Host "    Make sure TallyPrime is open, company is loaded, and it is set to act as Server." -ForegroundColor Yellow
        exit 1
    }
}

# ── XML HELPER ────────────────────────────────────────────────
function XText([System.Xml.XmlNode]$el, [string]$tag) {
    if (-not $el) { return "" }
    foreach ($c in $el.ChildNodes) {
        if ($c.LocalName -ieq $tag -and $c.InnerText) { return $c.InnerText.Trim() }
    }
    return ""
}

# ── AMOUNT / DATE PARSERS ─────────────────────────────────────
function ToAmt([string]$s) {
    if (-not $s) { return 0.0 }
    $s = $s.Trim() -replace '[,\s]','' -replace '(?i)(Dr|Cr)',''
    try { return [Math]::Abs([double]$s) } catch { return 0.0 }
}

function ToDate([string]$s) {
    if (-not $s -or $s.Length -ne 8) { return $null }
    try { return "$($s.Substring(0,4))-$($s.Substring(4,2))-$($s.Substring(6,2))" } catch { return $null }
}

# ── SUPABASE HELPERS ──────────────────────────────────────────
function SB-Del([string]$tbl) {
    try {
        $h = $SB_HDR.Clone(); $h["Prefer"] = "return=minimal"
        Invoke-WebRequest "$SUPABASE_URL/rest/v1/$tbl`?id=gte.0" `
            -Method DELETE -Headers $h -UseBasicParsing | Out-Null
    } catch { Write-Host "  ⚠  Clear $tbl`: $($_.Exception.Message)" -ForegroundColor Yellow }
}

function SB-Post([string]$tbl, $rows, [string]$conflict = "") {
    $arr = @($rows)
    if ($arr.Count -eq 0) { Write-Host "  —  No data for $tbl"; return }
    try {
        $json = ($arr | ConvertTo-Json -Depth 5 -Compress)
        if ($arr.Count -eq 1) { $json = "[$json]" }
        $h   = $SB_HDR.Clone()
        $uri = "$SUPABASE_URL/rest/v1/$tbl"
        if ($conflict) {
            $h["Prefer"] = "resolution=merge-duplicates,return=minimal"
            $uri += "?on_conflict=$conflict"
        } else {
            $h["Prefer"] = "return=minimal"
        }
        Invoke-WebRequest $uri -Method POST -Headers $h -Body $json -UseBasicParsing | Out-Null
        Write-Host "  ✓  $tbl`: $($arr.Count) rows" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠  $tbl`: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# ── FETCH OUTSTANDING BILLS ───────────────────────────────────
function Get-Outstanding([string]$billType) {
    $col = if ($billType -like "*Receivable*") { "BillsRCV" } else { "BillsPAY" }
    $xml = @"
<ENVELOPE><HEADER><TALLYREQUEST>Export Data</TALLYREQUEST></HEADER>
<BODY><EXPORTDATA><REQUESTDESC>
<STATICVARIABLES>
<SVEXPORTFORMAT>XML</SVEXPORTFORMAT>
<SVFROMDATE>$FY_START</SVFROMDATE><SVTODATE>$FY_END</SVTODATE>
</STATICVARIABLES>
<REQUESTEDLIST><REMOTECOLLECTION NAME="$col">
<TYPE>$billType</TYPE>
<FETCH>BillDate,Name,LedgerName,BillCreditPeriod,Amount,PendingAmount</FETCH>
</REMOTECOLLECTION></REQUESTEDLIST>
</REQUESTDESC></EXPORTDATA></BODY></ENVELOPE>
"@
    $raw = Invoke-Tally $xml
    try { [xml]$doc = $raw } catch {
        Write-Host "  ⚠  XML parse error ($billType)" -ForegroundColor Yellow; return @()
    }

    $rows = @()
    foreach ($node in $doc.SelectNodes("//*[local-name()='$col' or local-name()='BILL']")) {
        $pending = ToAmt (XText $node "PENDINGAMOUNT")
        if ($pending -le 0) { continue }

        $bd = ToDate (XText $node "BILLDATE")
        if (-not $bd) { $bd = ToDate (XText $node "DATE") }
        $cd = 0
        if ((XText $node "BILLCREDITPERIOD") -match '(\d+)') { $cd = [int]$Matches[1] }

        $due = $null; $overdue = 0
        if ($bd -and $cd -gt 0) {
            $dueD    = ([datetime]$bd).AddDays($cd)
            $due     = $dueD.ToString("yyyy-MM-dd")
            $overdue = [Math]::Max(0, [int]($TODAY - $dueD).TotalDays)
        }

        $party = XText $node "LEDGERNAME"
        if (-not $party) { $party = XText $node "PARTYNAME" }

        $rows += [ordered]@{
            party_name      = $party
            bill_date       = $bd
            bill_no         = (XText $node "NAME")
            original_amount = [Math]::Round((ToAmt (XText $node "AMOUNT")), 2)
            pending_amount  = [Math]::Round($pending, 2)
            credit_days     = $cd
            due_date        = $due
            days_overdue    = $overdue
            synced_at       = $SYNC_TS
        }
    }
    return $rows
}

# ── FETCH VOUCHERS (DAY BOOK) ─────────────────────────────────
function Get-Vouchers() {
    $xml = @"
<ENVELOPE><HEADER><TALLYREQUEST>Export Data</TALLYREQUEST></HEADER>
<BODY><EXPORTDATA><REQUESTDESC>
<REPORTNAME>Day Book</REPORTNAME>
<STATICVARIABLES>
<SVEXPORTFORMAT>XML</SVEXPORTFORMAT>
<SVFROMDATE>$FY_START</SVFROMDATE><SVTODATE>$FY_END</SVTODATE>
</STATICVARIABLES>
</REQUESTDESC></EXPORTDATA></BODY></ENVELOPE>
"@
    $raw = Invoke-Tally $xml
    try { [xml]$doc = $raw } catch {
        Write-Host "  ⚠  XML parse error (vouchers)" -ForegroundColor Yellow; return @()
    }

    $valid = "Sales","Receipt","Purchase","Payment","Credit Note","Debit Note","Journal","Contra","Delivery Note"
    $rows  = @()
    $seen  = @{}

    foreach ($v in $doc.SelectNodes("//VOUCHER")) {
        $vt = $v.GetAttribute("VCHTYPE")
        if (-not $vt) { $vt = XText $v "VOUCHERTYPENAME" }
        if ($valid -notcontains $vt) { continue }

        $vd = ToDate (XText $v "DATE"); if (-not $vd) { continue }
        $vn = XText $v "VOUCHERNUMBER"
        $pt = XText $v "PARTYLEDGERNAME"; if (-not $pt) { $pt = XText $v "PARTYNAME" }
        $am = ToAmt (XText $v "AMOUNT")
        $nr = XText $v "NARRATION"

        $g = $v.GetAttribute("REMOTEID")
        if (-not $g) { $g = $v.GetAttribute("GUID") }
        if (-not $g) { $g = $v.GetAttribute("MASTERID") }
        $key = if ($g) { $g } else { "$vd|$vt|$vn|$am" }
        if ($seen.ContainsKey($key)) { continue }
        $seen[$key] = 1
        if (-not $g) { $g = $key }

        $rows += [ordered]@{
            voucher_date = $vd
            voucher_type = $vt
            voucher_no   = $vn
            party_name   = $pt
            narration    = if ($nr.Length -gt 500) { $nr.Substring(0,500) } else { $nr }
            amount       = [Math]::Round($am, 2)
            tally_guid   = if ($g.Length -gt 255) { $g.Substring(0,255) } else { $g }
            synced_at    = $SYNC_TS
        }
    }
    return $rows
}

# ── FETCH BANK & CASH BALANCES ────────────────────────────────
function Get-BankBalances() {
    $xml = @"
<ENVELOPE><HEADER><TALLYREQUEST>Export Data</TALLYREQUEST></HEADER>
<BODY><EXPORTDATA><REQUESTDESC>
<STATICVARIABLES><SVEXPORTFORMAT>XML</SVEXPORTFORMAT></STATICVARIABLES>
<REQUESTEDLIST><REMOTECOLLECTION NAME="LEDGERS">
<TYPE>Ledger</TYPE>
<FETCH>Name,ClosingBalance,Parent</FETCH>
</REMOTECOLLECTION></REQUESTEDLIST>
</REQUESTDESC></EXPORTDATA></BODY></ENVELOPE>
"@
    $raw = Invoke-Tally $xml
    try { [xml]$doc = $raw } catch { return @() }

    $rows = @()
    $bankGroups = "Bank Accounts","Cash-in-Hand"
    foreach ($l in $doc.SelectNodes("//*[local-name()='LEDGER']")) {
        $parent = XText $l "PARENT"
        $ltype  = if ($parent -ieq "Bank Accounts") { "bank" } `
                  elseif ($parent -ieq "Cash-in-Hand") { "cash" } `
                  else { $null }
        if (-not $ltype) { continue }
        $name = XText $l "NAME"
        if (-not $name) { continue }
        $rows += [ordered]@{
            ledger_name = $name
            ledger_type = $ltype
            balance     = [Math]::Round((ToAmt (XText $l "CLOSINGBALANCE")), 2)
            synced_at   = $SYNC_TS
        }
    }
    return $rows
}

# ── MAIN ──────────────────────────────────────────────────────
$sep = "─" * 55
Write-Host "`n$sep" -ForegroundColor Cyan
Write-Host "  Proalfa Finance Sync  —  $(Get-Date -Format 'dd MMM yyyy  HH:mm')" -ForegroundColor Cyan
Write-Host "$sep`n" -ForegroundColor Cyan

Write-Host "→ Receivables (Bills Receivable)..."
$debtors = Get-Outstanding "Bills Receivable"
Write-Host "  Found $($debtors.Count) pending bills."
SB-Del  "fin_outstanding_debtors"
SB-Post "fin_outstanding_debtors" $debtors

Write-Host "`n→ Payables (Bills Payable)..."
$creditors = Get-Outstanding "Bills Payable"
Write-Host "  Found $($creditors.Count) pending bills."
SB-Del  "fin_outstanding_creditors"
SB-Post "fin_outstanding_creditors" $creditors

Write-Host "`n→ Vouchers (Day Book — full FY)..."
$vouchers = Get-Vouchers
Write-Host "  Found $($vouchers.Count) vouchers."
SB-Post "fin_vouchers" $vouchers "tally_guid"

Write-Host "`n→ Bank & Cash Balances..."
$balances = Get-BankBalances
Write-Host "  Found $($balances.Count) ledger(s)."
SB-Del  "fin_bank_balances"
SB-Post "fin_bank_balances" $balances

SB-Post "fin_sync_log" @([ordered]@{
    synced_at       = $SYNC_TS
    status          = "success"
    message         = "PowerShell sync complete."
    debtors_count   = $debtors.Count
    creditors_count = $creditors.Count
    vouchers_count  = $vouchers.Count
})

Write-Host "`n$sep" -ForegroundColor Cyan
Write-Host "  ✅  Sync complete!" -ForegroundColor Green
Write-Host "      Receivables : $($debtors.Count) bills"
Write-Host "      Payables    : $($creditors.Count) bills"
Write-Host "      Vouchers    : $($vouchers.Count) entries"
Write-Host "      Balances    : $($balances.Count) ledgers"
Write-Host "$sep`n" -ForegroundColor Cyan
