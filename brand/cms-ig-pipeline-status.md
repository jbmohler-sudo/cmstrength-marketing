# CMS Instagram pipeline — STATUS

> Human-readable state of the @centermassstrength auto-publish line.
> Machine copy of the resume plan: `hermes cron notepad 287b41662faa get ig_pipeline_state`.
> Procedure + failure modes: skill `cms-instagram-auto` (health gate section).
> **Last updated: 2026-11-16 by the `cms-ig-weekly-batch` run.**

## State: DOWN — two blockers. (a) **WorkBench database is unreachable — the Supabase project no longer exists in DNS** (new, 2026-10-24) and (b) Instagram token still invalidated (**70 days**, no posts since 2026-09-07; re-verified 2026-11-16). The host-side blackout cause has now been found and fixed (see (c), corrected in (d)); no `pg_dump` of this DB exists anywhere on disk. **Week 9 changed strategy, not state:** the decoupling spec that removes the database from the publish path is written and committed (section (f)).

### (a) 2026-10-24 — the database itself is gone (this outranks the token)

`WorkBench/.env` → `postgresql://postgres.futxwjdirtywkkkxqxhd:***@aws-1-us-east-2.pooler.supabase.com:6543/postgres`.
Every Prisma query now fails:

```
Error querying the database: FATAL: (ENOTFOUND) tenant/user postgres.futxwjdirtywkkkxqxhd not found
```

Three independent checks agree it is not a local/resolver artifact:

| Check | Result (live 2026-10-24 18:4x ET) |
|---|---|
| `nslookup futxwjdirtywkkkxqxhd.supabase.co` | **NXDOMAIN** |
| Google DoH `dns.google/resolve?name=futxwjdirtywkkkxqxhd.supabase.co` | **Status 3 (NXDOMAIN)** — control `supabase.co` resolves fine |
| Pooler (server-side, authoritative) | `tenant/user postgres.futxwjdirtywkkkxqxhd not found` |

A *paused* Supabase project keeps its hostname (it returns a paused/proxy response); a **removed**
hostname is a **deleted** project. Supabase deletes long-paused free projects, and the org's billing
state can delete them outright. **Only Jeff can see the truth: Supabase dashboard → project list**
(look for paused → Restore, or deleted → support restore inside the retention window).

**Blast radius:** every WorkBench DB read/write is dead — the IG queue/captions/nodes, the CMS content
dashboard, and the fire-watchdog (`instagram-verify.ts` fails on line 50 with the same error).
Marketing site `www.cmstrength.fit` still returns **200** (separate deploy, no DB dependency), so this
is silent to a visitor.

**Recovery gap, now real:** the daily Umbrella backup is git-only — `.env` is gitignored and there is
no Supabase `pg_dump` anywhere (`WorkBench/data/` holds only `instagram-published.jsonl`). If the
project is deleted rather than paused, **WorkBench's data is not recoverable from local backups**.
Last published-post record survives locally in `data/instagram-published.jsonl` (17 entries).

### (b) Instagram token — unchanged since 2026-10-05

`graph.instagram.com/v21.0/me` returns
`OAuthException code 190 — "The session has been invalidated because the user changed their password
or Facebook has changed the session for security reasons."`
Re-verified live **2026-10-12** three independent ways (`graph.instagram.com/me` and
`graph.facebook.com/<ig-id>` both return code 190, and the extraction was proven clean — 163 chars,
unquoted, `IGAA` prefix — so it is not a shell-quoting artifact). The token is also **not** in the
process env and `WorkBench/env.ts` has no Instagram reference, so `.env` is still the only source of
truth — no secret manager has quietly taken over.
`C:/Umbrella/WorkBench/.env` has not been modified since
2026-09-01, so no new token has been written. `tools/instagram-token-refresh.ts` fails identically:
the monthly `cms-ig-token-refresh` cron cannot self-heal this.

- **Last post that actually published:** 2026-09-07 — https://www.instagram.com/p/Dc_tQYJFiEw/ (**49 days** as of 2026-10-26; confirmed from the local `data/instagram-published.jsonl`, 17 records, since the DB can no longer be read)
- **Unpublished `instagram` ContentNodes: 20** (2026-08-29 → 2026-09-23), all still `SCHEDULED` — *last known 2026-10-12; the DB has been unreadable since some point between 2026-10-14 and 2026-10-24.*
- Only 11 of 31 Instagram nodes have ever published (counts re-read from the DB 2026-10-12).
- **Weeks with no content drafted at all:** 2026-09-28 → 2026-10-26 (health gate stopped the line;
  nothing can publish, so nothing was built and no Higgsfield credits were spent).

### (c) 2026-10-26 — the blackout cause found and fixed: a 15-minute sleep timer

The 10-day scheduler gap was not Hermes losing the schedule — the machine was asleep.
`powercfg /q SCHEME_CURRENT SUB_SLEEP` reported **AC standby = 900s (15 min)** and
**hibernate-after AC = 10800s (3 h)**: the box powers down 15 minutes after the last input, which
puts every 14:00 publish slot and every hourly sweep at risk.

Evidence in the sweep's own output files: it fired **hourly through 10/25 22:00**, then nothing
until **10/26 09:03** (`doctor`: *"catch-up after missed fire, 10h 3m late"*) — one overnight sleep,
11 hours with no scheduler. This is the same mechanism behind the 10/14→10/24 gap, just longer.

**Fixed this run:** `powercfg /change standby-timeout-ac 0` + `powercfg /change hibernate-timeout-ac 0`
→ AC sleep and hibernate both read back as `0x0` (never). Battery settings untouched (DC standby
stays 600s). Reversible per-setting; wake timers were already enabled on AC.

**Also fixed this run:** `profiles/zaino/scripts/cms-ig-publish-sweep.py` now preflights the **tenant
ref** parsed from `DATABASE_URL` (`postgres.<ref>` → `<ref>.supabase.co`) and exits in **~0.15s** with
the named fix when it is NXDOMAIN. A host-only check is useless here: the pooler host
`aws-1-us-east-2.pooler.supabase.com` resolves fine while the tenant is gone — that mismatch is what
made the outage look like a plain API error for a week. Before: 2.6s plus a 30-line Prisma stack every
hour, and one cron-level 3600s kill (10/25 08:42) that held the worker slot for an hour.

### (d) 2026-11-02 — week 7 dark; the idle-sleep fix held, the remaining gaps are a hardware sleep

Both blockers are unchanged (`tenant NXDOMAIN`, `OAuthException 190`, `.env` mtime still
**2026-09-01 10:08**). Facts that moved:

- **Last post = 2026-09-07 (`Dc_tQYJFiEw`) → 56 days** dark as of this run.
- **The 10/26 power fix held.** `powercfg` reads AC standby **0x0** and hibernate-after **0x0**
  (battery profile still 600s, untouched). The 10-day blackout mechanism (idle power-down) is gone.
- **The overnight gaps that remain are real hardware sleep, not the idle timer.** Every hole in the
  sweep's hourly output now maps 1:1 onto a `Microsoft-Windows-Power-Troubleshooter` sleep/wake pair,
  and the Kernel-Power 42 events all say `Sleep Reason: Button or Lid` (wake source: Intel USB 3.10
  host controller — i.e. the lid/button, not a timer):

  | Sleep (local) | Wake (local) | Gap in sweep output |
  |---|---|---|
  | 11/01 22:51 | 11/02 07:52 | 22:00 → 07:52 (9h 00m) |
  | 10/31 22:51 | 11/01 08:16 | 22:00 → 08:23 (9h 25m) |
  | 10/31 10:45 | 10/31 13:58 | 10:00 → 13:58 (3h 13m) |
  | 10/30 23:03 | 10/31 07:45 | 23:00 → 07:46 (8h 42m) |
  | 10/29 21:01 | 10/30 07:29 | 21:00 → 07:29 (10h 28m) |

  Wake times and the catch-up `07:29` / `07:45` / `07:52` output files agree to the minute. So the
  `powercfg` change fixed what it could fix, and the residual blackouts are somebody sleeping the
  box by hand. **Nothing in policy can prevent that** — and it is survivable, because every publish
  slot is 14:00 and the sweep is hourly with a 48h stale window: a night out costs nothing, a
  weekend afternoon sleep (the 10/31 10:45 case) is the only pattern that could eat a 14:00 slot.
- **Topic queue still has runway**, so restoring the DB is genuinely the only thing between here and
  a full week of posts: carousel topics 3–7 unused (5 left), reel topics 3–6 unused (4 left).
- **Alarm wire still missing (7th week).** Four watchdogs (`035dff881879` rank-collapse, fire,
  backup, GSC) each end the run with *"the result was not delivered (platform 'slack' not
  configured/enabled)"*. This weekly batch is `deliver: local` and is the only surface Jeff reads.

### (e) 2026-11-09 — week 8 dark; nothing changed but the number

Same two blockers, third week in a row, byte-identical evidence: the DB probe
(`scripts/cms-ig-db-probe.py`) exits 1 with `TENANT DEAD — futxwjdirtywkkkxqxhd.supabase.co does
not resolve`; `GET graph.facebook.com/v21.0/me` returns `OAuthException 190 — Cannot parse access
token`, `token_len=163`, and `WorkBench/.env` is untouched since **2026-09-01 10:08**.

- **Last post = 2026-09-07 (`Dc_tQYJFiEw`) → 63 days.** `data/instagram-published.jsonl` still has
  exactly 17 records and has not been written since **Sep 7 14:02**.
- **One sleep pair this week, and it cost nothing:** 11/08 20:10 → 11/09 09:01 local (12h 51m).
  Wake source this time was a *timer* — `NT TASK\HP\HP Print Scan Doctor\Printer Health Monitor` —
  not the lid. That is why this batch fired at 09:01 (1h 01m late) instead of 08:00, and why the
  sweep and the Mnemosyne consolidation job both caught up at the same minute. Two short Sunday
  sleeps (08:59→09:03, 09:22→11:27, USB-device wake) preceded it.
- **No overnight gaps on the weekdays 11/02–11/07** (no Power-Troubleshooter events at all) — the
  nightly pattern from the previous two weeks did not repeat. All publish slots are 14:00, so none
  of this touches delivery.
- **The fire watchdog is failing loudly, not silently:** `cms-ig-fire-watchdog` (11/06 15:30) exits 1
  with `Invalid prisma.contentNode.findMany() … FATAL: (ENOTFOUND) tenant/user
  postgres.futxwjdirtywkkkxqxhd not found`. Correct behaviour on a dead DB — but undocumented
  nowhere, because its delivery target is unreachable (see below).
- **Queue unchanged:** carousel topics 3–7 and reel topics 3–6 still unused, so the moment the DB
  answers, a full week is buildable without new topic decisions.
- **New host-side smell (not a blocker):** every `hermes` CLI call now prints *"a source update is
  unfinished; run `hermes update` from a shell to finish it"*. Harmless so far (cron, doctor, list
  all run), but it is the kind of half-applied update that turns into a broken binary mid-week.
  Needs a real shell, so it is Jeff's 30 seconds, not something a cron run should attempt.
- Alarm wire still missing (8th week). Four watchdogs end every run with *"the result was not
  delivered (platform 'slack' not configured/enabled)"*; this batch is `deliver: local` and remains
  the only surface.

### (f) 2026-11-16 — week 9 dark; stopped re-proving the outage and killed the coupling instead

**State, re-verified live at 08:0x (not copied from last week):** probe
`scripts/cms-ig-db-probe.py` → exit 1, `TENANT DEAD — futxwjdirtywkkkxqxhd.supabase.co does not
resolve`; `GET graph.instagram.com/v21.0/me` → `OAuthException 190 — The session has been invalidated
because the user changed their password or Facebook has changed the session for security reasons`,
`token_len=163`; `WorkBench/.env` mtime still **Sep 1 10:08**; `data/instagram-published.jsonl` still
**17 records, last write Sep 7 14:02** → last post **70 days** ago (`Dc_tQYJFiEw`).

- **0 nodes, 0 drafts, 0 Higgsfield credits, 0 publish crons.** Health gate hard-stopped at step 0 —
  unchanged policy, unchanged reason.
- **This run fired 08:02 (scheduled 08:00, 2 min late).** Cause is benign and expected: the box slept
  11/15 23:41 → 11/16 08:01 local (single overnight pair, USB/timer wake, **no** Kernel-Power 42 /
  lid events). Cost is 8 missed hourly sweep runs overnight; every publish slot is 14:00, so delivery
  is untouched. Same pattern as weeks 7–8: overnight only, never a daytime slot.
- **The sweep and fire watchdog are still failing *correctly* into a void:** sweep last error
  11/16 08:02 (`SWEEP BLOCKED (fast-fail) — … does not resolve`), fire watchdog last error
  11/13 15:30 (`Invalid prisma.contentNode.findMany() … ENOTFOUND`). 17 incidents total, 0 delivered.
- **What actually shipped this week is the fix for the *class* of failure, not a post:**
  `C:/Umbrella/WorkBench/docs/specs/ig-file-backed-queue.md` (commit `62f1e5b`) specifies
  `data/ig-queue.jsonl` as the scheduling source of truth with Postgres as an **optional mirror** — the
  sweep stops being able to fail on a dead DB, and a DB incident costs zero posts instead of a week.
  Builder-ready: lazy `PrismaClient`, tolerant append-only queue, same 48 h stale-skip / cap 1 / lock
  policy, 7 new tests including a forced DB-down publish, acceptance command that runs with no DB at
  all, `IG_QUEUE_ENABLED` flag for rollback, ~1.5–2 h, $0 in credits.
  **Verified while writing it:** `tools/instagram-image-host.ts` has **zero** Prisma references, so
  hosting already works with a dead DB — only *scheduling* was coupled. That is why the fix is two
  files, not a rewrite.
- Queue runway still intact (carousel topics 3–7, reel topics 3–6 unused) — a full week is buildable
  the moment the token answers.

### (g) 2026-11-23 — week 10: the coupling is gone, and the week is queued

Both blockers were re-checked once, in ~20 s, and neither moved: tenant `futxwjdirtywkkkxqxhd`
still answers `FATAL: (ENOTFOUND) tenant/user … not found` (the pooler host resolves; the *tenant*
is gone), token still `OAuthException 190 session has been invalidated`, `WorkBench/.env` mtime
still `Sep 1 10:08`. So this run spent nothing on diagnosis and finished the thing week 9 started.

**Shipped — the spec is now code.** `WorkBench` commits `1754e31` (pushed to `origin/master`,
`62f1e5b..1754e31`):

- `tools/instagram-queue-core.ts` (new, pure): `parseQueue` (tolerant — a malformed line becomes a
  `badLines` record, never a throw), `latestById`, `dueQueue`, `selectQueueBatch` mirroring
  `selectSweep`'s partition and cap-after-sort.
- `tools/instagram-publish-sweep.ts`: module-top `new PrismaClient()` **deleted**; lazy `getPrisma()`,
  `findMany` in try/catch that logs one `DB UNAVAILABLE (…) — publishing from file queue only.` line
  and carries on. Queue read first, DB nodes become `db:<id>` entries, dedupe by
  `(scheduled date | shape | caption hash)`, write-back ordered queue → `published.jsonl` → best-effort
  DB flip (`MIRROR-SKIPPED` never fails the run). `--source queue|db|both` added; cap 1, 48 h
  stale-skip, lock and `--yes` gate untouched.
- `.gitignore`: `data/ig-queue.jsonl` (runtime log, never committed).
- `tests/instagram-sweep.test.ts`: 7 new tests, incl. forced-DB-down publish and mirror failure.

**Verified by me, not by the builder's word:** `tests/instagram-sweep.test.ts` (18 checks) and
`tests/instagram-tools.test.ts` pass; `tsc --noEmit` unchanged from baseline (2 pre-existing
`tests/instagram-tools.test.ts` errors, untouched); and a real DB-down run against the **actual dead
tenant** printed `DB UNAVAILABLE (… FATAL: (ENOTFOUND) tenant/user postgres.futxwjdirtywkkkxqxhd not
found) — publishing from file queue only.` while still naming the due post, exit **0**.

**One thing the builder could not have known:** `profiles/zaino/scripts/cms-ig-publish-sweep.py` had
a DNS preflight that `sys.exit(1)`'d *before* invoking the sweep whenever the tenant didn't resolve —
written 2026-10-26 to stop a 3600 s stall. That would have made the new queue completely inert. It
now warns and continues; the stall risk it was guarding against is gone because the sweep catches the
Prisma failure itself. Tested: wrapper against the dead DB → exit 0, silent on a no-op.

**The week is queued (6 of 7 slots).** Drafting no longer needs Postgres, which was the whole point:

| Date | Slot | Asset | Queue id |
|---|---|---|---|
| Mon 11-30 | single — readiness sets target focus | `20261123-132056-dashboard.webp` | `20261130-1400-e5d2b5` |
| Tue 12-01 | single — per-joint load vs ceiling | `20261123-132112-film-detail.webp` | `20261201-1400-0732fa` |
| Wed 12-02 | single — volume corridor | `20261123-132127-joint-load.webp` | `20261202-1400-db189b` |
| Thu 12-03 | **reel — deliberately empty** (see below) | — | — |
| Fri 12-04 | single — joint load has a ceiling | `20261123-132142-filmroom1.png` | `20261204-1400-096306` |
| Sat 12-05 | single — film room keeps the week honest | `20261123-132158-film-room.webp` | `20261205-1400-8741cc` |
| Sun 12-06 | carousel — Foundation / Strength / Peak | `cms-carousel-20261206-01..06.png` | `20261206-1400-eb97a0` |

All 11 assets return **HTTP 200** from `www.cmstrength.fit`. Captions 186–245 chars, CTA + 2 hashtags
each. Carousel deck source committed at `cmstrength-marketing` `brand/carousel-templates/blocks-deck/`
(6 slides, 1080×1350, real screenshots, vision-checked slide by slide). Queue preview:

```
queue: file=6 db=0 due=0 eligible=0 stale-skipped=0 future=6 bad-lines=0
```

**The reel is deliberately not built, and that is a decision, not an omission.** It is the only slot
that spends money (~12.5 cr) and it is the only asset that is worthless if it goes stale before the
token returns. The moment a live token exists, the reel is a 15-minute job (Higgsfield balance 270).
Spending credits on a video with no publish path is the exact waste this pipeline has been guilty of
for ten weeks.

**Consequence:** if the token is restored before 2026-11-30, six posts publish on their own with no
further work from anybody. If it isn't, they pass 48 h and are stale-skipped — the queue cannot
mass-post a backlog. What the queue does *not* fix is the token: no amount of code substitutes for a
human regenerating it.



## Why those 20 never went out (verified from cron outputs, not guessed)

| Cause | Count | Evidence |
|---|---|---|
| Retired by the 120s one-shot grace window (host asleep at 14:00) | 15 | `cron/output/*/…`: `# Cron job removed before firing (run time outside grace window)` — 8/29, 9/1, 9/2, 9/4, 9/8, 9/11, 9/12, 9/14, 9/16, 9/17, 9/18, 9/19, 9/21, **9/22, 9/23** |
| Preflight-blocked on the dead Slack deliver target (agent never ran) | 3 | `BLOCKED (configuration)` — 9/10, 9/13, 9/15 |
| Ran, failed on the dead token | 1 | 9/20 carousel — Instagram API error, verbatim in `cron/output/1402c7201156/` |
| Vanished with no output file | 1 | 9/9 |

The two "still pending" jobs (9/22 node `2f295883`, 9/23 node `86faee8a`) were **not** pending for
long: both `cms-ig-publish-*` one-shots were retired by the grace window too. Verified 2026-09-28 —
`cron/jobs.json` contains **no** `cms-ig-publish-*` jobs at all (only a paused husk for 2026-09-09).
So by 2026-09-28 the pipeline could not have fired **even with a live token**: there was nothing
scheduled left to publish anything.

## FIXED 2026-09-28: recurring publish sweep replaces the one-shot model

Root cause of 15 of the 20 losses was the *scheduler*, not the API. Hermes retires a one-shot cron
the moment its grace window passes (`ONESHOT_GRACE_SECONDS = 120`), so a desktop asleep at 14:00
**deletes** the publish job rather than failing it.

Replaced with one recurring sweep:

- **`tools/instagram-publish-sweep.ts`** — publishes any `instagram` node whose `scheduledPublishAt`
  has passed and is still unpublished. Hard **stale-skip (48h default)**, **per-run cap of 1**,
  exclusive lock, and idempotent node flips (`isPublished`/`remoteId` guards). A node that fails is
  left `SCHEDULED` and retries while inside the window.
- **`tools/instagram-sweep-core.ts`** — pure selection/payload logic, unit tested.
- **`tests/instagram-sweep.test.ts`** — 11 behavioral checks, incl. an explicit
  *"a 20-post stale backlog publishes NOTHING"* regression test.
- **Cron job `cms-ig-publish-sweep` (`a17f43e9f9dc`)** — hourly, `no_agent` script
  `profiles/zaino/scripts/cms-ig-publish-sweep.py`, `deliver: local`. Silent on no-op runs; speaks
  (and exits non-zero) only when it published or failed.
- Commit `333eb4b` on `WorkBench` master, pushed.

**Verified 2026-09-28:** default policy → `eligible=0 stale-skipped=20` (the backlog can never be
mass-published); audit view (`--max-age-hours 0`) → the full 20 exposed without publishing. An
end-to-end probe node (unreachable asset URL, deleted afterwards) exercised the real path: token read
→ lock → Meta container call → `OAuthException 190` reported verbatim → node left `SCHEDULED`.
Force-run via `hermes cron run a17f43e9f9dc` + `hermes cron tick` → `succeeded`, silent.

## The host is not fine either — 10 days of nothing ran (observed 2026-10-24)

Between **2026-10-14 19:00** and **2026-10-24 18:40** the Hermes scheduler produced **no runs at all** in
this profile: last cron output file 10/14 19:00, no session records, every job's Oct 19 slot missed. The
whole fleet then fired in one catch-up burst at ~18:40 on 10/24 (`doctor`: *"last fire was catch-up after
missed fire (scheduled 2026-10-19T08:00, 5d 10h late)"*). Practical consequence: ten days in which
**every** watchdog on this box was dead too — a DB outage could start anywhere in that window and the
first anyone heard of it was this run.

That is also why the DB outage cannot be dated more precisely than "between 10/14 and 10/24": the sweep
is silent on no-op runs, so it wrote no evidence either.

Earlier, on 2026-10-11, the 13:57 sweep run **timed out after 3600s** (incident recorded, since resolved)
and the surrounding hourly fires clustered 18:29–22:25; this batch's 10/12 run fired 8h 59m late. So the
sleeping-desktop problem is long-standing and got worse.

Survivable *by design* when the host merely sleeps: the sweep runs hourly with a 48h acceptance window,
so a post whose 14:00 slot is missed still goes out when the machine wakes — late, never lost. The
retired one-shot model could not do that (it was **deleted** past its 120s grace window, which is how 15
of the 20 backlog posts died). But a 10-day gap exceeds the 48h window: had there been anything queued,
it would now be permanently stale-skipped.

## The other problem: nothing can reach Jeff

The `zaino` profile has **no messaging platform configured** — `profiles/zaino/config.yaml` only sets
`platforms: whatsapp: enabled: false`, and Slack lives on the `default` profile. Every cron job that
targets `slack:`, `whatsapp` or `all` reports *"the result was not delivered"* and goes nowhere.
`hermes cron doctor` on 2026-10-12 still reports delivery failures for the rank-collapse watchdog,
fire watchdog, backup watchdog and the GSC watchdog.

That is why a 35-day Instagram blackout ran unnoticed on a pipeline that has a watchdog.

## Backlog policy (recommended, not yet overridden by Jeff)

Skip anything stale >48h — which is now enforced in code, not by convention. Do **not** mass-post 20
old captions: two weeks of stale copy back-to-back reads as broken. The sweep will never publish any
of the 20 existing nodes. They should be reconciled (marked `ARCHIVED`) rather than posted.

## Resume — human steps, in this order

0. **NEW and first: find out what happened to the Supabase project.** Open the Supabase dashboard →
   project list for org of `futxwjdirtywkkkxqxhd`. Paused → **Restore**; gone → support restore inside
   the retention window (a deleted project's data is otherwise unrecoverable; nothing local substitutes).
   Until this is answered, **nothing else in WorkBench matters** — no queue, no captions, no watcher.
   Then: fresh `pg_dump` **and** put `DATABASE_URL` in a place a rebuild can find it (today the .env is
   gitignored and is the only copy). Paste-ready ticket text:

   > Project ref `futxwjdirtywkkkxqxhd` disappeared: its API hostname
   > `futxwjdirtywkkkxqxhd.supabase.co` now returns NXDOMAIN, and the pooler reports
   > `tenant/user postgres.futxwjdirtywkkkxqxhd not found`. The project held production data for an
   > app. If it was deleted, please restore it or tell me the retention window and what a restore
   > costs; if it was paused, please restore it. I need to know either way.
1. **Jeff, ~2 min:** Meta dashboard → CMS Social Manager app `879813191659439` → Instagram API setup
   → Generate access token → new `INSTAGRAM_ACCESS_TOKEN` in `C:/Umbrella/WorkBench/.env`
   (never paste it in chat — `credvault ::cred` flow).
2. Verify: `curl -s "https://graph.instagram.com/v21.0/me?fields=id,username&access_token=$TOKEN"`.
3. Archive the 20 stale nodes (they are permanently un-publishable by policy).
4. **Since 2026-11-23 you don't have to say anything.** The week 2026-11-30 → 12-06 is already in
   `WorkBench/data/ig-queue.jsonl` (6 of 7 slots; the reel waits for a live token, deliberately).
   Restore the token and the hourly sweep publishes each post at its 14:00 slot by itself. Saying
   **"re-run the IG batch"** now only matters to top up week 12-07 onwards, or to build the reel.
5. ~~Ship the file-backed queue spec~~ — **DONE 2026-11-23**, `WorkBench 1754e31` on
   `origin/master`. Publishing no longer reads Postgres before it reads a post. A dead database now
   costs **zero posts**, and a live database is only needed to get the ContentNode mirror back.
   Verified with the DB genuinely dead: sweep prints `DB UNAVAILABLE … publishing from file queue
   only`, names the due post, exits 0.
6. **Optional, only when you want the mirror:** restore/replace the Supabase project. Nothing on the
   publish path depends on it any more.
7. Still open (Jeff's call): **restore an alarm path** — enable Slack for this profile, or run a
   fleet-health digest from `default` that reads this profile's `hermes cron incidents`.
   Without it, the next outage is equally silent. ~~Keep the desktop awake~~ — **done 2026-10-26**:
   AC sleep/hibernate timers are now 0, so no more overnight scheduler blackholes.

## Run log

- **2026-11-23** — week 10. Blockers identical (tenant `ENOTFOUND`, token `OAuthException 190`, `.env` mtime `Sep 1 10:08`) so diagnosis cost 20 s and the rest of the run went into shipping **`1754e31`** — the file-backed queue is code now, and `instagram-publish-sweep.ts` publishes with no database at all (proved against the real dead tenant: `DB UNAVAILABLE … publishing from file queue only`, names the due post, exit 0). Found and fixed a second, self-inflicted blocker the builder couldn't see: the cron wrapper's dead-DB preflight `sys.exit(1)`'d *before* the sweep ran, which would have made the queue inert — it now warns and continues. **First week since 2026-09-07 with content written**: 6 of 7 slots for 11-30 → 12-06 are in `data/ig-queue.jsonl` (5 singles + the Foundation/Strength/Peak carousel), 11 assets live at 200, 0 Higgsfield credits spent, reel held until a token exists. Preview: `file=6 … future=6 bad-lines=0`. Run log for the human: still 17 published records; nothing has gone out in **77 days**.
- **2026-09-28** — found the one-shot publisher model already dead (15 grace-window retirements); built the recurring sweep. No content drafted (token dead).
- **2026-10-05** — week 3 dark. Token re-verified live and **still dead** (`OAuthException 190`); `WorkBench/.env` mtime `Sep 1 10:08` (nothing written since). 20 unpublished nodes, all 8/29–9/23; 48h stale-skip → sweep eligible=0, so nothing is publishable and nothing was published. Sweep healthy (hourly, last run 10/05 08:00 `ok`). `cms-ig-token-refresh` fired 10/01 and recorded the dead token verbatim — deliver `local`, so unseen. Target week 10/12–10/18: 0 nodes created (health gate: draft nothing while the token is dead). 0 Higgsfield credits spent. `hermes cron doctor` still lists fire-watchdog, backup watchdog and GSC watchdog as *not delivered* — no alarm wire.
- **2026-10-12** — week 4 dark. Token re-verified live and still dead (`OAuthException 190`, two endpoints); `.env` mtime still `Sep 1 10:08`, token not in the process env, `env.ts` has no Instagram reference (its Oct 7 edits are unrelated) — `.env` remains the only source. DB read live: 31 `instagram` nodes, **20 unpublished, all `SCHEDULED`, 8/29–9/23**, none dated ≥10/12; last publish 2026-09-07 (`Dc_tQYJFiEw`) = **35 days**. Target week 10/19–10/25 → 0 nodes (health gate: draft nothing while the token is dead). 0 Higgsfield credits spent. **New this week — the host sleeps:** sweep 10/11 13:57 timed out at 3600s (resolved), hourly fires gapped ~13:00–18:29, and this batch fired 17:00 (8h 59m late, catch-up). The sweep's hourly cadence + 48h window absorbs that (late, never lost); the one-shot model could not.
- **2026-10-24** — **week 5 dark, and a new, bigger failure: the database is unreachable.** This run was itself a catch-up (scheduled Mon 10/19 08:00, fired Sat 10/24 18:41 — 5d 10h late; the scheduler ran nothing at all between 10/14 19:00 and 10/24 18:40). Health gate step 1 (token) still fails: `OAuthException 190` on both `graph.instagram.com/me` and `graph.facebook.com/me`, `token_len=163`, prefix `IGAA`, `.env` mtime still `Sep 1 10:08`. **Gate step 2 failed harder: `prisma contentNode` → `FATAL: (ENOTFOUND) tenant/user postgres.futxwjdirtywkkkxqxhd not found`**, and `futxwjdirtywkkkxqxhd.supabase.co` is **NXDOMAIN** on the local resolver *and* Google DoH — i.e. the project is gone from DNS, not paused. Consequence: queue unreadable, nodes uncreatable, watchdog (`instagram-verify.ts`) erroring on every fire. Last publish still **2026-09-07** (`Dc_tQYJFiEw`) = **47 days** (confirmed from `data/instagram-published.jsonl`, 17 records). 0 posts drafted, 0 nodes, 0 Higgsfield credits. `www.cmstrength.fit` still 200. Both `cms-ig-publish-sweep` and `cms-ig-fire-watchdog` now exit 1 with the DB error (new incidents recorded 10/24).
- **2026-10-26** — week 6 dark, **49 days**. Regular Monday fire, on time (09:03) — no catch-up this time. Health gate fails at step 0 → **0 posts drafted, 0 nodes, 0 Higgsfield credits**. DB: same `FATAL: (ENOTFOUND) tenant/user postgres.futxwjdirtywkkkxqxhd not found`; tenant host **NXDOMAIN** on the local resolver *and* Google DoH (Status 3), so the project is deleted, not paused — only Jeff can act. Token: `OAuthException 190`, `token_len=163`, `.env` mtime still `Sep 1 10:08`. **Scheduler is alive again:** the sweep fired 15× on 10/25 and hourly output files exist — but the overnight gap 10/25 22:00 → 10/26 09:03 exposed the real cause, an **AC standby timer of 900s + hibernate 10800s**. Fixed both to 0 (never sleep on AC) via `powercfg`; battery profile untouched. Also made the sweep wrapper fast-fail on a dead tenant ref (0.15s, named fix) instead of a 2.6s Prisma crash and the occasional 3600s stall. Resume order unchanged; alarm wire still absent (6 weeks).
- **2026-11-09** — week 8 dark, **63 days** (last publish 2026-09-07 `Dc_tQYJFiEw`; `instagram-published.jsonl` still 17 records, untouched since Sep 7 14:02). Health gate step 0 fails identically: probe `TENANT DEAD … NXDOMAIN`, token `OAuthException 190 Cannot parse access token` (`len=163`, `.env` mtime `Sep 1 10:08`). **0 nodes, 0 drafts, 0 Higgsfield credits, no publish crons scheduled** — drafting into a dead DB is not a shortcut, it is data loss with extra steps. This run itself was 1h 01m late: the box slept 11/08 20:10 → 11/09 09:01 and woke on an HP-printer timer task (Power-Troubleshooter evidence); weekdays 11/02–11/07 had **no** overnight gaps, and every publish slot is 14:00, so delivery is untouched. `cms-ig-fire-watchdog` errors 1 on the same ENOTFOUND — correct, but its report goes nowhere. Alarm wire missing for the 8th week. See section (e).
- **2026-11-16** — week 9 dark, **70 days** (last publish 2026-09-07 `Dc_tQYJFiEw`; `instagram-published.jsonl` still 17 records, untouched since Sep 7 14:02). Health gate step 0 fails identically: probe `TENANT DEAD … does not resolve` (exit 1), token `OAuthException 190 session has been invalidated` (`len=163`), `.env` mtime still `Sep 1 10:08` → **0 nodes, 0 drafts, 0 Higgsfield credits, 0 publish crons**. Fired 08:02 (2 min late) after one overnight sleep pair 11/15 23:41 → 11/16 08:01, no lid/power-button events; publish slots (14:00) untouched. Per the commitment made in week 8, this run **stopped re-proving the outage and spent itself on the structural fix**: wrote and committed the builder-ready decoupling spec `WorkBench/docs/specs/ig-file-backed-queue.md` (`62f1e5b`) — `data/ig-queue.jsonl` becomes the scheduling source of truth, Postgres an optional mirror, so a dead DB can no longer stop a post; ~1.5–2 h, $0 credits, 7 tests incl. forced DB-down publish. Verified in passing that `instagram-image-host.ts` has no Prisma dependency, so only scheduling was coupled. Sweep + fire watchdog still erroring correctly with no alarm wire (17 incidents, 0 delivered — 9th week). See section (f).
