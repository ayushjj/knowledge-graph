# Scout Auto-Review: Implementation Plan

> **Status:** All 3 tasks COMPLETE (2026-03-23). Scout SKILL.md upgraded, mvanhorn report corrected, GStack re-scouted. Surviving action items: 1 quick win (Stop beep), 2 worth investigating (/last30days, Granola), 1 conditional (/cso pattern), 4 trivial GStack carryover items.

## Execution Order

```
Parallel:  Task 1 (Scout SKILL.md upgrade) + Task 3 (Report correction)
Then:      Task 2 (GStack re-scout — uses upgraded R5-R7 thinking)
```

---

## Task 1: Scout SKILL.md Upgrade
**Status:** COMPLETE (2026-03-23)
**File:** `~/.claude/skills/scout/SKILL.md`
**Effort:** ~15 min

### Steps
1. Read SKILL.md (already read — 285 lines)
2. Add item 7 to Step 3 numbered list (after line 69)
3. Add "User profile" bullet to internal summary (after line 75)
4. Add R5, R6, R7 after R4 in Step 5.5 (after line 230)
5. Add override precedence sentence after R7
6. Add Gotcha #5 (after line 273)
7. Verify: count lines (~310), read Step 5.5 for flow

### Exact text additions → see `design.md` Changes 1-3

---

## Task 2: GStack Re-Scout
**Status:** COMPLETE (2026-03-23)
**Output:** `~/.claude/scout-reports/2026-03-23-gstack-rescout.md`
**Effort:** ~30 min

### Steps
1. Fetch GStack README via Jina for latest skill listing
2. Verify 6 prior adoption items (from `zippy-napping-feather.md`):
   - Grep `~/.claude/skills/review-plan/SKILL.md` for: "NOT in scope", "What already exists", "Failure Mode" table, "Step 0"
   - Grep `~/.claude/skills/creating-specifications/SKILL.md` for: "NOT in scope"
   - Grep `~/.claude/skills/review/` for: `checklist.md`
   - Grep `~/.claude/CLAUDE.md` for: "eval-sensitive"
   - Grep `~/.claude/skills/review-plan/SKILL.md` for: option format (3A/3B)
3. Pre-filter 13 skills that already have equivalents (see design.md)
4. Evaluate 7 new architectural patterns through R5-R7 lens
5. Write scout report

### 7 patterns to evaluate
| # | Pattern | Key R7 question |
|---|---------|-----------------|
| 1 | Cross-model "outside voice" | Solo dev = no reviewer tension. Does simulating tension add value? |
| 2 | Template-driven SKILL.md (.tmpl) | 22 skills, hand-authored. Is a build step justified? |
| 3 | /cso zero-noise security (17 exclusion rules) | compound-engineering:security-sentinel exists. What's the delta? |
| 4 | 3-tier testing (static/E2E/LLM-judge) | 18 tests, ~1s. Is tiering needed? |
| 5 | /autoplan multi-reviewer orchestration | /ce:plan already does multi-agent research. What's new? |
| 6 | /office-hours inline reframing | Reframing before planning vs. just planning |
| 7 | Symlink dev for live skill testing | We edit SKILL.md directly, no deploy cycle |

---

## Task 3: Correct mvanhorn Report
**Status:** COMPLETE (2026-03-23)
**File:** `~/.claude/scout-reports/2026-03-23-report.md`
**Effort:** ~5 min

### Reclassifications
1. Voice input (WI #2) → Already Covered (Wispr Flow, user_workflow.md)
2. Parallel sessions (WI #3) → Already Covered (2-3 sessions, user_workflow.md + 2026-03-17 report)
3. Plan-first rule (QW #2) → Already Covered (Rules 0+6+8)
4. Codex CLI (WI #4) → Not Applicable (no credit pressure)
5. KG Candidate #1 → Already in Graph (graph-index.yaml:475)
6. Append R5-R7 reclassification notes to Review Notes

### Post-edit section counts
- Quick Wins: 1 (Stop beep)
- Worth Investigating: 2 (/last30days, Granola MCP)
- Already Covered: 6
- Conflicts: 1 (bypassPermissions)
- Not Applicable: 4

---

## Verification (all tasks)

- [x] Task 1: SKILL.md lines ~310 (not >320) — **314 lines**
- [x] Task 1: Step 3 has 7 numbered items — **verified lines 64-71**
- [x] Task 1: Step 5.5 has R1-R7 in order — **R1:209, R2:218, R3:227, R4:231, R5:235, R6:241, R7:248**
- [x] Task 2: All 6 prior adoption items checked with grep evidence — **0/6 adopted, grep targets documented**
- [x] Task 2: 13 pre-filtered skills cited with "already have" evidence — **13 skills with file citations**
- [x] Task 2: 7 patterns each have R7 verdict with reasoning — **4 Already Covered, 1 Worth Investigating, 2 Not Applicable**
- [x] Task 3: Section counts match (1/2/6/1/4) — **verified**
- [x] Task 3: Review Notes document all reclassifications with R5/R6/R7 citations — **5 reclassifications documented**
