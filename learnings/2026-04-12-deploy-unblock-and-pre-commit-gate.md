# Session: 2026-04-12 - Fixed 2 broken deploys + added local validation gate

## What Worked

- **Logs first, code second (Principle 10).** `gh run view --log-failed` showed the exact error in one command — "Node count mismatch: 175 files, 170 in yaml, 165 in README" + 8 reciprocal link errors. No code exploration needed. Total diagnosis time: ~30 seconds.
- **Hook test via corrupted-state simulation.** Before trusting the new pre-commit hook, temporarily corrupted `graph-index.yaml` (set `node_count: 999`), attempted a commit, verified block, then restored from `/tmp` backup. Proved the hook works end-to-end, not just the happy path.
- **Separating tactical from structural fixes.** First commit (`1b9948d`) restored deploy. Second commit (`57e2177`) prevented recurrence. Two commits instead of one makes the "why" of each change clearer in git log and enables reverting one without losing the other.

## What Didn't Work

- **Assumed `/learn` skill writes both sides of edges correctly.** It doesn't — it writes target's `incoming:` but forgets to update source's `outgoing:`. This failure happened on BOTH `/learn` runs in the last 3 days (commits `89b8f8b`, `026be73`), each time silently pushed to master without local `npm run check`, each time blocking deploy. Pattern, not accident.
- **CI-only gate was insufficient.** The `validate-graph.js` check runs on CI, but by then the commit is already on master. Site served stale content (165 insights, commit `83c3830`) for 2 days while fresh commits sat broken on master. A local pre-commit gate would have caught both at commit time.

## Key Insight

**Duplicated data is a bug class, not a bug.** `graph-index.yaml` stores both `outgoing:` (source → target) and `incoming:` (target → source) for every edge. These MUST be kept in sync manually because one is derivable from the other but they're stored independently. This structural redundancy creates an entire category of bugs where one side gets written and the other doesn't.

Two levels of fix:
- **Belt (Level 2, done):** local pre-commit hook runs `validate-graph.js` before any commit with graph files staged. Catches the bug class at commit time regardless of what caused it.
- **Suspenders (Level 3, deferred):** make `outgoing:` the sole source of truth; derive `incoming:` at build time in `build-graph.js`. Eliminates the bug class entirely — impossible to write inconsistent state.

General principle: when you see the same bug twice, look for the shape of the duplication that made it possible.

## Files Changed

- `graph-index.yaml:14` — `node_count: 170` → `175`
- `graph-index.yaml` (8 nodes) — added 9 missing outgoing entries reciprocal to existing `incoming:` on targets
- `README.md` — 4× replace `165` → `175`
- `.githooks/pre-commit` (new) — runs `node validate-graph.js` on commits touching `insights/`, `topics/`, `graph-index.yaml`, or `README.md`
- `package.json` — added `"prepare": "git config core.hooksPath .githooks"` so fresh clones auto-wire the hook via `npm install`
- `public/graph-data.json` — regenerated from fixed yaml (175 nodes, 589 links)

## Metrics

- Before: 2 failed deploys on master (2026-04-10 commit `89b8f8b`, 2026-04-12 commit `026be73`). Live site showed 165 insights for 2 days while repo was at 175.
- After: 7/7 validation passes. Deploy `1b9948d` succeeded in 44s. Live site now shows 175 insights. Pre-commit hook prevents recurrence at commit time (~0.3s overhead, skipped for non-graph commits).
