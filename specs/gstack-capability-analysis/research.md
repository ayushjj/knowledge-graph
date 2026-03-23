# GStack Capability Analysis — Research

> **Date:** 2026-03-23
> **Source:** garrytan/gstack (GitHub, 38.9K stars, 28 skills as of v0.11.5.2)
> **Method:** Full source read of all 26 active SKILL.md files via GitHub API + complete catalog of user's 24 custom skills, compound-engineering plugin, and CLAUDE.md behavioral rules
> **Prior work:** Surface-level re-scout on 2026-03-23 (`~/.claude/scout-reports/2026-03-23-gstack-rescout.md`) — this research supersedes it with actual source-level analysis

---

## 1. GStack Architecture Overview

GStack is a skill framework for Claude Code built by Garry Tan (YC). Key architectural differences from user's setup:

| Dimension | GStack | User's Setup |
|-----------|--------|-------------|
| Philosophy | "Boil the Lake" — completeness over simplicity | Surgical minimalism — simplest viable solution |
| Target audience | Teams (role separation: CEO/eng/design) | Solo developer |
| Skill count | 28 (including infra) | 24 custom + compound-engineering plugin |
| Shared boilerplate | ~250 lines per skill (preamble, telemetry, AskUserQuestion format, completeness principle, contributor mode, repo mode) | None — each skill is standalone |
| Generation | Template-driven (SKILL.md.tmpl → SKILL.md via `bun run gen:skill-docs`) | Hand-authored |
| Persistence | `~/.gstack/projects/{slug}/` for design docs, session data | `specs/`, `MEMORY.md`, `session-registry.yaml` |
| Deployment model | Dual (.claude/ + .agents/ for Codex/Gemini/Cursor portability) | Claude Code only |
| Browser | Custom `browse` binary (~100ms/cmd, built with bun) | None |
| Cross-model | Codex integration for independent second opinion | Single-model (Claude only) |

### GStack's Pipeline Flow

```
/office-hours (premise validation)
    ↓
/plan-ceo-review (scope + strategy)
    ↓
/plan-eng-review (architecture + tests)
    ↓
/plan-design-review (UI/UX + edge cases)
    ↓
Implementation (no dedicated skill)
    ↓
/review (diff-based code review)
    ↓
/qa or /qa-only (browser-based testing)
    ↓
/ship (merge + version + changelog + PR)
    ↓
/land-and-deploy (CI → deploy → verify)
    ↓
/canary (10-min post-deploy monitoring)
    ↓
/retro (weekly engineering retrospective)
```

### User's Pipeline Flow

```
/investigate or /data-analysis (problem understanding)
    ↓
/research (codebase exploration)
    ↓
/spec (3-file spec: design, decisions, implementation)
    ↓
/review-plan (7-dimension self-adversarial review)
    ↓
Implementation (Rule 6: 4-gate protocol)
    ↓
npm run check (type check + graph validation + tests)
    ↓
/review (6 parallel specialized agents)
    ↓
git push → CI auto-deploy
    ↓
/wrap (commit + docs + learnings + handoff + registry)
```

---

## 2. Full Skill-by-Skill Comparison

### 2.1 Problem Definition & Validation

#### GStack /office-hours vs User: [GAP — No Equivalent]

**What /office-hours does (650 lines):**
- Two modes: Startup mode (6 forcing questions exposing demand reality) and Builder mode (generative design partner)
- Phase 1: Context gathering (CLAUDE.md, git log, codebase mapping)
- Phase 2A (Startup): Six forcing questions asked ONE AT A TIME:
  - Q1 Demand Reality: "What's the strongest evidence someone actually wants this — not 'is interested'?"
  - Q2 Status Quo: "What are users doing right now to solve this — even badly?"
  - Q3 Desperate Specificity: "Name the actual human who needs this most. Title? What gets them promoted/fired?"
  - Q4 Narrowest Wedge: "What's the smallest version someone would pay real money for this week?"
  - Q5 Observation: "Have you watched someone use this without helping them? What surprised you?"
  - Q6 Future-Fit: "If the world looks different in 3 years, does your product become more or less essential?"
- Phase 2B (Builder): Generative questions — "What's the coolest version?" "Who would you show this to?"
- Phase 2.75: Landscape Awareness — web search for conventional wisdom + 3-layer synthesis (tried & true, popular, first principles)
- Phase 3: Premise Challenge — "Is this the right problem? What happens if we do nothing? What existing code partially solves this?"
- Phase 3.5: Cross-model second opinion (Codex, if available)
- Anti-sycophancy rules: Never say "that's interesting" / "many ways to think" / "you might consider" — take positions, push back on vague answers
- Output: Design doc saved to `~/.gstack/projects/{slug}/`

**Why the previous re-scout got this wrong:**
The re-scout classified /office-hours as "Already Covered" by `/ce:brainstorm + plan mode`. This conflated two fundamentally different cognitive operations:
- Brainstorming = divergent thinking (generating options)
- Premise validation = convergent diagnosis (challenging whether to build at all)

The user's pipeline has no step that asks "should we build this?" before entering plan mode. Every idea that enters `/spec` is assumed worth building.

**Verdict:** TRANSFORMATIVE gap. The premise challenge (Phase 3) and anti-sycophancy rules are the highest-value extractions.

---

#### GStack /investigate vs User /investigating-problems: [PARTIAL — Minor Gaps]

Both follow the same core pattern: symptoms → hypothesis → verify → fix → regression test. Both have 3-strike escalation.

**GStack-specific techniques:**
1. Auto-locks edits to affected directory via /freeze during debugging (prevents scope creep)
2. Structured pattern analysis table (race condition, nil propagation, state corruption, etc.)
3. WebSearch for sanitized error messages before guessing

**Verdict:** INCREMENTAL. User's skill is already solid. Auto-freeze during debugging is worth extracting.

---

### 2.2 Planning & Review

#### GStack /plan-ceo-review vs User /review-plan: [PARTIAL — Scope Modes Missing]

**What /plan-ceo-review adds (880 lines):**
- **Step 0: Scope mode selection** — 4 modes:
  - SCOPE EXPANSION: "Dream big. What would make this 10x better?"
  - SELECTIVE EXPANSION: "Hold scope as baseline, but surface expansion opportunities individually"
  - HOLD SCOPE: "Make it bulletproof. Don't expand or reduce."
  - SCOPE REDUCTION: "Find minimum viable. Cut everything non-essential."
- 9 Prime Directives (zero silent failures, every error has a name, data flows have shadow paths, etc.)
- 18 Cognitive Patterns from Bezos/Munger/Jobs/Horowitz/Altman (classification instinct, inversion reflex, focus as subtraction, etc.)
- "NOT in scope" section — explicitly documents what was considered and rejected
- Prerequisite skill offer: if no design doc exists, offers to run /office-hours first
- Engineering Preferences section (DRY, well-tested, explicit > clever, minimal diff, observability)

**User's /review-plan (140 lines):**
- 7 dimensions: assumptions, root cause, alternatives, learnings cross-reference, blast radius, completeness, compound risk
- Triviality gate (skip for single-file changes)
- Auto-invoked by Rule 8

**Capability delta:**
1. User lacks scope mode selection — /review-plan is always implicitly HOLD
2. User lacks "NOT in scope" documentation — decisions to exclude things aren't persisted
3. User lacks the prerequisite offer pattern (suggesting /premise-check before /review-plan)

**What user does BETTER:**
- Learnings cross-reference (Dim 4) has no GStack equivalent — checking mistake patterns and principles against the plan is unique
- Compound risk detection (Dim 7) is unique — looking for reinforcing concerns across dimensions
- Triviality gate prevents over-reviewing small changes

**Verdict:** SIGNIFICANT for scope mode selection. INCREMENTAL for cognitive patterns (knowledge graph already serves this purpose).

---

#### GStack /plan-eng-review vs User /creating-specifications: [PARTIAL — Different Focus]

GStack's eng review is a POST-plan review (architecture lockdown). User's /spec is PRE-plan creation. They operate at different stages.

**GStack-specific techniques:**
- Mandatory ASCII diagrams for every non-trivial flow (data flow, state machines, dependency graphs)
- Error/rescue map: trace every error from throw → catch → user-visible message → test
- Implementation alternatives: 2-3 approaches required, including "minimal viable" and "ideal architecture"
- Failure modes registry table (failure mode → codepath → observability → test → mitigation)

**Verdict:** INCREMENTAL. The user's spec structure (design.md + decisions.md + implementation.md) is more persistent and structured. The mandatory alternatives pattern is worth reinforcing but already exists in /spec Step 3.

---

#### GStack /plan-design-review vs User: [PARTIAL — No Design Dimension in Review]

**What it does:** Reviews plans for UI/UX gaps using 12 cognitive patterns (hierarchy as service, edge case paranoia, subtraction default, design for trust). Checks for empty states, responsive coverage, AI slop detection.

**User's gap:** The user's `/review` has 6 agents but none focused on design/UX. For a web project with React islands and interactive graph visualization, this is a real gap.

**Verdict:** INCREMENTAL (design changes are infrequent, but the pattern should be noted for when UI work resumes).

---

#### GStack /autoplan vs User Rule 8: [PARTIAL — Not Worth Full Adoption]

GStack's /autoplan runs CEO → design → eng reviews sequentially with 6 auto-decision principles and a taste-decision gate. User's Rule 8 auto-invokes /review-plan which covers 7 dimensions in a single pass.

**Verdict:** SKIP. Three sequential reviews is overkill for solo dev. The 6 auto-decision principles are interesting (choose completeness, boil lakes, pragmatic, DRY, explicit > clever, bias toward action) but the user's philosophy deliberately favors simplicity over completeness.

---

### 2.3 Code Review & Security

#### GStack /review vs User /review: [PARTIAL — Scope Drift + Suppressions Missing]

**GStack-specific techniques:**
1. **Step 0: Base branch detection** — auto-detects which branch to compare against
2. **Step 1.5: Scope drift detection** — compares stated intent (TODOS.md, commits, PR description) against actual diff. Reports CLEAN/DRIFT/MISSING before reviewing quality.
3. **2-pass checklist** with explicit suppressions:
   - Pass 1 (Critical): SQL injection, race conditions, LLM trust boundary violations, enum completeness
   - Pass 2 (Informational): conditional side effects, magic numbers, test gaps, performance
   - Suppressions: framework-aware (Rails has CSRF by default, React escapes by default)
4. **Design review conditional** — if frontend files changed and DESIGN.md exists, runs design audit
5. **Greptile integration** — fetches third-party AI review and triages
6. **Prerequisite offer** — if no design doc exists, offers to run /office-hours first

**User's /review:**
- `npm run check` (astro check + graph build + validation + vitest)
- Scope guard (content-only → skip agents)
- 6 parallel specialized agents (simplicity, security, performance, architecture, patterns, TypeScript)
- Severity synthesis (must-fix, should-fix, consider)

**What user does BETTER:**
- 6 parallel agents vs GStack's single-pass checklist = broader coverage
- Content-only scope guard saves time on non-code changes
- Specific agent types (architecture-strategist, pattern-recognition) are more specialized

**Capability delta:**
1. Scope drift detection (Step 1.5) — genuine gap
2. Security false-positive suppressions — genuine gap (security-sentinel runs generic, no exclusions)
3. Framework-aware review — partial gap (the user's agents may partially handle this, but not explicitly)

**Verdict:** SIGNIFICANT. Scope drift detection and security filtering are the key extractions.

---

#### GStack /cso vs User security-sentinel: [NONE — Substantially Different]

**GStack /cso (650 lines):**
- Phase 1: Attack surface mapping (endpoints, auth boundaries, external integrations, file uploads, admin routes)
- Phase 2: OWASP Top 10 assessment (A01-A10 with targeted grep patterns per category)
- Phase 3: STRIDE threat model per component
- Phase 4: Data classification (restricted/confidential/internal/public)
- Phase 5: False-positive filtering (17 hard exclusions + 9 precedents + 8/10 confidence gate)
- Phase 5.5: Parallel independent verification (each finding re-assessed by blind sub-agent)
- Phase 6: Findings report with mandatory exploit scenarios
- Phase 7: Remediation roadmap (fix now / mitigate / accept risk / defer)
- Phase 8: Save report + historical comparison

**User's security-sentinel:**
One of 6 parallel review agents. Receives changed files + project context. Produces findings with severity levels. No filtering, no confidence gate, no exploit scenario requirement, no historical tracking.

**Key GStack innovations:**
1. 17 hard exclusion categories:
   - DOS/rate limiting → auto-discard
   - Secrets on disk if encrypted → auto-discard
   - Memory/CPU issues → auto-discard
   - Input validation on non-security fields without proven impact → auto-discard
   - GitHub Action workflow issues unless untrusted input → auto-discard
   - Missing hardening without concrete vulnerability → auto-discard
   - Race conditions unless concretely exploitable → auto-discard
   - Outdated library vulnerabilities (handled by A06) → auto-discard
   - Memory safety in memory-safe languages → auto-discard
   - Test-only files (verified) → auto-discard
   - Log spoofing → auto-discard
   - SSRF where attacker only controls path → auto-discard
   - User content in user-message position (NOT system prompts) → auto-discard
   - Regex complexity on non-untrusted input → auto-discard
   - Security concerns in .md files → auto-discard
   - Missing audit logs → auto-discard
   - Insecure randomness in non-security contexts → auto-discard

2. 9 precedent rulings:
   - Logging secrets IS a vulnerability; logging URLs is safe
   - UUIDs are unguessable — don't flag missing UUID validation
   - Env vars and CLI flags are trusted input
   - React/Angular XSS-safe by default (only flag dangerouslySetInnerHTML)
   - Client-side JS doesn't need auth
   - Shell scripts need concrete untrusted input path
   - Subtle web vulns (tabnabbing, XS-Leaks) only at extremely high confidence
   - iPython notebooks only if untrusted input triggers
   - Logging non-PII is not a vulnerability

3. Confidence gate: >= 8/10 or don't report
4. Parallel verification: independent sub-agents re-assess each finding blind
5. Exploit scenario: step-by-step attack path required for every finding

**Verdict:** SIGNIFICANT. The false-positive filtering pattern is the #1 most transplantable technique from GStack. Can be added as context to the security-sentinel agent invocation without building a standalone /cso skill.

---

### 2.4 QA, Testing & Browser

#### GStack /qa + /qa-only vs User vitest: [NONE — Different Testing Layer]

**GStack /qa (browser-based testing):**
- Uses custom `browse` binary for headless browser interaction
- Modes: diff-aware (auto-discovers changed pages), URL-targeted, or full sweep
- Tiers: Quick (critical+high), Standard (+medium), Exhaustive (+low/cosmetic)
- For each bug: find → screenshot → fix → atomic commit → verify screenshot
- Health score tracking over time

**User's testing:**
- 18 vitest unit tests (build-graph, remark-wikilinks, graph.ts)
- `npm run check` pipeline (astro check + validation + vitest)
- No browser-based testing, no visual regression detection

**Verdict:** SIGNIFICANT gap for the web project, but requires browser automation setup. Deferred to Tier 3 — apply when UI work resumes. If adopted, use Playwright (npm package) not GStack's custom binary.

---

#### GStack /benchmark vs User: [NONE — No Performance Baselines]

Tracks Core Web Vitals (TTFB, FCP, LCP), bundle sizes, request counts. Establishes baselines and alerts on regression.

**Verdict:** SKIP. Site loads <1s, no performance issues. Revisit if site grows significantly.

---

#### GStack /canary vs User: [NONE — No Post-Deploy Verification]

Monitors production for 10 minutes after deploy: screenshots, console errors, performance comparison against pre-deploy baseline.

**Verdict:** INCREMENTAL. Static site on GitHub Pages has limited blast radius. The PATTERN (post-change baseline comparison) is valuable for the user's other project (whatsapp-ref-bot on Railway) but not for this project.

---

### 2.5 Design

#### GStack /design-consultation vs User: [NONE — Already Has Design System]

Creates a complete design system (typography, color, spacing, motion) and outputs DESIGN.md.

**Verdict:** SKIP. The knowledge graph site already has a mature design system in `src/styles/global.css` (dark theme, 14 topic colors, Inter font, custom animations).

---

#### GStack /design-review vs User: [NONE — No Visual QA]

9-dimension visual audit with fix-verify loop: typography hierarchy, spacing consistency, color fidelity, interaction states, AI slop detection, responsive coverage, accessibility, empty states, trust signals.

**Verdict:** Deferred. Valuable pattern but requires browser automation. Note for when UI work resumes.

---

### 2.6 Deployment & Shipping

#### GStack /ship vs User git push: [PARTIAL — Different Workflow]

GStack: detect base branch → merge → test → review diff → VERSION bump → CHANGELOG → commit → push → PR creation.
User: git push to master → CI builds → GitHub Pages deploy.

**Verdict:** SKIP. The user's workflow is simpler and appropriate. Adding version bumps and changelogs would be overhead with no consumers.

---

#### GStack /land-and-deploy vs User: [PARTIAL — Single Environment]

GStack: merge → CI polling → deploy workflow → canary verification → report.
User: push triggers auto-deploy (~40s).

**Verdict:** SKIP. Nothing to orchestrate.

---

#### GStack /document-release vs User /wrap: [PARTIAL — Different Scope]

GStack: post-ship auto-update of README, ARCHITECTURE, CONTRIBUTING, CLAUDE.md, CHANGELOG, TODOS.
User: /wrap updates implementation plan, MEMORY.md, CLAUDE.md tables, session registry.

**Verdict:** SKIP. /wrap already captures documentation updates. No release consumers who need polished changelogs.

---

### 2.7 Safety & Guardrails

#### GStack /careful, /freeze, /guard, /unfreeze vs User /careful, /freeze: [FULL — Already Covered]

Identical concepts. User's versions were inspired by earlier GStack analysis + Thariq principles.

**Verdict:** SKIP. Already covered.

---

### 2.8 Retrospective & Meta

#### GStack /retro vs User /wrap + /telemetry: [PARTIAL — Different Purposes]

/retro: periodic analysis of git history (commits, LOC, test ratio, session detection, hourly distribution, author breakdown).
/wrap: per-session persistence (learnings, MEMORY.md, handoff, registry).
/telemetry: skill usage tracking.

**Verdict:** INCREMENTAL. The git analysis commands (session detection via 45-min commit gaps, test LOC ratio) are interesting for quarterly self-review but low-urgency.

---

### 2.9 GStack-Specific Infrastructure (Not Applicable)

| Skill | Why N/A |
|-------|---------|
| /gstack-upgrade | GStack self-update mechanism |
| /browse | Custom binary — if needed, use Playwright |
| /setup-browser-cookies | No authenticated pages |
| /setup-deploy | deploy.yml already exists |
| /codex | API cost for marginal gain; 6 agents provide diversity |
| SKILL.md.tmpl | Solo dev editing directly |

---

## 3. Cross-Cutting Patterns Worth Noting

### 3.1 Boil the Lake vs Surgical Minimalism

GStack's core philosophy is "completeness is cheap with AI" — always do the full implementation, don't skip edge cases, don't defer tests. The user's philosophy is "prefer surgical fixes over sweeping changes" and "equal results from less code is always a win."

These are **different but equally valid** approaches:
- Boil the Lake optimizes for: feature completeness, test coverage, edge case handling
- Surgical Minimalism optimizes for: code simplicity, maintenance burden, cognitive load

The user's approach is arguably better for knowledge work (where complexity is the enemy) while GStack's is better for product engineering (where completeness prevents support tickets).

**Decision:** Do not adopt Boil the Lake as a philosophy. It conflicts with the user's stated preferences and hard-won principles.

### 3.2 Non-Interactive by Default

GStack skills like /ship and /land-and-deploy are designed for ONE confirmation gate, then everything runs automatically. The user's workflow is already non-interactive (push triggers CI auto-deploy).

**Decision:** Already aligned. No change needed.

### 3.3 Atomic Commits Per Fix

GStack's /qa and /design-review commit each fix separately with before/after evidence. The user's workflow doesn't do this — fixes are batched into commits.

**Decision:** Interesting pattern but adds git noise for solo dev. Skip unless doing multi-issue fix sessions where rollback granularity matters.

### 3.4 See Something, Say Something

GStack's repo ownership mode makes skills proactively flag issues noticed during other work (test failures, deprecation warnings, dead code). The user's CLAUDE.md already has "Polished output blindspot" (proactively surface confidence gaps and edge cases).

**Decision:** Already partially covered. No additional action needed.

### 3.5 Anti-Sycophancy

GStack encodes anti-sycophancy rules in /office-hours. The user has no equivalent behavioral rule — the closest is "Sycophancy: Push back if something seems wrong" in LLM Failure Modes, but this is passive ("if something seems wrong") vs active ("take a position on every answer").

**Decision:** Worth adopting as a global CLAUDE.md rule. See recommendations.

---

## 4. Pipeline Gap Summary

| Pipeline Stage | GStack | User | Gap? |
|---------------|--------|------|------|
| Premise validation | /office-hours | None | **YES — #1 gap** |
| Planning | /plan-ceo-review (scope modes) | /spec + /review-plan | Partial (scope modes) |
| Architecture review | /plan-eng-review | /review-plan Dim 2, 5 | Minor |
| Design review | /plan-design-review | None in review pipeline | Noted for UI work |
| Implementation protocol | None (uses CC directly) | Rule 6 (4-gate protocol) | **User is BETTER** |
| Code review | /review (scope drift + suppressions) | /review (6 parallel agents) | Partial (drift + filtering) |
| Security audit | /cso (17 exclusions, 8/10 gate) | security-sentinel (generic) | **YES — #2 gap** |
| Visual QA | /qa + /design-review (browser) | vitest (unit only) | Deferred |
| Shipping | /ship (auto PR pipeline) | git push + CI | Appropriate for solo dev |
| Deployment | /land-and-deploy + /canary | CI auto-deploy | Appropriate for static site |
| Retrospective | /retro (git analysis) | /wrap + /telemetry | Different purpose, adequate |
| Learning accumulation | None | /learn + /connect + knowledge graph + MEMORY.md | **User is BETTER** |
| Source fidelity | None | audit-fidelity.sh + fidelity-rules.md | **User is BETTER** |
| Cross-session context | Design docs in ~/.gstack/ | MEMORY.md + session-registry + specs/ | **User is BETTER** |

---

## 5. Methodology Notes

### What was read (evidence for thoroughness)
- **GStack skills read in full:** office-hours (650 lines), cso (650 lines), plan-ceo-review (880 lines), plan-eng-review, plan-design-review, autoplan, review, codex, qa, qa-only, benchmark, canary, design-consultation, design-review, ship, land-and-deploy, document-release, investigate, retro, careful, freeze, guard, browse, setup-browser-cookies, setup-deploy, gstack-upgrade
- **User skills read in full:** All 24 custom skills via `~/.claude/skills/*/SKILL.md`
- **CLAUDE.md read in full:** 9 rules, 24 principles, mistake patterns, LLM failure modes
- **Additional context:** MEMORY.md, session-registry.yaml, prior scout reports

### What the previous re-scout got wrong
1. Classified /office-hours as "Already Covered" by /ce:brainstorm — wrong (brainstorming ≠ premise validation)
2. Classified multi-reviewer orchestration as "team pattern" — partially wrong (scope mode selection applies to solo devs)
3. Classified cross-model review as "6 agents ARE different voices" — technically wrong (same model, different prompts ≠ different cognitive models)
4. Dismissed all "team-scale patterns" without checking if the underlying principle applies to solo devs
5. Used "solo dev" as a blanket justification for skipping without evaluating the technique separately from the tool
