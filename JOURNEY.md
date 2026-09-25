# Center Mass Strength — Marketing Site Journey

> The marketing site for CMS (www.cmstrength.fit) — a static site that converts serious
> lifters into app/beta users. The "loud outside" front door to the quiet, capable app.

> **Scope:** This journey covers the MARKETING SITE repo (`cmstrength-marketing`).
> The CMS app/product (the adaptive programming engine, `app.cmstrength.fit`) has its
> OWN journey in the `cms-completenew` repo. Keep them separate — engine decisions there,
> content/SEO/web-presence decisions here.

---

## Current State
> Updated: 2026-09-25

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

---

## Open Questions

- [ ] Decide whether the homepage should canonicalize www vs non-www at the Vercel
  domain level (already redirects; just confirm www is set primary).

---

## Session Log
> Appended after every working session. Most recent first.

### 2026-09-25 — Agent rules in-repo (new AGENTS.md); journal repaired (Claude)
**Did:** Cross-repo audit. Muse (the blog writer, `jbmohler-sudo`) publishes here as intended, but its six session entries (9/15–9/23) were appended at the end of this file below Hard Rules, and Current State was still dated 8/28. Muse also made non-post changes that the publish-direct approval doesn't cover: GA4 site-wide tag `G-5V676F7J2E` (b5d4d67, 9/23), Pinterest verification tag (e28e3d4, 9/16), and `docs/SEO.md` link-policy edits (76a93ba relaxed, then 0cc2cb9 re-tightened, both 9/16 — the Hard Rules still hold). One publish commit re-indented all of `public/blog.html` (a71d8eb). Fix: new AGENTS.md (shared rules + publishing checklist: post + blog.html card + sitemap `<loc>`, no re-indenting; publish-direct covers posts only) and CLAUDE.md imports it; strays folded into this Session Log newest-first (headings demoted only); cap applied; Current State updated; answered Open Question removed.
**Decided:** One shipping rule in every repo (AGENTS.md). Jeff's 9/16 publish-direct approval covers blog posts only; tracking tags, site-wide code, and SEO/link-policy docs need his OK.
**Killed:** —
**Deferred:** Jeff to confirm the GA4 tag and the 9/16 SEO.md policy edits were wanted.
**State after:** Site unchanged; rules readable by every agent.
**Next:** Point Muse at AGENTS.md in its project instructions.

### 2026-09-23 — Published K1 (Meet Prep & The Big Three: the S4 cornerstone)

- First post of the keyword-driven SEO cluster (K1–K10) under the publish-direct policy; writer runs ONE post per run; fueling backlog F1–F8 complete.
- New post (35th blog post): `public/blog/meet-prep-guide.html` (K1, S4 cornerstone) — "The Complete Guide to Powerlifting Meet Prep." Target 2,000+ words: 2,773 body words (stripped). Targets `powerlifting meet prep` / `how to peak for a powerlifting meet` / `powerlifting taper` — the largest high-intent search space the site did not own (per silo-4 brief). Sections: competition as its own skill, pick-the-meet backward calendar (60-day floor), peak without maxing, taper (cut volume / keep intensity), weigh-in and weight management, attempt-selection math, meet-day execution. Myth-vs-reality diff table, one-rule-you-can-act-on-tonight callout, 5-question FAQ + JSON-LD (Article + FAQPage), 3 numbered references (Bosquet 2007 taper meta-analysis; Pritchard et al. 2016 NZ elite powerlifters taper; 2020 Sports tapering/peaking review PMC7552788 — all verified real, no invented studies).
- New hero/card image: `public/images/blog/meet-prep-guide.jpg` (AI-generated, dark platform/spotlight/chalk shot matching site aesthetic, no text or logos)
- Blog index (`public/blog.html`): NEW group "Meet Prep & The Big Three" created with the pillar card, group count 01 ARTICLE (silo-architecture S4 now exists on the index; future K-spokes: squat programming, bench specialization, deadlift programming, peak/taper spoke)
- Sitemap updated with the new URL (lastmod 2026-09-23)
- Silo-next cards cross-link the periodization pillar + meet-day-nutrition (cross-silo by design: S4 sits between S2 and S3)
- No-orphan gate: added contextual inbound link to meet-prep-guide from the periodization cornerstone (fixes the previously dangling "week-by-week protocol is its own guide" forward reference)
- Push through the GitHub REST API (git-database; this shell has no git HTTPS credential); Vercel auto-deploy verified READY, URL verified 200 on www.cmstrength.fit.

### 2026-09-21 — Published F7/F8 (Fueling the Work: hydration/electrolytes, simple food systems)

- Third publish under the publish-direct policy; the Fueling the Work expansion
  is now COMPLETE — all eight F-topics (F1–F8) published. Writer drops back to
  ONE post per run; next up is the keyword-driven SEO cluster (K1–K10).
- New posts (33rd and 34th blog posts):
  - `public/blog/hydration-electrolytes-for-lifters.html` (F7) — the full
    hydration/electrolyte guide promised by the meet-day post: how much water a
    lifter actually needs, the pale-yellow rule, sodium as the electrolyte that
    matters, when electrolytes earn their spot (90+ min sessions, hot gyms,
    meet days, post-cut rehydration), the heavy-training-day protocol,
    caffeine as a mild diuretic, and the five mistakes that dry lifters out.
    https://www.cmstrength.fit/blog/hydration-electrolytes-for-lifters
  - `public/blog/simple-food-systems-for-lifters.html` (F8) — meal prep without
    the misery: protein-first anchoring, the four-meal rotation, the convenience
    stack (rotisserie chicken, microwave rice, frozen vegetables), eating the
    same things on purpose, and the mistakes that break the system.
    https://www.cmstrength.fit/blog/simple-food-systems-for-lifters
- New hero/card images: `public/images/blog/hydration-electrolytes-for-lifters.jpg`,
  `public/images/blog/simple-food-systems-for-lifters.jpg` (AI-generated, site aesthetic)
- Blog index (`public/blog.html`): added 2 FUELING cards, group count 08 -> 10 ARTICLES
- Sitemap updated with the 2 new URLs (lastmod 2026-09-21)
- Both posts carry BlogPosting + FAQPage JSON-LD and References citing the Academy
  of Nutrition and Dietetics sports nutrition position and the ACSM fluid-replacement
  position stand — health claims kept modest per plan
- Silo-next cards cross-link the full fueling set, both new posts included
- Push through the GitHub REST API (this shell has no git HTTPS credential);
  local main reset to origin/main afterwards. Vercel auto-deploy verified READY,
  both URLs returned 200 on www.cmstrength.fit.

### 2026-09-18 — Published F5/F6 (Fueling the Work: peri-workout fueling, meet-day nutrition)

- Second Friday publish under the publish-direct policy; fueling backlog now
  stands at F1–F6 published, F7/F8 remaining.
- New posts (31st and 32nd blog posts):
  - `public/blog/peri-workout-fueling.html` (F5) — the operations manual behind
    `carbs-for-powerlifting.html`: pre-training windows (3–4h / 1–2h), intra-workout
    carbs for 90+ min sessions, post-training carbs + protein, plus fixes for 5 AM,
    lunch-hour, and evening schedules. Deliberately practical (gram targets, real
    food) so it complements rather than duplicates the conceptual carbs post.
    https://www.cmstrength.fit/blog/peri-workout-fueling
  - `public/blog/meet-day-nutrition.html` (F6) — what to eat (and avoid) across an
    8–10 hour meet: graze-don't-feast between attempts, the nothing-new-on-meet-day
    rule, early-dosed caffeine, steady hydration, the five mistakes that cost
    lifters their deadlift, and a pack-the-cooler checklist.
    https://www.cmstrength.fit/blog/meet-day-nutrition
- New hero/card images: `public/images/blog/peri-workout-fueling.jpg`,
  `public/images/blog/meet-day-nutrition.jpg` (AI-generated, site aesthetic)
- Blog index (`public/blog.html`): added 2 FUELING cards, group count 06 -> 08 ARTICLES
- Sitemap updated with the 2 new URLs (lastmod 2026-09-18)
- Both posts carry BlogPosting + FAQPage JSON-LD and a References section citing
  the ISSN nutrient-timing position stand and the Academy of Nutrition and
  Dietetics sports nutrition position — health claims kept modest per plan
- Silo-next cards cross-link all six fueling posts
- Push through the GitHub REST API (this shell has no git HTTPS credential);
  local main reset to origin/main afterwards. Vercel auto-deploy verified READY,
  both URLs returned 200 on www.cmstrength.fit.

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
