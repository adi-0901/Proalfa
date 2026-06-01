#!/usr/bin/env python3
"""
backfill_ot.py  —  One-time script to fix all existing attendance records
Recalculates late_entry (threshold 10:00) and ot_hours (after 18:00)
for every record already in Supabase.

RUN ONCE:
  python3 backfill_ot.py
"""

import requests

SUPABASE_URL = "https://gzjzuudhtvljpwcqygtk.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6anp1dWRodHZsanB3Y3F5Z3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzOTY4NTksImV4cCI6MjA5Mzk3Mjg1OX0.pCBKZwMDvu8UAfKEXL8_hgkuG95A-MtVKK6sM2qFxEs"

LATE_AFTER      = "10:00"   # shift starts 10:00
SHIFT_END       = "18:00"   # shift ends  18:00
HALF_IN_AFTER   = "12:00"   # check-in after noon  = half day
HALF_OUT_BEFORE = "15:00"   # check-out before 3pm = half day

HEADERS = {
    "apikey":        SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type":  "application/json",
    "Prefer":        "resolution=merge-duplicates,return=minimal",
}

def time_to_mins(t):
    h, m = map(int, t.split(":"))
    return h * 60 + m

LATE_MINS     = time_to_mins(LATE_AFTER)
END_MINS      = time_to_mins(SHIFT_END)
HALF_IN_MINS  = time_to_mins(HALF_IN_AFTER)
HALF_OUT_MINS = time_to_mins(HALF_OUT_BEFORE)

def calc_late(ci):
    if not ci:
        return False
    return time_to_mins(ci[:5]) > LATE_MINS

def calc_ot(co):
    if not co:
        return 0.0
    diff = time_to_mins(co[:5]) - END_MINS
    return round(max(0, diff / 60), 2)

def calc_status(ci, co):
    if ci and time_to_mins(ci[:5]) > HALF_IN_MINS:
        return "half_day"
    if co and time_to_mins(co[:5]) < HALF_OUT_MINS:
        return "half_day"
    return "present"

def fetch_all_attendance():
    records = []
    page = 0
    page_size = 1000
    while True:
        resp = requests.get(
            f"{SUPABASE_URL}/rest/v1/attendance",
            headers={**HEADERS, "Range": f"{page*page_size}-{(page+1)*page_size-1}"},
            params={"select": "emp_id,date,check_in,check_out,status"},
            timeout=30,
        )
        batch = resp.json()
        if not batch:
            break
        records.extend(batch)
        if len(batch) < page_size:
            break
        page += 1
    return records

def main():
    print("→ Fetching all attendance records from Supabase...")
    records = fetch_all_attendance()
    print(f"  ✓  {len(records)} records fetched.\n")

    updated = []
    ot_count = 0
    late_change = 0

    for r in records:
        ci = (r.get("check_in") or "")[:5] or None
        co = (r.get("check_out") or "")[:5] or None

        new_late   = calc_late(ci)
        new_ot     = calc_ot(co)
        new_status = calc_status(ci, co)

        if new_ot > 0:
            ot_count += 1
        if new_late != r.get("late_entry"):
            late_change += 1

        updated.append({
            "emp_id":     r["emp_id"],
            "date":       r["date"],
            "check_in":   ci,
            "check_out":  co,
            "status":     new_status,
            "late_entry": new_late,
            "ot_hours":   new_ot,
        })

    half_count = sum(1 for u in updated if u["status"] == "half_day")
    print(f"  →  {late_change} records will have late_entry corrected (10:00 threshold).")
    print(f"  →  {half_count} records will be marked half_day (in after 12:00 or out before 15:00).")
    print(f"  →  {ot_count} records have OT (check-out after 18:00).\n")

    print("→ Pushing updates to Supabase...")
    batch_size = 200
    pushed = 0
    for i in range(0, len(updated), batch_size):
        batch = updated[i:i + batch_size]
        r = requests.post(
            f"{SUPABASE_URL}/rest/v1/attendance?on_conflict=emp_id,date",
            headers=HEADERS,
            json=batch,
            timeout=60,
        )
        if r.status_code in (200, 201):
            pushed += len(batch)
            print(f"  ✓  {pushed}/{len(updated)} records upserted...")
        else:
            print(f"  ⚠  Supabase error ({r.status_code}): {r.text[:300]}")

    print(f"\n{'─'*52}")
    print(f"  ✅  Backfill complete! {pushed} records updated.")
    print(f"      Late threshold: 10:00 AM")
    print(f"      OT threshold:   18:00 (6:00 PM)")
    print(f"{'─'*52}\n")

if __name__ == "__main__":
    main()
