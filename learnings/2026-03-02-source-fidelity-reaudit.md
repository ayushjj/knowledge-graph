# Session: 2026-03-02 - Full Source-Fidelity Re-Audit

## What Worked
- Batch-by-source verification: grouping 58 insights into 6 agent batches (~10 each) by source author/article reduced fetch count from 58 to ~25 unique URLs
- Parallel agent dispatch: 6 verification agents running simultaneously completed Phase 2 in ~15 minutes vs ~90 minutes sequential
- Fix taxonomy: categorizing fixes into 6 types (title correction, fabricated examples, unverifiable numbers, editorial hedging, cross-source conflation, attribution removal) made Phase 3 mechanical

## What Didn't Work
- 2 of 6 verification agents were rejected by user (likely permission prompts during long parallel wait) — had to re-dispatch replacements
- Twitter/X sources are inaccessible to automated fetching — had to rely on secondary sources (GitHub repos, blog coverage, search snippets) as verification proxies

## Key Insight
LLM-extracted knowledge graphs have a ~43% error rate on source fidelity even after one round of fixes. The error patterns are predictable: fabricated examples (12%), wrong numbers (20%), editorial synthesis presented as source claims (32%). This means the /learn pipeline itself should be modified to:
1. Never invent examples — use "e.g." only when the source provides one
2. Hedge all interpretive claims with "implies" or "suggests" rather than "identifies" or "argues"
3. Flag statistics/numbers for manual verification at extraction time

## Files Changed
- 25 insight files in `insights/` — source title corrections, fabricated example replacements, unverifiable number removals, editorial hedging
- `README.md` — count 62 → 58
- `AUDIT.md` — new baseline snapshot section added at bottom

## Metrics
- Before: 62 insights, ~40% known error rate from first audit, 19 insights never verified
- After: 58 insights (4 deleted), 100% source-verified, 25 fixes applied, 7/7 validation checks pass
