# Center Mass Strength — Marketing Site Journey

> The marketing site for CMS (www.cmstrength.fit) — a static site that converts serious
> lifters into app/beta users. The "loud outside" front door to the quiet, capable app.

> **Scope:** This journey covers the MARKETING SITE repo (`cmstrength-marketing`).
> The CMS app/product (the adaptive programming engine, `app.cmstrength.fit`) has its
> OWN journey in the `cms-completenew` repo. Keep them separate — engine decisions there,
> content/SEO/web-presence decisions here.

---

## Current State
> Updated: 2026-10-03

- **2026-10-03 silo pass:** every pillar links all its spokes, every spoke links its pillar and a sibling, no orphans, no internal links to redirects (branch `seo/silo-interlinking`, pending merge).
- **2026-09-26 SEO audit:** tools, not blog posts, carry all rankings. Sitemaps synced (both 49 URLs), DOTS retitle and 1RM expansion live; publishes now update both sitemaps. Next: the calculator build-out in the Session Log.
- **Since 8/28 (Muse, publish-direct from 9/16):** the "Fueling the Work" series F1–F8 and the K1 meet-prep
  cornerstone are live; GA4 `G-5V676F7J2E` site-wide (9/23); Pinterest verification + pin images. Agent rules
  now live in [AGENTS.md](AGENTS.md). _Bullets below are from 8/28 and may be dated (post counts, pillar sizes)._

- **Phase / Stage:** Live at www.cmstrength.fit (Vercel, static HTML, main = production).
  Subscription funnel GO-LIVE complete: homepage reads as a paid product (14-day
  trial + $20/mo · $200/yr), zero beta copy site-wide, all CTAs → app signup.
  Blog is a real silo; SEO infra documented; GSC shows 15 indexed pages.
- **What's live:** Marketing site ("Rugged Pro" spec — true-black bg, ember accent;
  blog uses warmer charcoal/ember built on cms.css). Blog at `/blog` with 11 posts organized
  as an editorial index (featured pillar + grouped sections: Masters / Programming / Fueling).
  `docs/SEO.md` is the SEO source of truth. GSC uses the Domain property. `robots.txt`
  points to fresh `sitemap-2026.xml` (new URL used to bypass GSC's cached per-URL failures).
- **DNS (2026-08-28):** Migrated the domain OFF Vercel nameservers to Namecheap BasicDNS —
  CMS was the only portfolio site on Vercel DNS and the only sitemap-fetch failure.
  Full zone rebuilt and verified live: CNAME www + app → Vercel edge, apex A → 307 → www,
  MX (ImprovMX @ + SES `send`), SPF, google-site-verification, Resend DKIM, CAA ×3.
- **What's in progress:** GSC's Sitemaps report has NEVER downloaded any sitemap for this
  host (lastDownloaded None since 7/30, every URL/property permutation). New theory: the
  failure is host-keyed (WizeMeals' blog sitemap works because it lives on a separate host,
  `blog.wizemeals.com`). Plan: serve the sitemap from fresh subdomain `sitemap.cmstrength.fit`
  (already bound to the marketing project on Vercel) and submit that URL to the Domain property.
- **What's next:** Add CNAME `sitemap` → `cname.vercel-dns-017.com.` at Namecheap; verify
  `sitemap.cmstrength.fit/sitemap-2026.xml` serves 200; submit it in GSC; watch `lastDownloaded`.
- **Biggest open question:** whether Google's sitemap-fetch pipeline is permanently poisoned
  per-host for cmstrength.fit — the subdomain test is the last cheap experiment.

---

## The Story So Far

The marketing site is the "loud outside" of CMS — its job is to rank for high-intent
powerlifting/programming searches and convert serious lifters (heavy masters/40+ skew) into
beta/app users. It is a separate concern from the app (`cms-completenew`) and from the
portfolio's hub authority site, IronAtForty.

It's a static HTML site on Vercel. Over time it grew a real blog silo — hand-built posts in
CMS's training-science voice, organized around a CMS-native taxonomy (Masters Track /
Programming & Periodization / Fueling the Work) deliberately structured so it does NOT mirror
IronAtForty's pillar-chip layout (avoid near-replica sibling sites). The blog index is an
editorial layout: a featured "masters pillar" hero card + grouped sections.

In the portfolio, CMS is a **pure product site**: it never links to its sibling products
(IronAtForty the hub links DOWN to CMS, never the reverse; CMS and WizeMeals never link each
other). CMS's outbound links go only to genuine authority (PubMed/.gov/.edu) or its own app —
which also makes its content more credible on health-adjacent topics.

---

## Decisions Log

| Decision | Why | Date | Status |
|----------|-----|------|--------|
| Marketing site is a SEPARATE repo/journey from the app | Content/SEO decisions ≠ engine decisions; mixing them pollutes both logs | 2026-06-15 | Locked |
| CMS is a "pure product site" — no sibling-product links | Two "independent" properties associating is a footprint; the IAF hub does the cross-linking | 2026-06-15 | Locked |
| Outbound links: authority-only (PubMed/.gov/.edu) or own app | Builds E-E-A-T/credibility; never competitors or sibling products | 2026-06-15 | Locked |
| Blog index = editorial layout (featured + grouped), NOT IAF's filter-chip grid | Sibling sites must not look like near-replicas of each other | 2026-06-15 | Locked |
| CMS-native blog taxonomy (Masters / Programming / Fueling) | Zero overlap with IAF's pillar names — another differentiation layer | 2026-06-15 | Locked |
| www is the canonical host; bare domain 301s to www | Single canonical version; all sitemap `<loc>` + canonicals use www | 2026-06-15 | Locked |
| GSC: use a DNS-verified **Domain** property, not bare URL-prefix | Site lives on www; a bare-domain URL-prefix property can't fetch/verify across the host mismatch | 2026-06-15 | Locked |
| `sitemap.xml` is the sole physical sitemap; `/sitemap-main.xml` redirects to it | Prevents duplicate files from drifting while preserving the legacy URL | 2026-08-24 | Locked |
| Fresh sitemap URL `sitemap-2026.xml` replaces the poisoned `sitemap.xml` in robots.txt | GSC caches per-URL fetch failures; a new URL gets a clean slate | 2026-08-28 | Locked |
| Migrate DNS from Vercel nameservers → Namecheap BasicDNS | CMS was the ONLY portfolio site on Vercel DNS and the ONLY sitemap-fetch failure (100% correlation); new URL-prefix property proved network-level "Couldn't fetch" | 2026-08-28 | Locked |
| Serve the sitemap from fresh subdomain `sitemap.cmstrength.fit` | WizeMeals' blog sitemap works because it lives on a separate host; failure appears host-keyed, not file/config-keyed | 2026-08-28 | Testing |
| Apex → www stays 307 (Vercel binding, survives DNS move) | Matches approved WizeMeals apex behavior; 301 was never the blocker | 2026-08-28 | Locked |
| One shipping rule across all repos (AGENTS.md); publish-direct approval covers posts only | Cloud agents (Muse) couldn't see rules kept in CLAUDE.md / `../` files; the local backup pushes any commit on `main`, so "commit but don't push" rules silently shipped | 2026-09-25 | Locked |
| Every publish adds its `<loc>` to BOTH `sitemap.xml` and `sitemap-2026.xml` | robots.txt serves sitemap-2026; checklist naming only sitemap.xml left 14 URLs out of the served sitemap | 2026-09-26 | Locked |

---

## Open Questions

- [ ] Decide whether the homepage should canonicalize www vs non-www at the Vercel
  domain level (already redirects; just confirm www is set primary).

---

## Session Log
> Appended after every working session. Most recent first.

### 2026-10-03 — Silo interlinking pass + internal-URL hygiene (c1139ac, 3be83c9) (Claude)
**Did:** Link-graph audit of every page. Found 498 internal links pointing at 308 redirects (`/index`, `/index#x`, `/methodology/index`, `/blog.html`, `/tools.html`), the source of GSC's "Page with redirect" rows; all now clean URLs, `cms-nav.js` too. Self-canonicals on the 9 indexable pages without one; `noindex` on `/signup` (magic-link page, was indexed empty; also dropped from `sitemap.xml`, where 4a0da87 had added it); footer Tools column lists all 6 tools + `/tools` on every page; `/tools` added to both sitemaps (53 URLs, identical sets); 301 for `/blog/macrocycle-explained`. Silos: pillars of After-40, Adaptive, Meet Prep and Fueling linked to none or almost none of their spokes, 21 spokes had no in-article link from their own silo, and 4 posts were orphans (menopause, stop-at-discomfort, sled drags, deadlift form). Now every spoke links up to its pillar and to at least one sibling in the body, every pillar links down to all spokes, and KEEP READING cards stay in-silo. RPE moved to The Adaptive System group on `/blog` per `docs/silo-architecture.md`. Verified: zero broken internal links, zero links to redirects, zero orphans, tag balance unchanged, pages render (headless Chromium).
**Decided:** —
**Killed:** The "in progress" Fueling list on nutrition-is-a-skill (replaced with links to all 9 shipped spokes).
**Deferred:** Titles over 60 chars on ~30 posts and descriptions over 160; ~57 pre-existing short anchors under the 40-char rule; homepage "Latest guides" block; After-40 vs Masters Track overlap; `carbs-for-powerlifting` links WizeMeals twice (Hard Rules forbid it, `docs/SEO.md` §2 allows it, Jeff to decide).
**State after:** On branch `seo/silo-interlinking`, awaiting Jeff's OK to merge (site-wide code).
**Next:** Merge, confirm Vercel READY, then request indexing on the unindexed September posts.

### 2026-09-30 — Published keyword post (Barbell Squat: form + programming guide)

- Fourth keyword-driven post of the SEO cluster under the publish-direct policy; one post per run. Chose `barbell squat` from the OpenSEO saved-keyword queue: 22,200 vol, KD 0 — the highest-volume unused keyword (front squat taken Sept 25; deadlift form / proper deadlift form covered Sept 28). 8 keywords still unused, so no refill research was needed.
- New post (38th blog post): `public/blog/barbell-squat-guide.html` — "Barbell Squat: The Complete Form and Programming Guide." Sections: why the squat is a balance problem, high bar vs. low bar honestly compared (diff table, geometry not religion), the rep from unrack to rerack (12-step checklist), the six mistakes everyone makes with mechanical fixes, programming (2x/week, 1–5 rep strength work, RPE 8–9 ceiling, variation matched to failure point: hole / above-parallel / chest dump / lockout / depth), squats after 40 (real warmup, honest depth, variations earning their keep). 6-question FAQ + JSON-LD (Article + FAQPage), 2 verified references (Schoenfeld 2010, PubMed 20182386; Gullett et al. 2009, PubMed 19002072 — no invented studies).
- New hero/card image: `public/images/blog/barbell-squat-guide.jpg` (AI-generated, dark garage-gym back squat, ember rim light matching site aesthetic, no text/logos)
- Blog index (`public/blog.html`): card added to the "Meet Prep & The Big Three" group (count 03 → 04 ARTICLES); no re-indenting.
- Sitemap: `public/sitemap.xml` gained the barbell-squat-guide entry (lastmod 2026-09-30). Backfilled the missing deadlift-form-guide entry into `public/sitemap-2026.xml` (the Sept 28 run had only updated sitemap.xml — drift again); both sitemaps now list the same 51 URLs, XML-valid, no dupes, per the dual-sitemap rule.
- CTA-closer check (standing rule): the post's `cta-block` (contextual trial CTA → app.cmstrength.fit/signup, 14-day trial / $20-mo / $200-yr copy) is present exactly once in the published HTML — verified live after deploy. No second closer added.

### 2026-09-28 — Published keyword post (Deadlift Form: technique + programming guide)

- Third keyword-driven post of the SEO cluster (K1–K10) under the publish-direct policy; one post per run. Chose `deadlift form` from the OpenSEO saved-keyword queue: 33,100 vol, KD 11 — the highest-volume unused keyword (front squat taken Sept 25), fully uncovered on the site. 9 keywords still unused, so no refill research was needed.
- New post (37th blog post): `public/blog/deadlift-form-guide.html` — "Deadlift Form: The Complete Technique and Programming Guide." Sections: why the setup is the rep (no eccentric to think through, bar-path physics), conventional vs. sumo honestly compared (geometry, not religion; trap bar noted as a valid masters/main-lift alternative), the five-step setup checklist (mid-foot bar, shins to bar, pull the slack, brace-and-wedge, push the floor away), the five mistakes everyone makes with fixes (back rounds off floor, hips shoot up, bar drifts, yanking, hyperextended lockout), grip choices (double overhand / mixed with bicep-tear caution / hook), programming (1 heavy day/wk, 1–6 reps at RPE 7–9, variation matching the failure point: deficit/paused/block/RDL), deadlift form after 40 (10–14 day heavy frequency, RPE 8 cap, trap bar legitimacy). 6-question FAQ + JSON-LD (Article + FAQPage). No invented studies cited — this one ships without a references block rather than a padded one.
- New hero/card image: `public/images/blog/deadlift-form-guide.jpg` (AI-generated, dark garage-gym deadlift setup, ember rim light matching site aesthetic, no text/logos)
- Blog index (`public/blog.html`): card added to the "Meet Prep & The Big Three" group (count 02 → 03 ARTICLES); no re-indenting. Sitemap: `public/sitemap.xml` gained the deadlift-form-guide entry (lastmod 2026-09-28), per the sitemap rule.
- CTA-closer check (standing rule): the post's `cta-block` (contextual trial CTA → app.cmstrength.fit/signup, 14-day trial / $20-mo / $200-yr copy) is present exactly once in the published HTML — verified live after deploy. No second closer added.

### 2026-09-26 — SEO audit; sitemaps synced; DOTS retitle; dual-sitemap rule; 1RM page expanded (dda1d1f, bf598eb, a8e9fe3, 4477f5a)
**Did:** On-page + DataForSEO audit. Found `sitemap-2026.xml` (the one robots.txt serves) missing 14 URLs incl. all F1–F8, K1 and front-squat, because publishes were going to `sitemap.xml` only; `sitemap.xml` itself lacked 4 posts. Both now list the same 49 URLs, XML-valid, no dupes, live 200. Retitled the DOT page to DOTS ("dots calculator" 6,600/mo vs 480 for "dot score calculator"): title, H1, meta, FAQ + JSON-LD, site-wide anchor text; added canonical + OG/Twitter; corrected the claim that DOTS is the IPF's formula (IPF uses GL Points). URL unchanged. Verified live.
**Decided:** Every publish adds its `<loc>` to both sitemaps (AGENTS.md, Decisions Log).
**Killed:** —
**Also did:** AGENTS.md dual-sitemap rule (a8e9fe3, Jeff approved). Expanded `/tools/1rm-calculator` (4477f5a): optional RPE per lift (reps in reserve added back before Epley), Brzycki alongside, per-lift plate-rounded % chart and rep max table, new guide sections (RPE to %1RM, reps to %1RM, 3RM/5RM conversion, Epley vs Brzycki, input rules), FAQ 4 to 7, 2 PubMed refs, canonical/OG, WebApplication + FAQPage JSON-LD, links out to RPE/submaximal/meet-prep/after-40. Tested in headless Chromium (desktop + 390px, no JS errors, no horizontal scroll).
**Deferred:** Single physical sitemap serving both URLs (would end drift for good) left for later.
**State after:** DataForSEO: 38 ranking keywords, none top 25, nearly all on the 1RM and DOTS tools; blog ranks only for RPE. Most silo/K-series targets are 10–40 searches/mo.
**Next:** Watch 1RM rank in DataForSEO (baseline #88); build RPE calculator (6.6k), bench press calculator (60.5k, KD 10), powerlifting weight classes page (2.9k, KD 1); reprioritize K2–K10 by volume (DUP 18.1k, deload week 3.6k, how to increase bench 2.4k).

> Older sessions archived in [JOURNEY_ARCHIVE.md](JOURNEY_ARCHIVE.md).

---

## Hard Rules

- **Never link to IronAtForty or WizeMeals.** CMS is a pure product site; only the IAF hub
  links across products. (Caught + removed a WizeMeals link Jun 15.)
- **Outbound links go to authority (PubMed/.gov/.edu) or CMS's own app only.** Never
  competitors, never sibling products, never commercial.
- **www is canonical.** All sitemap `<loc>` and canonical tags use `https://www.cmstrength.fit/`.
- **GSC = Domain property** for `cmstrength.fit` (not bare URL-prefix).
- **Blog stays distinct from IronAtForty's structure** — no near-replica layouts.
- **This repo ≠ the app.** App engine decisions live in `cms-completenew/JOURNEY.md`.
- **Publish-direct covers blog posts only** (Jeff, 2026-09-16). Tracking tags, site-wide code, and SEO/link-policy
  docs need Jeff's OK. Shipping and journal rules: [AGENTS.md](AGENTS.md).
