# Workflow Gates — Implementation Plan

> **Status:** ALL 7 TASKS COMPLETE (2026-03-23)

## Execution Order

```
Task 1: Create review gate hook script              (~10 min)
Task 2: Update /review to create flag file           (~5 min)
Task 3: Add hook to settings.json                    (~5 min)
Task 4: Strengthen /spec premise-check offer         (~5 min)
Task 5: Add techdebt scan to /wrap                   (~10 min)
Task 6: Add Workflow Gates table to CLAUDE.md         (~10 min)
Task 7: Update spec + MEMORY.md                      (~5 min)
```

Total: ~50 min

---

## Task 1: Create Review Gate Hook Script
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/skills/review/scripts/check-review-gate.js` (NEW)
- **Content:** Node.js script — check for `$TMPDIR/.claude-review-done` flag, block `git commit` if missing

## Task 2: Update /review to Create Flag File
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/skills/review/SKILL.md`
- **Location:** New Step 7 after Step 6 (Verdict)
- **Content:** `touch "$TMPDIR/.claude-review-done"` after delivering verdict

## Task 3: Add Hook to settings.json
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/settings.json`
- **Location:** PreToolUse array, after existing Bash hooks
- **Content:** New Bash matcher hook running check-review-gate.js

## Task 4: Strengthen /spec Premise-Check Offer
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/skills/creating-specifications/SKILL.md`
- **Location:** Step 2 (Problem Statement), before the template
- **Content:** Check if /premise-check has been run, offer if problem is unclear

## Task 5: Add Techdebt Scan to /wrap
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/skills/wrapping-session/SKILL.md`
- **Location:** Step 0 (before committing)
- **Content:** grep TODO/FIXME/HACK in modified files, report count

## Task 6: Add Workflow Gates Table to CLAUDE.md
- [x] **Status:** Complete (2026-03-23)
- **File:** `~/.claude/CLAUDE.md`
- **Location:** After Command Discipline Rules section
- **Content:** Workflow Gates table (6 trigger→action pairs) + Proactive Suggestions table (4 observations)

## Task 7: Update Spec + MEMORY.md
- [x] **Status:** Complete (2026-03-23)
- **Files:** This file + MEMORY.md
- **Content:** Mark tasks complete, update MEMORY.md with workflow gates summary

---

## Verification

1. [ ] Attempt `git commit` without /review → blocked with message
2. [ ] Run /review, then `git commit` → passes
3. [ ] Content-only change through /review scope guard → flag created, commit passes
4. [ ] `touch "$TMPDIR/.claude-review-done"` then commit → passes (escape hatch)
5. [ ] settings.json parses as valid JSON
6. [ ] /spec Step 2 mentions /premise-check offer
7. [ ] CLAUDE.md has Workflow Gates section
