# Center Mass Strength — SEO Master Reference
**Created:** June 15, 2026

Single source of truth for cmstrength.fit SEO strategy, content rules, and the
portfolio link model. Parallels `ironatforty/docs/SEO.md` and
`WizeMeals/docs/WizeMeals_SEO_Master.md` — every property now has one.

---

## 1. Strategic Position

Center Mass Strength (CMS) is a **premium adaptive powerlifting programming app**
(cmstrength.fit marketing site → app.cmstrength.fit). It is a *product site*, not a
content farm. Its SEO job is to rank for high-intent powerlifting/programming
searches and convert serious lifters into beta/app users — not to chase volume.

- **Product:** Adaptive programming driven by three engines — Macrocycle (Bench
  Specialization v2 is a fixed 12-week 3/1/3/1/3/1 skill → deload → strength →
  deload → peak → deload/test schedule; SBD is meet-date-driven), Load
  (percentage-based, MEV→MRV corridor), and Readiness (daily
  stress/sleep/fatigue + joint pivots).
- **Audience:** Serious lifters and masters athletes (heavy skew 40+) who program
  deliberately and care about recovery, not gym-bro hype.
- **Voice:** "Rugged Pro." Functional data over marketing fluff. The No-BS rule —
  if it doesn't help the lifter hit a PR, it's secondary.
- **Brand:** True-black bg, cyan-glow accent, bold italic headers. (Note: the BLOG
  uses the warmer charcoal/ember treatment built on cms.css tokens.)

### Why CMS stays "pure" (the portfolio role)
CMS is a premium product whose domain authority must be protected. It does NOT run
automated/volume content. That risk is absorbed by **IronAtForty** (the hub
authority site), which links DOWN to CMS. See §4.

---

## 2. The Portfolio Link Model (relaxed Sept 16, 2026)

Three properties, one hub:

```
        IronAtForty (HUB · ironatforty.com)
        Jeff's openly-owned authority site.
        Links freely to BOTH products.
              │                    │
              ▼                    ▼
   Center Mass Strength      WizeMeals
   (pure product)            (pure product)
```

**History:** the old strict-isolation rule ("products stay walled, never link each
other") was a precaution for IronAtForty's automated publishing run (Sept 2026) —
Jeff worried automation might dirty its link profile. The profile came back clean,
so the restriction is **lifted** as of Sept 16, 2026. It was IronAtForty-specific,
not a standing portfolio law.

- **IronAtForty is link-out only:** IAF may link down to CMS, WizeMeals, etc. But no
  portfolio property links TO ironatforty.com — Jeff doesn't want inbound links
  pointing at it.
- **Cross-linking between the other properties is now allowed** where editorially
  natural (CMS ↔ WizeMeals, masonry → Doghouse, etc.). A CMS post referencing a
  WizeMeals tool, or a masonry footer crediting Doghouse Web, is fine.
- **Credit/boilerplate footer links stay nofollow** (e.g. "Built by Doghouse Web"
  → doghouseweb.com). Nofollow on boilerplate; follow is fine on genuine
  editorial links.
- **CMS outbound (external):** **authority-first** — PubMed, .gov, .edu,
  peer-reviewed journals, recognized expert orgs. Sibling products are fine where
  relevant; never competitors, never commercial link schemes. Authority citations
  make the product site *more* credible (see the Lally 2010 / Morton 2018
  citations added to the nutrition-is-a-skill post).
- **CMS internal:** link freely to its own pages (/blog, /index#engines, /methodology,
  app.cmstrength.fit).

> Sept 16, 2026: the two "violations" flagged in the portfolio audit (CMS
> carbs-for-powerlifting post → WizeMeals ×2; masonry footer → Doghouse Web) are
> compliant under this relaxed rule. Do not strip them; do not re-flag.

---

## 3. Content Strategy

CMS content is hand-built, deep, and on-topic — the opposite of IAF's volume play.
The blog (`/blog`) is organized as an editorial index (featured pillar + grouped
sections), deliberately NOT mirroring IAF's pillar-chip filter layout (avoid
near-replica sibling sites).

### CMS-native taxonomy (no overlap with IAF's pillars)
- **The Masters Track** — powerlifting-over-50-readiness (pillar), heavy-lifting-after-50, joint-load-management
- **Programming & Periodization** — submaximal-training, macrocycle-explained, program-comparison
- **Fueling the Work** — nutrition-is-a-skill

### Content rules
- Every post earns its place against the No-BS rule.
- Cite authority sources for any factual/scientific claim (PubMed-grade).
- Internal-link within the silo (pillar ↔ spokes) + to the relevant engine
  (/index#engines, /index#programs) + an app CTA.
- FAQ + Article schema on posts where it fits.
- Never reference sibling products.
- **Word-count method (2026-08-16):** Python `html.parser` strip of the first
  `<article>` element (tags removed, entities unescaped, whitespace collapsed,
  split on whitespace = words). All CMS blog word counts use this measure; the
  previously documented counts (e.g. macrocycle-explained 1,135) are not
  reproducible under it.

### Conversion funnel (since 2026-08-15)
- The homepage beta funnel was replaced with a subscription funnel:
  marketing CTA → `https://app.cmstrength.fit/signup` → onboarding → `/checkout`
  → Stripe Checkout (14-day trial, no card) → app.
- Pricing lives in the `#pricing` homepage section ($20/mo · $200/yr) — single
  source, updated once.
- The marketing site never touches Stripe or Supabase directly — no secrets, no
  auth state; all billing is app-side (see `cms-completenew`). Stripe checkout
  links are transactional, not editorial, so the authority-only outbound rule
  is unaffected.

---

## 4. Technical SEO

### Hosting & domains
- Vercel (main branch = production). Marketing: `www.cmstrength.fit`. App:
  `app.cmstrength.fit`. `vercel.json`: cleanUrls + no trailing slash.
- **Canonical host is `www`.** All sitemap `<loc>` URLs and canonicals use
  `https://www.cmstrength.fit/...`. Bare `cmstrength.fit` 301-redirects to `www`.

### Schema
- `Article` schema on blog posts; `SoftwareApplication`/`FAQPage` where relevant.

### Sitemap & robots
- `public/sitemap.xml` — flat, all `www` URLs. Update when adding pages.
- `public/robots.txt` — `Allow: /`, disallows /app, /.env, /backburner; declares the
  sitemap.

---

## 5. Google Search Console — THE FIX (Jun 15, 2026)

> **The two-week "Couldn't fetch / could not be read" sitemap saga, solved.**

**Root cause:** The GSC property was a bare-domain **URL-prefix** property for
`cmstrength.fit`, but the entire site (and every sitemap `<loc>`) lives on
`www.cmstrength.fit`. Google couldn't reconcile ownership across the host mismatch →
reported the sitemap as unreadable. The sitemap, robots.txt, and pages were all
verified healthy (clean 200, valid XML, no BOM, robots Fetched on all 3 host
variants, live URL test = "available to Google / can be indexed"). Nothing was
broken in code.

**The fix:** Created a DNS-verified **Domain property** for `cmstrength.fit` (auto-
verified via the domain provider). A Domain property covers www + non-www + all
subdomains, eliminating the host mismatch. Submitted
`https://www.cmstrength.fit/sitemap.xml` to it.

**Lessons (don't re-fight this):**
- For any site that canonicalizes to `www`, use a **Domain property**, not a bare
  URL-prefix property.
- "Sitemap could not be read" is often **stale status**, not a live failure — verify
  with URL Inspection → Test Live URL before touching anything.
- Do NOT repeatedly remove/resubmit the sitemap — it can reset Google's processing
  queue. Submit once on the correct property, then wait.
- To accelerate indexing on a freshly-connected property, use **URL Inspection →
  Request Indexing** on key pages (~10–12/day limit). Faster than sitemap-only
  discovery.

---

## 6. Monitoring

- **GSC (Domain property `cmstrength.fit`):** impressions, CTR, indexation coverage,
  sitemap status. Request-index key pages after any major content push.
- **Keywords to own:** "adaptive powerlifting programming," "powerlifting over 50,"
  "macrocycle / block periodization app," "readiness-based training," "submaximal
  training," "powerlifting program for older lifters."
- **Review cadence:** weekly GSC (new rankings, coverage); monthly (CTR, position,
  app conversions).

---

*CMS is the premium product the portfolio protects. Volume risk lives on IronAtForty.
Keep CMS pure: no sibling-product links, authority-only outbound, hand-built content
that earns its place.*
