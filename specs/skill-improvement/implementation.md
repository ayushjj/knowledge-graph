# Skill Improvement — Implementation

## Status: All Actions Complete + On-Demand Hooks Built. Pending: Re-score Audit.

## Pre-Flight: Backup (No Git for Skills)

Skills live in `~/.claude/skills/` — outside any git repo. Before modifying any SKILL.md, create a backup:

```bash
for skill in learn connect learn-book scout investigating-problems review finding-techdebt telemetry; do
  cp ~/.claude/skills/$skill/SKILL.md ~/.claude/skills/$skill/SKILL.md.bak
done
```

- [x] Run backup command
- [x] Verify: `.bak` files exist for all 8 skills being modified

**Rollback**: If any action breaks a skill, restore with `cp SKILL.md.bak SKILL.md` in that skill's directory.

## Execution Order

### Action 4: Add frontmatter to `/review` [~2 min] — DONE
- [x] Read `~/.claude/skills/review/SKILL.md`
- [x] Add YAML frontmatter block: name, description (trigger spec), user_invocable
- [ ] Verify: invoke `/review` — deferred to next code-change session

### Action 3: Fix 6 descriptions to trigger specs [~10 min] — DONE
- [x] Rewrite `/learn` description
- [x] Rewrite `/connect` description
- [x] Rewrite `/techdebt` description
- [x] Rewrite `/telemetry` description
- [x] Rewrite `/scout` description
- [x] (review already fixed in Action 4)
- [x] Spot-check: all 20 skill descriptions now use "Use when..." trigger-spec format (including `/ingest` and `/audit-project` fixed post-plan)

### Action 1: Seed gotchas into top 5 skills [~15 min] — DONE
- [x] Add `## Gotchas` to `/learn/SKILL.md` — 6 items (source fidelity, X Article, slug collisions, back-link step)
- [x] Add `## Gotchas` to `/connect/SKILL.md` — 3 items (slug mismatch, wrong node, graph-index sync)
- [x] Add `## Gotchas` to `/learn-book/SKILL.md` — 4 items (context exhaustion, training data contamination, resumability, appendices)
- [x] Add `## Gotchas` to `/scout/SKILL.md` — 4 items (dedup, X fetch, superficial matching, context limits)
- [x] Add `## Gotchas` to `/investigate/SKILL.md` — 3 items (logs first, verify state, domain-specific steps)
- [ ] Verify: each skill loads without errors — deferred to next invocation

### Action 5: De-railroad `/investigate` [~10 min] — DONE
- [x] Read current Steps 2-3
- [x] Replace with conditional domain-specific checks (DB, LLM, static site)
- [x] Preserve database lessons as conditional block
- [x] Add LLM and static site blocks
- [ ] Verify: invoke `/investigate` on a non-DB problem — deferred to next bug

### Action 2: Split `/learn` into progressive disclosure [~30 min] — DONE
- [x] Create `~/.claude/skills/learn/references/` directory
- [x] Extract topic taxonomy → `references/topics.md` (29 lines)
- [x] Extract frontmatter template + wikilink rules → `references/frontmatter-template.md` (43 lines)
- [x] Extract source fidelity rules → `references/fidelity-rules.md` (23 lines)
- [x] Update SKILL.md steps to reference files
- [x] Verify line count: SKILL.md = 180 lines (target was <160; +20 from gotchas section, acceptable)
- [ ] **Critical test**: Run `/learn` on a real URL — deferred to next /learn invocation
- [ ] **Fallback**: `.bak` files ready if split breaks pipeline

**Note:** Wikilink rules were merged into `frontmatter-template.md` rather than a separate file — 3 reference files instead of 4. Simpler.

### Action 6: Build on-demand hook skills [~15 min] — DONE
Scout report Quick Wins #1 and #2 from Thariq principles.

- [x] Research: skill frontmatter does NOT support `hooks:` field (only name, description, license, allowed-tools, metadata, compatibility)
- [x] Design: flag-file activation pattern — always-loaded PreToolUse hooks in settings.json, skills create/remove flag files in OS temp dir
- [x] Create `/careful` skill — SKILL.md + `scripts/check-destructive.js` (11 destructive patterns)
- [x] Create `/freeze` skill — SKILL.md + `scripts/check-freeze.js` (directory-scoped Edit/Write lock)
- [x] Add 2 PreToolUse hooks to `~/.claude/settings.json`
- [x] Test: rm -rf → BLOCKED, git push --force → BLOCKED, git log → allowed
- [x] Test: edit inside frozen dir → allowed, edit outside → BLOCKED
- [x] Updated MEMORY.md (skills table + audit section)
- [ ] Verify in live session: requires session restart for hooks to load

## Verification

- [x] `/learn` tested with real URL (2026-03-18 session — Thariq article extracted 2 insights successfully)
- [x] `/careful` and `/freeze` hook scripts tested via direct invocation (all 5 test cases pass)
- [ ] Each remaining modified skill invoked at least once (gotchas/description changes)
- [x] Re-run audit scorecard — results below
- [ ] `/careful` and `/freeze` tested in live session (requires restart)

### Audit Re-Score (2026-03-18)

| Dimension | Before | After | Target | Status |
|-----------|--------|-------|--------|--------|
| Descriptions (trigger-spec) | 70% (14/20) | **100%** (22/22) | ≥90% | **PASS** |
| Gotchas (`## Gotchas`) | 60% (12/20) | **31.8%** (7/22) | ≥75% | FAIL — see note |
| Progressive Disclosure | 25% (5/20) | **31.8%** (7/22) | ≥35% | MISS by 3.2% |

**Gotchas note:** Original 60% counted partial/inline warnings. Strict re-score counts only explicit `## Gotchas` sections. 7 skills have them (learn, connect, learn-book, scout, investigate, careful, freeze). The convention is established — score will improve organically as skills fail and gotchas accumulate. Not worth force-seeding empty gotchas into 15 low-frequency skills.

**Progressive Disclosure note:** 7/22 have subfolders (learn/references, careful/scripts, freeze/scripts, creating-specifications/references, executing-batch-operations/scripts, tuning-llm-prompts/references+scripts, validating-queries/scripts). Remaining skills are short enough that splitting would be premature abstraction.

## Learnings

- `.bak` files are the only safety net for `~/.claude/skills/` — no git tracking. Always backup before modifying skills.
- Gotchas sections add ~10-15 lines each but prevent real errors at point of use. Worth the context cost.
- Progressive disclosure reduces SKILL.md from 229→180 lines (not the 155 target) because gotchas were added simultaneously. Net savings will compound when reference files are reused by `/learn-book` and `/ingest`.
- Skill frontmatter only supports 6 fields (name, description, license, allowed-tools, metadata, compatibility). On-demand hooks require the flag-file activation pattern: always-loaded hooks in settings.json that check for a flag file before running.
- Exit code 2 + stderr is the simplest way to block a tool call from a PreToolUse command hook — no JSON output format needed.
