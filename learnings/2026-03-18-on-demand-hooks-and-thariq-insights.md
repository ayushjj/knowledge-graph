# Session: 2026-03-18 - On-Demand Hook Skills + Thariq Insight Extraction

## What Worked
- Flag-file activation pattern for on-demand hooks: always-loaded hooks in settings.json that check for a temp file before running. ~1ms overhead when inactive, real blocking when active.
- Exit code 2 + stderr for PreToolUse blocking — simpler than JSON permissionDecision output.
- Using `CLAUDE_TOOL_INPUT` env var (proven in existing hooks) rather than stdin JSON parsing.

## What Didn't Work
- Initial agent research said skill frontmatter supports `hooks:` field — it doesn't. The skill-creator validator (`quick_validate.py:42`) only allows: name, description, license, allowed-tools, metadata, compatibility. Caught by reading the validator source before writing code.

## Key Insight
On-demand hooks in Claude Code require a 3-part architecture: (1) always-loaded hook in settings.json, (2) flag file in OS temp dir created/removed by skill instructions, (3) SKILL.md that tells Claude to create the flag. This is the "Temporarily Active Hooks" pattern from the hook-development docs. Session restart is required after first install because hooks load at session start.

## Files Changed
- `~/.claude/skills/careful/SKILL.md` + `scripts/check-destructive.js` — new skill
- `~/.claude/skills/freeze/SKILL.md` + `scripts/check-freeze.js` — new skill
- `~/.claude/settings.json` — 2 new PreToolUse hooks
- `~/.claude/skills/learn-book/SKILL.md` — description fix to trigger-spec
- `~/.claude/skills/review-plan/SKILL.md` — description fix to trigger-spec
- `insights/skill-folder-structure-is-context-engineering.md` — new insight
- `insights/metadata-for-llm-consumers-needs-trigger-specs-not-summaries.md` — new insight

## Metrics
- Graph: 109 → 111 insights
- Skill audit Descriptions: 90.9% → 100% (22/22)
- Skill audit Gotchas: 31.8% (7/22) — convention established, will grow organically
- Skill audit Disclosure: 31.8% (7/22) — near target of 35%
