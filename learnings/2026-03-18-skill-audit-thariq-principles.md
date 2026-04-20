# Session: 2026-03-18 - Skill Audit Against Thariq Principles

## What Worked
- 8-dimension rubric (derived from Thariq article) provided a systematic framework for evaluating 20 skills. Without it, the audit would have been ad-hoc.
- Reading ALL 20 skills in parallel (2 batches of 10) built a complete picture before making any changes. Prevented the "fix one, break another" pattern.
- `/review-plan` caught the backup gap — skills in `~/.claude/skills/` have NO version control. `.bak` files were the only safety net.

## What Didn't Work
- Line count target of 160 for `/learn` was unrealistic given that gotchas (Action 1) and progressive disclosure (Action 2) were applied simultaneously. The gotchas added ~15 lines. Actual result: 180 lines. Not a failure — just a planning error in the spec.

## Key Insight
**Skills have a maturity model: monolith → progressive disclosure → accumulated gotchas → embedded scripts.** Most skills start as a single SKILL.md and never evolve. The Thariq article codifies what "evolved" looks like. The highest-ROI improvement is getting top skills from Stage 1 to Stage 2-3 — not building new skills.

A second insight: **failure knowledge should live at the point of use, not in a central file.** MEMORY.md had 3 documented failure lessons that belonged in the skills that trigger those failures. Centralizing gotchas in MEMORY.md means Claude has to "remember" to check a separate file — co-locating them means they're loaded automatically when the skill runs.

## Files Changed
- `~/.claude/skills/review/SKILL.md` — Added frontmatter (name, description, user_invocable)
- `~/.claude/skills/learn/SKILL.md` — Rewrote description, added gotchas, extracted 3 reference files
- `~/.claude/skills/learn/references/topics.md` — New: topic taxonomy
- `~/.claude/skills/learn/references/frontmatter-template.md` — New: file structure + wikilink rules
- `~/.claude/skills/learn/references/fidelity-rules.md` — New: 5 source fidelity constraints
- `~/.claude/skills/connect/SKILL.md` — Rewrote description, added gotchas
- `~/.claude/skills/learn-book/SKILL.md` — Added gotchas
- `~/.claude/skills/scout/SKILL.md` — Rewrote description, added gotchas
- `~/.claude/skills/investigating-problems/SKILL.md` — Added gotchas, de-railroaded Steps 2-3
- `~/.claude/skills/finding-techdebt/SKILL.md` — Rewrote description
- `~/.claude/skills/telemetry/SKILL.md` — Rewrote description
- `specs/skill-improvement/` — New: design.md, decisions.md, implementation.md

## Metrics
- Before: 14/20 trigger-spec descriptions, 0/20 gotchas sections, 25% progressive disclosure
- After: 20/20 trigger-spec descriptions, 5/20 gotchas sections, `/learn` split into folder structure
