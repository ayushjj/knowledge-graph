# Audit Gaps — Decisions

## Decision 1: Test Framework

**Question**: Which test framework for an Astro + React + Node project?

**Options**:
| Option | Pros | Cons |
|--------|------|------|
| Vitest | Native ESM, fast, Vite-compatible (Astro uses Vite), great TS support | Another dev dependency |
| Jest | Industry standard, huge ecosystem | Needs ESM transform config, slower, heavier |
| Node test runner | Zero dependencies, built-in | Limited assertions, no TS support without setup |

**Chosen**: Vitest

**Rationale**: Astro uses Vite internally, so Vitest integrates with zero config. Native ESM means `build-graph.js` (which uses `import`) works without transform hacks. Fast startup for a small test suite.

**Trade-off accepted**: Adding a dev dependency. But `vitest` is small and well-maintained.

---

## Decision 2: What to Test

**Question**: Which files get tests? Can't test everything in one session.

**Options**:
| Option | Pros | Cons |
|--------|------|------|
| Test everything (all 12 src files) | Maximum coverage | Overkill — most are Astro pages that need integration tests |
| Test the 3 critical transformation modules | Covers the highest-risk code | Leaves Astro pages/components untested |
| Test only `validate-graph.sh` | Already has the most logic | Bash testing is awkward, and the script already runs in CI |

**Chosen**: Test the 3 critical modules: `build-graph.js`, `remark-wikilinks.ts`, `graph.ts`

**Rationale**: These are pure-function modules where input → output is testable without rendering. A break in any of them silently corrupts either the graph data, the web site links, or the connection calculations. Astro pages are better verified by the existing `astro check` type checking.

**Trade-off accepted**: No component tests for React islands (`InsightFeed.tsx`, `GraphView.tsx`, `InsightCard.tsx`). These would need a DOM environment and are lower-risk.

---

## Decision 3: Telemetry Approach

**Question**: How to capture skill usage data without external services?

**Options**:
| Option | Pros | Cons |
|--------|------|------|
| JSONL file appended by `/wrap` | Simple, file-based, grep-friendly | Manual — relies on running `/wrap` |
| SQLite database | Queryable, structured | Overkill, adds dependency |
| Hook-based auto-capture (Claude Code hooks) | Automatic, no manual step | Complex setup, hook format may change |

**Chosen**: JSONL file appended by `/wrap`

**Rationale**: The project's architecture is file-based — YAML, Markdown, shell scripts. A JSONL file fits this pattern. `/wrap` already runs at end of every session, so adding one append is zero additional discipline. If hooks become more stable, can upgrade later.

**Trade-off accepted**: Not automatic — if you forget `/wrap`, the session isn't logged. But `/wrap` is already habitual per CLAUDE.md.

---

## Decision 4: Web Analytics Provider

**Question**: Which analytics for a GitHub Pages static site?

**Options**:
| Option | Pros | Cons |
|--------|------|------|
| Plausible (cloud) | Privacy-first, one script tag, free for personal | External dependency, data lives elsewhere |
| Umami (self-hosted) | Full control, open source | Needs a server to host |
| Simple custom event logging | Zero external deps | Requires building a receiver endpoint |
| None — defer until web site proves its value | No effort | Perpetuates the "no data" gap |

**Chosen**: Defer to user — recommend Plausible cloud as default

**Rationale**: This decision depends on the user's appetite for external services. Plausible is the lowest-friction option (one `<script>` tag, no cookies, GDPR-compliant). But the user may prefer self-hosted or may decide the web site doesn't need analytics yet.

**Trade-off accepted**: User may choose to skip this entirely. That's valid — the web site's primary audience may be "portfolio piece" not "product."
