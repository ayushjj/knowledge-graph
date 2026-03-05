#!/bin/bash
# audit-quality.sh — 6 content quality checks for knowledge graph insights
# Run: bash audit-quality.sh
# Exits non-zero on any FAIL (WARN does not cause failure)

PASS=0
WARN=0
FAIL=0
TOTAL_INSIGHTS=0

pass() { echo "[PASS] $1"; PASS=$((PASS + 1)); }
warn() { echo "[WARN] $1"; WARN=$((WARN + 1)); }
fail() { echo "[FAIL] $1"; FAIL=$((FAIL + 1)); }

echo "=== Content Quality Audit ==="
echo ""

# Count insights
TOTAL_INSIGHTS=$(ls insights/*.md 2>/dev/null | wc -l | tr -d ' ')

# --- Check 1: Title is a claim (contains a verb) ---
# Broad verb list covering common claim patterns
VERBS="is|are|was|were|be|beats|makes|creates|becomes|needs|produces|enables|prevents|replaces|wins|works|preserves|transfers|teaches|learns|stores|routes|triggers|survives|decouples|captures|scales|unlocks|mean|means|come|comes|grows|collapses|dies|exists|demands|thinks|should|must|can|will|has|have|had|does|do|did|gets|got|accelerates|compounds|multiplies|distributes|matches|requires|measures|writes|turns|treats|evaluates|persists|become|remain|emerges|persist|trigger|produce|beat|create|make|need|enable|prevent|replace|win|work|preserve|transfer|teach|learn|store|route|survive|decouple|capture|scale|unlock|grow|collapse|die|exist|demand|think|get|accelerate|compound|multiply|distribute|match|require|measure|write|turn|treat|evaluate|builds|manages|solves|solve|manage|build"

title_failures=""
title_fail_count=0
for f in insights/*.md; do
  # Extract title from YAML frontmatter
  title=$(grep -m1 '^title:' "$f" | sed 's/^title: *"//;s/"$//')
  # Check if title contains any verb (case-insensitive)
  if ! echo "$title" | grep -qiEw "($VERBS)"; then
    title_failures="${title_failures}
  $(basename "$f" .md): \"$title\""
    title_fail_count=$((title_fail_count + 1))
  fi
done

if [[ $title_fail_count -eq 0 ]]; then
  pass "Title is a claim: $TOTAL_INSIGHTS/$TOTAL_INSIGHTS"
else
  warn "Title is a claim: $((TOTAL_INSIGHTS - title_fail_count))/$TOTAL_INSIGHTS — $title_fail_count without detected verb${title_failures}"
fi

# --- Check 2: Prose format (no bullets, headers, or link dumps in body) ---
prose_failures=""
prose_fail_count=0
for f in insights/*.md; do
  # Extract body (everything after the closing --- of YAML frontmatter)
  body=$(awk '/^---$/{n++; next} n>=2' "$f")

  issues=""
  # Check for bullet lists
  if echo "$body" | grep -qE '^\s*[-*] '; then
    issues="${issues} bullets"
  fi
  # Check for headers
  if echo "$body" | grep -qE '^## '; then
    issues="${issues} headers"
  fi
  # Check for link dump sections
  if echo "$body" | grep -qiE '^(See also|Related|Links):'; then
    issues="${issues} link-dump"
  fi

  if [[ -n "$issues" ]]; then
    prose_failures="${prose_failures}
  $(basename "$f" .md): found${issues}"
    prose_fail_count=$((prose_fail_count + 1))
  fi
done

if [[ $prose_fail_count -eq 0 ]]; then
  pass "Prose format: $TOTAL_INSIGHTS/$TOTAL_INSIGHTS"
else
  fail "Prose format: $((TOTAL_INSIGHTS - prose_fail_count))/$TOTAL_INSIGHTS — $prose_fail_count with structural issues${prose_failures}"
fi

# --- Check 3: Wikilink count in range (2-7) ---
link_failures=""
link_fail_count=0
for f in insights/*.md; do
  body=$(awk '/^---$/{n++; next} n>=2' "$f")
  link_count=$(echo "$body" | grep -oE '\[\[[a-z0-9-]+\]\]' | wc -l | tr -d ' ')

  if [[ $link_count -lt 2 || $link_count -gt 7 ]]; then
    link_failures="${link_failures}
  $(basename "$f" .md) ($link_count links)"
    link_fail_count=$((link_fail_count + 1))
  fi
done

if [[ $link_fail_count -eq 0 ]]; then
  pass "Wikilink count (2-7): $TOTAL_INSIGHTS/$TOTAL_INSIGHTS"
else
  warn "Wikilink count (2-7): $((TOTAL_INSIGHTS - link_fail_count))/$TOTAL_INSIGHTS — $link_fail_count outside range${link_failures}"
fi

# --- Check 4: Body length reasonable (100-500 words) ---
length_failures=""
length_fail_count=0
for f in insights/*.md; do
  body=$(awk '/^---$/{n++; next} n>=2' "$f")
  word_count=$(echo "$body" | wc -w | tr -d ' ')

  if [[ $word_count -lt 100 || $word_count -gt 500 ]]; then
    length_failures="${length_failures}
  $(basename "$f" .md) ($word_count words)"
    length_fail_count=$((length_fail_count + 1))
  fi
done

if [[ $length_fail_count -eq 0 ]]; then
  pass "Body length (100-500 words): $TOTAL_INSIGHTS/$TOTAL_INSIGHTS"
else
  warn "Body length (100-500 words): $((TOTAL_INSIGHTS - length_fail_count))/$TOTAL_INSIGHTS — $length_fail_count outside range${length_failures}"
fi

# --- Check 5: Book sources have page refs ---
# Only checks insights whose source field mentions known book titles
BOOK_TITLES="Almanack|Thinking, Fast and Slow|Influence|Skin in the Game"

book_total=0
book_failures=""
book_fail_count=0
for f in insights/*.md; do
  source_line=$(grep -m1 '^source:' "$f" | sed 's/^source: *//')
  if echo "$source_line" | grep -qiE "($BOOK_TITLES)"; then
    book_total=$((book_total + 1))
    if ! echo "$source_line" | grep -qE '(pp?\.)'; then
      book_failures="${book_failures}
  $(basename "$f" .md): missing page reference"
      book_fail_count=$((book_fail_count + 1))
    fi
  fi
done

if [[ $book_total -eq 0 ]]; then
  pass "Book page refs: no book-sourced insights found"
elif [[ $book_fail_count -eq 0 ]]; then
  pass "Book page refs: $book_total/$book_total"
else
  fail "Book page refs: $((book_total - book_fail_count))/$book_total — $book_fail_count missing page references${book_failures}"
fi

# --- Check 6: Quoted claims present (book insights should have direct quotes) ---
book_quote_total=0
quote_failures=""
quote_fail_count=0
for f in insights/*.md; do
  source_line=$(grep -m1 '^source:' "$f" | sed 's/^source: *//')
  if echo "$source_line" | grep -qiE "($BOOK_TITLES)"; then
    book_quote_total=$((book_quote_total + 1))
    body=$(awk '/^---$/{n++; next} n>=2' "$f")
    # Check for quoted text (text between double quotes or curly quotes)
    if ! echo "$body" | grep -qE '".+"'; then
      quote_failures="${quote_failures}
  $(basename "$f" .md): no direct quotes found"
      quote_fail_count=$((quote_fail_count + 1))
    fi
  fi
done

if [[ $book_quote_total -eq 0 ]]; then
  pass "Quoted claims: no book-sourced insights to check"
elif [[ $quote_fail_count -eq 0 ]]; then
  pass "Quoted claims: $book_quote_total/$book_quote_total"
else
  warn "Quoted claims: $((book_quote_total - quote_fail_count))/$book_quote_total — $quote_fail_count without direct quotes${quote_failures}"
fi

# --- Summary ---
CHECKS=$((PASS + WARN + FAIL))
echo ""
if [[ $FAIL -eq 0 && $WARN -eq 0 ]]; then
  echo "Quality: $CHECKS/$CHECKS checks passed"
  exit 0
elif [[ $FAIL -eq 0 ]]; then
  echo "Quality: $PASS/$CHECKS checks passed, $WARN warning(s)"
  exit 0
else
  echo "Quality: $PASS/$CHECKS checks passed, $WARN warning(s), $FAIL failure(s)"
  exit 1
fi
