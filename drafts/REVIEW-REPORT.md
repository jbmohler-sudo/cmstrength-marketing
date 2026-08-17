# CMS Cornerstone Draft Set — Review Report

**Reviewer:** review agent · **Date:** 2026-08-16
**Files reviewed:**
- `C:/Umbrella/cmstrength-marketing/drafts/01-what-is-adaptive-powerlifting-programming.html`
- `C:/Umbrella/cmstrength-marketing/drafts/02-masters-link-hygiene-checklist.md`
- `C:/Umbrella/cmstrength-marketing/drafts/03-the-complete-guide-to-powerlifting-periodization.html`
- `C:/Umbrella/cmstrength-marketing/drafts/04-nutrition-is-a-skill-expanded.html`

**Verdict: DO NOT PUBLISH AS-IS.** All three HTML drafts would ship 9 dead internal URLs (spokes that do not exist), every HTML draft exceeds the em-dash budget ~5x, and Draft 03 states a Bench Specialization length (13 weeks, 4/4/4/1) that contradicts both the current engine code (12 weeks, 3/1/3/1/3/1) and the live marketing site (12 weeks). Fixes are listed per file below. **Human Input Gate: Jeff approves publication; nothing here was published, scheduled, or staged.**

---

## Cross-cutting findings (apply to all three HTML drafts)

### 1. Dead internal links — 9 unique slugs do not exist on the live site
Live `/blog/` inventory (verified by grep of `public/blog/`): `program-comparison`, `sled-drags`, `submaximal-training`, `nutrition-is-a-skill`, `powerlifting-over-50-readiness`, `macrocycle-explained`, `heavy-lifting-after-50`, `joint-load-management-mrjv` (8 posts).

Drafts link to these NON-EXISTENT slugs:
- `readiness-scores`, `rpe-for-powerlifting`, `training-max-vs-1rm-vs-e1rm`, `bad-day-workout-adjustments` (Adaptive spokes — 0 exist)
- `protein-for-masters-lifters`, `carbs-for-powerlifting`, `weight-class-nutrition`, `meet-week-fueling` (Fueling spokes — 0 exist)
- `peak-week-and-taper` (Programming spoke — 0 exist)

Plus intra-set dependencies not yet live: `what-is-adaptive-powerlifting-programming` (Draft 01) and `the-complete-guide-to-powerlifting-periodization` (Draft 03).

Publishing as-is ships 404s. The site's own convention (Draft 02 §2: "do not ship a dead link") and `docs/silo-architecture.md` Decision 5 (cornerstone ships only once ≥3 spokes exist) require one of: (a) publish spokes first, then cornerstones; (b) cut/defer these links and re-add when the spokes ship; or (c) explicit Jeff approval to publish cornerstones ahead of spokes. Recommended order: 4 Adaptive spokes → 01 → macrocycle-explained rename + 03 → 04 → 4 Fueling spokes + peak-week-and-taper. Draft 04 must not ship before 03; 03 must not ship before 01 (both link to the earlier draft's slug).

### 2. Em-dash budget — FAIL, all three (counts and basis below)
Budget: max 2 em dashes per 400 words of article prose. Word basis = stripped-HTML `<article>` prose.

| Draft | Article words | Em dashes | Per 400 words | Allowed (2/400) | Paragraphs with >1 dash |
|---|---|---|---|---|---|
| 01 | 1,933 | 50 | 10.35 | ~9.7 | 11 (2–3 dashes each) |
| 03 | 2,250 | 53 | 9.42 | ~11.3 | 11 (2–5 dashes each) |
| 04 | 1,835 | 41 | 8.94 | ~9.2 | 5 (2 dashes each) |

Every draft is ~4.5–5x over. Cut ~40 (01), ~42 (03), ~32 (04) dashes; prefer periods, commas, colons, parentheses. No flagged dash is inside quoted source text (the drafts contain no verbatim quotes — all citations are paraphrase), so the budget applies in full. Paragraph-level violations are quoted per file below.

### 3. Slug migration / cannibalization (Draft 03 vs live `macrocycle-explained`)
`the-complete-guide-to-powerlifting-periodization` targets the same head topic (macrocycle / powerlifting periodization) as the live 1,135-word `macrocycle-explained.html`. Shipping the new slug while the old page stays live = two pages competing for the same terms + split equity. The rename (canonical, `sitemap.xml`, and all 5 inbound links across 3 pages — see Draft 02 §out-of-scope) must execute atomically with publication. This is currently only tracked in a doc, not planned as a change.

### 4. Sitemap
None of the new slugs are in `public/sitemap.xml` (18 URLs today). Publication must add: `what-is-adaptive-powerlifting-programming`, `the-complete-guide-to-powerlifting-periodization`, the 4 Adaptive spokes, 4 Fueling spokes, `peak-week-and-taper`; and remove/redirect `macrocycle-explained` if renamed.

### 5. Things that PASS everywhere
- No sibling-product links (`wizemeals|ironatforty|babylove` grep = 0 across `public/` and all drafts).
- Canonical convention matches live site (no `.html` in canonical; `mainEntityOfPage` @id keeps `.html` — inconsistent with canonical but identical to every live post, so site convention).
- App CTA → `https://app.cmstrength.fit/signup` present in all three (nav + CTA block + footer).
- Engine-section links: satisfied via nav (`/index#programs`) + footer (`/index#programs`, `/index#engines`) on all drafts; Draft 04 also inline (lines 187, 285). Live posts carry 1–2 inline engine links — see OPTIONAL per file.
- All footer/nav targets exist (`terms.html`, `methodology/index.html`, `cms.css`, `cms-motion.js`, favicons, `site.webmanifest` verified present).
- Schema: Article present everywhere; FAQPage present where a visible FAQ exists (01, 03 — answers match visible text verbatim); 04 correctly has no FAQ schema (no FAQ section). No `datePublished`/`image` — matches live convention.
- No diagnosis, no injury-prevention promises, no guaranteed outcomes, no fabricated users/testimonials/experience.

---

## File 01 — `drafts/01-what-is-adaptive-powerlifting-programming.html`

### MUST FIX
1. **4 dead spoke links.** Lines 195 (`/blog/readiness-scores`), 204 (`/blog/rpe-for-powerlifting`), 213 (`/blog/training-max-vs-1rm-vs-e1rm`), 231 (`/blog/bad-day-workout-adjustments`) — none live. The hero (line 144) promises "every lever below links to its own deep dive"; 4 of 5 levers point to 404s. Cut or defer per Cross-cutting §1. The silo-next cards (lines 341–348) also link `readiness-scores` (dead) and `joint-load-management-mrjv` (live).
2. **Em-dash budget: 50 dashes / 1,933 words = 10.35 per 400 (allowed ~9.7).** Cut ~40. Paragraphs with >1 dash include: line 157 (2), 160 (2), 194 (3), 204 (2), 212 (3), 221 (2), 230 (2), 293 (3), 319 (2), 322 (2).

### SHOULD FIX
3. **IPF claim overstated + weak citation.** Line 295: "the IPF masters divisions run well past 90 and are filled with athletes who got *better* at programming as they aged (<a href="https://www.powerlifting.sport/">IPF</a>)". IPF masters categories top out at M4 (70+); "well past 90" is not supported by the IPF division structure, and the homepage citation documents nothing. Rewrite to what the source supports, e.g. "the IPF's masters divisions extend into the 70-plus classes, and lifters keep competing there" — or cite the IPF masters records page for any specific age claim.
4. **"rotating exercises on load trends, not pain reports"** (line 306) — inaccurate per `src/engine/clm/jointEngine.ts`: the two-tier trend (`shortTrend`/`longCorrelation`) is computed *from pain check-ins* plus load-vs-ceiling (`percentOfCeiling = Σ(stress × sets) / MRJV`). Pain reports feed the signal; they don't trigger the swap alone. Suggest: "by rotating exercises on cumulative-load trends against a per-joint ceiling — pain reports feed the trend, they don't wait for an injury."
5. **Word count: 1,933 article words < 2,000 brief floor** (2,082 including hero/CTA/silo). Add ~100 words of substance (e.g., expand the "bad day" walkthrough) or get Jeff to define the measure (see Cross-cutting §3 of Draft 02 findings — the site's documented counts are not reproducible).
6. **"loads are clamped to a safe band"** (line 194) — I could not verify a combined clamp at ±5% in the engine (readiness −5..+4, feedback capped [−5,+4], joint penalties stack). The sentence already says "roughly ±5%"; soften "clamped" to "held within a bounded band" unless the combined cap exists.

### OPTIONAL
7. No inline engine-section link in the body (only nav/footer) — live posts each carry 1–2 inline `/index#engines`/`#programs` links; add one inline (e.g., in lever 01).
8. "12 min read" (line 145) — live posts carry no read-time claim; fine to keep, but it's a new convention (03 says 13, 04 says 11 — align suffix/format if keeping).
9. e1RM formula nuance: draft says e1RM is "computed with the Epley formula" (line 212). `docs/cms-identity.md` and `AnalyticsPage.tsx` (Epley) support this; note `src/engine/math.ts:10 estimateE1RM` implements **Brzycki** and appears unused — a codebase inconsistency (identity doc vs code) worth reconciling, not a draft error.
10. CLM horizon: "across the whole macrocycle" (line 221) vs `jointEngine.ts` "consumed this block" — defensible via `blockDebtTransfer.ts`; the live cornerstone says the same. No change required, flagging only.

### PASS CHECKS (File 01)
- Product claims vs engine: readiness 5 metrics 1–5 + −5..+4% band ✓ (`readinessEngine.ts`), joint penalties bench/shoulder −5, squat/knee −5 ✓, RPE 1–10 + AMRAP top set ✓, TM at block transitions never mid-block ✓, Epley per identity doc ✓, coaching actions hold/rest_extend/adjust/stop ✓ (`coachingDecision.ts`), CLM swap_now trigger + pre-flight swap + weight re-derived ✓ (`preFlightSwap.ts`, `swapRecalculation.ts`). Day-strip numbers (+4%/−5%) match engine bands exactly ✓.
- Citations: Helms 2016 (PMID 27531969 ✓ real, on-topic), Bohm 2015 (DOI 10.1186/s40798-015-0009-9 ✓), Fullagar 2015 (PMID 25315456 ✓), IPF (✗ — see SHOULD FIX 3).
- SEO: one job (definitional head-term "adaptive powerlifting programming", matches SEO.md §6), canonical/title/H1 aligned, no cannibalization (no other page targets the term).
- Safety: honest-limits section is genuinely hedged; no outcomes promised (item "It can protect your joints…" — soften per Cross-cutting if Jeff wants zero benefit language, but mechanism is accurate).

---

## File 02 — `drafts/02-masters-link-hygiene-checklist.md`

Internal work doc (link-hygiene plan for `powerlifting-over-50-readiness`), not a publishable article. Em-dash budget not applied (not article prose).

### MUST FIX
None blocking — the doc's central table is factually correct.

### SHOULD FIX
1. **Unverifiable word-count claim.** Line 5: "Cornerstone already qualifies (2,052 stripped-HTML words ≥ 2,000)." I could not reproduce 2,052 by any clean measure: article-tag strip = 1,319; whole-body strip = 1,519. The same is true for every documented count in `docs/silo-architecture.md` (e.g., macrocycle-explained documented 1,135 vs 612 measured whole-body). The "NO rewrite" status rests on a number nobody can re-derive. Fix: state the exact stripping method, re-run it, and log the method in `docs/SEO.md` so future counts are comparable.
2. **Inbound-link parenthetical is wrong.** Line 54: "any links pointing at `/blog/macrocycle-explained` (this page links it once, nutrition links it twice)". Verified actual inbound set: `nutrition-is-a-skill.html` ×2, `program-comparison.html` ×2, `submaximal-training.html` ×1. The Masters cornerstone (`powerlifting-over-50-readiness.html`) links it 0 times; `program-comparison` (×2) is missing from the list entirely. Correct to: "nutrition ×2, program-comparison ×2, submaximal-training ×1".

### OPTIONAL
3. The suggested anchor text in §1 ("…why that matters even more after 50 is the anchor of the Masters Track: Powerlifting Over 50") lands next to the existing heavy-lifting-after-50 link in the same sentence (line 158) — two Masters links in one sentence is fine, but place the cornerstone link in the intro (lines 142–144) instead if the sentence gets crowded.

### PASS CHECKS (File 02)
- Table verified by grep: heavy-lifting-after-50 → cornerstone ×3 ✓; submaximal-training → cornerstone ×2 ✓; macrocycle-explained → cornerstone ×1 ✓; program-comparison → cornerstone ×1 ✓; joint-load-management-mrjv → cornerstone ×0 ✓ (the one real hygiene violation, confirmed); cornerstone → joint-load ×1 at ~line 203 ✓; cornerstone silo cards = heavy-lifting-after-50 + submaximal-training at lines 248/252 ✓ (submaximal is a Programming spoke; joint-load missing — recommendation correct); nutrition → macrocycle-explained ×2 ✓ (lines 158, 229 of live file).
- Line references verified: joint-load thesis callout ~line 149 ✓; "recovery gets unpredictable after 50" heavy-lifting link ~line 158 ✓; "Recovery stops being predictable" at line 160 ✓; readiness section starts line 167 ✓; `blog.html` line 90 = "START HERE · THE MASTERS PILLAR" ✓.
- Adaptive cross-links correctly deferred until spokes live ✓ (consistent with the dead-link finding).
- No sibling-product links anywhere in `public/` ✓ (grep = 0).

---

## File 03 — `drafts/03-the-complete-guide-to-powerlifting-periodization.html`

### MUST FIX
1. **Bench Specialization claim is wrong.** Line 270: "Bench Specialization — a fixed 13-week wave (4 weeks accumulation → 4 weeks strength → 4 weeks peak → 1 week taper)". Verified against `cms-completenew`: current v2 program is **12 weeks** — `src/program/bench/v2/generateProgram.ts:52-57` = primary 3 / deload 1 / strength 3 / deload 1 / peak 3 / deload 1, and its test asserts "Program is exactly 12 weeks; W12 is deload". Live marketing agrees: `public/blog/program-comparison.html:259` "Typical Duration … 12 weeks"; `public/methodology/the-experience.html:149` "Fixed 12-week program". The "13-week 4/4/4/1" figure came from `docs/cornerstone-briefs.md` Brief 3 §8 — the brief is wrong. Rewrite to match product+marketing: e.g., "a fixed ~12-week wave that runs volume → strength → peak → test week" (keeps the "test week" language used on `index.html:464`), or state no duration. Do NOT publish a third number.
2. **Dead internal links.** Line 223 (`/blog/meet-week-fueling`), line 227 (`/blog/peak-week-and-taper`), line 237 (`/blog/training-max-vs-1rm-vs-e1rm`), line 247 (`/blog/what-is-adaptive-powerlifting-programming` — Draft 01, not live). Cut/defer per Cross-cutting §1.
3. **Unfulfilled Big Three promise.** Line 261: "Each of those gets its own deep dive (see the silo at the bottom of this page)." The silo-next cards (lines 303–310) are `peak-week-and-taper` + `submaximal-training` — neither is a Big Three spoke, and no squat/bench/deadlift programming spokes exist. Either remove the sentence or add the three cards only once those spokes are live.
4. **Em-dash budget: 53 dashes / 2,250 words = 9.42 per 400 (allowed ~11.3).** Cut ~42. Worst paragraph: line 167 (5 dashes). Others: 151, 155, 195, 200, 216, 227, 237, 270, 274 (2–3 each).
5. **Slug cannibalization.** New slug vs live `macrocycle-explained` — must ship with the atomic rename (canonical, sitemap, 5 inbound links). See Cross-cutting §3.

### SHOULD FIX
6. **"accumulation blocks at 4–5"** (line 200) and **"accumulation grows into 4–5 week chunks"** (line 210) — imprecise at the edges: `buildMacrocycle.ts` gives a *single* hyp block of 3–7 weeks when flex < 8 (e.g., flex 7 → one 7-week block, no strength). Qualify: "4–5 weeks each once the cycle is long enough; a short runway can leave a single longer accumulation block."
7. **Word count passes** (2,250 article words) — no action.
8. Inline engine-section link: none in body (nav/footer only). Add one inline near the macrocycle section (e.g., link `#programs` in the CTA or the timeline section).

### OPTIONAL
9. Timeline widget default date `2026-11-20` (line 346) is static; it will eventually sit in the past for readers. Consider a dynamic default (today + ~90 days). Widget math mirrors `buildMacrocycle.ts` exactly (flex/str/hyp distribution verified identical) ✓.
10. "13 min read" — new convention, see File 01 OPTIONAL 8.

### PASS CHECKS (File 03)
- Macrocycle engine claims all verified against `src/engine/buildMacrocycle.ts`: min 60 days ✓ (throws < 60), peak 4 / taper 1 fixed ✓, strength blocks 4wk ✓, hyp-first sequence ✓, drops strength entirely near the 60-day floor ✓ (flex 4–7 → 0 strength), 13-week SBD example = hyp 4 + str 4 + peak 4 + taper 1 ✓ (FAQ answers correct for SBD).
- TM claims: conservative fraction of e1RM, updates at block transitions, never mid-block ✓ (CLAUDE.md + `cms-identity.md`); Epley vs Brzycki nuance — see File 01 OPTIONAL 9.
- Adaptive section (lines 241–247): ±5% readiness ✓, CLM auto-rotation ✓, in-session coaching ✓.
- Citations: Williams et al. 2017 (DOI 10.1007/s40279-017-0734-y = "Comparison of Periodized and Non-Periodized Resistance Training on Maximal Strength: A Meta-Analysis" ✓ — correct paper, correctly characterized), Bosquet et al. 2007 (PMID 17762369 ✓ tapering meta-analysis ✓).
- FAQ schema present, answers match visible text ✓; CTA targets SBD track ✓ (correct anchor for this post); canonical/title aligned ✓.
- Safety: no promises that periodization "guarantees" a peak; honest "can only display it" framing ✓.

---

## File 04 — `drafts/04-nutrition-is-a-skill-expanded.html`

### MUST FIX
1. **Dead internal links.** Lines 229–232 link all four planned Fueling spokes (`protein-for-masters-lifters`, `carbs-for-powerlifting`, `weight-class-nutrition`, `meet-week-fueling`) — zero exist; line 232 also links `the-complete-guide-to-powerlifting-periodization` (Draft 03, not live). Silo-next cards (lines 323–330) link two of the same dead spokes. The section header (line 224) calls them "The Fueling Silo: Four Deep Dives" — the silo does not exist yet. Cut/defer per Cross-cutting §1.
2. **Em-dash budget: 41 dashes / 1,835 words = 8.94 per 400 (allowed ~9.2).** Cut ~32. Paragraphs with 2 dashes: lines 169, 208, 218, 277, 285.
3. **Wrong category label.** Line 46 (`articleSection: "Training Science"`) and line 128 (eyebrow `TRAINING SCIENCE`). The reconciled taxonomy (`docs/silo-architecture.md`, category 4) is **Fueling the Work** — which this post's own silo-next label (line 321, "KEEP READING — FUELING THE WORK") and the blog hub (`blog.html:175`) already use. The live page carries the same stale label; the expansion should correct it to "FUELING THE WORK" / "Fueling the Work".

### SHOULD FIX
4. **"you fuel the lift through a curator"** (line 288, and the callout at 287–289). "Curator" is sibling-product language (WizeMeals = the meal curator); the link model forbids sibling references and CMS↔WizeMeals never interlink. It's not a hyperlink, but it reads as a veiled cross-promotion. Replace with a productless phrase ("a meal system", "a weekly planner") unless Jeff explicitly approves cross-product promotion.
5. **Word count: 1,835 article words < 2,000 brief floor** (1,967 incl. hero/CTA/silo). Shortest of the set. Add ~150–200 words of substance: extend the Monday–Sunday autoregulation example or the template's "change ONE variable" instruction into a worked before/after.
6. **`/blog/macrocycle-explained` link (line 181)** will break on the slug rename (Cross-cutting §3) — retarget to the new periodization cornerstone in the same change.

### OPTIONAL
7. Schema headline (line 40) says "…Just Like Your Bench Press"; visible title/H1 say "…Just Like Your Bench". Align schema headline to the visible title.
8. Title brand suffix: "| Center Mass Strength" (line 7) vs "| CMS" in Drafts 01/03 — pick one.
9. No inline read-time convention (see File 01 OPTIONAL 8).

### PASS CHECKS (File 04)
- Citations all verified: Lally et al. 2010 (DOI 10.1002/ejsp.674 ✓, median 66 days to automaticity ✓), Morton et al. 2018 (PMID 28698222 ✓ BJSM 2018, 1.6 g/kg plateau ✓ — the meta-regression breakpoint ~1.62 g/kg/d), Kerksick et al. 2017 (PMID 28919842 ✓ ISSN position stand, total daily intake > precise timing ✓).
- Tool-layer asset present and real: printable weekly fueling template with print CSS, per-day target/floor/carbs/fluid/autoregulation columns, and a 4-item decision checklist (lines 243–275) — beats the "bare data table" bar ✓. The template's numbers (1.2–2.0 g/kg example days) are framed as the author's example plan, not product features ✓.
- Product claims: "CMS's readiness engine" + `/index#engines` links (lines 187, 285) accurate vs engine ✓; no nutrition feature claims (correctly, CMS has none) ✓.
- Safety/compliance: general fitness nutrition, no diagnosis, no medical advice, no supplement push, no guaranteed outcomes ✓.
- Same slug/canonical as the live post → this is an expansion/replacement, not a new competing page; no cannibalization ✓. No FAQ section → no FAQPage schema ✓ (consistent).

---

## Checks performed (method)
- Read all 4 drafts in full; read `docs/cornerstone-briefs.md`, `docs/silo-architecture.md`, live `blog.html`, `sitemap.xml`, and the live Masters cornerstone + joint-load + nutrition posts (line references).
- Engine verification in `cms-completenew`: `src/engine/buildMacrocycle.ts`, `readiness/readinessEngine.ts`, `clm/jointEngine.ts`, `clm/preFlightSwap.ts`, `coaching/coachingDecision.ts`, `engine/math.ts`, `engine/resolveExerciseTrainingMax.ts`, `program/bench/v2/generateProgram.ts` (+ its test), `pages/AnalyticsPage.tsx`, `docs/cms-identity.md`, `FAQ.jsx`.
- Citations: CrossRef + NCBI E-utilities for all 6 external citations (PMID 27531969, 25315456, 17762369, 28698222, 28919842; DOI 10.1186/s40798-015-0009-9, 10.1007/s40279-017-0734-y, 10.1002/ejsp.674). All real and correctly characterized except the IPF homepage (File 01 SHOULD FIX 3).
- Link map: grepped every `href="/blog/…"` and `/index#…` in all live posts and drafts; sibling-product sweep (`wizemeals|ironatforty|babylove`); asset existence (favicons, cms.css, cms-motion.js, manifest, terms, methodology).
- Em-dash + word counts: scripted strip of `<article>` (and `<main>`) HTML; counts reported above.
- No files were edited, published, scheduled, or staged. This report is the only write.

## Recommendation
Jeff decides. Minimum bar before ANY of the three HTML drafts can publish: (1) resolve the dead-link set (spokes first, or cut the links), (2) fix Draft 03's Bench Specialization length (12 weeks or no number — and reconcile `FAQ.jsx`'s legacy "13 weeks" with the codebase), (3) bring every draft under the em-dash budget, (4) execute the macrocycle-explained rename atomically with Draft 03, (5) fix the "Training Science" label and the "curator" reference in Draft 04. Draft 02 (checklist) is sound and can proceed as the work plan once its two SHOULD FIX items are corrected.
