# Knowledge Graph Audit Framework

Claude: use this document to run periodic health checks on the knowledge graph.
Read this file, then systematically evaluate each dimension below.

---

## How to Run an Audit

1. Read `index.md` to understand current topic structure
2. Glob `insights/*.md` to get the full node list
3. Read all insight files (batch in parallel for speed)
4. Read all topic MOCs in `topics/`
5. Grep for all `[[...]]` wikilinks across `insights/`
6. Score each dimension below, note specific issues
7. Update the Baseline Snapshot section with new results

---

## Dimension 1: Structural Integrity

**What it checks:** Do files follow the schema? Do links resolve? Are MOCs consistent with YAML?

| Criterion | How to Check | Target |
|-----------|-------------|--------|
| YAML validity | Every insight has: title, description, topics[], source, date | 100% |
| Dangling references | Every `[[slug]]` points to an existing file or topic | 0 dangling |
| Orphan files | Every insight is listed in at least one topic MOC | 0 orphans |
| MOC ↔ YAML consistency | If YAML says `topics: [ai-agents]`, then `topics/ai-agents.md` lists it | 100% match |

**Common failure:** An insight's YAML lists a topic, but the MOC file doesn't include the insight (happens when `/learn` updates MOCs partially).

---

## Dimension 2: Graph Connectivity

**What it checks:** Is the graph actually connected, or is it a list of isolated notes?

| Criterion | How to Check | Target |
|-----------|-------------|--------|
| Avg wikilinks per insight | Count all `[[...]]` in each insight body (not YAML) | 2-5 |
| Incoming link coverage | % of insights linked TO by at least one other insight | >80% |
| Isolated nodes | Insights with 0 outgoing AND 0 incoming links | 0 |
| Leaf nodes | Insights with 0 incoming links (others link out, nobody links in) | <15% |
| Cross-topic links | % of wikilinks that cross topic boundaries | >30% |

**Key insight:** The `/learn` skill creates forward links (new insight → existing insights) but never updates older insights to link back. This creates a "leaf node problem" where early-created insights accumulate 0 incoming links over time.

**Mitigation:** A future `/connect` skill should periodically scan for back-linking opportunities.

---

## Dimension 3: Content Quality

**What it checks:** Do insights meet the quality bar defined in SKILL.md?

| Criterion | How to Check | Target |
|-----------|-------------|--------|
| Titles are claims | Every title is a statement/claim, not a label | 100% |
| Standalone comprehension | Reading just one insight file gives you the full idea | 100% |
| Links woven in prose | No "Related:" or "See also:" link lists at the bottom | 100% |
| Prose quality | 2-4 sentences, not bullet lists; explains the "so what" | 100% |
| Link count per insight | Each insight has 2-5 meaningful wikilinks | 100% |

**Quality examples:**
- GOOD title: "Context window is the fundamental constraint"
- BAD title: "Context window overview"
- GOOD link: "This connects to [[declarative-beats-imperative]] because..."
- BAD link: "Related: [[declarative-beats-imperative]]"

---

## Dimension 4: Topic Coverage & Distribution

**What it checks:** Is content balanced across topics? Are there gaps?

| Criterion | How to Check | Target |
|-----------|-------------|--------|
| Distribution ratio | Max topic count / Min topic count | <3:1 |
| Theme accuracy | Insights in each topic actually belong there | >95% |
| Source diversity | Multiple sources represented, not all from one thread | 3+ sources |
| Gap identification | Are there obvious missing subtopics? | Noted |
| Redundancy check | Are any two insights saying the same thing? | 0 duplicates |

**Current topic slugs:** `future-of-ai-business`, `ai-native-product-architecture`, `ai-agents`, `ai-coding-tools`, `knowledge-systems`, `business-models`

**Note:** Topics should be added/renamed/merged as the graph grows. The starting 6 are not sacred.

---

## Dimension 5: Pipeline Quality (/learn skill)

**What it checks:** Is the `/learn` skill producing consistent, high-quality output?

| Criterion | How to Check | Target |
|-----------|-------------|--------|
| Format consistency | All files follow the same YAML + prose structure | 100% |
| Filtering | Generic/obvious points are excluded, not captured | Subjective |
| Overlap detection | New insights don't duplicate existing ones | 0 duplicates |
| MOC update completeness | Every new insight appears in all relevant MOCs | 100% |
| Index update | Recent Additions in index.md reflects latest batch | Current |
| Back-linking | Older insights updated to link to relevant new ones | Aspirational |

---

## Dimension 6: Source Fidelity

**What it checks:** Do insights accurately represent what the source actually says? (Added after the source-verification audit found ~40% error rate across 43 of 62 insight files.)

| Criterion | How to Check | Target |
|-----------|-------------|--------|
| Claims traceable to source | For 5 random insights, fetch the source URL and verify each factual claim appears in the source | 100% |
| No fabricated statistics | Every number, percentage, and ratio in insight prose exists verbatim in the source text | 0 fabrications |
| Attribution accuracy | Author name, @handle, and article title match what the source page shows | 100% |
| No cross-source conflation | Each insight draws only from its listed source, not blended with other sources | 100% |
| Directional claims correct | For X-beats-Y or X-replaces-Y claims, the source confirms the stated direction | 100% |

**Common failures (from the 2026-03-02 audit):**
- **Gap-filling:** LLM encounters incomplete info and fills it with training data instead of what the source says (e.g., invented ratios, wrong authors)
- **Claim inversion:** LLM gets the direction wrong on X-vs-Y claims (e.g., "LLMs handle complex 20%" vs actual "humans handle complex 20%")
- **Cross-source contamination:** Multiple articles processed in the same session get blended into a single insight
- **Editorialization as source claim:** LLM presents its interpretation as if quoting the source (wrong terms, wrong dates)

**How to sample:** Pick 5 insights at random. For each, fetch its `source` URL via Jina Reader and verify every factual claim in the insight prose against the fetched content. Score = (verified claims / total claims).

---

## Dimension 7: Content Quality (Automated)

**What it checks:** Do insights meet structural and content quality standards? Automated via `bash audit-quality.sh`.

| # | Check | Severity | Target |
|---|-------|----------|--------|
| 1 | Title is a claim (contains a verb) | WARN | 100% |
| 2 | Prose format (no bullets, headers, or "See also:" link dumps) | FAIL | 100% |
| 3 | Wikilink count in body is 2–7 | WARN | 100% |
| 4 | Body length is 100–500 words | WARN | 100% |
| 5 | Book sources include page references (pp. or p.) | FAIL | 100% |
| 6 | Book insights contain direct quotes ("...") | WARN | 100% |

**WARN** = heuristic check, may have false positives. **FAIL** = invariant, must be fixed.

**How to run:** `bash audit-quality.sh` — exits non-zero on any FAIL.

---

## Dimension 8: Source Fidelity — Books (Automated)

**What it checks:** Do book-sourced insights accurately represent the cited source pages? Automated via `bash audit-fidelity.sh`.

**Method: Blind 3-call comparison** (prevents confirmation bias by never showing insight and source in the same context)

| Step | Input | Output |
|------|-------|--------|
| Call 1: Source extraction | Only the cited PDF pages | Numbered list of claims from source |
| Call 2: Insight extraction | Only the insight markdown | Numbered list of claims from insight |
| Call 3: Blind comparison | Both lists labeled "A" and "B" (no source identification) | VERIFIED / MODIFIED / NOT_FOUND per claim |

| Criterion | How to Check | Target |
|-----------|-------------|--------|
| Overall pass rate | (VERIFIED claims / total claims) × 100 | ≥80% |
| Per-insight NOT_FOUND | Claims in insight with no match in source | <2 per insight |
| Flagged insights | Insights with ≥2 NOT_FOUND claims | 0 (or reviewed) |

**Key design decisions:**
- 3 separate `claude -p` calls per insight — no shared context between extraction and comparison
- Lists labeled neutrally ("A" and "B") to prevent comparator from favoring one side
- `NOT_FOUND ≥ 2` on any single insight = auto-flagged for human review
- Only runs on book-sourced insights (URL-sourced use Dimension 6 with re-fetch)

**Known limitation:** LLM verifying LLM output is imperfect. But blind comparison catches the known error patterns (wrong numbers 20%, invented examples 12%, attribution errors 32%) that caused 43% of failures in the URL audit.

**How to run:** `bash audit-fidelity.sh` — exits non-zero if pass rate < 80%.

**Cost:** ~3 `claude -p` calls × N book insights. Each reads ≤20 PDF pages.

---

## Extraction Completeness: Poor Charlie's Almanack

Tracks what has been extracted from each book section, what was skipped, and why.

| Section | Pages | Status | Insights Extracted | Notes |
|---------|-------|--------|-------------------|-------|
| Talk 11: Psychology of Human Misjudgment | 480–612 | DONE | 7 | 25 tendencies covered → 7 insights (grouped related tendencies) |
| Talk 2: Elementary Worldly Wisdom | 162–224 | Not started | — | Mental models framework, lattice approach |
| Talk 4: Practical Thought | 299–321 | Not started | — | Applied multidisciplinary analysis |
| Talk 5: Multidisciplinary Skills | 323–346 | Not started | — | Benefits of cross-domain learning |
| Ch 2: Munger Approach | 60–90 | Not started | — | Investment philosophy fundamentals |
| Talk 3: Worldly Wisdom Revisited | 225–296 | Not started | — | Extended mental models, Coca-Cola case |

**Extraction notes for Talk 11:**
- 130 pages covering 25 psychological tendencies
- Extracted incrementally (~40 pages at a time) due to context limits
- Grouped related tendencies into compound insights rather than 1:1 mapping
- 7 insights: incentive-caused-bias, systems-that-prevent, first-conclusions, small-concessions, excessive-self-regard, confluence-of-tendencies, social-proof-makes
- All 7 passed `audit-quality.sh` checks 5 & 6 (page refs + quoted claims)

---

## Grading Rubric

| Grade | Meaning |
|-------|---------|
| A | Production-ready, no action needed |
| A- | Minor issues, fix when convenient |
| B+ | Functional but has clear improvement areas |
| B | Needs attention in next session |
| C | Significant gaps affecting usefulness |
| D | Rethink the approach |

---

## Baseline Snapshot: 2026-02-24 (Post-Bootstrap)

**Graph size:** 39 insights across 6 topics, from 4 source threads

### Scores (Initial Audit)

| Dimension | Grade | Key Finding |
|-----------|-------|-------------|
| 1. Structural Integrity | A- | 1 MOC consistency gap (fixed) |
| 2. Graph Connectivity | B+ | 8 leaf nodes (20.5%) with 0 incoming links |
| 3. Content Quality | A | All titles are claims; all links in prose |
| 4. Topic Coverage | B+ | 2.4:1 distribution ratio, acceptable |
| 5. Pipeline Quality | A- | Consistent output; no back-linking mechanism |
| **Overall** | **A-/B+** | Strong foundation, connectivity needs growth |

### Scores (After Back-Linking Fix)

| Dimension | Grade | Key Finding |
|-----------|-------|-------------|
| 1. Structural Integrity | A | MOC gap fixed, all YAML↔MOC consistent |
| 2. Graph Connectivity | A- | 0 leaf nodes (was 8); all insights reachable |
| 3. Content Quality | A | All titles claims; all links in prose; min 2 links/insight |
| 4. Topic Coverage | B+ | Unchanged — needs more content in business-models, knowledge-systems |
| 5. Pipeline Quality | A- | `/connect` skill now exists for ongoing maintenance |
| **Overall** | **A-** | Connectivity fixed; coverage is next growth area |

### Metrics

| Metric | Before Fix | After Fix |
|--------|-----------|-----------|
| Total insights | 39 | 39 |
| Total wikilinks | 106 | 114 (+8) |
| Avg links per insight | 2.72 | 2.92 |
| Insight-to-insight link % | 97.2% | 97.4% |
| Cross-topic link % | ~35% | ~37% |
| Leaf nodes (0 incoming) | 8 (20.5%) | 0 (0%) |
| Isolated nodes | 0 | 0 |
| Dangling references | 0 | 0 |
| Orphan insights | 0 | 0 |

### Topic Distribution

| Topic | Insight Count |
|-------|--------------|
| ai-native-product-architecture | 17 |
| ai-agents | 15 |
| ai-coding-tools | 14 |
| future-of-ai-business | 12 |
| knowledge-systems | 8 |
| business-models | 7 |

*(Totals exceed 39 because insights can belong to multiple topics)*

### Leaf Nodes (0 Incoming Links) — RESOLVED

All 8 leaf nodes from the initial audit have been back-linked:

| Leaf Node | Back-linked FROM | Connection |
|-----------|-----------------|------------|
| `verification-multiplies...` | `autonomous-loops-need...` | Fast feedback IS verification |
| `software-abundance...` | `technology-transitions...` | Dabit provides the mechanism for Sinofsky's pattern |
| `ai-self-improvement-loop...` | `build-for-obsolescence...` | Self-improvement loop amplifies obsolescence urgency |
| `response-ux...` | `hybrid-search...` | Semantic retrieval needs semantic display |
| `open-source...` | `middleware-dies...` | Open source = original "free middleware, paid infra" |
| `webmcp...` | `agents-become-the-buyer` | WebMCP makes agent purchasing practical |
| `prompt-caching...` | `context-window...` | Caching is the economic enabler for large context |
| `parallel-agents...` | `treat-ai-distributed-team...` | Distributed team → management bottleneck |

### Fixes Applied This Audit

1. **MOC gap fixed:** Added `structure-plus-reasoning-beats-flat-similarity` to `topics/ai-agents.md` (YAML listed `ai-agents` but MOC was missing the entry)
2. **Wikilink deficit fixed:** Added second wikilink to `dont-be-the-discriminator-be-the-patron.md` (had only 1, below the 2-5 minimum)
3. **8 leaf nodes back-linked:** Added incoming wikilinks to all 8 insights that had 0 incoming links (see table above)
4. **`/connect` skill created:** `~/.claude/skills/connect/SKILL.md` automates back-link detection and repair for future maintenance

---

## Learnings from Bootstrap Phase

### What Worked Well
- **Atomic insight extraction:** One-claim-per-file produced clean, linkable nodes
- **Wikilinks in prose:** Natural link weaving created genuine semantic connections, not tag spam
- **YAML frontmatter:** Enabled systematic cross-referencing between topics and insights
- **Batch processing:** Processing full threads at once let `/learn` find cross-thread connections

### What to Watch
- **Back-linking gap:** MITIGATED. `/connect` skill now exists for periodic maintenance. The `/learn` skill still only creates forward links, so run `/connect` after every 5-10 new insights.
- **Topic imbalance:** `business-models` (7) and `knowledge-systems` (8) lag behind. This reflects source material bias, not a system problem — will self-correct as more diverse content is processed.
- **Cold start connectivity:** The first ~10 insights had fewer connection targets. As the graph grows past 40-50 nodes, new insights should naturally achieve higher link density.
- **Source thread quality:** Richer, more specific source content produces better insights. Vague or generic content should be filtered, not force-extracted.

### Recommendations for Next Phase
1. ~~**Build `/connect` skill**~~ — DONE. Created at `~/.claude/skills/connect/SKILL.md`.
2. **Build `/explore` skill** — Agent traversal: "What do I know about X?" follows the graph from index → MOC → insights → linked insights.
3. **Process remaining threads** — 1-2 starred threads remain unprocessed. Prioritize threads that cover `business-models` and `knowledge-systems` to balance topic distribution.
4. ~~**Re-audit after 60+ insights**~~ — DONE. Full source-fidelity re-audit completed 2026-03-02.

---

## Baseline Snapshot: 2026-03-02 (Post Source-Fidelity Re-Audit)

**Graph size:** 58 insights across 6 topics (down from 62 — 4 deleted as unverifiable)

### What This Audit Did

Full source-fidelity re-audit of all insights. Every insight was checked against its original source for:
- Claims traceable to source (not gap-filled by LLM)
- No fabricated statistics or examples
- Attribution accuracy (author name, handle, article title)
- No cross-source conflation
- Editorial extrapolations explicitly hedged

### Results Summary

| Category | Count | Details |
|----------|-------|---------|
| Total insights verified | 58 | All surviving insights |
| PASS (no changes needed) | 33 | 57% — claims fully supported by source |
| FIX (corrections applied) | 25 | 43% — attribution, stats, or hedging fixes |
| DELETE (unverifiable) | 4 | Removed in Phase 1 (sources not found) |

### Deleted Insights (Unverifiable Sources)

| Insight | Reason |
|---------|--------|
| `ai-winners-already-decided-by-infrastructure` | Source not found |
| `middleware-dies-infrastructure-survives` | @MylesMarino1 source unverified |
| `implementation-gap-collapsed` | Agency metrics unverifiable |
| `build-for-obsolescence` | Attribution issues (Shumer/Shih content removed) |

### Fix Categories Applied (25 insights)

| Fix Type | Count | Examples |
|----------|-------|---------|
| Source title corrected | 6 | "Agents That Learn" → "Memory: How Agents Learn"; "@tolobi" → "@tobi" |
| Fabricated examples replaced | 3 | Cloud egress → ETF example; customer_id → meeting-scheduling |
| Unverifiable numbers removed | 5 | $5K Mac Studio price; "1000x volume growth"; specific salary figures |
| Editorial extrapolation hedged | 8 | "Shipper identifies" → "implies"; OS metaphor noted as editorial synthesis |
| Cross-source conflation softened | 2 | "validates" → "parallels" where cross-source attribution unclear |
| Unverifiable attribution removed | 3 | Jarrod Watts removed; Theo attribution generalized; Ali Ghodsi authorship |

### Validation

- `validate-graph.sh`: **7/7 checks passed**
- Node count: 58 files, 58 in YAML, 58 in README
- All reciprocal links match
- All link targets exist
- All topic MOC coverage correct
- No broken wikilinks

### Metrics

| Metric | Pre-Audit (62) | Post-Audit (58) |
|--------|----------------|-----------------|
| Total insights | 62 | 58 |
| Total wikilinks | ~185 | 173 |
| Avg links per insight | ~2.98 | 2.98 |
| Dangling references | 0 | 0 |
| Orphan insights | 0 | 0 |
| Validation checks passing | 7/7 | 7/7 |

### Scores (Post Source-Fidelity Re-Audit)

| Dimension | Grade | Key Finding |
|-----------|-------|-------------|
| 1. Structural Integrity | A | 7/7 validation checks pass |
| 2. Graph Connectivity | A- | Avg 2.98 links/insight; no orphans or dangles |
| 3. Content Quality | A | All titles are claims; all links in prose |
| 4. Topic Coverage | B+ | Unchanged — needs more business-models, knowledge-systems |
| 5. Pipeline Quality | A- | `/connect` skill exists; `/learn` still forward-link only |
| 6. Source Fidelity | A- | 25 fixes applied; editorial synthesis now explicitly hedged |
| **Overall** | **A-** | Source fidelity addressed; coverage remains growth area |
