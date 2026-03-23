# Workflow Gates — Design

## Problem Statement

The user has 25 skills but frequently forgets to invoke them at the right time. High-value skills like /review, /premise-check, and /wrap depend entirely on user memory. The user is a bottleneck — if they forget, the skill doesn't run and quality drops.

## Current Behavior

- /review must be manually invoked before committing. User often forgets → unreviewed code gets committed.
- /premise-check (new) must be manually invoked before /spec. Easy to skip.
- /wrap must be manually invoked at session end. Context compaction can destroy un-persisted learnings.
- /review-plan is the ONE skill that's automatically enforced (Rule 8 before ExitPlanMode). It works because the trigger is specific and deterministic.

## Constraints (From Research)

**What hooks CAN do:** Block tool execution (exit code 2), check flag files, inspect tool input JSON, run shell commands.
**What hooks CANNOT do:** Invoke skills, read conversation context, enforce temporal ordering, make semantic decisions.

Existing pattern: /careful and /freeze use flag files in `$TMPDIR` + PreToolUse hooks. Proven, works.

## Proposed Solution

Three-tier enforcement model:

| Tier | Mechanism | Strength | Use For |
|------|-----------|----------|---------|
| 1. Deterministic gates | Hooks + flag files | Blocks action until skill runs | /review before commit |
| 2. Skill-internal chaining | Prerequisite offers in skill steps | Suggests at right moment | /premise-check before /spec |
| 3. CLAUDE.md workflow rules | Explicit trigger→action table | Probabilistic but specific | /wrap, /catchup, proactive suggestions |

### Key Changes
1. Block `git commit` unless /review has been run (hook + flag file)
2. /review creates `$TMPDIR/.claude-review-done` flag on completion
3. /spec Step 2 actively offers /premise-check when problem is unclear
4. /wrap includes lightweight techdebt scan of modified files
5. CLAUDE.md gets explicit Workflow Gates table (trigger → action → enforcement)

### Success Metrics
- [ ] `git commit` without /review is blocked
- [ ] `git commit` after /review passes
- [ ] Content-only changes still pass (flag created by scope guard)
- [ ] /spec offers /premise-check when problem is vague
- [ ] Workflow Gates table in CLAUDE.md

### Risks
- Review gate could block legitimate commits on non-code changes → mitigated by content-only scope guard creating flag
- Flag file persists across sessions if $TMPDIR isn't cleared → acceptable (forces review per reboot cycle)
- CLAUDE.md rules remain probabilistic → acceptable (Tier 3 is the fallback, not the primary enforcement)

## Alternatives Considered

### A: Auto-invoke skills from hooks
- Rejected: hooks can only run shell commands, not invoke skills

### B: Add all enforcement as CLAUDE.md rules
- Rejected: user explicitly asked for automation that doesn't depend on them. CLAUDE.md rules are probabilistic — "Substituted approach without checking plan" has happened 4x.

### C: Use Stop hook to check what skills were run
- Partially adopted: Stop hook could be enhanced but it runs AFTER the session, too late to enforce gates
