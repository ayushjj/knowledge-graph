# Audit Gaps — Implementation

## Status: Workstreams 1 & 2 Complete, Workstream 3 Pending User Decision

## Workstream 1: Test Suite (1 session) — DONE

### Tasks
- [x] Install `vitest` as dev dependency
- [x] Create `tests/build-graph.test.ts` — verify output shape, node/link counts, required fields
- [x] Create `tests/remark-wikilinks.test.ts` — verify `[[slug]]` → anchor tag transformation
- [x] Create `tests/graph.test.ts` — verify degree calculations, topic lookups
- [x] Add `vitest run` to `npm run check` in `package.json`
- [x] Add `npx vitest run` to `.github/workflows/deploy.yml` before build
- [x] Run `npm run check` — verify all tests pass alongside existing checks
- [ ] Run `/audit-project --feature "test suite"` to verify Quality dimension improvement

### Files Changed
- `package.json` — added vitest dep, `check` script includes `vitest run`, added `test` script
- `.github/workflows/deploy.yml` — added `npx vitest run` step before build
- `tests/build-graph.test.ts` — new file (5 tests)
- `tests/remark-wikilinks.test.ts` — new file (4 tests)
- `tests/graph.test.ts` — new file (9 tests)
- `vitest.config.ts` — new file (minimal config)

### Results
- 18 tests passing across 3 files in ~1s

---

## Workstream 2: Skill Telemetry (1 session) — DONE

### Tasks
- [x] Create `telemetry/README.md` to preserve directory and document schema
- [x] Update `~/.claude/skills/wrapping-session/SKILL.md` — added Step 4 to append JSONL entry
- [x] Define JSONL schema: `{date, skills_used[], duration_min, files_changed, insights_added, outcome}`
- [x] Create `/telemetry` skill to read and summarize `skill-log.jsonl`
- [x] Add `telemetry/skill-log.jsonl` to `.gitignore`
- [ ] Run `/wrap` to test the new logging step
- [ ] Run `/audit-project --feature "telemetry"` to verify Observability improvement

### Files Changed
- `telemetry/README.md` — new file (schema docs)
- `~/.claude/skills/wrapping-session/SKILL.md` — added Step 4 (telemetry append)
- `~/.claude/skills/telemetry/SKILL.md` — new skill
- `.gitignore` — added `telemetry/skill-log.jsonl`

---

## Workstream 3: Web Analytics (1 session, pending user decision)

### Tasks
- [ ] User decides: Plausible cloud / Umami self-hosted / skip
- [ ] If Plausible: add `<script>` tag to `src/layouts/Layout.astro`
- [ ] Verify analytics appear on dashboard after deploy
- [ ] Wait 1 week, then review: which insights get traffic? Which topics?
- [ ] Run `/audit-project` to verify Data & Learning improvement

### Files to Change
- `src/layouts/Layout.astro` — add analytics script in `<head>`

### Verification
- [ ] Analytics dashboard shows page views after deploy
- [ ] No impact on Lighthouse performance score

---

## Execution Log

- **2026-03-16**: Workstream 1 complete — vitest installed, 18 tests passing, CI updated
- **2026-03-16**: Workstream 2 complete — telemetry dir, `/telemetry` skill, `/wrap` updated with Step 4

## Learnings

_(To be filled during implementation)_
