# CMS Instagram pipeline — STATUS

> Human-readable state of the @centermassstrength auto-publish line.
> Machine copy of the resume plan: `hermes cron notepad 287b41662faa get ig_pipeline_state`.
> Procedure + failure modes: skill `cms-instagram-auto` (health gate section).
> **Last updated: 2026-09-21 by the `cms-ig-weekly-batch` run.**

## State: DOWN — Instagram token invalidated

`graph.instagram.com/v21.0/me` returns
`OAuthException code 190 — "The session has been invalidated because the user changed their password
or Facebook has changed the session for security reasons."`
Verified live 2026-09-21. `tools/instagram-token-refresh.ts` fails identically, so the monthly
`cms-ig-token-refresh` cron cannot self-heal it.

- **Last post that actually published:** 2026-09-07 — https://www.instagram.com/p/Dc_tQYJFiEw/
- **Unpublished `instagram` ContentNodes: 20** (2026-08-29 → 2026-09-23), all still `SCHEDULED`.
- Only 11 of 31 Instagram nodes have ever published.

## Why those 20 never went out (verified from cron outputs, not guessed)

| Cause | Count | Evidence |
|---|---|---|
| Retired by the 120s one-shot grace window (host asleep at 14:00) | 13 | `cron/output/*/…`: `# Cron job removed before firing (run time outside grace window)` — 8/29, 9/1, 9/2, 9/4, 9/8, 9/11, 9/12, 9/14, 9/16, 9/17, 9/18, 9/19, 9/21 |
| Preflight-blocked on the dead Slack deliver target (agent never ran) | 3 | `BLOCKED (configuration)` — 9/10, 9/13, 9/15 |
| Ran, failed on the dead token | 1 | 9/20 carousel — Instagram API error, verbatim in `cron/output/1402c7201156/` |
| Vanished with no output file | 1 | 9/9 |
| Still pending (will fire and fail the same way) | 2 | `cms-ig-publish-2026-09-22` (node `2f295883`), `2026-09-23` (node `86faee8a`) — both assets verified HTTP 200 |

## The real problem underneath: nothing can reach Jeff

The `zaino` profile has **no messaging platform configured** — `profiles/zaino/config.yaml` only sets
`platforms: whatsapp: enabled: false`, and Slack lives on the `default` profile. So every cron job
that targets `slack:`, `whatsapp` or `all` reports *"the result was not delivered"* and goes nowhere.
`hermes cron doctor` currently reports **13 delivery/health issues across 6 jobs**, including the
IG fire-watchdog (5 straight failures on `IG media list failed: HTTP 400`).

That is why a 14-day Instagram blackout ran unnoticed on a pipeline that has a watchdog.

## 2026-09-28 → 2026-10-04 week: deliberately NOT drafted

The weekly batch health gate stopped the line: with a dead token and a dead alarm, drafting 7 more
posts + spending ~13 Higgsfield credits would add unshippable inventory to a 20-node backlog and
hide the outage. No nodes, no publish crons, no credits spent. Topic queue untouched (carousel #3,
reel #3 still open).

**Resume, in order:**
1. **Jeff, ~2 min:** Meta dashboard → CMS Social Manager app `879813191659439` → Instagram API setup
   → Generate access token → new `INSTAGRAM_ACCESS_TOKEN` in `C:/Umbrella/WorkBench/.env`
   (never paste it in chat — `credvault ::cred` flow).
2. Verify: `curl -s "https://graph.instagram.com/v21.0/me?fields=id,username&access_token=$TOKEN"`.
3. Re-run `cms-ig-weekly-batch`; it builds 5 singles + carousel + reel for 2026-09-28→10-04 and
   schedules the publish crons.
4. Backlog policy (Jeff's call): **skip** anything stale >48h rather than posting 20 old captions;
   reconcile the DB against live media.
5. Durable fix for the root fragility: replace the one-shot publish crons with one recurring sweep
   (publishes any node past its `scheduledPublishAt` that is still unpublished, stale-skip + per-run
   cap) — a sleeping desktop can no longer silently delete a post.
6. Restore an alarm path: enable Slack for this profile, or run a fleet-health digest from the
   `default` profile that reads this profile's `hermes cron incidents`.
