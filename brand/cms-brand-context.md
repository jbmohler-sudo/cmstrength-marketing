# Center Mass Strength — Brand Context & Social Content Framework

> Single source of truth for @centermassstrength social voice, pillars, and formatting.
> The `cms-ig-weekly-batch` cron reads this file every Monday before drafting.
> Change brand rules HERE (edit + commit); do not bake new rules into individual post prompts.
> Last reviewed: 2026-09-01

## 1. Core identity & voice
- Brand: **Center Mass Strength (CMS)** — competition powerlifting app. Site: cmstrength.fit. App: app.cmstrength.fit.
- **Voice: direct, confident, coach-like. No fluff.** No corporate buzzwords ("game-changing", "synergy", "unleash", "elevate"), no rah-rah chest-thumping.
- We sound like an experienced coach talking to a serious lifter: specific, practical, a little dry, zero hype.
- **Never fabricate:** no fake testimonials, no invented people, no invented results, no invented workout data. Captions must be grounded in REAL app capabilities only (see §4).
- Audience: lifters 40+, masters competitors, and people returning to serious strength training who want to train smart and compete. The feeling we aim for: *"that could be me."*

## 2. Platform formatting

### Instagram (primary — live daily auto-publish)
- Cadence: daily 14:00 local, auto-published. Pinterest-style, **no approval gate** (Jeff's decision 2026-08-21; daily 7/wk since 2026-08-24).
- Caption: multi-line, **120–250 chars**, ending with the CTA line `www.cmstrength.fit`.
- Structure: hook (specific insight or moment) → what/why → outcome or takeaway → CTA.
- Hashtags: **2–4 max**, niche: `#powerlifting #competitionpowerlifting #strengthtraining` (+ occasional `#masterspowerlifting #powerliftingafter40`). Never a hashtag dump.
- Image: MUST come from the real asset library (§5) and be hosted via `tools/instagram-image-host.ts` so it's public and padded to IG's ratio.

### Facebook (planned — same voice, longer form)
- When the FB adapter ships: story-driven caption (challenge → approach → result), 1–3 short paragraphs, CTA to cmstrength.fit, 0–2 hashtags. Same no-fabrication rules.

## 3. Post pillars (rotate — no two consecutive posts the same pillar)
1. **App feature / how it works** — film room coach read, daily readiness score, adaptive target focus, training blocks. Show the product doing something real.
2. **Training insight / form tip** — a specific cue or fix a masters lifter would care about (joint load, submaximal work, RPE).
3. **Program explainer** — what Foundation / Strength / Peak blocks are, why the plan looks the way it does (e.g., paused competition bench waves).
4. **Lifter truth / coach philosophy** — relatable, honest moments about training at 40+; quiet competence over drama.

## 4. Real product capabilities (ground captions in these ONLY)
- Daily readiness score (tells you how to train today).
- Adaptive target focus: strength / mid-range / peak.
- Prescribed sessions with set/rep schemes (e.g., paused competition bench waves).
- Training blocks: Foundation / Strength / Peak.
- Film room with coach read: joint load block-vs-ceiling analysis.

## 5. Image rules (Jeff, 2026-08-28 — "human connection over spectacle")
- Prefer **real, believable human training moments**: lifter mid-squat with chalked hands, quietly packing a meet bag, focused faces, everyday gym authenticity. Viewer should think *"that could be me."*
- **Avoid macho-grit spectacle:** big dudes, dust and smoke, dramatic grinds, raging faces, rah-rah energy. Jeff's words: *"we have a lot of sensational ra ra ra big old dudes with dust n smoke... here i'd like a human connection."*
- Dark industrial gym backdrop stays — it's the backdrop, not the subject.
- Everyday lifter realism: plain singlet, fitted tee, worn-in gear. Not airbrushed fitness-model lighting.
- **People policy (Jeff, 2026-09-01):** marketing may use AI/fabricated people for DEMONSTRATIVE scenes — an actor logging a session, checking readiness, setting up a lift; anything the app really does. NEVER have a fabricated person make claims: no testimonials, no results ("this app fixed my X"), no "I love it" statements. Real assets stay preferred when they fit the scene.
- Real asset library (prefer when fitting):
  - Carousel: `C:/Umbrella/cmstrength-marketing/public/images/carousel/` (dashboard.webp, film-detail.webp, film-room.webp, joint-load.webp, joint-status.webp, readiness-volume.webp)
  - Other: `public/images/` (filmroom1.png, hero-deadlift.webp, bigweight.png, logo.png), `public/instagram.png`
  - Vary across posts; avoid repeating an image from the prior week's posts.

## 6. Hard rules
- CTA line on every post: `www.cmstrength.fit`
- Brand colors: near-black + red.
- Hashtags: 2–4 max on IG; never more.
- No cross-promotion of other products/brands on CMS social without Jeff's OK.
- Every post auto-publishes; the fire watchdog verifies it landed. If Jeff wants a post stopped, remove its one-shot cron.
