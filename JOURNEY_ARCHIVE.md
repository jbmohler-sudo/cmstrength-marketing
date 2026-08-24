# Center Mass Strength — Marketing Site Journey Archive

> Older session history from [JOURNEY.md](JOURNEY.md), newest first.

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
