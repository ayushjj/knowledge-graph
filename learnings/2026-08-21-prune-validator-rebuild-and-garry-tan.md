# Session: 2026-08-21 — Prune, validator rebuild, Garry Tan ingestion

Three phases: `/prune-memory` (MEMORY.md was truncating on load), clearing the
2026-04-15 tech-debt backlog, then `/learn` on a YouTube interview. The middle
phase went wrong in an instructive way and is the reason this file exists.

## Decisions

- **Quarterly prune clock NOT reset** — ADOPTED: today's prune was size-triggered and
  touched no CLAUDE.md content; resetting would let the real quarterly sweep slip.
  Evidence: `governance.md:34` (last run 2026-07-04, due 2026-10-02). Acted on: yes —
  CLAUDE.md header stamp says so explicitly.
- **Do NOT prune `evals/mistake-ledger.md` / `principles/INDEX.md`** — REJECTED (the
  prune, not the files): 7 rows met the 1x-and->30d criterion, but both files were
  relocated out of CLAUDE.md on 2026-08-06 and are no longer auto-loaded, so they cost
  zero context. The eviction rule's premise (every row is a context tax) is gone, and
  the post-ablation section is explicitly a 1x holding pen whose re-add criterion needs
  those rows to survive. Acted on: yes — nothing pruned there.
- **Delete duplicated README count copies rather than harden the validator** — ADOPTED:
  6 count-bearing mentions → 2. P30 applied to my own change. Acted on: yes.
- **Delete the aggregate/per-domain topics split rather than fix its 3 bugs** — ADOPTED:
  the split's coupled lookarounds *were* the bug source. Acted on: yes.
- **Pin the mention CENSUS, not just the values** — ADOPTED: `EXPECTED_COUNT_MENTIONS=2`,
  `EXPECTED_TOPIC_MENTIONS=1`. Converts "a reword hid the stale copy" from a false PASS
  into a fail-closed error. Cost: adding a count mention now requires bumping the
  constant. Acted on: yes, `validate-graph.js`.
- **Keep the 3-digit floor in `COUNT_MENTION`** — ADOPTED over a reviewer's proposal to
  drop it (MF7, sub-100 counts break the check). Real README prose depends on it:
  `**Major contributors (2+ insights):**` would false-fail. Graph is at 257 and grows.
- **Defer the O(n²) at `validate-graph.js:78-79`** — OPEN: 0.077ms at 257 nodes, ~900ms
  at 10k. Reviewer explicitly recommended deferring at current growth. Acted on: no.
- **Review-classifier over-fire flagged, not worked around** — OPEN: `classify-diff.js`
  rates `graph-index.yaml` + `public/graph-data.json` as EXEC/T2 though both are pure
  data. Every future `/learn` will demand a code slate it doesn't need. Correct fix is a
  canary + classifier change, not a call-site judgement. Acted on: no — flagged only.
- **`/learn`: enrich over duplicate** — ADOPTED: 6 new + 4 enrichments rather than 10
  new. Four Tan claims were already in the graph with weaker mechanisms.
- **Two tensions preserved, not resolved** — ADOPTED per `feedback_contradictions_are_features`:
  `token-maxing` vs Gupta's cost-per-outcome discipline (discriminator recorded on both
  sides: whose outcome is priced); `institutional-slowness` vs `layer-migration`.
- **Two caption-mangled proper nouns not asserted** — ADOPTED: wrote around them and said
  so in-file, rather than guessing. Acted on: yes.

## What Worked

- **Mutation testing as the falsifier.** Revert each fix in turn, require the suite to go
  red, restore. Killed 5/5 mutants; caught two holes my own review missed.
- **Grepping consumers before deleting a file.** `validate-graph.sh` had one live consumer
  (`learn-book/SKILL.md:98`). Deleting without the grep would have silently broken `/learn-book`.
- **Verbatim-quote evidence base before writing insights.** Every number survived the
  fidelity audit — the historical fabrication mode did not recur.
- **Adversarial audit against ground truth.** 7 code reviewers on the validator, 1 fidelity
  auditor on the prose. Both found real defects I had already "verified".

## What Didn't Work

- **My four "positive controls" on the widened regex.** All four passed. All four were
  worthless: each mutated a line the regex *already matched*, so they could only confirm
  the regex's own assumptions. The check shipped green on the exact stale line
  (`README.md:76`, "14 topic MOCs") it was written to catch. Five of seven reviewers found
  it independently.
- **Hardening the regex instead of deleting copies.** First instinct was a cleverer
  pattern; it produced 5 defects (singular miss, mid-number restart on `(14 topics` → "4",
  `1,000 insights` → "000", silent sum-check disable, phantom aggregate). Deleting four
  README copies removed all five bug classes at once.
- **Quoting under-hedged.** The fidelity audit found 3 violations + 7 suspects, all in one
  direction: hedges stripped ("probably", "arguably", "somewhat"), "one of the defining
  reasons" → "at all", an ellipsis promoting a claim about one named person to a general
  rule, a speaker attribution the transcript can't support.

## Key Insights

1. **A positive control built from the thing under test proves nothing.** Mutate the CODE
   and require the check to notice — that is the only version that can fail. This is P72's
   "both sides derived from the same predicate" showing up in the *control* rather than the
   check, which is harder to see because the control looks like diligence.
2. **The same disease appears in prose.** Stripping a hedge makes a quote unfalsifiable in
   exactly the way a self-derived control makes a check unfalsifiable — nothing remains
   that could be checked against the source. Both of today's failures were *verifying
   something against itself*. Standing rule: recompute one side from a source that doesn't
   know what the other side believes.
3. **When a validator exists to keep N copies of one fact in agreement, delete copies.**
   P30 again, this time against my own hour-old work. Six README copies → two; the
   validator stopped policing 137 lines of marketing prose and the whole false-positive
   class went with it.

## Files Changed

- `validate-graph.js` — Checks 1+2 rebuilt; census constants; `topicSlugs` hoisted;
  renumbered 1..7 (was "1b"); 6 → 7 checks.
- `lib/readme-counts.js` (new) — extracted so it could be unit-tested at all.
- `tests/readme-counts.test.ts` (new) — 23 table tests, mutation-verified.
- `README.md` — 6 decorative count copies removed; 2 remain.
- Deleted: `build.js` (read `node.incoming`, removed 4 months ago → wrong `degree`),
  `validate-graph.sh`, `web/` (220K orphaned, build.js was its only producer).
- `insights/` — 6 new + 6 edited (4 enrichments + 2 back-link sources).
- `~/.claude`: MEMORY.md 26.7K→14.7K, new `MEMORY-archive.md`,
  `project_learn_backlink_bug.md` rewritten as resolved history,
  `skills/learn-book/SKILL.md:98` retargeted.

## Metrics

- Before: 251 insights, 897 links, 6 checks, 18 tests, MEMORY.md 26.7K (truncating on load).
- After: 257 insights, 921 links, 7 checks, 41 tests, MEMORY.md ~15K.
- Net repo: 32 files, +597 / −2731.
- Review findings: 7 code reviewers → 5 defects (all fixed); 1 fidelity auditor →
  3 violations + 7 suspects (all 14 fixed pre-commit).
- Both deploys CI-green; site 200.
