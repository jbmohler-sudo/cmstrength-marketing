# CMS Instagram pipeline — STATUS

> Human-readable state of the @centermassstrength auto-publish line.
> Machine copy of the resume plan: `hermes cron notepad 287b41662faa get ig_pipeline_state`.
> Procedure + failure modes: skill `cms-instagram-auto` (health gate section).
> **Last updated: 2026-10-24 by the `cms-ig-weekly-batch` run.**

## State: DOWN — two blockers. (a) **WorkBench database is unreachable — the Supabase project no longer exists in DNS** (new, 2026-10-24) and (b) Instagram token still invalidated (47 days, no posts since 2026-09-07)

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

- **Last post that actually published:** 2026-09-07 — https://www.instagram.com/p/Dc_tQYJFiEw/ (**47 days** as of 2026-10-24; confirmed from the local `data/instagram-published.jsonl`, since the DB can no longer be read)
- **Unpublished `instagram` ContentNodes: 20** (2026-08-29 → 2026-09-23), all still `SCHEDULED` — *last known 2026-10-12; the DB has been unreadable since some point between 2026-10-14 and 2026-10-24.*
- Only 11 of 31 Instagram nodes have ever published (counts re-read from the DB 2026-10-12).
- **Weeks with no content drafted at all:** 2026-09-28 → 2026-10-24 (health gate stopped the line;
  nothing can publish, so nothing was built and no Higgsfield credits were spent).

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
   gitignored and is the only copy).
1. **Jeff, ~2 min:** Meta dashboard → CMS Social Manager app `879813191659439` → Instagram API setup
   → Generate access token → new `INSTAGRAM_ACCESS_TOKEN` in `C:/Umbrella/WorkBench/.env`
   (never paste it in chat — `credvault ::cred` flow).
2. Verify: `curl -s "https://graph.instagram.com/v21.0/me?fields=id,username&access_token=$TOKEN"`.
3. Archive the 20 stale nodes (they are permanently un-publishable by policy).
4. Say **"re-run the IG batch"** → zaino rebuilds one week (5 singles + carousel + reel) and the
   sweep publishes each post at its slot. No publish crons to schedule any more.
5. Still open (Jeff's call): **restore an alarm path** — enable Slack for this profile, or run a
   fleet-health digest from `default` that reads this profile's `hermes cron incidents`.
   Without it, the next outage is equally silent. A more basic mitigation is also available: keep the
   desktop awake (a 10-day scheduler gap on 10/14–10/24 is what turned a token problem into a
   total-coverage blackout).

## Run log

- **2026-09-28** — found the one-shot publisher model already dead (15 grace-window retirements); built the recurring sweep. No content drafted (token dead).
- **2026-10-05** — week 3 dark. Token re-verified live and **still dead** (`OAuthException 190`); `WorkBench/.env` mtime `Sep 1 10:08` (nothing written since). 20 unpublished nodes, all 8/29–9/23; 48h stale-skip → sweep eligible=0, so nothing is publishable and nothing was published. Sweep healthy (hourly, last run 10/05 08:00 `ok`). `cms-ig-token-refresh` fired 10/01 and recorded the dead token verbatim — deliver `local`, so unseen. Target week 10/12–10/18: 0 nodes created (health gate: draft nothing while the token is dead). 0 Higgsfield credits spent. `hermes cron doctor` still lists fire-watchdog, backup watchdog and GSC watchdog as *not delivered* — no alarm wire.
- **2026-10-24** — **week 5 dark, and a new, bigger failure: the database is unreachable.** This run was itself a catch-up (scheduled Mon 10/19 08:00, fired Sat 10/24 18:41 — 5d 10h late; the scheduler ran nothing at all between 10/14 19:00 and 10/24 18:40). Health gate step 1 (token) still fails: `OAuthException 190` on both `graph.instagram.com/me` and `graph.facebook.com/me`, `token_len=163`, prefix `IGAA`, `.env` mtime still `Sep 1 10:08`. **Gate step 2 failed harder: `prisma contentNode` → `FATAL: (ENOTFOUND) tenant/user postgres.futxwjdirtywkkkxqxhd not found`**, and `futxwjdirtywkkkxqxhd.supabase.co` is **NXDOMAIN** on the local resolver *and* Google DoH — i.e. the project is gone from DNS, not paused. Consequence: queue unreadable, nodes uncreatable, watchdog (`instagram-verify.ts`) erroring on every fire. Last publish still **2026-09-07** (`Dc_tQYJFiEw`) = **47 days** (confirmed from `data/instagram-published.jsonl`, 17 records). 0 posts drafted, 0 nodes, 0 Higgsfield credits. `www.cmstrength.fit` still 200. Both `cms-ig-publish-sweep` and `cms-ig-fire-watchdog` now exit 1 with the DB error (new incidents recorded 10/24).
- **2026-10-12** — week 4 dark. Token re-verified live and still dead (`OAuthException 190`, two endpoints); `.env` mtime still `Sep 1 10:08`, token not in the process env, `env.ts` has no Instagram reference (its Oct 7 edits are unrelated) — `.env` remains the only source. DB read live: 31 `instagram` nodes, **20 unpublished, all `SCHEDULED`, 8/29–9/23**, none dated ≥10/12; last publish 2026-09-07 (`Dc_tQYJFiEw`) = **35 days**. Target week 10/19–10/25 → 0 nodes (health gate: draft nothing while the token is dead). 0 Higgsfield credits spent. **New this week — the host sleeps:** sweep 10/11 13:57 timed out at 3600s (resolved), hourly fires gapped ~13:00–18:29, and this batch fired 17:00 (8h 59m late, catch-up). The sweep's hourly cadence + 48h window absorbs that (late, never lost); the one-shot model could not.
