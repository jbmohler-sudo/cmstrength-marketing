# CMS Content Backlog → Four-Silo Assignment

**Owner:** Jeff · **Prepared by:** research agent · **Date:** 2026-08-16
**Status:** DECISION-READY · requires Jeff review before Content bot production.
**Working taxonomy (LOCKED):** The Masters Track · Programming & Periodization ·
Fueling the Work · Meet Prep & The Big Three. Taxonomy = silo = architecture (no
separate conceptual layer). See `docs/silo-architecture.md`.

> This doc assigns **EVERY topic from Jeff's original proposed backlog** to exactly one
> of the four silos, and flags topics that should be merged, retitled, or rejected. It is
> the canonical mapping the Content bot works from. Keyword data remains a pre-title
> verification step, not a blocker.

---

## Word-count verification of existing pillar-designated articles

Direct `sed`-stripped word counts from the live files (`public/blog/`, 2026-08-16):

| Silo | Pillar-designated article | Word count | 2,000+? | Verdict |
|---|---|---|---|---|
| S1 Masters | `powerlifting-over-50-readiness` | **2,052** | ✅ YES | Qualifies as-is. No expansion needed. |
| S2 Programming | `macrocycle-explained` | **1,135** | ❌ NO | Must expand to 2,000+ (the S2 cornerstone work). |
| S3 Fueling | `nutrition-is-a-skill` | **1,538** | ❌ NO | Must expand to 2,000+ (the S3 cornerstone work). |
| S4 Meet Prep | *none exists* | — | ❌ NO | New 2,000+ cornerstone to write. |

**So only ONE of the four pillar-designated articles actually clears 2,000 words today.**
`powerlifting-over-50-readiness` (S1) qualifies; `macrocycle-explained` (S2) and
`nutrition-is-a-skill` (S3) are each 400–850 words short and must be expanded; S4 has no
pillar yet. This confirms the three-way priority: **write S2 cornerstone, write S4
cornerstone, expand S3 cornerstone** — S1 needs no word-count work (only link-audit).

*(For context: `heavy-lifting-after-50`=2,820 and `joint-load-management-mrjv`=2,076 also
clear 2,000+, but both are S1 SPOKES, not pillars.)*

---

## Master backlog → silo assignment (every topic, exactly one silo)

Legend: **→** = assigned silo · **[MERGE]** = fold into an existing/adjacent piece ·
**[RETITLE]** = rename to remove overlap or sharpen intent · **[REJECT]** = drop (covered,
off-strategy, or duplicate). Cross-link notes where a topic touches another silo.

### SILO 1 — The Masters Track (audience: 40+/50+ recovery · readiness · longevity)

| # | Backlog topic | Disposition | Notes / cross-link |
|---|---|---|---|
| 1 | **Best Program for Lifters Over 40** | **→ S1** (new spoke) | High-intent. Distinct from S2's `program-comparison` (track-vs-track) by audience framing. Keep separate. |
| 2 | Recovery after 50 | **[MERGE]** into `heavy-lifting-after-50` | Already covered (that post = recovery phases between sessions for older lifters). No new article. |
| 3 | Recovery variability after 40 | **→ S1** (new spoke) | Complements the readiness story; cross-links to Readiness Scores (S2) + readiness engine. |
| 4 | Return after a layoff | **→ S1** (new spoke) | Strong masters intent; ties to readiness ramp + submaximal (S2). |
| 5 | Joint pain vs soreness vs fatigue | **[MERGE]** into `joint-load-management-mrjv` | That post already frames joints as the limit + CLM/MRJV. Extend rather than duplicate. Cross-link CLM. |
| 6 | Masters bench frequency | **→ S1** (new spoke) | Audience-specific frequency. Cross-links to Bench Specialization (S4). |
| 7 | Longevity (lifting for life) | **→ S1** (new spoke) | Brand/category content; cross-links to readiness + joint-load. |
| 8 | High/low stress days | **→ S2** [MERGE into Readiness Scores] | It's a readiness/autoregulation concept, not audience-specific. Fold into S2 Readiness Scores. |
| 9 | Trends vs single bad workouts | **→ S2** [MERGE into Readiness Scores] | Readiness data-interpretation. Same home as #8. |
| 10 | Readiness Scores | **→ S2** (flagship spoke) | The readiness *engine* topic. See S2. Cross-links to S1 (masters recovery). |

### SILO 2 — Programming & Periodization (method: how the programming works)

| # | Backlog topic | Disposition | Notes / cross-link |
|---|---|---|---|
| 11 | **Adaptive Powerlifting Programming** | **→ S2** [RETITLE → fold into cornerstone framing] | This is the *differentiation thesis*, not a standalone article — fold the "adaptive" framing into the S2 cornerstone intro + as the flagship spoke "How Adaptive Programming Works." Avoids a competing head-term article. |
| 12 | **Autoregulation** | **→ S2** (spoke) | Core method. |
| 13 | RPE for Powerlifting | **→ S2** (spoke) | Method. Cross-links to S4 attempt selection (meet day). |
| 14 | Training Max vs 1RM vs e1RM | **→ S2** (spoke) | Method; high fidelity to the actual engine (Epley e1RM fraction). |
| 15 | Bad-Day Workout Adjustments | **→ S2** (spoke) | In-session autoregulation. |
| 16 | Deload vs One-Day Adjustment | **→ S2** (spoke) | Recovery management. Distinct from #15 (bad-day = in-session; deload = weekly); keep separate, cross-link. |
| 17 | Percentages needing autoregulation | **[MERGE]** into Autoregulation (#12) | Same concept. No standalone. |
| 18 | Missed rep | **[MERGE]** into Bad-Day Workout Adjustments (#15) | In-session handling. Fold in. |
| 19 | Variation strength | **→ S2** (spoke) | Variation max engine tie. |
| 20 | Exercise swaps | **→ S2** (spoke) | Method. Cross-links to S1 CLM joint rotation. |
| 21 | Block length | **→ S2** (spoke) | Block-periodization method. |
| 22 | Hypertrophy / strength / peak / taper (block structure) | **→ S2** [SPLIT] | Hypertrophy + strength blocks → S2 (block structure). **Peak + taper → S4** (meet event). Split across the cornerstones' outlines. |
| 23 | **Build Program Backward From Meet Date** | **→ S2** [fold into S2 cornerstone thesis] | This *is* the S2 cornerstone's core argument (macrocycle-explained expanded). Not a separate spoke. |
| 24 | Exercise Selection by Weak Point | **→ S4** | Lift-specific (off-the-chest, lockout, out-of-hole) → belongs under the Big Three. Reassigned from S2. |

### SILO 3 — Fueling the Work (nutrition-for-strength · authority-cited)

| # | Backlog topic | Disposition | Notes / cross-link |
|---|---|---|---|
| 25 | Carbs for powerlifting | **→ S3** (new spoke) | Cross-links to S4 meet-week fueling. |
| 26 | Protein for masters | **→ S3** (new spoke) | Cross-links to S1. |

### SILO 4 — Meet Prep & The Big Three (event + the three lifts)

| # | Backlog topic | Disposition | Notes / cross-link |
|---|---|---|---|
| 27 | Taper guide | **→ S4** (spoke) | The meet taper. Cross-links S3 meet-week fueling. |
| 28 | Peak without maxing | **→ S4** (spoke) | Peaking. |
| 29 | Peak / taper portion of #22 | **→ S4** [from S2 split] | Fold into S4 cornerstone + taper spoke. |
| 30 | Squat programming | **→ S4** (new spoke) | From silo-architecture. |
| 31 | Bench specialization | **→ S4** (new spoke) | Ties to Bench Specialization track; cross-links S1 masters-bench-frequency. |
| 32 | Deadlift programming | **→ S4** (new spoke) | |
| 33 | Stalled bench diagnosis | **→ S4** [RETITLE → fold into Bench spoke #31] | Bench weak-point diagnosis is part of the Bench Specialization spoke, not separate. |
| 34 | Deadlift fatigue | **→ S4** [RETITLE → fold into Deadlift spoke #32] | Fold into deadlift programming. |
| 35 | Exercise Selection by Weak Point (#24) | **→ S4** | As above. |

---

## Rejected / merged / retitled summary (quick scan)

- **[REJECT / MERGE]** Recovery after 50 → already `heavy-lifting-after-50`. No new article.
- **[REJECT / MERGE]** Joint pain vs soreness vs fatigue → already `joint-load-management-mrjv`.
- **[MERGE]** Percentages needing autoregulation → Autoregulation.
- **[MERGE]** Missed rep → Bad-Day Workout Adjustments.
- **[MERGE]** High/low stress days + Trends vs single bad workouts → Readiness Scores.
- **[MERGE]** Recovery after 50 → Heavy Lifting After 50.
- **[RETITLE]** Adaptive Powerlifting Programming → fold "adaptive" framing into S2 cornerstone + flagship spoke.
- **[RETITLE]** Build Program Backward From Meet Date → S2 cornerstone thesis (not standalone).
- **[RETITLE]** Stalled bench diagnosis → Bench Specialization spoke (S4).
- **[RETITLE]** Deadlift fatigue → Deadlift programming spoke (S4).
- **[SPLIT]** Hypertrophy/strength/peak/taper → hypertrophy+strength in S2; peak+taper in S4.

**Result:** 35 backlog line-items → **exactly one silo each** after 11 merges/retitles and
2 splits. No topic is rejected outright (all find a home once merged). The real new-content
work is concentrated in S4 (the gap) and the S2/S3 cornerstone expansions.

---

## Decision-ready counts per silo (post-merge)

| Silo | Pillar (2,000+) | Spokes live | New spokes to write |
|---|---|---|---|
| S1 Masters | `powerlifting-over-50-readiness` (2,052 ✅) | 2 (heavy-lifting, joint-load) | 4 (best-prog-over-40, recovery-variability, return-after-layoff, longevity, masters-bench-freq) |
| S2 Programming | `macrocycle-explained` → expand to "Complete Guide to Powerlifting Periodization" | 3 (submaximal, program-comparison, sled-drags) | flagship "adaptive" spoke + autoregulation, RPE, training-max, bad-day, deload, readiness-scores, variation, exercise-swaps, block-length |
| S3 Fueling | `nutrition-is-a-skill` → expand to 2,000+ | 0 beyond pillar | protein-for-masters, carbs-for-powerlifting, + architecture's calories/bodyweight, meet-week-fueling |
| S4 Meet Prep | **NEW** "Complete Guide to Powerlifting Meet Prep" | 0 | pillar + squat/bench/deadlift programming, taper, peak-without-maxing |

Cadence recommendation stands: 1 cornerstone + 1–2 spokes per 2-week sprint, S2 first, S4
second, S3 expansion third, S1 spokes last (S1 is already the deepest silo).
