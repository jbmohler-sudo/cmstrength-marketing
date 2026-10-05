# CMS Instagram pipeline — STATUS

> Human-readable state of the @centermassstrength auto-publish line.
> Machine copy of the resume plan: `hermes cron notepad 287b41662faa get ig_pipeline_state`.
> Procedure + failure modes: skill `cms-instagram-auto` (health gate section).
> **Last updated: 2026-09-28 by the `cms-ig-weekly-batch` run.**

## State: DOWN — Instagram token invalidated (21 days, no posts since 2026-09-07)

`graph.instagram.com/v21.0/me` returns
`OAuthException code 190 — "The session has been invalidated because the user changed their password
or Facebook has changed the session for security reasons."`
Re-verified live **2026-09-28**. `C:/Umbrella/WorkBench/.env` has not been modified since
2026-09-01, so no new token has been written. `tools/instagram-token-refresh.ts` fails identically:
the monthly `cms-ig-token-refresh` cron cannot self-heal this.

- **Last post that actually published:** 2026-09-07 — https://www.instagram.com/p/Dc_tQYJFiEw/
- **Unpublished `instagram` ContentNodes: 20** (2026-08-29 → 2026-09-23), all still `SCHEDULED`.
- Only 11 of 31 Instagram nodes have ever published.
- **Weeks with no content drafted at all:** 2026-09-28 → 2026-10-04 (health gate stopped the line;
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

## The other problem: nothing can reach Jeff

The `zaino` profile has **no messaging platform configured** — `profiles/zaino/config.yaml` only sets
`platforms: whatsapp: enabled: false`, and Slack lives on the `default` profile. Every cron job that
targets `slack:`, `whatsapp` or `all` reports *"the result was not delivered"* and goes nowhere.
`hermes cron doctor` on 2026-09-28 still reports delivery failures for the rank-collapse watchdog,
fire watchdog, backup watchdog and others.

That is why a 21-day Instagram blackout ran unnoticed on a pipeline that has a watchdog.

## Backlog policy (recommended, not yet overridden by Jeff)

Skip anything stale >48h — which is now enforced in code, not by convention. Do **not** mass-post 20
old captions: two weeks of stale copy back-to-back reads as broken. The sweep will never publish any
of the 20 existing nodes. They should be reconciled (marked `ARCHIVED`) rather than posted.

## Resume — only one human step is left

1. **Jeff, ~2 min:** Meta dashboard → CMS Social Manager app `879813191659439` → Instagram API setup
   → Generate access token → new `INSTAGRAM_ACCESS_TOKEN` in `C:/Umbrella/WorkBench/.env`
   (never paste it in chat — `credvault ::cred` flow).
2. Verify: `curl -s "https://graph.instagram.com/v21.0/me?fields=id,username&access_token=$TOKEN"`.
3. Archive the 20 stale nodes (they are permanently un-publishable by policy).
4. Say **"re-run the IG batch"** → zaino rebuilds one week (5 singles + carousel + reel) and the
   sweep publishes each post at its slot. No publish crons to schedule any more.
5. Still open (Jeff's call): **restore an alarm path** — enable Slack for this profile, or run a
   fleet-health digest from `default` that reads this profile's `hermes cron incidents`.
   Without it, the next outage is equally silent.

## Run log

- **2026-09-28** — found the one-shot publisher model already dead (15 grace-window retirements); built the recurring sweep. No content drafted (token dead).
- **2026-10-05** — week 3 dark. Token re-verified live and **still dead** (`OAuthException 190`); `WorkBench/.env` mtime `Sep 1 10:08` (nothing written since). 20 unpublished nodes, all 8/29–9/23; 48h stale-skip → sweep eligible=0, so nothing is publishable and nothing was published. Sweep healthy (hourly, last run 10/05 08:00 `ok`). `cms-ig-token-refresh` fired 10/01 and recorded the dead token verbatim — deliver `local`, so unseen. Target week 10/12–10/18: 0 nodes created (health gate: draft nothing while the token is dead). 0 Higgsfield credits spent. `hermes cron doctor` still lists fire-watchdog, backup watchdog and GSC watchdog as *not delivered* — no alarm wire.
