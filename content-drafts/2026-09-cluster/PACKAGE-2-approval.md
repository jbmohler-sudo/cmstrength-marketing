# Tranche 2 QA Package — 2026-09 Cluster + Tool Pages (for Jeff's approval)

Date: 2026-08-28 | QA owner: zaino | Voice: CMS brand voice (locked)

## Verdict: 6/6 posts PASS · 3/3 tool pages PASS

| # | Post / Page | Words (body) | Em-dashes | Images | Verdict |
|---|---|---|---|---|---|
| 1 | menopause-and-powerlifting | 1,631 | 0 | ✅ | **APPROVE** |
| 2 | nutrition-for-female-powerlifters-over-40 | 1,696 | 0 | ✅ | **APPROVE** |
| 3 | nutrition-for-powerlifters-after-40 | 1,434 | 0 | ✅ | **APPROVE** |
| 4 | low-bar-squat-with-stiff-shoulders | 1,683 | 0 | ✅ | **APPROVE** |
| 5 | powerlifting-form-for-older-lifters | 1,770 (full, excl. refs) | 1 | ✅ | **APPROVE** |
| 6 | stop-lifting-at-first-sign-of-discomfort-after-40 | 1,658 | 0 | ✅ | **APPROVE** |
| 7 | meet-day-checklist.html (tool) | — | — | ⚠️ see graphic note | **APPROVE** (links fixed) |
| 8 | total-calculator.html (tool) | — | — | — | **APPROVE** (6/6 tests pass) |
| 9 | readiness-scorecard.html (tool) | — | — | — | **APPROVE** (13/13 tests pass) |

## Citation audit (live-verified this session)

- **Sowers 2007** (menopause): JCEM 92(3):895–901 — SWAN numbers (fat +3.4 kg, muscle −0.23 kg, waist +5.7 cm) match abstract exactly ✅
- **Moore 2015** (both nutrition posts): J Gerontol A 70(1):57–62, DOI glu103 — confirmed as the version of record (0.24 vs 0.40 g/kg per meal figures correct) ✅
- **Chilibeck 2017** (nutrition general): OAJSM 8:213–226 — creatine meta, 22 studies/721 lifters ✅
- Distinct creatine sources used across the two nutrition posts (Devries 2014 vs Chilibeck 2017) — no self-duplication.
- Tranche-1 audit (5 sources) already verified earlier today.

## Dedupe & house style

- 0 matches of pillar/tranche-1 signature lines across all 6 new posts (fresh imagery: "3 a.m. wake-up," "setup problem wearing a shoulder problem's clothes," "the bar is loaded and your shoulder just reminded you it exists").
- Em-dash budget respected (0–1 per post); openings are lived-moment hooks, no stats in ¶1; coaching content honestly labeled, no fabricated citations.
- All images vision-verified on-brand (several regenerated to strip plate/shirt logos).

## Tool pages — test evidence (tested in real browsers by builders)

- **total-calculator**: 6/6 tests pass in Chrome + renders in Edge. 2 bugs found BY TESTING and fixed (missing unit element; unit span destroyed by first write). Handles failed/blank/garbage entries, lb↔kg toggle, clear-all.
- **readiness-scorecard**: 13/13 pass incl. all 4 band boundaries (25→prescribed, 20→−5%, 16→submax, 11→rest). Mirrors the CMS readiness check-in ±5% logic.
- **meet-day-checklist**: interactive 10-item checklist with localStorage + progress bar ("0 OF 10 PACKED"), meet-day timeline, CTA.

## Issues found & fixed

1. **Dead tool links (real catch).** WorkBench's link plan for the Calculators & Tools cluster said `/blog/1rm-calculator`, `/blog/dot-score`, `/blog/wilks-calculator` — **all 404 on the live site** (verified). The tools actually live at `/tools/*` (all 200). Fixed in all 3 tool pages. **Housekeeping flag: WorkBench's link plan for tool pages is wrong and should be corrected at the source.**
2. **Meet-day AI graphic has mangled text** (headline/brand fine, but subheadline + checklist labels are gibberish, only 2 icons instead of 10, no CTA). The page itself is clean (text hero, no PNG). For the social/share graphic, the other chat's hand-built `composite.html` is the exact design with crisp text — rendered to `composite-render.png` (verified). **Recommendation: use composite-render for og:image/social; AI PNG only for the photo side.**
3. **Publish target note**: existing tools live at `/tools/*` — the 3 new pages should ship there, and their og:url/canonical/active-link should say `/tools/…` (currently `/blog/…`). Will fix at HTML-build/publish step.

## What happens on approval

1. **HTML build phase**: convert the 6 markdown posts into site blog HTML (existing template), wire the 3 tool pages into `/tools`, update sitemap.xml, push, `vercel --prod`.
2. **WorkBench sync**: ingest drafts / mark nodes, correct the tool link plan.
3. Deploy in batches (tranche 1 posts publish 9/1–9/9; tranche 2 9/11–9/21) or all at once — Jeff's call.

## Open decisions

1. **Meet-day social graphic**: composite render (recommended) vs AI PNG photo side vs one of the other chat's 4 variants.
2. **Deploy cadence**: batch with the calendar, or one push.
