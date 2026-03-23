# GStack Capability Analysis — Implementation Plan

> **Status:** ALL 7 TASKS COMPLETE (2026-03-23). 5 files modified, 1 new skill created, spec + research persisted.

## Execution Order

```
Sequential:
  Task 1: CLAUDE.md anti-sycophancy rules      (~5 min)
  Task 2: /review scope drift detection         (~15 min)
  Task 3: /review security false-positive rules (~15 min)
  Task 4: /review-plan scope mode selection     (~15 min)
  Task 5: Create /premise-check skill           (~30 min)
  Task 6: Update /spec to reference premise     (~5 min)
  Task 7: Update MEMORY.md + save analysis      (~5 min)
```

Total: ~90 min

---

## Task 1: Add Anti-Sycophancy Rules to CLAUDE.md
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/CLAUDE.md`
- **Location:** After "### What Frustrates Me", before "Known LLM Failure Modes"
- **Content:** See plan file for exact text (5 rules scoped to diagnostic/review/planning phases)

## Task 2: Add Scope Drift Detection to /review
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/skills/review/SKILL.md`
- **Location:** New Step 1.5 between Step 1 (npm run check) and Step 2 (scope guard)
- **Content:** git log + spec check → classify as CLEAN/DRIFT/NO INTENT

## Task 3: Add Security False-Positive Filtering to /review
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/skills/review/SKILL.md`
- **Location:** Security-sentinel agent prompt in Step 4
- **Content:** 8 hard exclusions + confidence gate + exploit scenario requirement

## Task 4: Add Scope Mode Selection to /review-plan
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/skills/review-plan/SKILL.md`
- **Location:** New Step 0 before triviality gate + new Dimension 8 in output format
- **Content:** EXPAND/HOLD/REDUCE modes + "NOT in scope" section

## Task 5: Create /premise-check Skill
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/skills/premise-check/SKILL.md` (NEW)
- **Content:** 5-step lightweight premise validation (problem statement, status quo, do-nothing test, existing code check, premise statement)

## Task 6: Update /spec to Reference /premise-check
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/skills/creating-specifications/SKILL.md`
- **Location:** Preconditions section (line 4-7) + Step 2 note
- **Content:** Add precondition + tip about running /premise-check

## Task 7: Update MEMORY.md + Save Analysis
- [x] **Status:** Complete (2026-03-23)
- **Files:** `~/.claude/projects/.../memory/project_gstack_deep_analysis.md`, `MEMORY.md`
- **Content:** Replace partial analysis with full comparison results

---

## Verification

After all tasks:
1. [ ] Read each modified file — changes coherent with surrounding content
2. [ ] `npm run check` passes (skills are outside project, but sanity check)
3. [ ] /premise-check SKILL.md has correct frontmatter (name, description, user_invocable)
4. [ ] /review-plan output format includes Dimension 8 (scope mode)
5. [ ] /review Step 1.5 exists between Step 1 and Step 2
6. [ ] Security-sentinel agent prompt includes filtering rules
7. [ ] CLAUDE.md anti-sycophancy section exists
