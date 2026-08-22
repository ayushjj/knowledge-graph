# Session: 2026-08-21 (S2) — Two YC talks ingested; review gate escalated from friction to blocker

Planned work was the classifier fix flagged as PRIORITY by S1, then `/learn` on queued
videos. The fix was approved, then blocked by auto mode. The ingestion landed but cannot
be committed for the same underlying reason.

## Decisions

- **Fix classify-diff.js to stop rating graph files as EXEC** — APPROVED, then BLOCKED (not
  abandoned). Design: add `graph-index.yaml` to `DATA_YAML_PATHS`; merge `DATA_JSONL_PATHS`
  into one `DATA_JSON_PATHS` holding `telemetry/skill-log.jsonl` + `public/graph-data.json`.
  Evidence: two mechanisms confirmed, see Key Insights #1. Acted on: **no — auto mode denies
  writes to `~/.claude/skills/review/scripts/classify-diff.js` via both Bash and Edit.**
- **Do NOT route around the write denial** — ADOPTED. Two denials, then stop (Rule 3). The
  file is the gate deciding whether a diff may skip review; an agent editing it unsupervised
  is exactly what the denial is for. Acted on: yes — stopped, surfaced to user.
- **Do NOT spawn the T2 7-agent slate** — ADOPTED. Standing operator instruction: no Agent
  tool unless the user requests it. The user did not. Acted on: yes — reviewed the delta
  manually instead.
- **Do NOT write a PASS review flag after the manual review** — ADOPTED. The flag attests the
  *slate ran*; it did not. Writing PASS would have been a false attestation to a security
  mechanism, and it would have silently unblocked future commits too. Acted on: yes.
- **Enrich over duplicate, again** — ADOPTED. 16 new + 10 enrichments rather than 26 new.
  Blomfield's "burn tokens, not headcount" went into the existing `token-spend-replaces-
  headcount` node; Tan's "garbage dump with great search" into `provenance-becomes-the-
  constraint`. Acted on: yes.
- **Preserve the library-vs-scaffolding tension rather than resolve it** — ADOPTED per
  `feedback_contradictions_are_features`. Discriminator recorded on BOTH nodes: scaffolding
  patches a capability the model *lacks* (dies with the next release); a private library bets
  on nothing about the model (appreciates when the reader gets smarter). Acted on: yes.
- **Do not assert caption-mangled proper nouns** — ADOPTED (carried from S1). One company's
  revenue figure was dropped entirely because its name could not be recovered. Acted on: yes,
  recorded in each source file's PROVENANCE block.

## What Worked

- **Reproducing the bug on a real commit before proposing the fix.** Running the classifier
  over `dc50ac3` turned "the classifier over-fires" into two *distinct* named mechanisms with
  different fixes. The registry note had described it as one problem.
- **Grepping the actual keys in the blocked diff.** 698 added lines across both flagged files,
  seven data keys, zero exec keys — that is a falsifiable statement about the delta, not an
  assertion that it "looks like content."
- **Verifying all 26 wikilink targets existed before writing prose.** Check 4 (link targets)
  and Check 7 (wikilinks in prose) both passed first try across two batches.

## What Didn't Work

- **Assuming the classifier fix was the whole job.** It was scoped as removing *friction*
  (wasted agents). It is actually a *blocker*: the commit gate refuses the commit. S1's note
  under-described the severity, and so did I when I repeated it back at the start of this
  session.
- **`git add -A` and heredoc-scripted edits.** Both denied by auto mode. Explicit-path
  `git add` works; the Write/Edit tools work for project files. Worth knowing before reaching
  for a shell one-liner.

## Key Insights

1. **The over-fire is TWO bugs, not one, and only one is about YAML.** `graph-index.yaml` hits
   the blanket "YAML is orchestration by default" rule (`classify-diff.js:205-208`).
   `public/graph-data.json` gets through the JSON branch's data path and is then caught by
   `SHELL_VALUE` (`:180`) firing on **insight prose** — a `;` inside a quoted description
   (`"...what the API tells you; Tan argues..."`) reads as shell sequencing. That second one
   is byte-for-byte the S256 telemetry-prose bug one extension over, and the file already
   documents the fix pattern for it.
2. **A gate can be correct and still be wrong to obey blindly — the fix belongs upstream.**
   The commit gate did exactly what it should given what the classifier told it. The failure
   is entirely in the classifier's input. This is why the skill forbids call-site tier
   overrides: the right repair is a canary assertion plus a classifier change, and a
   judgement call at the call site would have hidden the bug rather than fixed it.
3. **When two safety mechanisms disagree, do the work and refuse the attestation.** The review
   skill wanted 7 agents; the operator instruction forbade them. Reviewing the delta by hand
   satisfied the *purpose* (the delta got reviewed), while declining to write the PASS flag
   respected the *mechanism* (the flag means something specific). Doing the work and lying
   about which path produced it would have been the worst of both.

## Files Changed

- `insights/` — 16 new (8 Blomfield, 8 Tan) + 15 edited (10 enrichments, 5 back-link sources).
- `sources/` — 2 new transcripts with PROVENANCE blocks naming every unasserted mangled noun.
- `graph-index.yaml` — 16 nodes appended; `outgoing:` updated on 15 existing nodes; 257→273.
- `topics/` — 6 MOCs updated. `index.md` — Recent Additions rebalanced 5 per source.
- `README.md:5,21` — count mentions 257→273 (census constants unchanged, still 2 and 1).
- **NOT committed** — 43 files staged, blocked at the review gate.

## Metrics

- Before: 257 insights, 921 links, tree clean at `bf855fe`.
- After: 273 insights, 996 links, 7/7 checks, 41/41 tests, astro clean — **staged, uncommitted**.
- Classifier over-fire reproduced twice on real diffs: `dc50ac3` and today's staged diff.
  Both `T2 / EXEC:true` on 100% prose + generated artifact.
