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
LATE_AFTER      = "10:00"   # punch-in after this = late
SHIFT_END       = "18:00"   # punch-out after this = OT
HALF_IN_AFTER   = "12:00"   # punch-in after this = half day
HALF_OUT_BEFORE = "15:00"   # punch-out before this = half day
NIGHT_CUTOFF    = "05:00"   # punch before this hour belongs to the previous day's shift

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
def t2m(t):
    """Convert HH:MM or HH:MM:SS string to minutes."""
    parts = t.split(":")
    h, m = int(parts[0]), int(parts[1])
    return h * 60 + m

def calc_ot(ci_str, co_str):
    """Return OT hours accounting for midnight crossover."""
    if not co_str:
        return 0.0
    co_mins = t2m(co_str)
    # Midnight crossover: checkout is earlier in the clock than check-in
    if ci_str and co_mins < t2m(ci_str):
        co_mins += 24 * 60
    diff_mins = co_mins - t2m(SHIFT_END)
    return round(max(0, diff_mins / 60), 2)

def calc_status(ci_str, co_str):
    """Return 'half_day' or 'present', handling midnight crossover."""
    ci_mins = t2m(ci_str)
    if ci_mins > t2m(HALF_IN_AFTER):
        return "half_day"
    if co_str:
        co_mins = t2m(co_str)
        if co_mins < ci_mins:          # midnight crossover — definitely full day+
            return "present"
        if co_mins < t2m(HALF_OUT_BEFORE):
            return "half_day"
    return "present"

def process_attendance(raw_logs, from_date):
    late_h, late_m = map(int, LATE_AFTER.split(":"))
    cutoff_mins = t2m(NIGHT_CUTOFF)

    # Group punches by (user_id, shift_date)
    # Punches before NIGHT_CUTOFF are attributed to the previous day's shift
    grouped = {}
    for log in raw_logs:
        punch_mins = log.timestamp.hour * 60 + log.timestamp.minute
        if punch_mins < cutoff_mins:
            log_date = log.timestamp.date() - timedelta(days=1)
        else:
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
        late = t2m(ci_str) > (late_h * 60 + late_m)

        records.append({
            "emp_id":     user_id,
            "date":       log_date.isoformat(),
            "check_in":   ci_str,
            "check_out":  co_str,
            "status":     calc_status(ci_str, co_str),
            "late_entry": late,
            "ot_hours":   calc_ot(ci_str, co_str),
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

    # Fetch existing attendance records for the sync date range so we can
    # merge machine punches with approved site-portal punches intelligently.
    dates = list({r["date"] for r in records})
    existing_map = {}
    try:
        for d in dates:
            resp = requests.get(
                f"{SUPABASE_URL}/rest/v1/attendance?date=eq.{d}&select=emp_id,date,check_in,check_out",
                headers=headers,
                timeout=10,
            )
            if resp.status_code == 200:
                for row in resp.json():
                    existing_map[(str(row["emp_id"]), row["date"])] = row
    except Exception:
        pass  # if fetch fails, fall back to machine data only

    late_h, late_m = map(int, LATE_AFTER.split(":"))
    merged = []
    for r in records:
        key = (str(r["emp_id"]), r["date"])
        ex  = existing_map.get(key)
        ci, co = r["check_in"], r["check_out"]

        if ex and co is None:
            # Machine only has 1 punch — fill the missing half from existing record
            ex_ci = ex.get("check_in")
            ex_co = ex.get("check_out")
            if ex_ci and not ex_co:
                # Site portal approved check_in, machine punch = check_out
                ci, co = ex_ci, r["check_in"]
            elif ex_co and not ex_ci:
                # Site portal approved check_out, machine punch = check_in
                ci, co = r["check_in"], ex_co

        if ci == co:
            co = None

        merged.append({
            "emp_id":     r["emp_id"],
            "date":       r["date"],
            "check_in":   ci,
            "check_out":  co,
            "status":     calc_status(ci, co),
            "late_entry": t2m(ci) > (late_h * 60 + late_m),
            "ot_hours":   calc_ot(ci, co),
        })

    batch_size = 100
    pushed = 0
    for i in range(0, len(merged), batch_size):
        batch = merged[i:i + batch_size]
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
