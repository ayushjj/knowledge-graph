# GStack Capability Analysis — Decisions

## Decision 1: Extract Patterns vs Install Framework

**Question**: Should we install GStack as a framework or extract individual patterns?

| Option | Pros | Cons |
|--------|------|------|
| A: Install GStack | All 28 skills, community-maintained, auto-updates | ~250 lines boilerplate per skill, team philosophy, custom binary dependency, dual-deployment overhead |
| B: Extract patterns | Minimal changes, fits existing philosophy, no dependencies | Must manually track GStack evolution, miss future innovations |

**Chosen**: B — Extract patterns
**Rationale**: The user's setup optimizes for simplicity and solo-dev workflow. GStack's boilerplate (preamble, telemetry, contributor mode, repo mode, AskUserQuestion format) adds 250+ lines per skill that serve team/community needs the user doesn't have. Pattern extraction gets the value without the overhead.
**Tradeoff**: Must re-evaluate GStack periodically (via /scout) to catch new patterns.

## Decision 2: Scope of /premise-check (Full YC Diagnostic vs Lightweight Builder)

**Question**: How much of /office-hours should /premise-check include?

| Option | Pros | Cons |
|--------|------|------|
| A: Full port (6 forcing questions + 2 modes + landscape search + cross-model) | Maximum diagnostic depth | 650 lines, heavyweight for solo dev feature work, startup questions irrelevant |
| B: Builder mode + premise challenge only (Steps 1-5) | Lightweight (~60 lines), universal applicability | Misses startup-specific diagnostic if user starts a product |
| C: CLAUDE.md rule only ("before /spec, ask 'what if we do nothing?'") | Zero new files | Lacks structure, easy to skip, no premise statement output |

**Chosen**: B — Lightweight builder mode + premise challenge
**Rationale**: The user is a solo dev building tools and knowledge products, not running a startup. Q1 (demand reality), Q3 (desperate specificity), Q5 (observation), Q6 (future-fit) are startup-specific. Q2 (status quo) and the do-nothing test are universal. Builder mode questions are generative and useful for side projects.
**Tradeoff**: If user starts a startup, will need to expand to full diagnostic.

## Decision 3: Security Filtering Scope (Full /cso vs Pattern Extraction)

**Question**: Should we build a standalone /cso skill or add filtering to existing /review?

| Option | Pros | Cons |
|--------|------|------|
| A: Build standalone /cso | Full OWASP + STRIDE + data classification | 650 lines, overkill for static site, separate invocation from /review |
| B: Extract filtering into /review's security agent | Zero-noise filtering integrated into existing workflow | Less comprehensive than full audit |

**Chosen**: B — Extract filtering into /review
**Rationale**: The knowledge graph is a static Astro site with no auth, no database, no user input. A full OWASP + STRIDE audit is overkill. The value is in the false-positive filtering pattern, not the audit methodology. The whatsapp-ref-bot project would benefit more from a full /cso — consider building it there.
**Tradeoff**: For production backend projects, may want a standalone security audit skill later.

## Decision 4: Anti-Sycophancy Scope

**Question**: Should anti-sycophancy rules be global (CLAUDE.md) or skill-specific?

| Option | Pros | Cons |
|--------|------|------|
| A: Global CLAUDE.md rule | Applies to all skills, all sessions, all projects | May be too aggressive during casual conversation |
| B: Skill-specific (only in /premise-check, /review-plan) | Targeted to diagnostic phases | Doesn't improve other interactions |

**Chosen**: A — Global, scoped to "diagnostic, review, or planning phases"
**Rationale**: The user explicitly asked for capability maximization. Anti-sycophancy during diagnostic phases improves the quality of ALL skills that involve evaluation or challenge. Scoping to "diagnostic, review, or planning phases" prevents aggressiveness during implementation or casual conversation.

## Decision 5: What NOT to Adopt (Explicit Rejections)

15 items explicitly rejected with reasoning. See research.md Anti-Recommendations section. Key philosophical rejection:

**Boil the Lake** — GStack's core philosophy that "completeness is cheap with AI, so always do the full implementation." The user's CLAUDE.md explicitly says: "Prefer surgical fixes over sweeping changes. Reject improvements that add more complexity than they're worth; equal results from less code is always a win." These are incompatible philosophies. The user's approach prioritizes simplicity and cognitive load; GStack's prioritizes feature completeness.
