# Session: 2026-04-15 — Eliminate Edge Duplication (Structural Fix)

## What Worked

- **Migration script as two phases, Phase 1 read-only.** `scripts/migrate-drop-incoming.js --dry-run` produced `migration-diff.md` BEFORE touching any yaml — surfaced asymmetries + self-loops as pure data. Phase 1 reported all zeros, so Phase 2's rewrite was mechanical. Cost: ~10 extra minutes to build Phase 1. Benefit: deterministic go/no-go decision, zero ambiguity about what Phase 2 would touch.
- **Defensive union during migration.** Phase 2 unioned `declaredOutgoing` with `mirroredOutgoing` (derived by inverting all `incoming:` lists). Even though Phase 1 said both sets matched, the union guaranteed no edge would be dropped if a hidden asymmetry existed. Cost: 5 lines. Benefit: insurance against a class of bugs we couldn't fully enumerate.
- **Deterministic equivalence test.** Snapshot `graph-data.json` pre-migration → regenerate post-migration → normalize-and-diff (sort nodes by id, sort links by source+target, stringified compare). Returned byte-equivalent. This turned "the site still works" into a provable claim, not a vibe.
- **Pre-commit hook dry run.** Hook fired locally during `git commit`, ran the new (simplified) `validate-graph.js` in 0.3s, returned 6/6. By the time `git push` happened, CI had nothing new to discover — it just confirmed what the local gate already proved. Principle 31 in action.
- **Bringing `/connect` into the same commit-scope as `/learn`.** `/review-plan`'s compound-risk check caught that shipping yaml + `/learn` without `/connect` would leave the next `/connect` invocation running against a shape it didn't expect. Moving `/connect` SKILL.md into scope added ~5 min of edits and eliminated a silent future failure.

## What Didn't Work

- **`jq` for the equivalence diff.** Windows bash ships no `jq`. Had to write inline Node.js to parse/sort/stringify/compare. Minor time cost (~2 min), but the reflex "`cat x.json | jq | diff`" is a Unix habit that breaks on this box.
- **First `fs.readFileSync('/tmp/...')` from Node.** Node on Windows interprets `/tmp/...` as `C:\tmp\...`, which doesn't exist. bash's `/tmp` maps to `C:/Users/User/AppData/Local/Temp/` (discoverable via `pwd -W` from inside `/tmp`). When using Node for scratch work on Windows, pass absolute Windows paths, not bash-style `/tmp`.

## Key Insight

**Duplication is a *bug class*, not a *bug*.** The incoming/outgoing mirror existed for ~2 years. In that time, it broke the deploy twice (2026-04-10, 2026-04-12). Each time, the tactical fix — re-sync the missing mirror — seemed adequate. The structural fix (eliminate the mirror, derive one from the other) took a single session once the framing landed: **if B is derivable from A, storing both makes every write a two-field obligation, and the one you forget becomes silent inconsistency.** The *validator* of the invariant is not a defense — the *non-existence* of the invariant-violation is.

Corollary: local pre-commit hooks (Principle 31) are defense-in-depth for invariants you *can't* eliminate. Here, they ran once during development and never need to run again for this bug class, because the bug class cannot recur.

## Files Changed

- `graph-index.yaml` — 175 `incoming:` blocks removed, `outgoing:` arrays sorted alphabetically, `last_updated` bumped. Net: 541 insertions / 853 deletions.
- `build-graph.js` — added O(N) reverse-index derivation before node iteration; `degree = outgoing.length + derivedIncoming.length`.
- `src/lib/graph.ts` — removed `incoming?:` from `GraphNode` type, added `_reverseIndex` memo + `getReverseIndex()`. `getConnections()` and `getDegree()` now derive incoming.
- `validate-graph.js` — removed Check 3 (reciprocal links, impossible by construction). Renumbered remaining checks. Final output: "6/6 checks passed".
- `public/graph-data.json` — regenerated; byte-equivalent after normalization.
- `~/.claude/skills/learn/SKILL.md` — Step 6 no longer writes `incoming:` on new nodes; Step 8 back-link pass appends to the existing node's `outgoing:` (was: two `incoming:` lists, the drift source).
- `~/.claude/skills/connect/SKILL.md` — Step 1 computes reverse-index by iterating all `outgoing:`; Step 2 redefines leaf = no entry in derived reverse index; Step 5 only updates source `outgoing:`.
- `scripts/migrate-drop-incoming.js` — created, ran, deleted per Principle 9.

## Metrics

- **Before:** 175 nodes × 2 edge-field obligations per write = 350 write-surface obligations. 2 prod deploy breaks in 3 days from drift.
- **After:** 175 nodes × 1 edge-field obligation. Drift impossible-by-construction. `validate-graph.js`: 7 checks → 6 checks. `graph-index.yaml`: -61% lines (554 → 129 content lines in the outgoing-only layout, measured by structural lines, not full diff).
- **CI:** deploy ran in ~45s, all gates green (`astro check`, `validate-graph.js` 6/6, `vitest` 18/18, `npm run build`, `actions/deploy-pages`).
- **Equivalence:** pre/post `graph-data.json` byte-identical after normalize-sort. The web site serves identical data; only the authoring-time shape changed.
