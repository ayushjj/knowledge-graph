# Scout Auto-Review: R5-R7 External Validity Upgrade

## Problem Statement

The `/scout` skill's self-review (Step 5.5) has 4 dimensions (R1-R4) that check **internal consistency** — evidence quality, actionability, conflicts between tips, priority accuracy. But they miss **external validity**: whether recommendations match the user's actual workflow or have been previously evaluated. This caused 4 misclassifications in the 2026-03-23 mvanhorn scout report:

| Tip | Scout Said | Reality | Root Cause |
|-----|-----------|---------|------------|
| Voice input | Novel | Already using Wispr Flow | Didn't read user memory files |
| Parallel sessions | Worth Investigating | Already runs 2-3 | Didn't check memory OR prior reports |
| Plan-first rule | Quick Win | Rules 0+6+8 already cover | Superficial keyword match |
| Codex CLI | Worth Investigating | No credit pressure | No "does this problem exist?" check |

The user currently compensates by manually running `/review-plan`-style first-principles review on every scout report. This should be built into the pipeline.

## Current Behavior

- Step 3 reads: CLAUDE.md, settings.json, settings.local.json, skills frontmatter, MEMORY.md, graph-index.yaml
- Step 3 does NOT read: user memory files (`~/.claude/projects/*/memory/*.md`)
- Step 5.5 checks: R1 (evidence quality), R2 (actionability), R3 (inter-tip conflicts), R4 (priority accuracy)
- Step 5.5 does NOT check: concept-level dedup against prior reports, user profile verification, first-principles "earns its place"
- False positive rate for "Already Covered": 0% (strong)
- Misclassification rate for "Novel"/"Worth Investigating": ~40% in latest report (4/10 tips)

## Proposed Solution

Three new review dimensions added to Step 5.5, plus one data source added to Step 3.

### Design Principles

1. **Additive only** — no existing behavior removed or modified. R1-R4 stay exactly as they are.
2. **Internal → External** — R1-R4 run first (internal consistency), R5-R7 run second (external validity). R5-R7 can reclassify tips from Step 4, noting original classification + reason in Review Notes.
3. **Fail open** — if memory files don't exist or prior reports are empty, R5-R7 skip gracefully. No false negatives from missing data.
4. **Concise** — each dimension is ~6 lines in the SKILL.md. Total addition: ~25 lines to a 285-line file.

### Change 1: Step 3 — Add memory file reads

Add item 7 to the existing numbered list (after graph-index.yaml):

```
7. Glob `~/.claude/projects/*/memory/*.md` — scan for user workflow details
   (voice input, editor prefs, parallel sessions, tool choices, stated philosophy).
```

Add to internal summary:

```
- User profile: tools in use, workflow patterns, stated philosophy (from memory files)
```

### Change 2: Step 5.5 — Add R5, R6, R7

Insert after R4, before the "After review" paragraph:

**R5: Dedup Against Prior Evaluations**
- Read `~/.claude/scout-reports/*.md` headers — check if the same CONCEPT was previously evaluated (not just same URL — same concept under different tool names).
- Check MEMORY.md benchmarking/gstack/setup-comparison sections for prior assessments.
- If previously evaluated and deferred → reclassify as "Already Evaluated" with citation.

**R6: User Profile Verification**
- Cross-check each Novel/Worth Investigating tip against the User Profile (from Step 3).
- Tips about tools/workflows the user already uses won't appear in config files — they live in memory files (voice input, parallel sessions, editor preferences).
- If tip matches user's existing workflow → reclassify to "Already Covered" with memory file citation.

**R7: First-Principles "Earns Its Place"**
- For each surviving Novel/Worth Investigating recommendation, ask:
  1. Does this serve the user's stated philosophy, or a different operating model?
  2. Is this solving a problem the user actually has right now?
  3. Would adopting this add complexity that works against the system?
- Demote philosophy-mismatches → "Conflicts / Tradeoffs" with analysis.
- Demote solutions for nonexistent problems → "Not Applicable (no current need)."

Override rule: R5-R7 can reclassify tips from Step 4. When reclassifying, note the original classification and reason for change in Review Notes.

### Change 3: Gotchas — Add #5

```
5. **Missing user profile context:** Tips about voice input, parallel sessions, or
   editor preferences live in memory files, not settings.json. R6 catches these —
   but only if Step 3 reads memory files. If memory files don't exist, R6 has no data.
```

## NOT in scope

- Changing the report format (sections, tables, ordering)
- Modifying R1-R4 in any way
- Adding new report sections (e.g., "Already Evaluated" as a separate table — reuse "Already Covered" with citation)
- Progressive disclosure / splitting scout into subfiles (separate initiative — skill-improvement spec)
- Automated testing of the scout pipeline

## What already exists

- R1-R4 self-review in Step 5.5 (lines 202-239 of SKILL.md) — internal consistency checks
- Gotcha #1 already mentions dedup against previous reports, but only for same source URL — R5 extends this to concept-level dedup
- Step 2 quality gate (line 54) already checks prior reports for "near-identical tip text" — R5 goes broader (same concept, different tool name)
- `user_workflow.md` memory file already created this session at `~/.claude/projects/C--Users-User-desktop-knowledge-graph/memory/user_workflow.md`

## Verification

1. After editing SKILL.md: count lines (should be ~310, not >320)
2. Read full Step 5.5 — confirm R1-R4 unchanged, R5-R7 follow logically
3. Confirm Step 3 has 7 items in its numbered list
4. Dry run: mentally apply R5-R7 to the mvanhorn report's 10 tips — should catch the 4 misclassifications

## Risks

1. **R7 is subjective** — "Does this serve your philosophy?" is a judgment call. May produce inconsistent results across invocations. Mitigant: user reviews reports and can override. The dimension is a prompt to think harder, not a mechanical gate.
2. **Memory file discovery** — R6 depends on memory files existing. If user starts working in a new project with no memory files, R6 silently has no data. Mitigant: Gotcha #5 documents this.
3. **Context cost** — reading memory files adds tokens to Step 3. For a user with many projects, globbing `~/.claude/projects/*/memory/*.md` could return many files. Mitigant: Step 3 says "scan for user workflow details" — read filenames and descriptions only, not full content.
