# Skill Improvement: Thariq Principles Retrofit

## Problem Statement

20 personal Claude Code skills have grown organically over 2+ months but were never reviewed against the design principles published by Anthropic's own team. An 8-dimension audit revealed systemic gaps — most critically, 75% of skills lack progressive disclosure and 100% lack accumulated gotchas. The highest-used skills (`/learn`, `/scout`, `/review`) carry the most debt.

## Current Behavior

- Skills are monolithic SKILL.md files (avg ~180 lines, max 305)
- Failure knowledge lives in MEMORY.md rather than in the skills that trigger those failures
- 6/20 skill descriptions describe *what* the skill does instead of *when* to use it
- `/review` is missing frontmatter entirely
- `/investigate` hardcodes project-specific database steps as universal

## Audit Results (Quantified)

| Dimension | Good (Y+P) | Gap (N) | % Good |
|-----------|-----------|---------|--------|
| Trigger Description | 14 | 6 | 70% |
| Gotchas Section | 12 | 8 | 60% |
| Progressive Disclosure | 5 | 15 | **25%** |
| Not Railroading | 14 | 6 | 70% |
| Category Clarity | 20 | 0 | 100% |
| Composition | 7 | 13 | 35% |
| Memory/Data | 6 | 14 | 30% |
| Config/Setup | 0 | 20 | **0%** |

## Proposed Solution

5 targeted actions that improve the 3 highest-impact dimensions (progressive disclosure, gotchas, descriptions) without disrupting working skills.

### Guiding Principles

1. **Preserve behavior** — every skill must work identically after changes. No workflow modifications.
2. **Structural changes only** — move content between files, add sections, rewrite descriptions. Don't change what Claude *does*, change how it *loads context*.
3. **Top skills first** — `/learn`, `/connect`, `/review`, `/scout`, `/investigate` account for ~80% of invocations. Fix these 5 before touching the rest.
4. **Test after each action** — invoke each modified skill with a dry run to verify it still works.

### Action 1: Seed Gotchas into Top 5 Skills (~15 min)

Add a `## Gotchas` section to 5 skills, seeded from documented failures in MEMORY.md, CLAUDE.md mistake patterns, and session learnings.

| Skill | Gotcha Source | Content |
|-------|--------------|---------|
| `/learn` | MEMORY.md: Source Fidelity Lessons | Fabricated examples (12%), wrong numbers (20%), editorial synthesis as source claim (32%). Also: X Article detection needs Jina fallback |
| `/connect` | MEMORY.md: /connect Slug Mismatch Lesson | Always look up exact slug from graph-index.yaml. Title-inferred slugs frequently don't match. 3 broken links in one session |
| `/learn-book` | MEMORY.md: Context Management Lesson | 130-page chapters exhaust context before extraction begins. Extract incrementally (~40 pages, 2-3 insights, repeat) |
| `/scout` | Session experience | Dedup against previous reports (same source URL). X/Twitter fetches often fail via Jina. Large articles can exhaust context |
| `/investigate` | CLAUDE.md Mistake Patterns | Steps 2-3 (uniqueness constraints, timestamp checks) are DB-project-specific — skip for non-DB projects. Also: "Skipped log check" (3x) — check logs before code exploration |

**Convention established:** After any skill failure, add the failure to that skill's `## Gotchas` section (not just global CLAUDE.md). This is the accumulation model Thariq describes.

### Action 2: Split `/learn` into Progressive Disclosure (~30 min)

Move reference content out of SKILL.md into discoverable files in the skill folder:

```
~/.claude/skills/learn/
  SKILL.md                    # Workflow steps (keep ~130 lines)
  references/
    topics.md                 # Topic taxonomy (14 topics, both domains)
    frontmatter-template.md   # Insight file template with YAML structure
    fidelity-rules.md         # Source fidelity rules (5 hard constraints)
    wikilink-rules.md         # Wikilink formatting rules
```

**What stays in SKILL.md:** Step 0 (input detection), Step 0.5 (source comprehension), Step 1 (read state), Step 2 (extract — quality bar only, not full rules), Step 2.5 (self-verification), Steps 3-8 (file creation through back-linking). Each step that needs reference content gets a pointer: "Read `references/topics.md` for valid topic slugs."

**What moves:** Topic lists (~30 lines), frontmatter template (~20 lines), source fidelity rules (~15 lines), wikilink rules (~10 lines) = ~75 lines moved to reference files.

**Result:** SKILL.md drops from 230 → ~155 lines. Claude reads reference files only when it reaches the relevant step.

### Action 3: Fix 6 Descriptions to Trigger Specs (~10 min)

Rewrite descriptions from "what it does" to "when to use it":

| Skill | Current (what) | Proposed (when) |
|-------|---------------|-----------------|
| `/learn` | "Process content into knowledge graph nodes — extracts insights, creates linked files, updates topic MOCs" | "Use when you have a URL, article, tweet, or pasted text to extract insights from and add to the knowledge graph. Triggers on URLs, '/learn', or 'extract insights from'" |
| `/connect` | "Scan knowledge graph for missing back-links and cross-topic connections, then weave them into existing insights" | "Use when the graph has leaf nodes or after adding new insights that need back-linking to older nodes. Triggers on 'connect', 'back-link', 'leaf nodes'" |
| `/techdebt` | "Find and address technical debt at end of session — duplicate code, dead code, orphaned files, TODO comments" | "Use after coding sessions to catch accumulated technical debt before it compounds. Triggers on 'tech debt', 'dead code', 'cleanup', 'duplicates'" |
| `/telemetry` | "Read and summarize skill telemetry from session logs. Shows usage patterns, session frequency, and most-used skills." | "Use when you want to see skill usage patterns, session frequency, or which skills are undertriggering. Triggers on 'telemetry', 'skill usage', 'session stats'" |
| `/scout` | "Process AI workflow tips from tweets/articles/screenshots, compare against current Claude Code setup, and produce a prioritized improvement report" | "Use when you have bookmarked AI workflow tips (URLs, articles, screenshots) to analyze against your current Claude Code setup. Triggers on '/scout', 'workflow tips', 'compare setup'" |
| `/review` | *(missing entirely)* | Add frontmatter: `name: review`, `description: "Use before committing code changes to run type checks, validation, and 6 parallel review agents. Triggers on '/review', 'code review', 'review before commit'"`, `user_invocable: true` |

### Action 4: Add Frontmatter to `/review` (~2 min)

Add standard YAML frontmatter block with name, description, and user_invocable fields. This is a subset of Action 3 but called out separately because it's a functional gap (not just a quality gap — without frontmatter, auto-triggering is impossible).

### Action 5: De-railroad `/investigate` (~10 min)

Make Steps 2-3 conditional on project context:

**Current:** Steps 2 ("Identify the Unique Constraint") and 3 ("Check Timestamp Type") are mandatory blocking steps that assume a database project.

**Proposed:** Merge into a single optional step:

```markdown
## Step 2: Domain-Specific Checks (if applicable)

If the investigation involves a **database or data pipeline**:
- Check for UNIQUE constraints that could be violated
- Ask: "What timestamp? NOW() or source data?" — mixing causes timeline corruption
- Look for race conditions in check-then-insert patterns

If it involves an **LLM prompt or pipeline**:
- Check logs first — deployment logs before code exploration (Mistake pattern: 3x)
- Run the eval harness before changing prompts

If it involves a **static site or content system**:
- Run validation (`npm run check`) to establish baseline
- Check build output, not just source files

Skip this step entirely if the problem is clearly scoped to a single code bug.
```

This preserves the hard-won database lessons while giving Claude flexibility for other project types.

## Success Metrics

- [x] All 5 top skills have `## Gotchas` sections with seeded content (20 items total)
- [x] `/learn` SKILL.md is 180 lines with 3 reference files in `references/` (target was 160; +20 from gotchas — acceptable)
- [x] All 20 skills have frontmatter with trigger-spec descriptions (20/20 — including `/ingest` and `/audit-project` fixed post-plan)
- [x] `/investigate` Steps 2-3 are conditional, not mandatory (DB/LLM/static site blocks)
- [ ] Each modified skill invoked once to verify no behavioral regression — deferred to real usage
- [ ] Re-score audit: Progressive Disclosure ≥ 35%, Gotchas ≥ 75%, Descriptions ≥ 90% — deferred

## Risks

- **No version control on skill files:** Skills live in `~/.claude/skills/` — outside any git repo. Mitigated by creating `.bak` copies before each modification. Rollback = `cp SKILL.md.bak SKILL.md`. *(Added after /review-plan)*
- **Splitting `/learn` breaks the pipeline:** Mitigated by testing with a previously-processed URL after splitting, so output quality can be compared against known results. Explicit fallback: restore from `.bak` and skip Action 2 if broken. *(Strengthened after /review-plan)*
- **Gotchas sections grow unbounded:** Mitigated by convention — keep gotchas to 5-8 items per skill. When it exceeds 8, consolidate related items or graduate patterns to CLAUDE.md principles.
- **Description rewrites cause undertriggering:** Mitigated by keeping both "what" and "when" in the description, just leading with "when." Trigger phrases from the originals are preserved.

## Scope Boundaries (What This Does NOT Do)

- Does NOT remove XML scaffolding from `/batch`, `/audit-data`, `/spec` — those gates serve a safety purpose
- Does NOT add config.json to any skill — solo developer, no user-specific setup needed
- Does NOT create new skills (`/careful`, `/freeze`) — that's a separate effort after existing skills are improved
- Does NOT change any skill's actual workflow or behavior — structural changes only
- Does NOT touch the 15 lower-priority skills beyond description fixes
