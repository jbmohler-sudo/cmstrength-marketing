# Center Mass Strength blog voice

Source of truth for posts. Distilled from `MASTER_MANIFEST.md`, `docs/SEO.md`, and `DESIGN_ANTI_SLOP.md`, plus the live After-40 posts that already run this voice. If those files disagree with this one, the older docs win until Jeff updates both.

This is a drafting guide. Do not invent a new voice. Match what is already on the site.

## Brand

- On-page brand: Center Mass Strength (CMS). Tagline: Adaptive powerlifting programming.
- Site: https://www.cmstrength.fit — canonical `www`. App: https://app.cmstrength.fit
- Product: premium adaptive powerlifting programming. Marketing site converts serious lifters into app users. Not a content farm.
- Jeff Mohler is never named on the site. JSON-LD `author` is the Organization (`Center Mass Strength`). No bylines, no `datePublished`, no first-person training diary, no Jeff PRs. On-page meta is the org plus a read time (`Center Mass Strength · 15 min read`).

## Voice name

**Rugged Pro.** Functional data over marketing fluff.

**No-BS rule:** if it doesn't help the lifter hit a PR, it's secondary. Every post earns its place against that rule. Adaptive programming is powerful; it is not magic. State limits as plainly as benefits.

## Audience

Serious lifters and masters 40+ (men and women). After-40 is the editorial center of gravity; 50+ is its own silo (The Masters Track). Recovery is the constraint; capacity is intact. Joints and tendons lag muscle. The answer is submaximal work plus readiness, not "do less."

The buyer trigger: a fixed program stopped matching the day.

## Person and sentences

- Second-person **you**. Occasional **we** / **CMS** for the product. First-person **I** is rare and rhetorical, never memoir.
- Mix 8–15 word punches with 25–40 word evidence sentences. Short line names the fear or the flip; longer line carries the citation or the mechanism.
- H1s often end with a period (`How to Powerlift After 40.` / `The Strength Blog.`).
- Dek (`hero-sub`) is a one-line thesis, not a teaser.
- Open by naming the fear or myth, then flipping it. Do not open with the product.

Live pattern (pillar): name the "window closed" story → "It's not true" → the actual problem is a 25-year-old's program on a 40-year-old body → recovery mismatch → the fix isn't doing less.

## How a post is built

Use the shapes already on the live posts. Not every block in every piece, but this is the house kit:

1. **Fear/myth open** — the uncomfortable question, stated straight.
2. **Myth vs Reality table** (`diff-table`: Myth | Reality) when the topic is a belief, not a how-to step.
3. **Numbered principles** or a short rule list the reader can run this week.
4. **One rule you can act on tonight** — callout, concrete, loggable. Example: four numbers after every session (weight, reps, RPE, one line on the joints).
5. **Authority citations** — PubMed / `.gov` / `.edu` / peer-reviewed. Numbered References block at the end. No invented studies.
6. **FAQ block** — real questions a 40+ lifter would type. FAQ + Article schema where it fits.
7. **KEEP READING** — two related posts in the same silo (`silo-next`).
8. **Product CTA after the argument, never graf 1.** Close the case, then sell.

House CTA headline: **Stop guessing your intensity.**

Trial copy: 14-day free trial, no card, then $20/mo or $200/yr → https://app.cmstrength.fit/signup

Almost every post: *If a program expects you to guess, it's expecting too much of you.*

Engine claims only: readiness check-in, ±5% load band, scheduled week-four deload, joint-load / MRJV, RPE as reps in reserve, training max that updates slowly. No "users added X lbs." No testimonials. No invented outcomes.

**Medical stance:** general training information, not medical advice. Point unexplained symptoms and managed conditions to a clinician. Do not diagnose.

## Taxonomy (CMS-native — do not copy IronAtForty pillars)

Live hub groups. File the draft in one of these. Do not invent a sixth pillar and do not reuse IAF pillar names.

| Silo | Center of gravity |
|---|---|
| **The After-40 Track** | Editorial center. What changes at 40, safety, frequency, expectations, women/masters divisions, after-40 fueling and technique. Featured "START HERE" pillar today. |
| **The Masters Track** | 50+ as its own silo. Readiness after 50, heavy lifting after 50, joint-load / MRJV. |
| **The Adaptive System** | Product wedge: readiness, RPE, training max vs 1RM vs e1RM, the program that reads the day. |
| **Programming & Periodization** | Macrocycle, blocks, submaximal work, program comparison, sleds, meet-date planning. |
| **Fueling the Work** | Nutrition as a trained skill. Cite Morton / Lally-grade sources. CTA still goes to the app. |

Internal links: spoke ↔ cornerstone in the same silo, plus the relevant engine (`/index#engines`, `/index#programs`) and the app CTA. Cross-silo only when the topic actually requires it (after-40 → over-50 readiness; joint-load ↔ Adaptive).

## Say

These lines are already on the site. Reuse them; don't paraphrase them into mush.

- You're not too old — you're running a 25-year-old's program on a 40-year-old body.
- The fix isn't doing less. It's doing the right amount on the right day.
- Outlast, out-program, out-recover.
- Muscle tells you when it's tired. Connective tissue doesn't.
- Stop asking how heavy can I go today. Start asking what can I recover from and repeat.
- If a program expects you to guess, it's expecting too much of you.
- Stop guessing your intensity.
- RPE isn't a feeling — it's reps in reserve.
- Load against readiness, not against the calendar.
- The barbell isn't the risk. The gap between what you can lift and what you're prepared to lift is.

## Don't say

- Gym-bro hype. "Just train harder." "You're too old."
- "Do less after 40" as the answer. Smarter / right amount on the right day — not lighter forever.
- Bro-science (BCAAs, test boosters, proprietary fat-burners).
- Cardio-and-core wellness framing. This is a powerlifting product.
- Guaranteed numbers, invented results, fake testimonials, "users added X lbs."
- Medical diagnosis or treatment advice.
- Marketing buzzwords: supercharge, streamline, empower, world-class, enterprise-grade, next-generation. Say what the product literally does.
- Theater framing ("that's just theater"). Generated-copy tic. Banned in `DESIGN_ANTI_SLOP.md`.
- First-person training diary. Jeff's lifts. Named founder story.

## Link rules (have teeth)

CMS is a **pure product site**. The footprint risk is two of Jeff's properties looking related in public. The hub does the connecting. This site stays walled.

- **NEVER** link or mention IronAtForty or WizeMeals. Not in body, FAQ, footer, schema, or image alt.
- **Outbound:** PubMed / `.gov` / `.edu` / peer-reviewed journals / recognized expert orgs — or the CMS app. Never competitors, never sibling products, never commercial supplement shops.
- **Internal:** silo (pillar ↔ spokes) + engines/programs + app CTA (`https://app.cmstrength.fit/signup`).
- **Tools hub exists** (`/tools`: 1RM, DOT, Wilks, total, meet-day checklist, readiness scorecard). Footer can list tools. Live posts almost never in-body tool CTAs. Don't force a calculator link unless the post is actually about that number.
- Anchor text is a natural phrase, not "click here" / "read more." Don't farm links.

## Copy mechanics (from `DESIGN_ANTI_SLOP.md`)

- No marketing buzzwords. Say the mechanism.
- **Em dashes:** more than a couple per page is an AI cadence tell. Tighter than WizeMeals' 1/200 rule — keep CMS lean. Prefer a period or a comma.
- No aphoristic-cadence loops ("Not a feature. A platform."). Once can land; a page of them is the tell.
- No volume / automated content. Hand-built, on-topic, citation-backed.

## Never

- Volume or automated content. CMS is not the portfolio's volume sink.
- Sibling-product links or mentions.
- Fake dates, bylines, or a named human author on-page.
- Invented outcomes, invented citations, or engine claims the product does not make.
- Opening graf 1 with a product pitch.

## Draft checklist

Before a post is done:

- [ ] Second person. No Jeff. No memoir.
- [ ] Opens on the fear/myth, not the app.
- [ ] Every factual claim has a PubMed / `.gov` / `.edu` citation, or it comes out.
- [ ] CTA is after the argument. House line + 14-day trial + signup URL.
- [ ] Two KEEP READING cards in-silo.
- [ ] Filed in a CMS-native silo above — not an IAF pillar name.
- [ ] Zero IronAtForty / WizeMeals mentions.
- [ ] Medical line present if the post touches injury, hormones, or clearance.
- [ ] Em dashes counted. Buzzwords scanned. No guaranteed numbers.
