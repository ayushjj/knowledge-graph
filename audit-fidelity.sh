#!/bin/bash
# audit-fidelity.sh — Blind source fidelity verification for book-sourced insights
# Uses 3 independent claude -p calls per insight to prevent confirmation bias
# Run: bash audit-fidelity.sh
#
# How it works:
#   Call 1: Extract claims from the cited PDF pages (source only, no insight shown)
#   Call 2: Extract claims from the insight file (insight only, no source shown)
#   Call 3: Blind comparison of both claim lists (labeled neutrally as A and B)
#
# Requires: claude CLI in PATH, PDF at the path stored in PDF_PATH below

# Prevent "nested session" error if run from inside Claude Code
unset CLAUDECODE

set -euo pipefail

# --- Configuration ---
PDF_PATH="content/poor-charlies-almanack.pdf"
BOOK_TITLES="Almanack|Thinking, Fast and Slow|Influence|Skin in the Game"
PASS_THRESHOLD=80  # minimum % of claims that must be VERIFIED
MAX_PAGES_PER_READ=20  # claude Read tool limit

# --- Temp directory ---
TMPDIR=$(mktemp -d)
trap "rm -rf $TMPDIR" EXIT

# --- Counters ---
TOTAL_INSIGHTS=0
TOTAL_VERIFIED=0
TOTAL_MODIFIED=0
TOTAL_NOT_FOUND=0
FLAGGED_INSIGHTS=""

echo "=== Source Fidelity Audit (Blind Comparison) ==="
echo ""

# --- Find book-sourced insights ---
for f in insights/*.md; do
  source_line=$(grep -m1 '^source:' "$f" | sed 's/^source: *//' | tr -d '"')

  # Skip non-book sources
  if ! echo "$source_line" | grep -qiE "($BOOK_TITLES)"; then
    continue
  fi

  TOTAL_INSIGHTS=$((TOTAL_INSIGHTS + 1))
  slug=$(basename "$f" .md)

  # Extract page range from source field (e.g., "pp. 505-514")
  page_start=$(echo "$source_line" | grep -oE 'pp?\. *[0-9]+' | grep -oE '[0-9]+')
  page_end=$(echo "$source_line" | grep -oE 'pp?\. *[0-9]+-[0-9]+' | grep -oE '[0-9]+$')

  if [[ -z "$page_start" ]]; then
    echo "[SKIP] $slug — no page range found in source field"
    continue
  fi

  # Default page_end to page_start if single page reference (p. 505)
  if [[ -z "$page_end" ]]; then
    page_end=$page_start
  fi

  page_range="${page_start}-${page_end}"
  page_span=$((page_end - page_start + 1))

  echo "[CHECKING] $slug (pp. $page_range)"

  # --- Call 1: Extract claims from source PDF pages ---
  # If page range exceeds MAX_PAGES_PER_READ, note it (all current ranges are <20)
  if [[ $page_span -gt $MAX_PAGES_PER_READ ]]; then
    echo "  NOTE: Page range ($page_span pages) exceeds $MAX_PAGES_PER_READ-page limit, using first $MAX_PAGES_PER_READ pages"
    page_end=$((page_start + MAX_PAGES_PER_READ - 1))
    page_range="${page_start}-${page_end}"
  fi

  claude -p "You are a fact-extraction tool. Read the attached PDF pages and list every specific factual claim, named example, statistic, and direct quote you find. Output as a numbered list. Do not editorialize, interpret, or add context — only extract what is explicitly stated on these pages.

PDF file: $(pwd)/$PDF_PATH (pages $page_range)

Read the PDF at the path above, pages $page_range, and extract all claims." > "$TMPDIR/${slug}_source_claims.txt" 2>/dev/null

  # --- Call 2: Extract claims from insight file ---
  insight_content=$(cat "$f")

  claude -p "You are a fact-extraction tool. Read the following text and list every specific factual claim, named example, statistic, and direct quote it contains. Output as a numbered list. Do not editorialize, interpret, or add context — only extract what is explicitly stated.

---
$insight_content
---

List all claims from the text above." > "$TMPDIR/${slug}_insight_claims.txt" 2>/dev/null

  # --- Call 3: Blind comparison ---
  source_claims=$(cat "$TMPDIR/${slug}_source_claims.txt")
  insight_claims=$(cat "$TMPDIR/${slug}_insight_claims.txt")

  claude -p "You are a fact-verification tool. You have two lists of claims extracted independently. Your job is to compare them.

LIST A (reference):
$source_claims

LIST B (to verify):
$insight_claims

For EACH claim in List B, determine:
- VERIFIED: The claim appears in List A with matching facts (exact or very close match)
- MODIFIED: A similar claim exists in List A but specific details differ (state the difference)
- NOT_FOUND: No matching claim in List A

Output format — use EXACTLY this structure:
VERIFIED: [count]
MODIFIED: [count]
NOT_FOUND: [count]

Then list each claim with its verdict:
1. [VERIFIED/MODIFIED/NOT_FOUND] [claim summary] [if MODIFIED: difference noted]

Be strict: if numbers, names, or examples differ between lists, mark as MODIFIED, not VERIFIED." > "$TMPDIR/${slug}_verdict.txt" 2>/dev/null

  # --- Parse verdict ---
  verdict=$(cat "$TMPDIR/${slug}_verdict.txt")

  verified=$(echo "$verdict" | grep -ioE 'VERIFIED: *[0-9]+' | head -1 | grep -oE '[0-9]+' || echo "0")
  modified=$(echo "$verdict" | grep -ioE 'MODIFIED: *[0-9]+' | head -1 | grep -oE '[0-9]+' || echo "0")
  not_found=$(echo "$verdict" | grep -ioE 'NOT_FOUND: *[0-9]+' | head -1 | grep -oE '[0-9]+' || echo "0")

  echo "  VERIFIED:   $verified claims matched source"
  echo "  MODIFIED:   $modified claim(s) (details differ)"
  echo "  NOT_FOUND:  $not_found claim(s)"

  TOTAL_VERIFIED=$((TOTAL_VERIFIED + verified))
  TOTAL_MODIFIED=$((TOTAL_MODIFIED + modified))
  TOTAL_NOT_FOUND=$((TOTAL_NOT_FOUND + not_found))

  # Flag insights with 2+ NOT_FOUND claims
  if [[ $not_found -ge 2 ]]; then
    FLAGGED_INSIGHTS="${FLAGGED_INSIGHTS}
  $slug ($not_found claims not found in source)"
    echo "  ** FLAGGED for human review ($not_found NOT_FOUND claims)"
  fi

  echo ""
done

# --- Summary ---
TOTAL_CLAIMS=$((TOTAL_VERIFIED + TOTAL_MODIFIED + TOTAL_NOT_FOUND))

if [[ $TOTAL_CLAIMS -gt 0 ]]; then
  pass_rate=$((TOTAL_VERIFIED * 100 / TOTAL_CLAIMS))
else
  pass_rate=0
fi

echo "Fidelity: $TOTAL_INSIGHTS/$TOTAL_INSIGHTS insights checked"
echo "  Total: $TOTAL_VERIFIED verified, $TOTAL_MODIFIED modified, $TOTAL_NOT_FOUND not found"
echo "  Pass rate: ${pass_rate}% (threshold: ${PASS_THRESHOLD}%)"

if [[ -n "$FLAGGED_INSIGHTS" ]]; then
  echo ""
  echo "Flagged for human review:${FLAGGED_INSIGHTS}"
fi

echo ""
if [[ $pass_rate -ge $PASS_THRESHOLD ]]; then
  echo "Result: PASS"
  exit 0
else
  echo "Result: FAIL (below ${PASS_THRESHOLD}% threshold)"
  exit 1
fi
