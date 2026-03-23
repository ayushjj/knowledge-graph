# GStack Capability Analysis — Design

## Problem Statement

The user's Claude Code skill ecosystem (24 custom skills + compound-engineering plugin + CLAUDE.md rules) was never systematically compared against GStack (garrytan/gstack, 28 skills, 38.9K stars) at source-code depth. A prior surface-level scout (2026-03-23) misclassified several skills due to README-level analysis. The user's goal is capability maximization — operating at the top percentile of Claude Code users.

## Current Behavior

- Pipeline goes `idea → plan mode → /spec → /review-plan → implement → /review → push` with no premise validation step
- Security review runs a generic security-sentinel agent with no false-positive filtering
- Code review skips scope drift detection (changes may not match stated intent)
- /review-plan always operates in implicit HOLD mode (no scope expansion/reduction option)
- Anti-sycophancy is passive ("push back if something seems wrong") not active ("take a position on every answer")

## Analysis Results

See `research.md` for the full 26-skill comparison. Summary:

| # | Gap | Source | Impact | Action |
|---|-----|--------|--------|--------|
| 1 | No premise validation before planning | /office-hours | TRANSFORMATIVE | Create /premise-check |
| 2 | No false-positive filtering in security | /cso | SIGNIFICANT | Extract into /review |
| 3 | No scope drift detection in review | /review (GStack) | SIGNIFICANT | Extract into /review |
| 4 | Anti-sycophancy not encoded globally | /office-hours | SIGNIFICANT | Add to CLAUDE.md |
| 5 | No scope mode selection in plan review | /plan-ceo-review | SIGNIFICANT | Extract into /review-plan |

15 explicit skip decisions documented in research.md Section 2 and Anti-Recommendations table.

## Proposed Solution

6 targeted changes: 1 new skill, 4 pattern extractions into existing skills, 1 cross-reference update.

### Key Changes
1. Add anti-sycophancy rules to `~/.claude/CLAUDE.md`
2. Add scope drift detection step to `~/.claude/skills/review/SKILL.md`
3. Add security false-positive filtering to `~/.claude/skills/review/SKILL.md`
4. Add scope mode selection to `~/.claude/skills/review-plan/SKILL.md`
5. Create `~/.claude/skills/premise-check/SKILL.md` (new skill)
6. Update `~/.claude/skills/creating-specifications/SKILL.md` to reference /premise-check

### Success Metrics
- [ ] /premise-check exists and is invocable
- [ ] /review has scope drift detection (Step 1.5) and security filtering in agent prompt
- [ ] /review-plan has scope mode selection (Step 0) and "NOT in scope" output
- [ ] CLAUDE.md has anti-sycophancy section
- [ ] /spec references /premise-check in preconditions

### Risks
- Anti-sycophancy rules could make Claude too aggressive → mitigated by scoping to "diagnostic, review, or planning phases"
- /premise-check could add friction → mitigated by making it optional, triggered by uncertainty
- Security filtering could suppress real findings → mitigated by using proven GStack exclusions (17 categories refined over 38K-star community usage)

## Alternatives Considered

### Alternative A: Install GStack directly
- Pros: Get all 28 skills immediately, community-maintained
- Cons: ~250 lines of boilerplate per skill, team-oriented philosophy conflicts with solo dev workflow, dual-deployment overhead, custom browse binary dependency
- Why rejected: Philosophy mismatch (Boil the Lake vs Surgical Minimalism). Better to extract patterns than adopt framework.

### Alternative B: Add everything as CLAUDE.md rules (no new skills)
- Pros: Zero new files, all behavioral
- Cons: /premise-check has 5 structured steps that benefit from skill format; security filtering needs to live in agent prompt, not behavioral rule; scope mode selection needs output format changes
- Why rejected: Some changes are structural (new steps in existing skills), not just behavioral.

### Alternative C: Do nothing, revisit when friction appears
- Pros: Zero effort
- Cons: Misses capability frontier improvements. The user explicitly requested proactive capability maximization, not reactive friction fixing.
- Why rejected: Conflicts with the user's stated intent.
