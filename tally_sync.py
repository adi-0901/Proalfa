#!/usr/bin/env python3
"""
tally_sync.py — Proalfa Finance Sync
Pulls live data from TallyPrime and pushes to Supabase for the Finance Dashboard.

SETUP (one time):
  pip install requests

TALLY SETUP (one time):
  TallyPrime → Help → Settings → Connectivity
  → Enable TallyPrime Server  → Port: 9000  → Save
  Make sure your company is open in TallyPrime before running.

RUN:
  python3 tally_sync.py

SCHEDULE (optional, runs daily at 9am):
  Mac: crontab -e
  Add line: 0 9 * * * cd /path/to/this/folder && python3 tally_sync.py >> sync.log 2>&1
"""

import requests
import xml.etree.ElementTree as ET
from datetime import datetime, date, timedelta
import sys
import re
import json

# ── CONFIG ──────────────────────────────────────────────────────────────────────
TALLY_URL    = "http://localhost:9000"
SUPABASE_URL = "https://gzjzuudhtvljpwcqygtk.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6anp1dWRodHZsanB3Y3F5Z3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzOTY4NTksImV4cCI6MjA5Mzk3Mjg1OX0.pCBKZwMDvu8UAfKEXL8_hgkuG95A-MtVKK6sM2qFxEs"

# Update at start of each financial year (April 1)
FY_START = "20250401"
FY_END   = "20260331"

TODAY   = date.today()
SYNC_TS = datetime.now().isoformat()

# ── TALLY HELPERS ────────────────────────────────────────────────────────────────
def tally_post(xml_body):
    try:
        resp = requests.post(
            TALLY_URL,
            data=xml_body.strip().encode("utf-8"),
            headers={"Content-Type": "application/xml"},
            timeout=60,
        )
        resp.raise_for_status()
        return resp.text
    except requests.exceptions.ConnectionError:
        print("\n❌  Cannot connect to TallyPrime.")
        print("    → Make sure TallyPrime is open with your company loaded.")
        print("    → Go to: Help → Settings → Connectivity → Enable Server on port 9000")
        sys.exit(1)
    except Exception as e:
        print(f"  ⚠  Tally request error: {e}")
        return None


def parse_amount(s):
    """Parse Tally amount strings like '1,23,456.78 Dr' or '-50000' to float."""
    if s is None:
        return 0.0
    s = str(s).strip()
    s = re.sub(r"[,\s]", "", s)
    s = re.sub(r"(Dr|Cr|dr|cr)", "", s)
    try:
        return abs(float(s))
    except ValueError:
        return 0.0


def parse_date(s):
    """Parse Tally date YYYYMMDD → ISO date string YYYY-MM-DD."""
    if not s:
        return None
    s = str(s).strip()
    if len(s) == 8:
        try:
            return f"{s[:4]}-{s[4:6]}-{s[6:8]}"
        except Exception:
            return None
    return None


def parse_credit_days(s):
    """Parse credit period like '30 Days' → 30."""
    if not s:
        return 0
    m = re.search(r"\d+", str(s))
    return int(m.group()) if m else 0


def text(el, tag, default=""):
    """Safely get text from an XML child element."""
    child = el.find(tag)
    if child is not None and child.text:
        return child.text.strip()
    # Try case-insensitive search
    tag_lower = tag.lower()
    for child in el:
        if child.tag.lower() == tag_lower and child.text:
            return child.text.strip()
    return default


# ── SUPABASE HELPERS ─────────────────────────────────────────────────────────────
SB_HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
}


def sb_delete(table):
    """Clear table before fresh sync (for outstanding bills that get updated)."""
    try:
        r = requests.delete(
            f"{SUPABASE_URL}/rest/v1/{table}",
            headers={**SB_HEADERS, "Prefer": "return=minimal"},
            params={"id": "gte.0"},
        )
        return r.status_code in (200, 204)
    except Exception as e:
        print(f"  ⚠  Supabase delete {table}: {e}")
        return False


def sb_insert(table, rows):
    if not rows:
        print(f"  —  No data for {table}, skipping.")
        return
    try:
        r = requests.post(
            f"{SUPABASE_URL}/rest/v1/{table}",
            headers={**SB_HEADERS, "Prefer": "return=minimal"},
            json=rows,
        )
        if r.status_code in (200, 201):
            print(f"  ✓  {table}: {len(rows)} rows inserted.")
        else:
            print(f"  ⚠  {table} insert failed ({r.status_code}): {r.text[:300]}")
    except Exception as e:
        print(f"  ⚠  Supabase insert {table}: {e}")


def sb_upsert(table, rows, conflict):
    if not rows:
        print(f"  —  No data for {table}, skipping.")
        return
    try:
        r = requests.post(
            f"{SUPABASE_URL}/rest/v1/{table}",
            headers={**SB_HEADERS, "Prefer": "resolution=merge-duplicates,return=minimal"},
            params={"on_conflict": conflict},
            json=rows,
        )
        if r.status_code in (200, 201):
            print(f"  ✓  {table}: {len(rows)} rows upserted.")
        else:
            print(f"  ⚠  {table} upsert failed ({r.status_code}): {r.text[:300]}")
    except Exception as e:
        print(f"  ⚠  Supabase upsert {table}: {e}")


# ── TALLY DATA FETCHERS ──────────────────────────────────────────────────────────

def fetch_outstanding(bill_type):
    """
    Fetch Bills Receivable or Bills Payable from TallyPrime.
    bill_type: 'Bills Receivable' or 'Bills Payable'
    """
    col_name = "BillsRCV" if "Receivable" in bill_type else "BillsPAY"
    xml = f"""<ENVELOPE>
<HEADER><TALLYREQUEST>Export Data</TALLYREQUEST></HEADER>
<BODY><EXPORTDATA>
<REQUESTDESC>
<STATICVARIABLES>
<SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
<SVFROMDATE>{FY_START}</SVFROMDATE>
<SVTODATE>{FY_END}</SVTODATE>
</STATICVARIABLES>
<REQUESTEDLIST>
<REMOTECOLLECTION NAME="{col_name}">
<TYPE>{bill_type}</TYPE>
<FETCH>BillDate,Name,LedgerName,BillCreditPeriod,Amount,PendingAmount</FETCH>
</REMOTECOLLECTION>
</REQUESTEDLIST>
</REQUESTDESC>
</EXPORTDATA></BODY>
</ENVELOPE>"""

    raw = tally_post(xml)
    if not raw:
        return []

    try:
        root = ET.fromstring(raw)
    except ET.ParseError as e:
        print(f"  ⚠  XML parse error for {bill_type}: {e}")
        return []

    rows = []
    # Bills are in COLLECTION → <col_name> elements
    for coll in root.iter("COLLECTION"):
        for bill in coll:
            if bill.tag.upper() not in (col_name.upper(), "BILL"):
                continue
            bill_date_str = text(bill, "BILLDATE") or text(bill, "DATE")
            bill_date     = parse_date(bill_date_str)
            bill_no       = text(bill, "NAME")
            party         = text(bill, "LEDGERNAME") or text(bill, "PARTYNAME")
            credit_days   = parse_credit_days(text(bill, "BILLCREDITPERIOD"))
            orig_amount   = parse_amount(text(bill, "AMOUNT"))
            pending       = parse_amount(text(bill, "PENDINGAMOUNT"))

            if pending <= 0:
                continue  # already settled

            due_date     = None
            days_overdue = 0
            if bill_date and credit_days:
                due = datetime.strptime(bill_date, "%Y-%m-%d").date() + timedelta(days=credit_days)
                due_date = due.isoformat()
                days_overdue = max(0, (TODAY - due).days)

            rows.append({
                "party_name":       party,
                "bill_date":        bill_date,
                "bill_no":          bill_no,
                "original_amount":  round(orig_amount, 2),
                "pending_amount":   round(pending, 2),
                "credit_days":      credit_days,
                "due_date":         due_date,
                "days_overdue":     days_overdue,
                "synced_at":        SYNC_TS,
            })
    return rows


def fetch_vouchers():
    """Fetch all vouchers for the FY from Tally Day Book."""
    xml = f"""<ENVELOPE>
<HEADER><TALLYREQUEST>Export Data</TALLYREQUEST></HEADER>
<BODY><EXPORTDATA>
<REQUESTDESC>
<REPORTNAME>Day Book</REPORTNAME>
<STATICVARIABLES>
<SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
<SVFROMDATE>{FY_START}</SVFROMDATE>
<SVTODATE>{FY_END}</SVTODATE>
</STATICVARIABLES>
</REQUESTDESC>
</EXPORTDATA></BODY>
</ENVELOPE>"""

    raw = tally_post(xml)
    if not raw:
        return []

    try:
        root = ET.fromstring(raw)
    except ET.ParseError as e:
        print(f"  ⚠  XML parse error for vouchers: {e}")
        return []

    rows = []
    seen_guids = set()

    for voucher in root.iter("VOUCHER"):
        vch_type = (
            voucher.get("VCHTYPE")
            or text(voucher, "VOUCHERTYPENAME")
            or text(voucher, "VCHTYPE")
            or "Unknown"
        )

        # Only track meaningful voucher types
        if vch_type not in ("Sales", "Receipt", "Purchase", "Payment",
                             "Credit Note", "Debit Note", "Journal",
                             "Contra", "Delivery Note"):
            continue

        guid = (
            voucher.get("REMOTEID")
            or voucher.get("GUID")
            or voucher.get("MASTERID")
        )
        vch_date   = parse_date(text(voucher, "DATE"))
        vch_no     = text(voucher, "VOUCHERNUMBER") or text(voucher, "VCHNO")
        party      = text(voucher, "PARTYLEDGERNAME") or text(voucher, "PARTYNAME")
        narration  = text(voucher, "NARRATION")
        amount_str = text(voucher, "AMOUNT")
        amount     = parse_amount(amount_str)

        if not vch_date:
            continue

        # Deduplicate by GUID if available
        if guid:
            if guid in seen_guids:
                continue
            seen_guids.add(guid)
        else:
            # Fallback dedup key
            fallback = f"{vch_date}|{vch_type}|{vch_no}|{amount}"
            if fallback in seen_guids:
                continue
            seen_guids.add(fallback)
            guid = fallback

        rows.append({
            "voucher_date":  vch_date,
            "voucher_type":  vch_type,
            "voucher_no":    vch_no,
            "party_name":    party,
            "narration":     narration[:500] if narration else None,
            "amount":        round(amount, 2),
            "tally_guid":    guid[:255] if guid else None,
            "synced_at":     SYNC_TS,
        })

    return rows


def fetch_bank_balances():
    """Fetch closing balances for Bank Accounts and Cash-in-Hand groups."""
    rows = []
    for group, ltype in [("Bank Accounts", "bank"), ("Cash-in-Hand", "cash")]:
        xml = f"""<ENVELOPE>
<HEADER><TALLYREQUEST>Export Data</TALLYREQUEST></HEADER>
<BODY><EXPORTDATA>
<REQUESTDESC>
<STATICVARIABLES>
<SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
</STATICVARIABLES>
<REQUESTEDLIST>
<REMOTECOLLECTION NAME="LEDGERS">
<TYPE>Ledger</TYPE>
<FETCH>Name,ClosingBalance,OpeningBalance,Parent</FETCH>
<FILTER>
<JSFTYPE>$$IsEqual:$Parent:"{group}"</JSFTYPE>
</FILTER>
</REMOTECOLLECTION>
</REQUESTEDLIST>
</REQUESTDESC>
</EXPORTDATA></BODY>
</ENVELOPE>"""

        raw = tally_post(xml)
        if not raw:
            continue

        try:
            root = ET.fromstring(raw)
        except ET.ParseError:
            continue

        for coll in root.iter("COLLECTION"):
            for ledger in coll:
                name    = text(ledger, "NAME")
                balance = parse_amount(text(ledger, "CLOSINGBALANCE"))
                if name:
                    rows.append({
                        "ledger_name":  name,
                        "ledger_type":  ltype,
                        "balance":      round(balance, 2),
                        "synced_at":    SYNC_TS,
                    })
    return rows


# ── MAIN ─────────────────────────────────────────────────────────────────────────
def main():
    print(f"\n{'─'*55}")
    print(f"  Proalfa Finance Sync  —  {datetime.now().strftime('%d %b %Y  %H:%M')}")
    print(f"{'─'*55}\n")

    counts = {}

    # 1. Outstanding Receivables
    print("→ Fetching outstanding receivables (Bills Receivable)...")
    debtors = fetch_outstanding("Bills Receivable")
    print(f"  Found {len(debtors)} pending receivable bills.")
    sb_delete("fin_outstanding_debtors")
    sb_insert("fin_outstanding_debtors", debtors)
    counts["debtors"] = len(debtors)

    # 2. Outstanding Payables
    print("\n→ Fetching outstanding payables (Bills Payable)...")
    creditors = fetch_outstanding("Bills Payable")
    print(f"  Found {len(creditors)} pending payable bills.")
    sb_delete("fin_outstanding_creditors")
    sb_insert("fin_outstanding_creditors", creditors)
    counts["creditors"] = len(creditors)

    # 3. Vouchers (Day Book)
    print("\n→ Fetching vouchers (Day Book for full FY)...")
    vouchers = fetch_vouchers()
    print(f"  Found {len(vouchers)} vouchers.")
    sb_upsert("fin_vouchers", vouchers, "tally_guid")
    counts["vouchers"] = len(vouchers)

    # 4. Bank & Cash Balances
    print("\n→ Fetching bank & cash balances...")
    balances = fetch_bank_balances()
    print(f"  Found {len(balances)} ledger(s).")
    sb_delete("fin_bank_balances")
    sb_insert("fin_bank_balances", balances)
    counts["balances"] = len(balances)

    # 5. Log sync
    sb_insert("fin_sync_log", [{
        "synced_at":       SYNC_TS,
        "status":          "success",
        "message":         f"Sync completed. FY {FY_START[:4]}-{FY_END[:4]}.",
        "debtors_count":   counts["debtors"],
        "creditors_count": counts["creditors"],
        "vouchers_count":  counts["vouchers"],
    }])

    print(f"\n{'─'*55}")
    print(f"  ✅  Sync complete!")
    print(f"      Receivables: {counts['debtors']} bills")
    print(f"      Payables:    {counts['creditors']} bills")
    print(f"      Vouchers:    {counts['vouchers']} entries")
    print(f"      Balances:    {counts['balances']} ledgers")
    print(f"{'─'*55}\n")


if __name__ == "__main__":
    main()
