# Knowledge Graph Architectures — Comparative Research

## Purpose

Study how different builders maintain personal/organizational knowledge graphs to extract **transferable architecture patterns** — not just for improving our own graph, but for any system that needs to:

1. **Extract** raw data into structured knowledge
2. **Connect** knowledge into a traversable lattice
3. **Retrieve** the right knowledge at decision time
4. **Evolve** the graph as understanding deepens

These patterns apply to: agent memory systems, company tribal knowledge bases, decision trace databases, RAG pipelines, and any "quantized graph" where raw signal becomes structured, findable, actionable knowledge.

## Research Questions

1. **Extraction**: How do people turn raw content (tweets, articles, conversations) into atomic knowledge units? What granularity works? What gets lost?
2. **Structure**: What graph shapes emerge? Flat tag clouds vs. hierarchical topics vs. dense cross-linked webs? What are the trade-offs?
3. **Traversal**: How do people (or agents) navigate their graphs? Search vs. browse vs. contextual surfacing? What retrieval patterns work?
4. **Evolution**: How do graphs grow without rotting? Pruning, contradiction handling, freshness, density management?
5. **Decision utility**: Does the graph actually improve decisions? How do people measure this?

## Prior Art (Already in Our Graph)

| Source | Key Finding | Date |
|--------|-------------|------|
| Karpathy "LLM Knowledge Bases" | Wiki-style vs. our graph-style — same species, different evolution | 2026-04-03 |
| Hermes Agent (@0xsachi) | 4-layer memory: curated MEMORY.md + HRR vectors + SQLite FTS5 + skills as procedural memory | 2026-04-04 |
| MiroFish | GraphRAG via Zep Cloud, LLM-generated per-domain ontology, persona from graph neighborhoods | 2026-04-04 |
| Mintlify ChromaFs | Virtual filesystem as agent navigation layer over knowledge | 2026-04-04 |
| @nicbstme Fintool | Files as universal agent interface — markdown on disk beats databases | 2026-02-24 |

### Borrowable Ideas Identified (Not Yet Acted On)
- Asymmetric trust scoring on memories (Hermes)
- Contradiction detection across insights (Hermes)
- Writing usage/consultation data back to graph (Hermes)
- LLM-generated per-domain ontology (MiroFish)

## Systems Studied (Batch 1 — 2026-04-04)

### Pal — Personal Agent that Learns (@agno-agi)
- **Source**: https://github.com/agno-agi/pal (172 stars, Agno framework showcase)
- **What they built**: Multi-agent personal knowledge system with dual storage: compiled wiki (markdown) for depth + PostgreSQL/SQL for structured cross-dimensional queries. Slack interface, 5 specialist agents.
- **Extraction method**: Manual feed (URLs, papers, notes) → raw/ directory with YAML frontmatter + manifest tracker. LLM Compiler agent reads raw files, produces structured wiki articles. Incremental — only new files processed.
- **Graph shape**: Not a graph — dual-layer. Wiki = hierarchical directory of concept articles (~100) with cross-links and master index. SQL = relational tables with TEXT[] tags as cross-table connectors. Schema-on-demand: agent runs CREATE TABLE when needed.
- **Retrieval pattern**: **Navigation over search** — each data source keeps its native query interface (SQL for structured data, directory structure for files, index for wiki). A metadata routing layer (prompt-engineered, not code) picks the right source per intent type. No vector store flattening.
- **Evolution strategy**: Compiler enriches existing articles rather than replacing. Learning store records retrieval strategies and user corrections. Linter agent checks for gaps and staleness. But learning loop reliability depends on LLM choosing to save — no deterministic guarantee.
- **Unique insight**: The dual wiki+SQL architecture. Markdown can't answer "everything about Project X from the last two weeks across all sources" — that's relational. SQL can't hold research depth — that's narrative. Using both with a routing layer is the design insight.
- **Transferable to**: Agent memory, company knowledge, our graph (the routing concept)
- **Critical note**: All intelligence (routing, compilation, schema creation, learning) lives in LLM prompts, not deterministic code. 30 commits, built by Agno team as a framework demo. Genuine reference architecture, not battle-tested.
- **Signal strength**: HIGH — real architecture, novel dual-layer idea

### StixDB (@Pr0fe5s0r)
- **Source**: https://github.com/Pr0fe5s0r/StixDB (6 stars, 6 commits, 1 day old)
- **What they built**: "Agentic database" — NetworkX/KuzuDB graph with sentence-transformer embeddings (384-dim) and automatic memory compaction.
- **Extraction method**: Manual `store()` calls. No ingestion pipeline.
- **Graph shape**: Vector-augmented graph. Nodes are text with embeddings. Retrieval by cosine similarity, not typed relationships.
- **Retrieval pattern**: Embedding similarity search + optional LLM-synthesized answers with citations.
- **Evolution strategy**: **Background consolidation loop (30s)**: merges near-duplicates >0.88 similarity, deduplicates by hash, exponentially decays unused nodes (48h half-life), prunes below 0.05 importance. This is the core innovation.
- **Unique insight**: Automatic decay + consolidation for ephemeral memory. Treats memory as a living system that compresses and forgets, not an append-only log.
- **Transferable to**: Agent memory (directly), our graph (decay as read-time scoring only, NEVER for deletion)
- **Critical note**: 1-day-old repo with polished README. The decay mechanism would actively destroy a curated knowledge graph. Only useful for recency-weighted ephemeral memory.
- **Signal strength**: LOW maturity, ONE borrowable mechanism

### brainctl (@TSchonleber)
- **Source**: https://github.com/TSchonleber/brainctl (5 stars, 24 commits over 2 days)
- **What they built**: Python CLI + MCP server for SQLite-based agent memory. Single portable file. 16 MCP tools for Claude Desktop integration.
- **Extraction method**: Manual `brain.remember("text")`. No automated ingestion.
- **Graph shape**: Relational tables (memories, entities, knowledge_edges, events, decisions) with FTS5 full-text search. knowledge_edges table enables graph-like traversal.
- **Retrieval pattern**: FTS5 search across all tables + optional sqlite-vec vector search. Trigger system for prospective memory alerts.
- **Evolution strategy**: Consolidation pipeline exists in code but LLM dependency was just removed — likely broken. Schema includes affect tracking (valence/arousal/dominance).
- **Unique insight**: Memory triggers — prospective memory where you set keyword-based alerts for future queries. "Alert me next time someone mentions Project X."
- **Transferable to**: Agent memory (MCP server pattern), our graph (trigger concept)
- **Critical note**: Dramatically over-engineered — "Bayesian evidence columns", "neuromodulation state", "quantum schema migration" in a 2-day-old project. The single-SQLite-file + MCP server is the real practical contribution.
- **Signal strength**: LOW — over-engineered, but MCP memory server pattern is practical

### ByteRover CLI (@campfirein)
- **Source**: https://github.com/campfirein/byterover-cli (4,015 stars, Elastic License, funded product)
- **What they built**: Persistent memory sidecar for AI coding agents. "Context tree" (hierarchical knowledge store) that lives alongside your project and syncs to cloud for teams.
- **Extraction method**: Manual curation commands (`/curate "Auth uses JWT"`) or agent-driven tool calls. Agentic codebase indexing.
- **Graph shape**: Hierarchical context tree linked to file paths. Not a graph — a tree with path-aware lookups.
- **Retrieval pattern**: Semantic search over the tree + file-path matching. Context compaction with multiple escalation strategies (middle-removal, oldest-removal, reactive overflow).
- **Evolution strategy**: Compaction pipeline — when context fills up, graduated compression strategies decide what to drop. arXiv benchmarks claim 96.1% LoCoMo, 92.8% LongMemEval-S.
- **Unique insight**: The **compaction pipeline with escalation strategies**. Not one compression algorithm — a hierarchy of strategies applied as memory pressure increases.
- **Transferable to**: Agent memory (compaction strategies), any context-limited system
- **Critical note**: Elastic License = commercial product, not open architecture. Coding-context-specific, not general knowledge management.
- **Signal strength**: MEDIUM for compaction patterns, LOW for graph architecture

### Cabinet (@HilaShmuel)
- **Source**: https://runcabinet.com (MIT-licensed, open source)
- **What they built**: Self-hosted "startup OS" — markdown wiki with cron-scheduled agent jobs. Supports CSVs, PDFs, HTML mini-apps inline.
- **Extraction method**: Drag-and-drop files. No LLM extraction pipeline.
- **Graph shape**: Flat file tree. No graph, no cross-links, no semantic structure.
- **Retrieval pattern**: Full-text search + file browsing. No embeddings, no vector DB.
- **Evolution strategy**: Manual file management. Cron jobs ("heartbeats") can add new content on schedule.
- **Unique insight**: **HTML apps inside a knowledge base** — drop index.html into a folder, it renders as a live app. Knowledge base as mini-app host.
- **Transferable to**: UX ideas only — the embedded app pattern
- **Critical note**: "Agents with heartbeats" = cron jobs writing markdown. No memory architecture, no trace data, no retrieval intelligence. Well-built wiki with good marketing.
- **Signal strength**: LOW for knowledge architecture, INTERESTING for UX

### Karpathy Architecture Diagram (dair.ai/@omarsar0)
- **Source**: academy.dair.ai (interactive diagram + markdown version)
- **What they built**: Clean visual restatement of Karpathy's LLM Knowledge Bases 4-phase pipeline.
- **Pipeline**: Ingest (Web Clipper + papers → raw/) → Compile (LLM → ~100 concept articles, ~400K words, auto-backlinks) → Query/Enhance (Obsidian IDE, Q&A agent, search engine — outputs filed back into wiki) → Lint/Maintain (health checks, gap detection, web imputation).
- **Unique insight**: Explicit feedback loop — Q&A outputs get filed back into the wiki, so querying compounds the knowledge base.
- **Transferable to**: Already mirrors our architecture. We do this via /learn enrichment.
- **Critical note**: Nothing new beyond what we already captured. Future section (synthetic data → fine-tuning) is aspirational, no details.
- **Signal strength**: ZERO new signal — restatement

### Jake Cosme (@jake_cosme) — "Don't manage memory, outsource it"
- **Source**: Twitter reply to Karpathy. Suggests deepwiki.com + Cognition MCP for "limitless context."
- **Architecture**: No architecture — outsource knowledge to a hosted service.
- **Unique insight**: The philosophical opposite of all other systems: don't build memory, point to someone else's.
- **Transferable to**: None for our purposes. Works for public knowledge, useless for personal/tribal knowledge.
- **Signal strength**: ZERO — interesting contrast, not a pattern to adopt

### Matt Shumer (@mattshumer_) — Memory system survey
- **Source**: Twitter thread asking "What memory systems are people using for OpenClaw and Hermes Agent?"
- **Context**: Hermes Agent v0.7.0 shipped extensible memory as a plugin system — swap backends, 6 third-party integrations out of the box.
- **Unique insight**: Memory is becoming a **pluggable layer** in agent frameworks, not a monolithic design choice. The question is shifting from "how to build memory" to "which memory backend to plug in."
- **Signal strength**: META — directional signal about the ecosystem

## Comparative Dimensions

We now have enough systems (5 real + 3 prior art) to synthesize:

| Dimension | Spectrum | Where Systems Fall |
|-----------|----------|--------------------|
| Granularity | Atomic facts ←→ Rich narratives | StixDB/brainctl: atomic. Pal/Karpathy: compiled narratives. **Ours: mid — atomic insights with 2-3 paragraph prose** |
| Structure | Flat tags ←→ Deep hierarchy ←→ Dense graph | Cabinet: flat files. ByteRover: tree. Pal: dual-layer. Hermes: 4-layer. **Ours: dense cross-linked graph with topic MOCs** |
| Automation | Fully manual ←→ LLM-assisted ←→ Fully automated | brainctl/Cabinet: manual. Pal/Karpathy: LLM-assisted compilation. StixDB: fully automated compaction. **Ours: LLM-assisted extraction, human-curated connections** |
| Retrieval | Pull (search) ←→ Push (contextual surfacing) | Most: pull. Pal: navigation routing. **Ours: push (CLAUDE.md instruction to consult graph-index.yaml)** |
| Audience | Personal ←→ Team ←→ Public | All: personal. ByteRover: team. **Ours: personal + public (GitHub Pages)** |
| Storage | Files on disk ←→ Database ←→ Vector store ←→ Hybrid | Cabinet/Karpathy/Ours: files. brainctl: SQLite. StixDB: graph+vectors. Pal: files+PostgreSQL hybrid |
| Evolution | Append-only ←→ Active pruning/merging | Most: append-only. StixDB: aggressive auto-pruning. **Ours: append + manual enrichment via /connect** |

## Emerging Patterns (Cross-Cutting Synthesis)

### Pattern 1: The Dual-Layer Problem
Every system that goes beyond "markdown files in a folder" discovers that **narrative depth and structured querying need different storage**. Pal's wiki+SQL, Hermes's MEMORY.md+SQLite+HRR, our graph-index.yaml+insight-files. The question isn't "which storage?" — it's "how do you route between layers?"

### Pattern 2: Navigation > Search
Pal's most important architectural claim. Vector similarity search flattens everything into the same embedding space, losing the native query affordances of each data source. Better: let SQL be SQL, let files be files, let the wiki be a wiki — and build a routing layer that picks the right source per question type. This matches our approach (graph-index.yaml is an index you navigate, not a vector store you search).

### Pattern 3: Compilation vs. Curation
Two camps: **LLM-compiled** (Karpathy, Pal — feed raw content, LLM produces structured articles) vs. **human-curated** (our graph, brainctl — human decides what matters and how to connect it). Trade-off: compilation scales, curation compounds. Compiled wikis grow fast but quality depends on model judgment. Curated graphs grow slowly but every node is validated.

### Pattern 4: The Evolution Gap
Almost nobody has solved knowledge evolution well. Most systems are append-only. StixDB's auto-decay is too aggressive (destroys knowledge). Pal's linter agent is aspirational. Our /connect skill is the closest thing to systematic maintenance, but it only adds links — it doesn't prune, merge, or detect contradictions. **This is the biggest unsolved problem across all systems studied.**

### Pattern 5: Intelligence Location
Critical architectural fork: is the intelligence in **the code** or in **the prompts**? Pal puts everything in a 400-line prompt. Our graph puts structure in YAML/markdown with deterministic validation (validate-graph.js). The prompt-driven approach is more flexible but fragile — it breaks when models change or instructions are misunderstood. The code-driven approach is rigid but reliable. Best systems will likely need both: deterministic structure + LLM-powered operations on that structure.

## Borrowable Ideas (Updated)

### From prior art (not yet acted on):
- Asymmetric trust scoring on memories (Hermes)
- Contradiction detection across insights (Hermes)
- Writing usage/consultation data back to graph (Hermes)
- LLM-generated per-domain ontology (MiroFish)

### From Batch 1:
- **Dual-layer routing** — if we ever need structured queries across insights, consider a lightweight SQL/SQLite view alongside graph-index.yaml (Pal)
- **Decay-as-scoring** — surface recently-consulted insights with higher priority during graph consultation, but never delete (StixDB, adapted)
- **Prospective memory triggers** — "alert me when a future insight touches topic X" (brainctl)
- **Context compaction escalation** — graduated compression strategies when context fills up, not one-size-fits-all (ByteRover)
- **Q&A outputs filed back into knowledge base** — querying the graph should compound it (Karpathy/dair.ai)

## Template for Future Entries

```
### [System/Person Name]
- **Source**: [URL or reference]
- **What they built**: [1-2 sentences]
- **Extraction method**: How raw content becomes nodes
- **Graph shape**: Flat/hierarchical/cross-linked, what connects to what
- **Retrieval pattern**: How knowledge is found when needed
- **Evolution strategy**: How the graph grows, prunes, stays fresh
- **Unique insight**: The one thing this system does that others don't
- **Transferable to**: [our graph | agent memory | company knowledge | all]
- **Critical note**: Honest assessment of maturity, over-engineering, hype vs. substance
- **Signal strength**: HIGH / MEDIUM / LOW
```
