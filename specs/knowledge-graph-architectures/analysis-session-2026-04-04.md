# Knowledge Graph Architectures — Deep Analysis Session
**Date**: 2026-04-04
**Context**: Comparative study of 10+ personal knowledge systems triggered by Karpathy's "LLM Knowledge Bases" post and the wave of responses on Twitter.

---

## The Library Analogy

Every system we studied is trying to solve the same problem: "I have a pile of books, articles, conversations, and notes scattered everywhere. How do I organize them so that when I need an answer, I find the right thing fast?"

Everyone builds a library. But they build very different *kinds* of libraries.

---

### Our Knowledge Graph — The Card Catalog with Red String

Imagine a detective's evidence board. Each card is one insight — a single idea, stated clearly. Red strings connect related cards. Topic headers group clusters together. You stand back and see the whole picture.

**Why it works**: Every card earned its place because a human (you) decided it mattered. The connections are deliberate — "this idea from Karpathy connects to this idea from Jaya Gupta because they're both about decision traces." When you need to make a decision, you look at the board, follow the strings, and the pattern emerges.

**What it's bad at**: You can't easily ask "show me everything from the last two weeks about procurement" — because the board is organized by *meaning*, not by *time* or *project*. And it only grows when you manually add cards.

---

### Karpathy's LLM Knowledge Base — The Encyclopedia Writer

Imagine hiring a really smart intern to read everything you give them and write encyclopedia articles. You dump raw papers, articles, and notes into an inbox. The intern reads them, breaks them into topics, writes clean summaries, cross-references related articles, and maintains a table of contents. You end up with a personal encyclopedia of ~100 well-written articles.

**Why it's different from ours**: Karpathy's approach produces *narrative depth* — full articles you can read. Ours produces *atomic insights* you can traverse. His is better for "teach me about X." Ours is better for "how does X connect to Y?"

**The trade-off**: His intern (the LLM) does the organizing, which means it scales fast but the quality depends on the intern's judgment. Our red-string board is slower because you curate it, but every connection is validated.

---

### Pal — The Filing Cabinet + Rolodex

This one has two systems working together. Imagine a filing cabinet for deep knowledge (research, concepts, reference material — like Karpathy's encyclopedia) PLUS a Rolodex for structured facts (people, meetings, projects, decisions — things you'd put in a spreadsheet).

**Why two?** Because some questions need narrative answers ("What do we know about trace architectures?") and others need database answers ("Everything about Sarah from the last two weeks across all projects"). A filing cabinet can't answer the second. A Rolodex can't answer the first. Pal uses both and has a receptionist (the Navigator agent) who decides which one to open based on your question.

**The unique idea — Navigation over Search**: Most systems try to dump everything into one big search engine (vector search). Pal says no — keep each system's native query power. Let SQL be SQL. Let files be files. Don't flatten everything into the same pot. The receptionist just needs to know *where to look*, not search everything at once.

**What this means for procurement**: This is directly relevant. Your procurement data has both dimensions — structured data (PO lines, vendors, prices, items) that needs SQL queries, AND unstructured knowledge (why a vendor was chosen, what went wrong last time, tribal knowledge about item categories). Pal's dual-layer design is a pattern worth borrowing.

---

### Hermes Agent — The Four-Drawer Filing System

Think of four drawers, each serving a different speed of memory:

1. **Top drawer (MEMORY.md)**: A typed-up summary sheet that sits on top of the desk — always visible, always the first thing you read. Frozen snapshot, curated by hand. This is like our MEMORY.md.

2. **Second drawer (HRR holographic vectors)**: This is the genuinely novel one. Imagine being able to do math on memories — "give me everything about 'procurement' MINUS 'vendor management'" — using algebra, not keyword search. Regular search can only match words. HRR vectors encode meaning in a way where you can add, subtract, and combine concepts mathematically. No embeddings server needed — it runs on pure math.

3. **Third drawer (SQLite session history)**: A log of every conversation, searchable by full-text search. Like a diary with an index.

4. **Bottom drawer (Skills as procedural memory)**: Instructions for how to *do* things, not what you *know*. Like a recipe book that lives alongside the encyclopedia.

**Why it matters**: Hermes recognizes that memory isn't one thing. Your "what I know" (factual), "what happened" (episodic), "how to do it" (procedural), and "what's important right now" (working memory) are all different types of memory that need different storage. Most systems treat all memory the same.

**Borrowable ideas from Hermes**:
- **Asymmetric trust scoring**: Not all memories are equally reliable. A memory from a verified source should outweigh a casual note. We don't do this — all our insights are treated as equally trustworthy.
- **Contradiction detection**: When a new insight contradicts an existing one, flag it. We don't detect this — if two insights say opposite things, they just coexist silently.

---

### MiroFish — The Neighborhood Map

Imagine a city map where every person is a building and the roads between them show how they're connected. MiroFish builds this map automatically using an LLM — it reads your data and decides "these are the categories that matter in YOUR domain." Then it generates *personas* based on what neighborhood of the graph someone lives in — "people surrounded by these connections tend to think like this."

**Why it's different**: Most systems organize knowledge by topic. MiroFish organizes knowledge by *relationship neighborhood*. It asks "what is this idea connected TO?" and uses that context to understand the idea itself. The idea is defined by its connections, not its content.

**The clever part**: The ontology (the category system) is generated by an LLM specifically for your domain. Not a generic tag system — a custom-built classification that fits YOUR data. Then there's a simulation feedback loop where the system tests its understanding against new data and adjusts.

**For procurement**: This "neighborhood" approach could be powerful. An item isn't just "steel pipe" — it's defined by which vendors supply it, which projects use it, what price range it falls in, what substitutes exist. The neighborhood IS the meaning.

---

### StixDB — The Self-Cleaning Desk

Imagine a desk that automatically pushes papers you haven't looked at toward the edge, and eventually sweeps them into the trash. Papers you use every day stay front and center. If two papers say almost the same thing, it merges them into one.

**Why it exists**: Agent memory fills up. If you save everything, the pile becomes useless. StixDB's answer: let memories decay naturally, like human memory does. Things you use stay. Things you don't fade away.

**Why it's dangerous for us**: Our knowledge graph is curated — every insight earned its place. Auto-deletion would destroy carefully connected ideas just because you haven't queried them in 48 hours. That's like throwing away a book because you didn't read it this week.

**What IS borrowable**: Use decay as a *spotlight*, not a *shredder*. When consulting the graph, surface recently-used insights first — but never delete the rest. Think of it like a bookstore where recently-bought books face outward on the display, but all other books are still on the shelves.

---

### brainctl — The Pocket Notebook with Alerts

A simple notebook stored in one file (SQLite) that you carry everywhere. You can write notes, track people, log decisions. The unique feature: you can set a **trip wire** — "alert me next time anything comes up about Project X."

**Why it's notable**: The prospective memory idea. Most systems are backward-looking (search what you already saved). Trip wires are forward-looking (watch for things that haven't happened yet). This is like telling your assistant "if you hear anything about competitor pricing, flag it immediately."

**For procurement**: Imagine setting a trip wire for "any new PO line that exceeds the historical price range for its item category." That's prospective memory applied to data monitoring.

---

### Cabinet — The Bulletin Board with Scheduled Assistants

A shared bulletin board where you pin documents, spreadsheets, and PDFs. Assistants (cron jobs) check in on a schedule — one scouts Reddit hourly, another writes a weekly summary.

**Why it's less interesting**: There's no intelligence in how knowledge is stored or connected. It's a wiki with timers. The "agents" are just scheduled tasks, not knowledge-aware systems.

**One UX idea worth noting**: You can drop an HTML file into a folder and it renders as a live mini-app inside the knowledge base. Knowledge base as app host is a novel interaction pattern.

---

### Jake Cosme — "Just Outsource It"

Don't build a library at all. Point your agent at deepwiki.com (which indexes public repos) and let someone else maintain the knowledge.

**Why it's the philosophical opposite**: Everyone else is building internal memory. Jake says: for public knowledge, don't bother — use someone else's index. This works for open-source documentation but is completely useless for personal or tribal knowledge, which is where knowledge graphs matter most.

---

### ByteRover — The Commercial Memory Sidecar

A funded product (4,000+ stars, arXiv benchmarks, Elastic License) that acts as a memory add-on for AI coding agents. Stores knowledge in a "context tree" linked to file paths.

**The one borrowable idea**: When memory fills up, it doesn't just delete the oldest stuff. It has a **hierarchy of compression strategies** — first try removing middle context, then oldest context, then reactive overflow handling. Graduated compression, not binary keep/delete.

---

## Meta-Lessons (Cross-Cutting Patterns)

### Pattern 1: The Dual-Layer Problem
Every system that goes beyond "markdown files in a folder" discovers that narrative depth and structured querying need different storage. Pal's wiki+SQL, Hermes's MEMORY.md+SQLite+HRR, our graph-index.yaml+insight-files. The question isn't "which storage?" — it's "how do you route between layers?"

### Pattern 2: Navigation Beats Search
Pal's most important architectural claim. Vector similarity search flattens everything into the same embedding space, losing the native query affordances of each data source. Better: let SQL be SQL, let files be files, let the wiki be a wiki — and build a routing layer that picks the right source per question type. This matches our approach (graph-index.yaml is an index you navigate, not a vector store you search).

### Pattern 3: Compilation vs. Curation
Two camps: LLM-compiled (Karpathy, Pal — feed raw content, LLM produces structured articles) vs. human-curated (our graph, brainctl — human decides what matters and how to connect it). Trade-off: compilation scales, curation compounds. Compiled wikis grow fast but quality depends on model judgment. Curated graphs grow slowly but every node is validated.

### Pattern 4: The Evolution Gap
Almost nobody has solved knowledge evolution well. Most systems are append-only. StixDB's auto-decay is too aggressive (destroys knowledge). Pal's linter agent is aspirational. Our /connect skill is the closest thing to systematic maintenance, but it only adds links — it doesn't prune, merge, or detect contradictions. **This is the biggest unsolved problem across all systems studied.**

### Pattern 5: Intelligence Location
Critical architectural fork: is the intelligence in the code or in the prompts? Pal puts everything in a 400-line prompt. Our graph puts structure in YAML/markdown with deterministic validation (validate-graph.js). The prompt-driven approach is more flexible but fragile — it breaks when models change or instructions are misunderstood. The code-driven approach is rigid but reliable. Best systems will likely need both: deterministic structure + LLM-powered operations on that structure.

### The Transferable Principle
Ask "what SHAPE is my knowledge?" before choosing how to store it. Don't pick the storage first and bend the knowledge to fit. Structured facts need SQL. Narrative depth needs documents. Cross-linked ideas need graphs. Most real-world systems need at least two of these working together with a routing layer that picks the right one per question.

---

## What To Borrow

### For Our Knowledge Graph

| Idea | Source | Verdict | Why |
|------|--------|---------|-----|
| Contradiction detection during /learn | Hermes | WORTH BUILDING | Small addition to pipeline, prevents silent conflicts |
| Asymmetric trust scoring | Hermes | WORTH CONSIDERING | Not all sources equally reliable |
| Decay-as-spotlight for consultation | StixDB | NOT YET | Need more consultation data first (20+ sessions) |
| Usage/consultation tracking | Hermes | REVISIT LATER | Same prerequisite as decay-as-spotlight |
| Dual-layer SQL view | Pal | NOT NEEDED | No friction demanding structured queries yet |
| Prospective memory triggers | brainctl | INTERESTING | Could alert when new insights touch watched topics |

### For Procurement Intelligence

| Idea | Source | Application |
|------|--------|-------------|
| Dual-layer storage | Pal | SQL for PO lines/prices + narrative for tribal knowledge about vendors/items |
| Navigation routing | Pal | Different data sources queried natively, not flattened into vectors |
| Neighborhood-defines-meaning | MiroFish | Item identity = vendor cluster + price range + project usage + substitutes |
| Prospective memory triggers | brainctl | "Flag when price exceeds 2x median for category" |
| Graduated compaction | ByteRover | When agent context fills, compress strategically instead of truncating |

---

## Systems by Signal Strength

| Tier | System | Why |
|------|--------|-----|
| HIGH | Pal | Dual-layer architecture + navigation routing — genuine design insight |
| HIGH | Hermes | 4-layer memory types — recognizes memory isn't monolithic |
| HIGH | MiroFish | Neighborhood semantics — identity through connections |
| MEDIUM | ByteRover | Compaction strategies — real engineering, commercial product |
| MEDIUM | StixDB | One novel mechanism (decay), extremely immature |
| LOW | brainctl | Over-engineered, but MCP+SQLite is practical |
| LOW | Cabinet | Wiki with cron jobs and good marketing |
| LOW | Karpathy diagram | Restatement of known architecture |
| ZERO | Jake Cosme | Outsourcing memory — philosophical opposite, not actionable |

---

## Sources Analyzed

- **Pal**: https://github.com/agno-agi/pal (172 stars)
- **StixDB**: https://github.com/Pr0fe5s0r/StixDB (6 stars, 1 day old)
- **brainctl**: https://github.com/TSchonleber/brainctl (5 stars, 2 days old)
- **ByteRover**: https://github.com/campfirein/byterover-cli (4,015 stars, Elastic License)
- **Cabinet**: https://runcabinet.com (MIT, open source)
- **Karpathy diagram**: academy.dair.ai by @omarsar0
- **Jake Cosme**: Twitter reply suggesting deepwiki.com + Cognition MCP
- **Matt Shumer**: Twitter thread on memory systems for OpenClaw/Hermes
- **Hermes Agent**: Nous Research, 4-layer memory (prior research)
- **MiroFish**: GraphRAG via Zep Cloud (prior research)
- **Karpathy original**: "LLM Knowledge Bases" post (prior research)
