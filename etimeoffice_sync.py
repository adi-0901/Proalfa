#!/usr/bin/env python3
"""
etimeoffice_sync.py  —  Proalfa Attendance Sync
Reads today's attendance from eTimeOffice (SQL Server) and pushes
it to Supabase so the HR Attendance Dashboard stays current.

SETUP (one time, on the Windows PC where eTimeOffice is installed):
  1. Open Command Prompt as Administrator and run:
       pip install pyodbc requests
  2. Edit the CONFIG block below — set your DB server name, credentials,
     and your eTimeOffice database name.
  3. Double-click  etimeoffice_sync.bat  to run (or schedule it).

SCHEDULE (recommended — run automatically every morning):
  • Open Task Scheduler → Create Basic Task
  • Trigger: Daily at 09:00 AM
  • Action: Start a program → browse to  etimeoffice_sync.bat
  • Tick "Run whether user is logged on or not"

NOTES:
  • The script syncs the date range FROM_DATE → today (default: today only).
  • It upserts — safe to run multiple times; won't create duplicates.
  • Status mapping:  P → present  |  A → absent  |  HD → half_day
                    WO → weekly_off  |  PL → paid_leave  |  H → holiday
"""

import pyodbc
import requests
import json
from datetime import datetime, date, timedelta
import sys

# ── CONFIG — edit these ──────────────────────────────────────────────────────
DB_SERVER   = "localhost\\SQLEXPRESS"   # or just "localhost" or your server IP
DB_NAME     = "ETOffice"               # eTimeOffice database name (check SQL Server)
DB_USER     = ""                       # leave blank to use Windows Authentication
DB_PASSWORD = ""                       # leave blank to use Windows Authentication

# How many past days to sync (1 = today only, 7 = last week, 30 = last month)
SYNC_DAYS   = 1

SUPABASE_URL = "https://gzjzuudhtvljpwcqygtk.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6anp1dWRodHZsanB3Y3F5Z3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzOTY4NTksImV4cCI6MjA5Mzk3Mjg1OX0.pCBKZwMDvu8UAfKEXL8_hgkuG95A-MtVKK6sM2qFxEs"

# Late threshold — punch-ins after this time are flagged as late
LATE_AFTER  = "09:30"   # HH:MM

# ── STATUS MAP — adjust if your eTimeOffice uses different codes ─────────────
STATUS_MAP = {
    "P":   "present",
    "A":   "absent",
    "HD":  "half_day",
    "HHD": "half_day",
    "WO":  "weekly_off",
    "WW":  "weekly_off",
    "PL":  "paid_leave",
    "CL":  "paid_leave",
    "SL":  "paid_leave",
    "EL":  "paid_leave",
    "H":   "holiday",
    "HO":  "holiday",
    "ML":  "paid_leave",
}

# ── DB CONNECTION ────────────────────────────────────────────────────────────
def get_connection():
    if DB_USER:
        conn_str = (
            f"DRIVER={{ODBC Driver 17 for SQL Server}};"
            f"SERVER={DB_SERVER};DATABASE={DB_NAME};"
            f"UID={DB_USER};PWD={DB_PASSWORD};"
        )
    else:
        # Windows Authentication (recommended if on the same machine)
        conn_str = (
            f"DRIVER={{ODBC Driver 17 for SQL Server}};"
            f"SERVER={DB_SERVER};DATABASE={DB_NAME};"
            f"Trusted_Connection=yes;"
        )
    try:
        return pyodbc.connect(conn_str, timeout=15)
    except pyodbc.Error as e:
        # Try fallback driver
        try:
            conn_str = conn_str.replace(
                "ODBC Driver 17 for SQL Server",
                "SQL Server"
            )
            return pyodbc.connect(conn_str, timeout=15)
        except pyodbc.Error:
            print(f"\n❌  Cannot connect to SQL Server: {e}")
            print(f"    Server: {DB_SERVER}  |  Database: {DB_NAME}")
            print("    Make sure SQL Server is running and the DB name is correct.")
            print("    Run this in SQL Server Management Studio to find DB name:")
            print("      SELECT name FROM sys.databases")
            sys.exit(1)

# ── FETCH ATTENDANCE FROM eTIMEOFFICE ────────────────────────────────────────
def fetch_attendance(conn, from_date, to_date):
    """
    Try multiple table/column name variants used by different eTimeOffice versions.
    Returns list of dicts: {emp_code, att_date, in_time, out_time, status}
    """
    today_str = to_date.strftime("%Y-%m-%d")
    from_str  = from_date.strftime("%Y-%m-%d")

    # Variant 1: Att_Process table (most common in eTimeOffice Pro)
    queries = [
        f"""
        SELECT
            CAST(EmpCode AS VARCHAR(20))   AS emp_code,
            CAST(AttDate AS DATE)          AS att_date,
            CONVERT(VARCHAR(8), InTime,  8) AS in_time,
            CONVERT(VARCHAR(8), OutTime, 8) AS out_time,
            ISNULL(AttStatus,'A')          AS status
        FROM Att_Process
        WHERE AttDate >= '{from_str}' AND AttDate <= '{today_str}'
        ORDER BY AttDate, EmpCode
        """,
        # Variant 2: Attendance table
        f"""
        SELECT
            CAST(EmpCode AS VARCHAR(20))    AS emp_code,
            CAST(AttDate AS DATE)           AS att_date,
            CONVERT(VARCHAR(8), InTime,  8) AS in_time,
            CONVERT(VARCHAR(8), OutTime, 8) AS out_time,
            ISNULL(Status,'A')              AS status
        FROM Attendance
        WHERE AttDate >= '{from_str}' AND AttDate <= '{today_str}'
        ORDER BY AttDate, EmpCode
        """,
        # Variant 3: Build from DeviceLogs raw punches
        f"""
        SELECT
            CAST(EmpCode AS VARCHAR(20))        AS emp_code,
            CAST(LogDate AS DATE)               AS att_date,
            CONVERT(VARCHAR(8), MIN(LogDate), 8) AS in_time,
            CONVERT(VARCHAR(8), MAX(LogDate), 8) AS out_time,
            'P'                                 AS status
        FROM DeviceLogs
        WHERE CAST(LogDate AS DATE) >= '{from_str}'
          AND CAST(LogDate AS DATE) <= '{today_str}'
        GROUP BY EmpCode, CAST(LogDate AS DATE)
        ORDER BY CAST(LogDate AS DATE), EmpCode
        """,
    ]

    cursor = conn.cursor()
    for q in queries:
        try:
            cursor.execute(q)
            rows = cursor.fetchall()
            cols = [c[0] for c in cursor.description]
            result = [dict(zip(cols, row)) for row in rows]
            if result is not None:
                print(f"  ✓  Fetched {len(result)} attendance records from database.")
                return result
        except pyodbc.Error:
            continue

    print("  ⚠  Could not read attendance from eTimeOffice.")
    print("     Run this query in SQL Server Management Studio to see available tables:")
    print("       SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'")
    return []

# ── PROCESS & MAP TO SUPABASE ────────────────────────────────────────────────
def process_records(raw_rows):
    late_h, late_m = map(int, LATE_AFTER.split(":"))
    out = []
    for r in raw_rows:
        emp_code  = str(r.get("emp_code", "")).strip().lstrip("0") or None
        att_date  = r.get("att_date")
        in_time   = (r.get("in_time")  or "").strip()
        out_time  = (r.get("out_time") or "").strip()
        raw_status = str(r.get("status", "A")).strip().upper()

        if not emp_code or not att_date:
            continue

        # Format date
        if isinstance(att_date, date):
            date_str = att_date.isoformat()
        else:
            date_str = str(att_date)[:10]

        # Clean times — strip seconds, handle "00:00:00" as no punch
        def clean_time(t):
            if not t or t.startswith("00:00"):
                return None
            return t[:5]  # HH:MM

        ci = clean_time(in_time)
        co = clean_time(out_time)
        if ci == co:
            co = None  # same in/out = only one punch logged

        # Map status
        status = STATUS_MAP.get(raw_status, "present" if ci else "absent")

        # Late flag
        late = False
        if ci and status == "present":
            try:
                h, m = map(int, ci.split(":"))
                late = (h * 60 + m) > (late_h * 60 + late_m)
            except Exception:
                pass

        out.append({
            "emp_id":     emp_code,
            "date":       date_str,
            "check_in":   ci,
            "check_out":  co,
            "status":     status,
            "late_entry": late,
        })
    return out

# ── PUSH TO SUPABASE ─────────────────────────────────────────────────────────
def push_to_supabase(records):
    if not records:
        print("  —  Nothing to push.")
        return
    headers = {
        "apikey":        SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type":  "application/json",
        "Prefer":        "resolution=merge-duplicates,return=minimal",
    }
    # Upsert in batches of 100
    batch_size = 100
    pushed = 0
    for i in range(0, len(records), batch_size):
        batch = records[i:i + batch_size]
        r = requests.post(
            f"{SUPABASE_URL}/rest/v1/attendance?on_conflict=emp_id,date",
            headers=headers,
            json=batch,
            timeout=30,
        )
        if r.status_code in (200, 201):
            pushed += len(batch)
        else:
            print(f"  ⚠  Supabase error ({r.status_code}): {r.text[:300]}")
    print(f"  ✓  {pushed} records upserted to Supabase attendance table.")

# ── MAIN ─────────────────────────────────────────────────────────────────────
def main():
    now = datetime.now()
    to_date   = now.date()
    from_date = to_date - timedelta(days=SYNC_DAYS - 1)

    print(f"\n{'─'*52}")
    print(f"  Proalfa Attendance Sync  —  {now.strftime('%d %b %Y  %H:%M')}")
    print(f"  Syncing: {from_date} → {to_date}")
    print(f"{'─'*52}\n")

    print("→ Connecting to eTimeOffice database...")
    conn = get_connection()
    print("  ✓  Connected.\n")

    print("→ Fetching attendance records...")
    raw = fetch_attendance(conn, from_date, to_date)
    conn.close()

    if not raw:
        print("\n  No records found. Exiting.")
        return

    print("→ Processing records...")
    records = process_records(raw)
    print(f"  ✓  {len(records)} records ready.\n")

    print("→ Pushing to Supabase...")
    push_to_supabase(records)

    print(f"\n{'─'*52}")
    print(f"  ✅  Sync complete!")
    print(f"{'─'*52}\n")

if __name__ == "__main__":
    main()
