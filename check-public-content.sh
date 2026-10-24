#!/bin/sh
# Blocks raw HTML, event-handler attributes and non-http(s) links in published content — the site renders markdown
# with raw HTML passed through, so one planted <img onerror=...> would run on every visitor (review 2026-10-24).
# Used by CI (deploy.yml) and by .githooks/pre-push. Usage: sh check-public-content.sh [files...]  (default: all)
set -u
# Second layer only: the real guard is the build-time allow-list (src/lib/sanitize-schema.ts), which also
# catches what a line-by-line scan cannot (tags split across lines, encoded links).
if [ $# -eq 0 ]; then
  # every tracked content file, at any depth, spaces in names included
  list=$(git ls-files -z -- 'insights/*.md' 'topics/*.md' index.md | tr '\0' '\n') || { echo "BLOCKED: cannot list content files"; exit 1; }
  [ -n "$list" ] || { echo "BLOCKED: no content files found (run from the repo root)"; exit 1; }
  IFS='
'
  set -- $list
  unset IFS
fi
bad=""
for f in "$@"; do
  [ -f "$f" ] || { echo "BLOCKED: missing file $f"; exit 1; }
  # strip markdown autolinks <https://...> (safe), then look for anything HTML- or script-shaped
  hit=$(sed -E 's#<https?://[^ >]*>##g' "$f" | grep -nEi '<[a-z!/?][^>]*>|[[:space:]"'"'"']on[a-z]+[[:space:]]*=|\]:?[[:space:]]*\(?[[:space:]]*<?(javascript|data|vbscript|file):|&#|(href|src)[[:space:]]*=')
  [ -n "$hit" ] && bad="$bad$f: $hit
"
done
if [ -n "$bad" ]; then
  printf 'BLOCKED: raw HTML or unsafe links in published content:\n%s' "$bad" | head -20; exit 1
fi
echo "public content check: ok ($# files)"
