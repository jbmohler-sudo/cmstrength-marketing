# Center Mass Strength — Marketing Site Journey

> The marketing site for CMS (www.cmstrength.fit) — a static site that converts serious
> lifters into app/beta users. The "loud outside" front door to the quiet, capable app.

> **Scope:** This journey covers the MARKETING SITE repo (`cmstrength-marketing`).
> The CMS app/product (the adaptive programming engine, `app.cmstrength.fit`) has its
> OWN journey in the `cms-completenew` repo. Keep them separate — engine decisions there,
> content/SEO/web-presence decisions here.

---

## Current State
> Updated: 2026-08-28

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

---

## Open Questions

- [ ] Add more "Fueling the Work" blog articles (pillar has only 1).
- [ ] Decide whether the homepage should canonicalize www vs non-www at the Vercel
  domain level (already redirects; just confirm www is set primary).

---

## Session Log
> Appended after every working session. Most recent first.

### 2026-08-28 — GSC sitemap fetch war: DNS migration + host-keyed theory

**Did:** Exhausted the remaining fetch theories on the never-downloaded GSC sitemap
(`lastDownloaded: None` since 7/30 on every URL/property): URL Inspection shows
`pageFetchState: SUCCESSFUL` on the homepage (15 pages indexed) so Google CAN reach the
site; every Google fetcher UA returns 200; IPv6 ruled out (approved sites have no AAAA
either); new URL-prefix property showed "Couldn't fetch" (network-level). Migrated
cmstrength.fit DNS from Vercel nameservers → Namecheap BasicDNS (only portfolio site on
Vercel DNS; 100% correlation with the only sitemap-fetch failure). Rebuilt full zone at
Namecheap and verified live: CNAME www + app → Vercel edge, apex A 216.198.79.65 → 307 →
www (Vercel binding), MX ImprovMX @ + SES `send`, SPF @ + `send`, google-site-verification,
Resend DKIM, CAA ×3, old efwd SPF auto-cleared by Custom MX switch. Sitemap serves
`200 application/xml` end-to-end through the new apex chain.
**Decided:** DNS migration locked (was the last testable differentiator). Sitemap served
from fresh subdomain `sitemap.cmstrength.fit` to test host-keyed failure (WizeMeals' blog
sitemap on `blog.wizemeals.com` proves separate hosts get clean slates).
**Killed:** The "file/config/DNS is broken" theories — every one verified healthy.
**Deferred:** Push commit `1301229` (sitemap-2026.xml + robots) — still local, will push
with the next deploy. Hermes update (real-profile browsing) blocked on Windows .pyd locks.
**State after:** Domain fully on Namecheap BasicDNS, zone verified live from outside;
`sitemap.cmstrength.fit` bound to marketing project on Vercel; GSC still shows red
"Couldn't fetch" on both properties (pre-DNS-move results).
**Next:** Add CNAME `sitemap` → `cname.vercel-dns-017.com.` at Namecheap; verify the
subdomain serves 200; submit `https://sitemap.cmstrength.fit/sitemap-2026.xml` to the
Domain property; watch `lastDownloaded`.

### 2026-08-24 — Eliminate duplicate sitemap drift

**Did:** Removed the stale physical `public/sitemap-main.xml` duplicate and added a permanent
Vercel redirect from `/sitemap-main.xml` to canonical `/sitemap.xml`. Confirmed the canonical
sitemap remains the only robots-advertised source and the only file publishers must update.
**Decided:** `sitemap.xml` is the sole physical sitemap; the legacy name is compatibility-only.
**Killed:** Manual synchronization of two sitemap files.
**Deferred:** Google-side sitemap processing; repeated submission would only reset the queue.
**State after:** Commit `46a78f1` is on `origin/main` and deployed READY in Vercel. Production
returns one `308` from `/sitemap-main.xml` to `/sitemap.xml`; the canonical endpoint returns
the repository XML as `200 application/xml` to Googlebot. GSC already has the canonical URL
submitted, and its Aug 24 live inspection reports "URL is available to Google."
**Next:** Leave the existing GSC submission alone and monitor for the Sitemaps report to update.

### 2026-08-16 — Cornerstone review pass + publish (4 drafts)

**Did:** Ran a full review pass on the first cornerstone draft set (01 Adaptive, 02 Masters
Link-Hygiene, 03 Periodization, 04 Nutrition) — CORE-EEAT-style audit (dead links, em-dash
budget, product claims vs engine ground truth). Fixed: IPF claim corrected to what the source
supports (masters divisions extend into the 70-plus classes), Bench v2 canonicalized at 12 weeks
(3/1/3/1/3/1) in Draft 03 + `program-comparison` + FAQ copy (builder-verified against
`buildMacrocycle`/FAQ.jsx), all em-dash budgets brought under 2/400, dead spoke links deferred
(not deleted — re-add at spoke publish), word-count figures corrected (02's 2,052 claim was not
reproducible; true 1,319, floor waived by Jeff 2026-08-16). Review re-audit: blocker set empty.
Published under Jeff approval: 01 → `/blog/what-is-adaptive-powerlifting-programming` (new),
03 → `/blog/the-complete-guide-to-powerlifting-periodization` (new) + `macrocycle-explained`
converted to redirect + 5 inbound links retargeted + sitemap updated, 04 → replaced
`nutrition-is-a-skill` (same slug, expanded). Added blog cards + SEO.md word-count method log.
**Decided:** word-count floor waived for established solid articles (never pad); 02's
`powerlifting-over-50-readiness` stays at 1,319.
**State after:** pushed to `origin/main` (Vercel deploys) — commit SHA on Content's report.
**Next:** GSC recheck after deploy; GA4 wiring for CMS (Jeff, 2026-08-17).

### 2026-08-16 — Beta copy sweep + go-live push

**Did:** Killed the remaining beta framing that Phase 5 missed — every page outside
`index.html` still carried `CLAIM BETA SLOT` nav buttons, `#join-beta` footer links,
and beta CTA copy (16 files: blog posts, contact, privacy, tools, methodology
subpages). Global exact-string sweep + targeted patches → all CTAs now
`Start Free Trial` → `https://app.cmstrength.fit/signup`, footer copy → 14-day
trial. Verified `grep -ri beta public/` = clean on live pages (backup files
excluded). Pushed 3 unpushed funnel commits + sweep (9f2bef5 → origin/main);
Vercel deployed. Live smoke test confirmed the whole funnel (app checkout →
Stripe trial → webhook → `trialing` → portal cancel sync).
**Decided:** none new — executed locked Phase 5/7.
**Killed:** last `#join-beta` anchors and beta wording site-wide.
**State after:** www.cmstrength.fit reads as a subscription product end-to-end.

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

## 2026-09-15 — Published "TDEE for Lifters" (F2, Fueling the Work)

- New post: `public/blog/tdee-for-lifters.html` (27th blog post), live at
  https://www.cmstrength.fit/blog/tdee-for-lifters
- New hero/card image: `public/images/blog/tdee-for-lifters.jpg` (AI-generated,
  dark food-scale + meal-prep shot matching site aesthetic)
- Blog index (`public/blog.html`): added FUELING card, group count 02 -> 03 ARTICLES
- Sitemap updated with the new URL (lastmod 2026-09-15)
- Pre-publish fix (Jeff's call): deficit line corrected — the draft claimed a
  300-500 kcal deficit yields 0.5-1%/week, which the math doesn't support.
  Published as "roughly 0.5-1 lb per week, about 0.3-0.5% of bodyweight for most
  lifters." Lesson: percentages are relative to bodyweight; don't print a blanket
  % claim without tying it to pounds.
- Silo-next cards link to existing fueling posts only (nutrition-is-a-skill,
  carbs-for-powerlifting, nutrition-for-powerlifters-after-40,
  nutrition-for-female-powerlifters-over-40). Protein post (F1) still a draft —
  add the cross-link when it publishes.

## 2026-09-16 — Pinterest domain verification tag added

- Added `<meta name="p:domain_verify" content="9f2ad6bd4961c7503fddda9d989c4eec"/>`
  to `public/index.html` head, so Jeff can claim cmstrength.fit on the new
  separate Center Mass Strength Pinterest business account. Tag was not present
  before; verified by grep.

## 2026-09-16 — Published F1/F3/F4 (Fueling the Work) under new publish-direct policy

- Jeff gave standing approval: the blog writer now publishes directly on its
  Mon/Wed/Fri runs and notifies him in chat; no more pre-approval, 5 PM review
  job retired. This is the first publish under that policy.
- New posts (all live, verified 200 on www.cmstrength.fit):
  - `public/blog/protein-for-powerlifters.html` (F1) — daily targets, per-meal
    distribution, training-day timing. https://www.cmstrength.fit/blog/protein-for-powerlifters
  - `public/blog/smart-surplus-for-lifters.html` (F4) — how to run a smart
    surplus. https://www.cmstrength.fit/blog/smart-surplus-for-lifters
  - `public/blog/recomposition-for-powerlifters.html` (F3) — who recomp works
    for, how to run it, when to pick a direction. https://www.cmstrength.fit/blog/recomposition-for-powerlifters
- New hero/card images: `public/images/blog/{protein,smart-surplus,recomposition}-for-powerlifters.jpg`
  (AI-generated, matching site aesthetic)
- Blog index (`public/blog.html`): added 3 FUELING cards, group count 03 -> 06 ARTICLES
- Sitemap updated with the 3 new URLs (lastmod 2026-09-16)
- Silo-next cards cross-link the four fueling posts (tdee, protein, smart-surplus,
  recomposition) + carbs-for-powerlifting / nutrition-for-powerlifters-after-40 —
  fulfilling the "add the cross-link when it publishes" note from Sept 15
- Pre-publish fixes (from review): protein post 250-lb low-end corrected
  182 -> 181 g/day (113.4 kg x 1.6 = 181.4); surplus range standardized to
  200-300 cal to match the live TDEE post (draft said 200-400)
- Slugs: `smart-surplus-for-lifters` chosen over the longer
  `eating-to-build-muscle` variant, consistent with short existing slugs
- Stale TDEE draft archived out of the drafts folder (it was already live);
  all four published draft files now in the content-outreach-engine goal's
  hidden_files/ so they can't be republished
- Push went through the GitHub REST API (git-database) because this shell has
  no git HTTPS credential; local main reset to origin/main afterwards. Vercel
  auto-deployed commit ab286fd — deployment READY, all three URLs verified live.

## 2026-09-18 — Published F5/F6 (Fueling the Work: peri-workout fueling, meet-day nutrition)

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
