#!/bin/sh
# Fail if a published blog post still contains a writing-brief CTA spec.
#
# Posts are hand-built HTML under public/blog/ (Vercel serves public/ as-is;
# there is no generator). Briefs in docs/cornerstones/ may contain a "## CTA"
# section for the author. That spec must be turned into the styled
# <div class="cta-block"> and must not be pasted into the post. A leftover
# "--- / ## CTA / **Section-label:** / **Headline:** / **Sub:**" block renders
# as visible text above the real CTA.
#
# Usage: scripts/check-blog-cta-leftovers.sh [repo-root]
set -eu

root=${1:-.}
blog="$root/public/blog"

if ! ls "$blog"/*.html >/dev/null 2>&1; then
  echo "No HTML files in $blog" >&2
  exit 1
fi

# **Section-label:**, **Headline:**, and **Sub:** anywhere.
# "## CTA" only as its own line (optional indent), so prose that mentions the
# heading is not a hit and docs/cornerstones/ is not scanned.
pattern='\*\*Section-label:\*\*|^[[:space:]]*## CTA[[:space:]]*$|\*\*Headline:\*\*|\*\*Sub:\*\*'

hits=$(grep -nE "$pattern" "$blog"/*.html || true)
if [ -n "$hits" ]; then
  printf '%s\n' \
    "Leftover brief CTA markers in $blog:" \
    "$hits" \
    "" \
    "Publish the styled .cta-block only. Do not paste ## CTA / **Section-label:** / **Headline:** / **Sub:** into the post."
  exit 1
fi

count=$(ls "$blog"/*.html | wc -l | tr -d ' ')
echo "OK: no leftover brief CTA markers in $count files under $blog"
