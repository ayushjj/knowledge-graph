# Session: 2026-06-01 — Hermes /learn + cross-machine sync gotchas

/ learn'd 7 insights from Aparna Dhinakaran's "Hermes Harness Architecture" (graph 197 → 204). Smooth extraction; the friction was all environment + edit-discipline, captured below.

## What Worked
- **Decision-level filter held.** Excluded Hermes implementation trivia (20%/2k/12k token budgets) and ideas already in the graph (provider abstraction → `open-harnesses-with-owned-databases-prevent-model-provider-lock-in`). 7 distinct nodes, each 3-4 outgoing + back-linked from 6 existing nodes.
- **`npm run check` caught the historical drift bug class** — README said 197 while files+yaml were 204. Exactly the April deploy-break pattern; the deterministic gate beats remembering to check (P57).

## What Didn't Work
- **Composed Edit `old_string` anchors in the SAME message as the Reads that would reveal real content** → 11 failed edits (topic MOCs, index.md, 6 back-link prose files). Re-did them against verified bytes. Instance of Rule 4 (read before edit); the specific trap is batching Read+Edit of the same file in one turn — the Read hasn't returned when you author the Edit.
- **`bash -c 'cd … && npm run check'` resolved npm to `web/package.json`** intermittently (cwd drift, P34). Fix: fresh `bash -c` with explicit pwd, or run validators by absolute path.

## Key Insights
1. **`validate-graph.js` reads the README count from the line matching `/^(\d+)\+?\s*insights/m` — that's line 21 (`204+ insights across 2 domains`), NOT the bold header line 5.** When bumping the count, update BOTH (plus the two `…+ nodes`/`…+ individual insight files` lines for consistency), or the node-count check fails the whole gate. There are 4 count-bearing README lines total.
2. **Fresh cross-machine sync of this repo is not runnable out of the box:** `node_modules` is gitignored (needs `npm install`), AND the `.githooks/pre-commit` executable bit was lost in sync so the local gate silently no-op'd. Fixed permanently by committing the `100755` mode (`fe06873`). On any fresh clone: `npm install` then confirm `ls -l .githooks/pre-commit` shows `-rwxr-xr-x`.

## Files Changed
- `insights/` — 7 new nodes + 6 edited (back-links); `sources/aparnadhinak-hermes-harness-architecture.md`
- `graph-index.yaml` — 7 nodes (204, last_updated 2026-06-01) + 6 outgoing back-link edges
- `index.md`, `topics/{ai-agents,ai-native-product-architecture,ai-coding-tools}.md`, `README.md` (197→204 ×4 + Aparna as major contributor)
- `.githooks/pre-commit` — mode 100644→100755

## Metrics
- Before: 197 insights, MEMORY.md stale at 175, local branch behind 1
- After: 204 insights, 6/6 graph checks + 18/18 tests green, deployed via `47f6b89` + `fe06873`
