# Tranche 1 QA Package — 2026-09 Cluster (for Jeff's approval)

Date: 2026-08-28 | QA owner: zaino | Voice: CMS brand voice (locked, 1,899 chars in Site.brandVoice)

## Verdict: 5/5 PASS (2 factual fixes applied)

| # | Post | Words | Voice | Citations | Image | Verdict |
|---|---|---|---|---|---|---|
| 1 | how-to-powerlift-after-40 (PILLAR) | 2,949 | ✅ | ✅ 9 refs | ✅ verified on-brand | **APPROVE** |
| 2 | is-powerlifting-after-40-safe | 2,013 | ✅ | ✅ 11 refs | ✅ | **APPROVE** |
| 3 | how-often-should-you-lift-heavy-after-40 | 1,998 | ✅ | ✅ 5 refs | ✅ | **APPROVE** (add metadata) |
| 4 | strength-training-expectations-after-40 | 1,979 | ✅ | ✅ 8 refs, **2 fixed** | ✅ | **APPROVE** (add metadata) |
| 5 | can-women-compete-in-powerlifting-at-40 | 2,114 | ✅ | ✅ 8 refs | ✅ | **APPROVE** |

## Citation audit (5 spot-checked against live sources — all real)

- **Latella 2024, Sports Med** — 46,066 entries / 9,259 IPF lifters, 7.5–12.5% yr-1, ~20% at 10 yr. ✅ "Women gain faster" claim verified in full text (percentage-of-baseline trajectory). ✅
- **Aasa 2017, BJSM** — "1.0–4.4 injuries/1,000 training hours" matches abstract exactly. ✅
- **Wilf & Dunsky 2025, Kinesiology** — women's post numbers (bench +0.27%/yr, squat −0.11%, relative −0.06%, age explains 0.4–15.6%) match the abstract exactly. ✅
- **Tøien 2025, J Cachexia Sarcopenia Muscle** — heavy 80–84% / very heavy ≥85% of 1RM matches. ✅
- **Zhou 2025, Front Public Health** — real meta-analysis on older women with sarcopenia. ✅
- **Pillar image** — vision-checked: dark industrial deadlift shot, chalk, concrete, no mangled text. ✅

### Fixed in expectations post (before approval — factual accuracy, no judgment call)
1. "Age explained 5–16%" → **0.4–15.6%** (matches the paper; women's post already had it right)
2. "0.2–0.35%/yr trained decline" (unattributed) → **~0.06–0.35%/yr, cited (Wilf & Dunsky, 2025)** — in myth table + FAQ

## Metadata to apply on approval

| Post | Proposed title tag | Meta description |
|---|---|---|
| how-often-should-you-lift-heavy-after-40 | How Often Should You Lift Heavy After 40? (The Real Answer) \| Center Mass Strength | Heavy isn't the enemy after 40 — guessing when to do it is. How often heavy needs to show up, what recovery actually takes, and the split that makes it work. |
| strength-training-expectations-after-40 | Strength Training Expectations After 40: What Declines (and What Doesn't) \| Center Mass Strength | The honest, evidence-based picture: what actually declines after 40, what does not, realistic progress vs your 20s, and how to measure strength beyond the bar. |
| how-to-powerlift-after-40 | How to Powerlift After 40: The Complete Guide (Training, Recovery, First Meet) \| Center Mass Strength | *(add brand suffix to existing header)* |

## Silo architecture (decision needed)

**Recommendation: new silo "The After-40 Track"** — how-to-powerlift-after-40 as pillar; the other 4 (plus tranche 2's 6) as spokes. Change is-powerlifting-after-40-safe's category from "The Masters Track" to "The After-40 Track."

Existing silos stay: Masters Track (50+ readiness), Programming & Periodization, Fueling the Work.
Link pattern already in the drafts: 2–4 in-body links to existing silos + app CTA; KEEP READING 2-card grid should pair pillar ↔ spokes.

## Notes

- **Length**: supporting posts run ~2,000 words vs the 1,300–1,800 brief target; pillar 2,949 vs 2,800. Quality is high and spokes sit at ~2/3 of pillar (no cannibalization red flag). Recommend accept as-is; trim opportunistically at HTML build.
- **Cleanup**: stray `.png` originals (2 files) — remove when packaging.
- **Still open from earlier**: Meet-Day Checklist (stuck in WRITING, has your image prompt), Powerlifting Total Calculator (due 8/24), Readiness Scorecard (due 8/31).
