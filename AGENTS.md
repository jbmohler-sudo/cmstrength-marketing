# AGENTS.md — Center Mass Strength (marketing site + blog)

Operating rules for **every** agent working in this repo: Meta Muse and other cloud agents,
Claude Code, Cursor, Codex. Read this whole file before changing anything. The shared sections
are identical in all of Jeff's repos. The project sections at the end are specific to this one.

**What this is:** the static marketing site and blog for CMS (`www.cmstrength.fit`), hosted on
Vercel. The app is a separate repo, `cms-completenew`.

## Start of every session

1. **Sync first.** `git fetch && git status -sb`, and pull if you're behind. Work happens in
   several places (Meta Muse and other cloud agents, plus Claude Code and Cursor on Jeff's
   machine), so a stale checkout is normal.
2. **Install if the lockfile moved.** If `package-lock.json` changed in the pull, run `npm ci`.
3. **Read `JOURNEY.md`:** Current State, Hard Rules, and the newest Session Log entry.
4. Paths like `C:\Umbrella\...` or `../...` exist only on Jeff's machine. If you can't open
   one, nothing in this file depends on it.

## Shipping (the same rule in every one of Jeff's repos)

- **`main` is production.** Vercel deploys every push to `main`, and on Jeff's machine a daily
  backup pushes any commit on `main`. So **committing to `main` is releasing**, wherever you run.
- Commit to `main` only when **both** are true:
  1. this repo's checks pass (see **Verify before committing**), and
  2. Jeff asked for this work to go live: the task itself, or "ship it", "publish", or "push".
  If you're not sure, ask.
- Everything else goes on a **branch**: work in progress, experiments, anything not cleared. The
  backup never pushes branches.
- **Never push a broken build and fix it forward** with more pushes to `main`. Fix it locally,
  verify, then push once.
- **Ask Jeff first, even when the task seems to cover it:**
  - pricing, plans, trials, or billing
  - changing rules: this file, `CLAUDE.md`, JOURNEY Hard Rules, or policy docs (SEO/link
    policies, decision docs)
  - auth, security, RLS, or database migrations
  - deleting pages, posts, or data
  - anything about real people or businesses

  For these, use a branch or PR and wait for his OK.
- One logical change per commit, with a clear summary line. Dependency and security updates go
  in their own commit.

## Git hygiene

- **Preserve each file's line endings.** Many files here are CRLF. Patch the lines you mean to
  change; never re-save, re-indent, or reformat a whole file. A diff should show only your change.
- Never commit secrets or `.env*` files. Keys live in Vercel and Supabase settings.
- Don't commit QA screenshots, scratch files, or build output.
- After pushing, confirm the Vercel deployment is **READY** and check the live page.

## Keeping JOURNEY.md (end of every working session)

`JOURNEY.md` is the project's living story, and the first thing any agent reads. These rules
replace the external protocol file some headers still link to.

| Section | How to edit |
|---|---|
| Current State | **Edit in place** every session: what's live, in progress, next, and blocked. |
| The Story So Far | Edit rarely. Short narrative. |
| Decisions Log | **Append a row** per locked decision (what, why, date, status). Never delete one; mark it `Superseded by <date>`. |
| System Map | Edit in place: one line per major system. |
| The Graveyard | Append, tersely: what was killed and why. |
| Open Questions | Edit in place. Undecided questions only; remove answered ones. |
| Session Log | Newest entry **first**, **4 entries max** (see the cap rule below). |
| Hard Rules | Edit in place. Non-negotiable invariants (ask Jeff before changing one). |

**Where a new entry goes:** inside `## Session Log`, directly under the heading and above the
previous newest entry. **Never append at the end of the file**, and never start a new top-level
`##` section for a session.

**Entry format:**

```
### YYYY-MM-DD — one-line summary (commit hashes)
**Did:** what changed (files, behavior) and how it was verified.
**Decided:** new locked decisions (also add a Decisions Log row).
**Killed:** what was removed or abandoned (also the Graveyard if significant).
**Deferred:** what was punted and why.
**State after:** where things stand now.
**Next:** the obvious next move.
```

**Cap rule:** the Session Log keeps the 4 most recent entries. When you add a 5th, move the
oldest entry, unchanged, to the top of `JOURNEY_ARCHIVE.md` (just under its header, newest
first). The Session Log always ends with
`> Older sessions archived in [JOURNEY_ARCHIVE.md](JOURNEY_ARCHIVE.md).`

**Every session, also:** bring **Current State** up to date, with no stale "pending" or "switched
off" lines. If a rule changed, update **Hard Rules** too. Commit the JOURNEY update separately,
after the work it describes.

## Verify before committing (this repo)

There's no build step; it's a static site. For every change:

- The page opens locally and its links resolve.
- **Publishing a post** means all three of these, in **one commit** if you can:
  1. `public/blog/<slug>.html`
  2. its card in `public/blog.html`
  3. its `<loc>` in `public/sitemap.xml`

  Add only the new card and the new `<loc>`; never re-indent those files. Check there are no
  duplicate `<loc>` entries.
- After pushing, confirm the post returns 200 at `https://www.cmstrength.fit/blog/<slug>`.

## Project rules

- **Blog publishing:** Jeff gave standing approval (2026-09-16) for the blog writer to publish
  directly and tell him in chat. That approval covers **posts only**. Tracking tags, site-wide
  code, and SEO or link-policy docs (`docs/SEO.md`) still need his OK.
- **Voice:** [voice.md](voice.md).
- **JOURNEY.md Hard Rules:** never link to IronAtForty or WizeMeals; outbound links go only to
  authority sources (PubMed, .gov, .edu) or the CMS app; `www` is canonical in every sitemap
  `<loc>` and canonical tag.
