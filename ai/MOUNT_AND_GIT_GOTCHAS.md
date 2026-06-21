# Mount, Cache & Git Gotchas (read before editing on this repo)

> This repo lives on a sync'd mount (OneDrive-style) that the Linux/bash sandbox
> sees through a **caching layer**. That layer causes three distinct failure
> modes that all *look* like "file truncation/corruption" but have different
> causes and fixes. Recorded so the next session doesn't relearn it the hard way.

## TL;DR operating rules
- **Never trust bash `tail`/`wc`/`cat`/`grep` to judge file integrity.** Reads
  through bash lag the real disk and show *phantom* truncation (dangling tags,
  "no closing tag"). The file is almost always whole on disk.
- **Verify file state with Desktop Commander** (reads the real Windows FS) **or a
  local build/preview** (ground truth — you can't build/serve a truncated file).
- **Writes:** prefer Desktop Commander or a bash heredoc (`cat > f <<'EOF'`),
  then **verify the tail with Desktop Commander, not bash**.
- **Git:** clear a stale `.git/index.lock` with Desktop Commander (`del /f`),
  and always run `git status -sb` after a push to confirm it actually went.

---

## The three failure modes

### 1. Bash-mount read cache (the big one — most misleading)
Writing a file then checking it via bash (`tail`, `wc -l`, `grep`) reports the
file truncated mid-line — dangling tags like `</sectio`, `<G`, "no corresponding
closing tag." It looks exactly like corruption. **It isn't.** The file is whole on
disk; the bash mount serves a stale cached view that lags reality.

Seen this session: `cms.css` repeatedly read as truncated mid-rule via bash while
the real file on disk was complete; "file has been modified since read" errors on
Edit when nothing had actually changed. The danger isn't lost work — it's almost
"fixing" files that are already fine, which *introduces* corruption. Lesson: trust
Desktop Commander or a local preview, never bash `tail`, to judge integrity.

### 2. Genuine write failures (rarer, but real)
Occasionally a write truly fails — the tool reports success but writes garbage or
a truncated stub. The reliable fix: write through a bash heredoc
(`cat > file <<'EOF'`) or Desktop Commander, which land real bytes, then verify
the tail with Desktop Commander (not bash).

### 3. Stale git index.lock (different problem, same "nothing happened" symptom)
A stale `.git/index.lock` kept reappearing and silently blocking git ops — `rm`
from the sandbox returned "Operation not permitted" because the lock is held on
the Windows side. Fix: clear it with Desktop Commander (`del /f .git\index.lock`)
or in your own terminal, and always `git status -sb` after a push to confirm it
actually went.

---

## Synthesis
Reads through bash are the least trustworthy thing in the setup — they lag and
show phantom truncation. Writes mostly work but occasionally drop. The reliable
tools are **Desktop Commander** (real FS, read + write) and a **local build/
preview** (ground truth). Bash is fine for *running* things, untrustworthy for
*verifying file state*. Nothing is ever actually lost — a "truncated" file either
was fine all along (cache lie) or gets rewritten cleanly and confirmed by a build.

_Recorded June 13, 2026._
