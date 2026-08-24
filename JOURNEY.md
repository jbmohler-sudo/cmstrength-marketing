# Center Mass Strength — Marketing Site Journey

> The marketing site for CMS (www.cmstrength.fit) — a static site that converts serious
> lifters into app/beta users. The "loud outside" front door to the quiet, capable app.

> **Scope:** This journey covers the MARKETING SITE repo (`cmstrength-marketing`).
> The CMS app/product (the adaptive programming engine, `app.cmstrength.fit`) has its
> OWN journey in the `cms-completenew` repo. Keep them separate — engine decisions there,
> content/SEO/web-presence decisions here.

---

## Current State
> Updated: 2026-08-24

- **Phase / Stage:** Live at www.cmstrength.fit (Vercel, static HTML, main = production).
  Subscription funnel GO-LIVE complete: homepage reads as a paid product (14-day
  trial + $20/mo · $200/yr), zero beta copy site-wide, all CTAs → app signup.
  Blog is a real silo; SEO infra documented; GSC shows 15 indexed pages while the
  noncanonical apex-host sitemap submission remains stale.
- **What's live:** Marketing site ("Rugged Pro" spec — true-black bg, ember accent;
  blog uses warmer charcoal/ember built on cms.css). Blog at `/blog` with 11 posts organized
  as an editorial index (featured pillar + grouped sections: Masters / Programming / Fueling).
  `docs/SEO.md` is the SEO source of truth. GSC uses the Domain property. `robots.txt`
  points to canonical `sitemap.xml`.
- **What's in progress:** The direct-200 `https://www.cmstrength.fit/sitemap.xml` URL is
  submitted in GSC. Its Sitemaps report is still processing/failing, but URL Inspection's
  live test confirms the canonical XML endpoint is currently available to Google.
- **What's next:** Do not resubmit. Let Google process the existing sitemap entry, then
  re-check its status after the reporting queue catches up.
- **Biggest open question:** none with teeth.

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

---

## Open Questions

- [ ] Add more "Fueling the Work" blog articles (pillar has only 1).
- [ ] Decide whether the homepage should canonicalize www vs non-www at the Vercel
  domain level (already redirects; just confirm www is set primary).

---

## Session Log
> Appended after every working session. Most recent first.

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

### 2026-08-15 — Subscription funnel: beta framing → paid product

**Did:** Replaced the beta funnel with a subscription funnel per the CMS Subscription
Funnel plan (Phase 5, marketing side). Hero primary CTA `Claim Beta Slot` →
`Start Free Trial` → app signup; all three track-card buttons → `Start Free Trial`;
`#join-beta` section replaced with `#pricing` (Monthly $20/mo · Annual $200/yr with
BEST VALUE highlight, "14-day free trial · No card required · Cancel anytime" line,
feature strip, one lead CTA); deleted the Supabase beta-signup script block
(no more `beta_signups` inserts from the marketing site); FAQ "free trial" answer
rewritten + "Can I cancel anytime?" added; footer → "Start your 14-day trial" →
`/index#pricing`; added mobile full-screen nav overlay (hamburger ≤1024px, active
underline, Escape/scroll-lock/focus mgmt mirroring the INSIDE modal); signup.html
reframed ("You're In", trial line, link-expired → app signup); terms.html updated
(subscription pricing, 14-day trial, auto-renewal, cancel-anytime, no-refund-for-
partial-periods, grandfathered-beta note, last-updated Aug 15 2026).
**Decided:** (locked in plan Phase 0 by Jeff) D1 $20/mo · $200/yr, D2 no card during
trial, D3 beta users grandfathered free-for-life, D4 single plan gates whole app,
D5 past_due → 7-day grace → auto-lock.
**Killed:** Beta signup form + Supabase JS on the homepage; all beta/join framing.
**Deferred:** Push to origin/main (Vercel deploy) — held for go-live with the app.
**State after:** Homepage reads as a subscription product; no user-facing "beta"
copy remains (`grep -ri beta public/index.html` = CSS class reuse only); HTML
validated (parser, no unclosed tags).
**Next:** Go-live phase — push marketing + app together; live Stripe flip; $1 smoke
test.

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
