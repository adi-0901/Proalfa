/**
 * Proalfa — ZKTeco ADMS → Supabase Cloudflare Worker
 *
 * The ZKTeco K40 Pro pushes attendance punches to this Worker via HTTP.
 * The Worker parses each punch, applies midnight-crossover logic (same as
 * zkteco_sync.py), and upserts the result into the Supabase attendance table.
 *
 * Environment variables (set via: wrangler secret put SUPABASE_KEY)
 *   SUPABASE_URL  – set in wrangler.toml [vars]
 *   SUPABASE_KEY  – set as a secret (not in plain text)
 */

// Shift config — keep in sync with zkteco_sync.py
const NIGHT_CUTOFF_HOUR = 5;   // punches before 05:00 belong to previous day
const LATE_AFTER_MINS   = 600; // 10:00 — punch-in after this = late
const SHIFT_END_MINS    = 1080;// 18:00 — punch-out after this = OT
const HALF_IN_MINS      = 720; // 12:00 — punch-in after this = half day
const HALF_OUT_MINS     = 900; // 15:00 — punch-out before this = half day

export default {
  async fetch(request, env) {
    const url  = new URL(request.url);
    const path = url.pathname;
    const sn   = url.searchParams.get('SN') || 'UNKNOWN';

    // ── Device registration / option request ─────────────────────────
    if (path === '/iclock/cdata' && request.method === 'GET') {
      return registration(sn);
    }

    // ── Attendance data push ──────────────────────────────────────────
    if (path === '/iclock/cdata' && request.method === 'POST') {
      const table = url.searchParams.get('table') || '';
      if (table === 'ATTLOG') {
        return handleAttendance(request, env);
      }
      return ok('OK');
    }

    // ── Command poll (device asks "any commands for me?") ─────────────
    if (path === '/iclock/getrequest') {
      return ok('OK');
    }

    // ── Device info / heartbeat / anything else ───────────────────────
    return ok('OK');
  },
};

// ── Registration response ─────────────────────────────────────────────────────
function registration(sn) {
  const body = [
    `GET OPTION FROM: ${sn}`,
    `ATTLOGStamp=0`,
    `OPERLOGStamp=0`,
    `ATTPHOTOStamp=0`,
    `ErrorDelay=30`,
    `Delay=10`,
    `TransTimes=00:00;14:05`,
    `TransInterval=1`,
    `TransFlag=TransData AttLog`,
    `TimeZone=5.5`,
    `Realtime=1`,
    `Encrypt=None`,
  ].join('\n');
  return new Response(body, { status: 200, headers: { 'Content-Type': 'text/plain' } });
}

// ── Parse & upsert attendance ─────────────────────────────────────────────────
async function handleAttendance(request, env) {
  const body  = await request.text();
  const lines = body.split('\n').map(l => l.trim()).filter(l => l && l !== 'ATTLOG');

  if (!lines.length) return ok('OK: 0');

  // Parse each punch line: UserID\tTimestamp\tStatus\tVerify\tWorkCode\tReserved
  const punches = [];
  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length < 2) continue;
    const userId = parts[0].trim();
    const tsRaw  = parts[1].trim(); // "YYYY-MM-DD HH:MM:SS"
    const ts     = new Date(tsRaw.replace(' ', 'T') + '+05:30'); // IST
    if (isNaN(ts.getTime())) continue;
    punches.push({ userId, ts });
  }

  if (!punches.length) return ok('OK: 0');

  // Apply midnight-crossover: punch before NIGHT_CUTOFF_HOUR → previous day
  const grouped = {}; // key = "userId|YYYY-MM-DD"
  for (const p of punches) {
    const hour  = p.ts.getUTCHours() + 5 + (p.ts.getUTCMinutes() >= 30 ? 0.5 : 0) | 0; // approx IST hour
    const istTs = new Date(p.ts.getTime() + 5.5 * 60 * 60 * 1000); // shift to IST
    const istH  = istTs.getUTCHours();
    let shiftDate = new Date(istTs);
    if (istH < NIGHT_CUTOFF_HOUR) shiftDate.setUTCDate(shiftDate.getUTCDate() - 1);
    const dateStr = shiftDate.toISOString().split('T')[0];
    const timeStr = `${String(istTs.getUTCHours()).padStart(2,'0')}:${String(istTs.getUTCMinutes()).padStart(2,'0')}`;
    const key = `${p.userId}|${dateStr}`;
    if (!grouped[key]) grouped[key] = { userId: p.userId, dateStr, punches: [] };
    grouped[key].punches.push({ ts: p.ts, timeStr });
  }

  // Fetch existing records from Supabase to merge intelligently
  const dates   = [...new Set(Object.values(grouped).map(g => g.dateStr))];
  const existing = {};
  for (const d of dates) {
    try {
      const r = await fetch(
        `${env.SUPABASE_URL}/rest/v1/attendance?date=eq.${d}&select=emp_id,date,check_in,check_out`,
        { headers: sbHeaders(env) }
      );
      if (r.ok) {
        for (const row of await r.json()) {
          existing[`${row.emp_id}|${row.date}`] = row;
        }
      }
    } catch (_) {}
  }

  // Build upsert rows
  const rows = [];
  for (const [key, g] of Object.entries(grouped)) {
    g.punches.sort((a, b) => a.ts - b.ts);
    const first = g.punches[0];
    const last  = g.punches[g.punches.length - 1];

    let ci = first.timeStr;
    let co = g.punches.length > 1 && first.timeStr !== last.timeStr ? last.timeStr : null;

    // Merge: if existing record has a check_in and we only have one punch, keep existing
    const ex = existing[key];
    if (ex) {
      if (ex.check_in && !co && ci === ex.check_in) co = null;
      if (ex.check_in && !ex.check_out && co) {
        ci = ex.check_in; // preserve original check-in
      }
    }

    if (ci === co) co = null;

    const ciM = t2m(ci);
    const coM = co ? t2m(co) : null;
    const late = ciM > LATE_AFTER_MINS;

    // OT — account for midnight crossover
    let ot = 0;
    if (coM !== null) {
      const adjCo = coM < ciM ? coM + 1440 : coM;
      ot = Math.max(0, Math.round((adjCo - SHIFT_END_MINS) / 60 * 100) / 100);
    }

    // Status
    let status = 'present';
    if (ciM > HALF_IN_MINS) {
      status = 'half_day';
    } else if (coM !== null) {
      if (coM < ciM) status = 'present'; // midnight crossover = full day
      else if (coM < HALF_OUT_MINS) status = 'half_day';
    }

    rows.push({ emp_id: g.userId, date: g.dateStr, check_in: ci, check_out: co, status, late_entry: late, ot_hours: ot });
  }

  // Upsert to Supabase
  try {
    await fetch(`${env.SUPABASE_URL}/rest/v1/attendance?on_conflict=emp_id,date`, {
      method:  'POST',
      headers: { ...sbHeaders(env), 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates,return=minimal' },
      body:    JSON.stringify(rows),
    });
  } catch (_) {}

  return ok(`OK: ${rows.length}`);
}

function sbHeaders(env) {
  return { apikey: env.SUPABASE_KEY, Authorization: `Bearer ${env.SUPABASE_KEY}` };
}

function t2m(t) {
  if (!t) return 0;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function ok(body) {
  return new Response(body, { status: 200, headers: { 'Content-Type': 'text/plain' } });
}
