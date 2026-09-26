# Center Mass Strength — Marketing Site Journey Archive

> Older session history from [JOURNEY.md](JOURNEY.md), newest first.

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

### 2026-09-16 — Published F1/F3/F4 (Fueling the Work) under new publish-direct policy

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

### 2026-09-16 — Pinterest domain verification tag added

- Added `<meta name="p:domain_verify" content="9f2ad6bd4961c7503fddda9d989c4eec"/>`
  to `public/index.html` head, so Jeff can claim cmstrength.fit on the new
  separate Center Mass Strength Pinterest business account. Tag was not present
  before; verified by grep.

### 2026-09-15 — Published "TDEE for Lifters" (F2, Fueling the Work)

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

### 2026-07-14 - GSC sitemap cleanup and canonical sitemap alignment

**Did:** Investigated GSC's stale "Sitemap could not be read" report for
`https://www.cmstrength.fit/sitemap-main.xml`. Live Vercel headers/body verified
healthy (`200 OK`, `application/xml`, 15 URL entries before cleanup), while GSC
Page Indexing already showed 11 indexed pages, so the sitemap report was not blocking
indexation. Updated `robots.txt` to advertise canonical `sitemap.xml`; added missing
live crawlable URLs (`/blog/sled-drags`, `/tools/dot-score`, `/tools/1rm-calculator`);
kept `sitemap-main.xml` byte-for-byte identical to `sitemap.xml` so the old submitted
entry still resolves cleanly.
**Decided:** Use `sitemap.xml` as the canonical sitemap name; keep `sitemap-main.xml`
as a compatible duplicate until GSC no longer needs the old submitted entry.
**Killed:** Duplicate sitemap naming as the primary robots signal.
**Deferred:** Deploy/push and then submit/request fresh processing in GSC.
**State after:** Both sitemap files validate as XML and contain 18 URLs; robots points
to `https://www.cmstrength.fit/sitemap.xml`.
**Next:** Deploy the change, then in GSC submit `https://www.cmstrength.fit/sitemap.xml`
and optionally leave the old `sitemap-main.xml` entry alone until the new one reads
successfully.

### 2026-06-15 — Nutrition blog article, blog restructure, link-purity, GSC fix, SEO doc

**Did:**
- Wrote "Your Nutrition Is a Skill, Just Like Your Bench" (`public/blog/nutrition-is-a-skill.html`)
  in the CMS template — nutrition framed as a trainable skill, engine refs, authority-cited
  (Lally 2010 / Morton 2018 via PubMed/Wiley). Registered in `blog.html` + `sitemap.xml`,
  inbound link from submaximal-training, hero image added.
- Restructured `blog.html` from a flat card grid into an editorial layout (featured pillar +
  3 labeled sections), deliberately distinct from IronAtForty's filter-chip blog.
- Enforced link purity: removed a WizeMeals link that had slipped into the nutrition article
  (CMS never links siblings); outbound now authority-only.
- **Solved the ~2-week GSC "sitemap couldn't be read" problem.** Root cause was the GSC
  property type, NOT the sitemap — a bare-domain `cmstrength.fit` URL-prefix property while
  the site lives on `www.cmstrength.fit` (host mismatch). Fix = DNS-verified **Domain
  property**. Verified healthy: live URL test "available / can be indexed", robots Fetched on
  all 3 host variants, sitemap clean 200/valid XML.
- Created `docs/SEO.md` (portfolio link model, content strategy, the GSC fix lesson).
**Decided:** See Decisions Log — pure-product-site link rules, editorial blog layout,
www-canonical, Domain property for GSC.
**Learned:** For a www-canonical site, always use a GSC Domain property. "Sitemap couldn't
be read" is often stale status — verify with URL Inspection → Test Live URL before touching
anything. Don't spam-resubmit a sitemap (resets Google's queue).
**Next:** Request-index key www pages; let the sitemap status catch up; add Fueling articles.
