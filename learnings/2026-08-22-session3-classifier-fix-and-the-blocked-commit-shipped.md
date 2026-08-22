# Session: 2026-08-22 (S3) — Classifier fixed, S2's blocked commit shipped and deployed

S2 left 43 files staged, green, and uncommitted behind a review gate that was reading
insight PROSE as shell. This session fixed the classifier upstream, proved the fix with
mutation-verified canaries, and shipped the batch to the live site.

## Decisions

- **Fix `classify-diff.js` upstream rather than override at the call site** — ADOPTED:
  the gate behaved correctly given a wrong input; the repair belongs in the classifier.
  · Evidence: over-fire reproduced on two real diffs (staged set + `dc50ac3`), both
  `contentOnly:false` on 100% prose · Acted on: yes — 3 edits, live.
- **Merge `DATA_JSONL_PATHS` into one `DATA_JSON_PATHS` instead of appending an entry** —
  ADOPTED: the old set was unreachable for `.json` (see Key Insight #1), so an appended
  entry would have been DEAD — worse than absent, because it reads as covered.
  · Evidence: `classify-diff.js:212` guard `e === 'jsonl' || e === 'ndjson'` · Acted on: yes.
- **Hand the file edit to Ayush rather than route around the denial** — ADOPTED, second
  session running. Two denials → stop (Rule 3). Patch written to scratchpad, diff shown
  in chat, applied from his own shell. · Acted on: yes.
- **Do NOT bypass Actions to "save minutes"** — REJECTED on evidence: the repo is PUBLIC
  on `ubuntu-latest`, so Actions is unmetered; and `deploy.yml` IS the deploy, so any
  skip would have published nothing. · Evidence: `gh repo view` → `PUBLIC`; last 5 runs
  all success · Acted on: yes — pushed normally, run `32554654333` green in 57s.
- **Keep the `pipeline.yaml` positive control despite it being the weaker of the two** —
  ADOPTED: it can't distinguish path-anchoring from the blanket YAML rule, but it still
  catches a future refactor that made that rule content-shaped. Noted as weak in-file.
  · Acted on: yes.

## What Worked

- **Reproducing on two diffs before touching the code.** The staged set proved the bug was
  live; `dc50ac3` proved it was not specific to today's content. Two reproductions turned
  "the classifier over-fires" into two independently-fixable mechanisms.
- **`grep -cF` on each patch anchor before applying.** All three matched exactly once, and
  `DATA_JSONL_PATHS` appeared exactly twice (decl + single use) — which is what made the
  patch script's "no surviving reference" post-check meaningful instead of vacuous.
- **A patch script with `assert count == 1` per anchor.** Ayush ran it from his own shell;
  it would have exited non-zero without writing if the file had drifted. Idempotent on re-run.
- **Checking `gh run list` instead of the billing API.** The billing endpoint 404'd (scope),
  but five consecutive successes are a direct observation that the pipeline is funded.

## What Didn't Work

- **My first suggested unblock command was an `echo`, not an action.** Ayush ran it verbatim
  and nothing changed. If I hand over a command, it must BE the change — never a reminder
  string describing one.
- **Auto mode blocked ~6 calls**, including a read-only `python3` heredoc dry-run and two
  transient stage-2 errors on a canary command that had already succeeded once. Workaround
  that held: `grep -cF` for verification, redirect-to-file for long output, retry once on
  an explicit "usually transient" message.

## Key Insights

1. **The second bug was branch-reachability, not a missing list entry.** `public/graph-data.json`
   could never reach the allowlist lookup — `classify-diff.js:212` gated it on
   `e === 'jsonl' || e === 'ndjson'`. Adding the path to the old set would have produced a
   dead entry that reads as coverage in review. When a fix is "add it to the list", check
   the list is consulted on that path first.
2. **I nearly shipped a non-falsifiable canary (P72, caught at write-time).** The telemetry
   mutant first used benign fixture prose and expected `inert` — but that stays inert whether
   or not the allowlist covers it, so it would have passed forever proving nothing. Swapping
   in prose containing a real `;` makes the allowlist the ONLY thing holding it inert.
   Test: name the thing that would have to break for this assertion to go red.
3. **GitHub Actions metering keys on `runs-on`, not on repo visibility alone.** Public repo +
   standard runner = free; public repo + a larger runner class (`ubuntu-latest-4-core`+) is
   still billed. The reflex "public means free" is right here only by coincidence of both.

## Files Changed

- `~/.claude/skills/review/scripts/classify-diff.js:172,177,212` — `graph-index.yaml` added to
  `DATA_YAML_PATHS`; `DATA_JSONL_PATHS` → `DATA_JSON_PATHS` gaining `public/graph-data.json`;
  extension guard dropped so the lookup is reachable for `.json`.
- `~/.claude/hooks/tests/gate-hooks-canary.sh:383+` — 9 assertions: 2 inert (real fixtures from
  the blocking diff), 2 positive controls (same bytes, different path → still CODE), 3 mutation
  kills (empty each set, cases flip inert→CODE), 2 mutant-build guards.
- No project source changed. The 44-file commit `099bf4b` is S2's content, unblocked.

## Metrics

- Over-fire: `contentOnly:false` on both repro diffs → `contentOnly:true` on both.
- Canary: 126 passed / 0 failed → **135 passed / 0 failed**.
- `npm run check`: astro 0 errors · 7/7 structural · 41/41 tests · 273 nodes.
- Shipped: `099bf4b` (44 files, +1639/−63) → CI `32554654333` success 57s → site `200`,
  renders 273 insights. S2's blocker closed after 1 session blocked.
