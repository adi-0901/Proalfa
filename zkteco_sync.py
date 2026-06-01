#!/usr/bin/env python3
"""
zkteco_sync.py  —  Proalfa Attendance Sync
Connects directly to ZKTeco K40 Pro over LAN, pulls attendance logs,
and pushes them to Supabase. No eTimeOffice or any other software needed.

SETUP (one time):
  pip3 install pyzk requests

RUN:
  python3 zkteco_sync.py

SCHEDULE (Mac — run automatically every morning):
  crontab -e
  Add this line:
  0 9 * * * /usr/bin/python3 /path/to/zkteco_sync.py >> /tmp/zkteco_sync.log 2>&1
"""

from zk import ZK
import requests
from datetime import datetime, date, timedelta

# ── CONFIG ───────────────────────────────────────────────────────────────────
DEVICE_IP   = "192.168.31.201"
DEVICE_PORT = 4370

# How many past days to sync (1 = today only, 7 = last week)
SYNC_DAYS   = 1

SUPABASE_URL = "https://gzjzuudhtvljpwcqygtk.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6anp1dWRodHZsanB3Y3F5Z3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzOTY4NTksImV4cCI6MjA5Mzk3Mjg1OX0.pCBKZwMDvu8UAfKEXL8_hgkuG95A-MtVKK6sM2qFxEs"

# Shift window
LATE_AFTER  = "10:00"   # punch-in after this = late
SHIFT_END   = "18:00"   # punch-out after this = OT

# ── CONNECT TO DEVICE ────────────────────────────────────────────────────────
def get_attendance():
    zk = ZK(DEVICE_IP, port=DEVICE_PORT, timeout=10)
    conn = None
    try:
        print(f"→ Connecting to ZKTeco device at {DEVICE_IP}:{DEVICE_PORT}...")
        conn = zk.connect()
        conn.disable_device()

        print("  ✓  Connected.")
        print("→ Fetching attendance logs...")
        attendance = conn.get_attendance()
        print(f"  ✓  {len(attendance)} total records on device.")
        return attendance

    except Exception as e:
        print(f"\n❌  Cannot connect to device: {e}")
        print(f"    Make sure the device is on and IP {DEVICE_IP} is reachable.")
        print("    Run: ping 192.168.31.201")
        return []
    finally:
        if conn:
            conn.enable_device()
            conn.disconnect()

# ── PROCESS RECORDS ──────────────────────────────────────────────────────────
def calc_ot(co_str):
    """Return OT hours (float, 2dp) for a check-out time string, or 0."""
    if not co_str:
        return 0.0
    se_h, se_m = map(int, SHIFT_END.split(":"))
    h, m = map(int, co_str.split(":"))
    diff_mins = (h * 60 + m) - (se_h * 60 + se_m)
    return round(max(0, diff_mins / 60), 2)

def process_attendance(raw_logs, from_date):
    late_h, late_m = map(int, LATE_AFTER.split(":"))

    # Group punches by (user_id, date)
    grouped = {}
    for log in raw_logs:
        log_date = log.timestamp.date()
        if log_date < from_date:
            continue

        key = (str(log.user_id), log_date)
        if key not in grouped:
            grouped[key] = []
        grouped[key].append(log.timestamp)

    records = []
    for (user_id, log_date), punches in grouped.items():
        punches.sort()
        check_in  = punches[0]
        check_out = punches[-1] if len(punches) > 1 else None

        ci_str = check_in.strftime("%H:%M")
        co_str = check_out.strftime("%H:%M") if check_out else None

        # Don't record same in/out
        if ci_str == co_str:
            co_str = None

        # Late flag
        h, m = map(int, ci_str.split(":"))
        late = (h * 60 + m) > (late_h * 60 + late_m)

        records.append({
            "emp_id":     user_id,
            "date":       log_date.isoformat(),
            "check_in":   ci_str,
            "check_out":  co_str,
            "status":     "present",
            "late_entry": late,
            "ot_hours":   calc_ot(co_str),
        })

    return records

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

    # Fetch valid emp_ids from Supabase
    valid_ids = set()
    try:
        resp = requests.get(
            f"{SUPABASE_URL}/rest/v1/employees?select=emp_id",
            headers=headers,
            timeout=10,
        )
        if resp.status_code == 200:
            valid_ids = {row["emp_id"] for row in resp.json()}
    except Exception:
        pass

    # Filter out records whose emp_id is not in employees table
    if valid_ids:
        skipped = [r for r in records if r["emp_id"] not in valid_ids]
        records  = [r for r in records if r["emp_id"] in valid_ids]
        if skipped:
            print(f"  ⚠  Skipped {len(skipped)} record(s) — employee IDs not found in system: "
                  f"{[r['emp_id'] for r in skipped]}")
            print("     Enrol these employees in HR first, or set matching User IDs on the device.")

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

    print(f"  ✓  {pushed} records upserted to Supabase.")

# ── MAIN ─────────────────────────────────────────────────────────────────────
def main():
    now       = datetime.now()
    today     = now.date()
    from_date = today - timedelta(days=SYNC_DAYS - 1)

    print(f"\n{'─'*52}")
    print(f"  Proalfa Attendance Sync  —  {now.strftime('%d %b %Y  %H:%M')}")
    print(f"  Syncing: {from_date} → {today}")
    print(f"{'─'*52}\n")

    raw_logs = get_attendance()
    if not raw_logs:
        print("\n  No records found. Exiting.")
        return

    print("→ Processing records...")
    records = process_attendance(raw_logs, from_date)
    print(f"  ✓  {len(records)} records ready.\n")

    print("→ Pushing to Supabase...")
    push_to_supabase(records)

    print(f"\n{'─'*52}")
    print(f"  ✅  Sync complete!")
    print(f"{'─'*52}\n")

if __name__ == "__main__":
    main()
