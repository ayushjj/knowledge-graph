# Audit Gaps: Tests, Telemetry, and Feedback Loops

## Problem Statement

The `/audit-project` run against this repo scored 73% (45.5/62) — strong in architecture and process, but weak in verification infrastructure, observability, and automated learning. Three specific gaps have no partial coverage at all: zero test files, zero telemetry, and zero automated feedback loops.

## Current Behavior

- **Testing**: `validate-graph.sh` runs 7 structural checks. `astro check` does type checking. Both run in CI. But there are zero project-specific tests — no unit tests for `build-graph.js`, `remark-wikilinks.ts`, or `graph.ts`. Regressions in these files can only be caught by the downstream effects (broken build or broken links).
- **Telemetry**: No tracking of token usage, skill duration, error rates, or cost per invocation. Optimization decisions are based on feel ("this session felt long") rather than data.
- **Feedback loops**: The web site has no analytics. The compound engineering loop (`/wrap`, mistake patterns, principles) is manually maintained. No automated capture of skill success/failure rates.

## Why It Matters

1. **Tests**: The `remark-wikilinks.ts` plugin transforms `[[slug]]` into HTML links. If it breaks, every insight page breaks — but nothing catches this until a human notices. Same for `build-graph.js` output format changes.
2. **Telemetry**: Without data, you can't answer "Is `/learn` getting faster?" or "Which skill costs the most tokens?" — the compound engineering principle demands measurable improvement, not guessed improvement.
3. **Feedback loops**: The web site is live but you don't know if anyone reads it, which topics they care about, or how they navigate. The "revealed preferences" insight says track behavior, but the project doesn't practice what it preaches.

## Alternatives Considered

### Alternative A: Full test suite + telemetry service + analytics platform
- Pros: Comprehensive coverage, real-time dashboards, professional-grade observability
- Cons: Massive overengineering for a personal knowledge project. Vitest + Plausible + a JSON log file would take days to set up properly.
- Why rejected: Violates YAGNI. This project has one user. Start minimal.

### Alternative B: Do nothing — the project works fine
- Pros: Zero effort. No new maintenance burden.
- Cons: Ignores the audit's own findings. The `/audit-project` skill was built to surface gaps — ignoring them undermines trust in the tool. Also, the audit found the project doesn't practice what the graph's own insights preach (revealed preferences, observability, property-based testing).
- Why rejected: The gap between "what the graph says" and "what the project does" is a credibility issue.

### Alternative C: Minimal targeted additions — one session per gap
- Pros: Each gap gets a focused, completable solution. Tests in one session, telemetry in another, analytics in a third. Each session produces measurable improvement visible in the next `/audit-project` run.
- Cons: Three separate sessions. Each gap stays open until its session.
- Why chosen: Matches the "naive first, then optimize" principle. Each session is independently valuable.

## Proposed Solution

Three independent workstreams, each completable in one session:

### Workstream 1: Test Suite (Quick Win)
Add `vitest` and write targeted tests for the three critical modules:
1. `build-graph.js` — verify output shape (nodes array, links array, all required fields)
2. `src/lib/remark-wikilinks.ts` — verify `[[slug]]` → `<a href="/knowledge-graph/insight/slug">` transformation
3. `src/lib/graph.ts` — verify degree calculations, connection lookups
4. `validate-graph.sh` — verify it catches known-bad YAML (optional, harder to test)

Add `vitest run` to `npm run check` and CI pipeline.

### Workstream 2: Skill Telemetry (Medium)
Create a lightweight telemetry capture mechanism:
1. Add a `telemetry/` directory with a `skill-log.jsonl` file
2. Update `/wrap` skill to append a log entry after each session: `{date, skills_used, duration_estimate, files_changed, outcome}`
3. Create a `/telemetry` skill that reads `skill-log.jsonl` and reports: most-used skills, average session duration, files-changed-per-session trends

No external services. Just a JSONL file and a skill to read it.

### Workstream 3: Web Analytics (Medium)
Add privacy-respecting analytics to the Astro site:
1. Add Plausible or Umami script tag (self-hosted or cloud, single `<script>` tag)
2. Track: page views, top insights, topic popularity, graph page engagement
3. This creates the "revealed preferences" data the graph says to track

### Key Changes
1. Add `vitest` dev dependency + test files in `tests/`
2. Add `vitest run` to `npm run check` script
3. Update `.github/workflows/deploy.yml` to run tests
4. Create `telemetry/skill-log.jsonl` + update `/wrap` skill
5. Add analytics script to `src/layouts/Layout.astro`

## Success Metrics
- [ ] `npm run check` runs tests and all pass (Workstream 1)
- [ ] `/audit-project` Quality & Verification score improves from 4.5/7 to 6+/7
- [ ] `/audit-project` Observability score improves from 2.5/5 to 4+/5
- [ ] `/audit-project` Data & Learning score improves from 2.5/7 to 4+/7
- [ ] Overall audit score moves from 73% to 80%+

## Risks
- **Test maintenance burden**: Tests for `build-graph.js` could break when graph-index.yaml format evolves. Mitigation: test output shape, not specific content.
- **Telemetry becomes stale**: Manual logging via `/wrap` relies on discipline. Mitigation: `/wrap` already runs every session — adding one JSONL append is low friction.
- **Analytics adds external dependency**: Plausible/Umami requires a service. Mitigation: Plausible offers a free tier for personal sites; or use a self-hosted lightweight alternative.
