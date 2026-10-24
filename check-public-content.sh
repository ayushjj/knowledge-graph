#!/bin/sh
# Blocks raw HTML, event-handler attributes and non-http(s) links in published content — the site renders markdown
# with raw HTML passed through, so one planted <img onerror=...> would run on every visitor (review 2026-10-24).
# Used by CI (deploy.yml) and by .githooks/pre-push. Usage: sh check-public-content.sh [files...]  (default: all)
set -u
[ $# -gt 0 ] || set -- $(ls insights/*.md topics/*.md index.md 2>/dev/null)
bad=""
for f in "$@"; do
  [ -f "$f" ] || continue
  # strip markdown autolinks <https://...> (safe), then look for anything HTML- or script-shaped
  hit=$(sed -E 's#<https?://[^ >]*>##g' "$f" | grep -nEi '<[a-z!/?][^>]*>|[[:space:]"'"'"']on[a-z]+[[:space:]]*=|\]\([[:space:]]*(javascript|data|vbscript|file):|(href|src)[[:space:]]*=')
  [ -n "$hit" ] && bad="$bad$f: $hit
"
done
if [ -n "$bad" ]; then
  printf 'BLOCKED: raw HTML or unsafe links in published content:\n%s' "$bad" | head -20; exit 1
fi
echo "public content check: ok ($# files)"
