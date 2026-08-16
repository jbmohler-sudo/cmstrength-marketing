# Powerlifting Over 50 — Link-Hygiene / Update Checklist

**Article:** `powerlifting-over-50-readiness` · "Powerlifting Over 50: Why Readiness Changes Everything"
**File:** `public/blog/powerlifting-over-50-readiness.html`
**Status:** Cornerstone already qualifies (2,052 stripped-HTML words ≥ 2,000). **NO rewrite.**
**Scope:** Link hygiene + optional hub copy only, per `docs/cornerstone-briefs.md` Brief 2 and `docs/silo-architecture.md`.

Line references below are against the current file as of 2026-08-16. Verify each anchor after edits (lines shift).

---

## Verified current state (grep of `public/blog/`)

| Post | Links TO cornerstone | Links FROM cornerstone | Notes |
|---|---|---|---|
| heavy-lifting-after-50 | ✓ 3× | ✓ | solid |
| joint-load-management-mrjv | ✗ **0×** | ✓ 1× (line 203) | spoke does NOT link UP — the one real hygiene violation |
| submaximal-training | ✓ 2× | ✓ 2× | legit topical cross-link (it's a Programming spoke, not Masters) |
| macrocycle-explained | ✓ 1× | — | fine |
| program-comparison | ✓ 1× | — | fine |
| WizeMeals / IAF links | n/a | none found | ✓ no sibling-link violations |

---

## Checklist

### 1. Add the missing spoke → cornerstone link (REQUIRED)
- [ ] In `joint-load-management-mrjv.html`, add one link UP to `/blog/powerlifting-over-50-readiness`.
  - Best anchor: the thesis callout near line 149 ("…the principle CMS is built on") or the "recovery gets unpredictable after 50" cross-link at line 158 (that one already links to heavy-lifting-after-50; add the cornerstone link in the same sentence or the intro paragraph at line 142–144).
  - Text suggestion: "…why that matters even more after 50 is the anchor of the Masters Track: Powerlifting Over 50."
- [ ] Re-grep afterwards — every Masters spoke must link UP to the cornerstone (one hop per silo rule).

### 2. Add Adaptive cross-links (per Brief 2) — deferred until Adaptive posts exist
- [ ] In §"What Is a Readiness Score — and Why Does It Matter More After 50?" (lines 167–185), link the Adaptive spoke `/blog/readiness-scores` from the first mention of the readiness score definition (line 169). Only link once that spoke page is live — do not ship a dead link.
- [ ] In §"Does Strength Really Decline After 50?" (lines 151–163), add one link to the Adaptive cornerstone `/blog/what-is-adaptive-powerlifting-programming` from the recovery-variability point (line 160 "Recovery stops being predictable") — establishes the Masters ↔ Adaptive cross-link the brief wants.
- [ ] Once live, the Adaptive cornerstone will link back to this post (it already does in draft — see `drafts/01-…html`, "Why Adaptive Programming Matters Most After 40").

### 3. Fix the silo-next cards on the cornerstone (REQUIRED)
- [ ] In `powerlifting-over-50-readiness.html` lines 244–257, the KEEP READING block lists heavy-lifting-after-50 + submaximal-training. `submaximal-training` is a Programming & Periodization spoke, and `joint-load-management-mrjv` (a Masters spoke, already inline-linked at line 203) is missing.
  - Recommended: replace the submaximal card with a joint-load card → keeps the silo self-contained and restores the one-hop rule.
  - After the Adaptive cornerstone ships, consider a third card for it here (the brief's optional item) — only once ≥3 Adaptive posts exist (avoids a dead 1-post pillar, per silo-architecture Decision 5).

### 4. Optional hub copy (Decision 1, deferred)
- [ ] `public/blog.html` line 90: featured card label reads "START HERE · THE MASTERS PILLAR". Per Decision 1, optionally re-word to present the Adaptive System as a sibling pillar (e.g. "START HERE · THE MASTERS PILLAR" → "START HERE · MASTERS + THE ADAPTIVE SYSTEM") once Adaptive has ≥3 posts. Do not do this before then — a 1-post pillar link is dead weight.

### 5. Verify at edit time (no code changes expected)
- [ ] Re-run stripped-HTML word count ≥ 2,000 after any edits (link additions add words, never subtract).
- [ ] Confirm no new outbound links leave the authority-only set (PubMed / .gov / .edu / peer-reviewed / recognized orgs).
- [ ] No sibling-product links (WizeMeals, IronAtForty) — grep `public/blog/` for `wizemeals|ironatforty` after any edit.

---

## Out of scope here (tracked elsewhere)
- Article 3 cornerstone (`the-complete-guide-to-powerlifting-periodization`): if Jeff approves the slug rename of `macrocycle-explained`, that page's canonical, `sitemap.xml`, and any links pointing at `/blog/macrocycle-explained` (this page links it once, nutrition links it twice) must be updated in the same change.
- Blog hub group labels (SEO.md §3 taxonomy block + `blog.html` groups) — only after Adaptive has ≥3 posts (silo-architecture Decision 5).
