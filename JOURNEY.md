# Center Mass Strength — Marketing Site Journey

> The marketing site for CMS (www.cmstrength.fit) — a static site that converts serious
> lifters into app/beta users. The "loud outside" front door to the quiet, capable app.

> **Scope:** This journey covers the MARKETING SITE repo (`cmstrength-marketing`).
> The CMS app/product (the adaptive programming engine, `app.cmstrength.fit`) has its
> OWN journey in the `cms-completenew` repo. Keep them separate — engine decisions there,
> content/SEO/web-presence decisions here.

---

## Current State
> Updated: 2026-06-15

- **Phase / Stage:** Live at www.cmstrength.fit (Vercel, static HTML, main = production).
  Blog is a real silo; SEO infra now documented + GSC fixed.
- **What's live:** Marketing site ("Rugged Pro" spec — true-black bg, cyan-glow accent;
  blog uses warmer charcoal/ember built on cms.css). Blog at `/blog` with 7 posts organized
  as an editorial index (featured pillar + grouped sections: Masters / Programming / Fueling).
  `docs/SEO.md` is the SEO source of truth. GSC fixed (Domain property).
- **What's in progress:** Nothing active.
- **What's next:** Request-index key www pages; let the sitemap status catch up. Optionally
  add more "Fueling the Work" blog articles (only 1 so far).
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

---

## Open Questions

- [ ] Add more "Fueling the Work" blog articles (pillar has only 1).
- [ ] Decide whether the homepage should canonicalize www vs non-www at the Vercel
  domain level (already redirects; just confirm www is set primary).

---

## Session Log
> Appended after every working session. Most recent first.

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
