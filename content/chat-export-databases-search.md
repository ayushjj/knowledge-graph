# Database & Search Models Learning Chat

**Date**: February 24, 2026  
**Purpose**: Understanding databases, search models, RAG systems, and the emerging AI stack

---

## Table of Contents

1. [Introduction](#introduction)
2. [pg_textsearch - BM25 for PostgreSQL](#pg_textsearch---bm25-for-postgresql)
3. [QMD - Hybrid Search CLI Tool](#qmd---hybrid-search-cli-tool)
4. [RAG System Overview](#rag-system-overview)
5. [PageIndex - Vectorless Reasoning-based RAG](#pageindex---vectorless-reasoning-based-rag)
6. [OpenAI PostgreSQL Scaling](#openai-postgresql-scaling)
7. [Connection Pooling Explained](#connection-pooling-explained)
8. [BM25 Problems & Solutions](#bm25-problems--solutions)
9. [BM25 for WhatsApp Bot Discussion](#bm25-for-whatsapp-bot-discussion)
10. [Semantic Highlighting UX Problem](#semantic-highlighting-ux-problem)
11. [Agentic Search vs RAG](#agentic-search-vs-rag)
12. [Supermemory - Context Infrastructure](#supermemory---context-infrastructure)
13. [The Emerging AI Stack](#the-emerging-ai-stack)
14. [Skill Graphs](#skill-graphs)
15. [Personal Learning System Discussion](#personal-learning-system-discussion)

---

## Introduction

This chat was initiated to understand databases and the best search models available. The approach was to share interesting articles and Twitter posts to build understanding through real-world examples and expert insights.

---

## pg_textsearch - BM25 for PostgreSQL

**Source**: https://github.com/timescale/pg_textsearch

### What is it?

Timescale's **pg_textsearch** extension brings BM25-based full-text search directly into PostgreSQL. It's the same ranking algorithm that powers traditional search engines like Elasticsearch.

### Simple syntax

```sql
SELECT * FROM documents
ORDER BY content <@> 'database system'
LIMIT 5;
```

### How it fits in the search landscape

| Search Type | What it does | Best for |
|-------------|--------------|----------|
| **Keyword/BM25** (pg_textsearch) | Matches exact words, ranks by term frequency and document length | Precise lookups, known terms, "electrician in Andheri" |
| **Vector/Semantic** (pgvector) | Matches meaning, finds similar concepts | Fuzzy queries, synonyms, "someone who can fix wiring" |
| **Hybrid** | Combines both approaches | Real-world applications needing both precision and recall |

### BM25 Algorithm

BM25 is the industry-standard keyword ranking algorithm. It considers:
- How often a term appears in a document (term frequency)
- How rare the term is across all documents (inverse document frequency)
- Document length normalization (so short docs don't dominate)

### Key Features

- Works with Postgres text search configurations (english, french, german, etc.)
- Supports partitioned tables
- Configurable parameters (k1, b)
- PostgreSQL OSS licensed

---

## QMD - Hybrid Search CLI Tool

**Source**: https://github.com/tobi/qmd  
**Author**: Tobi Lütke (Shopify CEO)

### What is it?

QMD is a state-of-the-art reference implementation for hybrid search. It combines three search approaches in one pipeline:

| Layer | Technology | What it does |
|-------|-----------|--------------|
| **BM25** | SQLite FTS5 | Fast keyword matching |
| **Vector** | Ollama embeddings | Semantic/meaning-based search |
| **Reranker** | LLM (qwen3-reranker) | AI judges which results are actually relevant |

### The Pipeline Architecture

```
User Query
    │
    ├─► Query Expansion (LLM generates variations)
    │
    ├─► BM25 Search ──────────┐
    │                         │
    └─► Vector Search ────────┤
                              ▼
                    RRF Fusion (merge rankings)
                              │
                              ▼
                    LLM Reranking (top 30)
                              │
                              ▼
                    Position-Aware Blending
```

### Key Concepts

#### Reciprocal Rank Fusion (RRF)

Algorithm for combining results from multiple search methods. Instead of normalizing scores, RRF looks at rank positions:

```
score = Σ(1/(k + rank + 1))  where k=60
```

A document ranked #1 in both BM25 and vector search gets a higher fused score than one ranked #1 in only one.

#### Query Expansion

The original query is weighted 2x, plus the LLM generates alternative phrasings. This helps capture synonyms and different ways of asking the same thing.

#### Position-Aware Blending

Don't let the reranker override high-confidence retrieval results. If BM25 found an exact match at rank #1, trust that more than the reranker's opinion.

| RRF Rank | Blend |
|----------|-------|
| 1-3 | 75% retrieval, 25% reranker |
| 4-10 | 60% retrieval, 40% reranker |
| 11+ | 40% retrieval, 60% reranker |

### Score Interpretation

| Score | Meaning |
|-------|---------|
| 0.8 - 1.0 | Highly relevant |
| 0.5 - 0.8 | Moderately relevant |
| 0.2 - 0.5 | Somewhat relevant |
| 0.0 - 0.2 | Low relevance |

---

## RAG System Overview

### Complete RAG Architecture Map

```
RAG System
    ├── Data Ingestion
    │     ├── PDF / DOCX / PPT / Notion / Web
    │     ├── Chunking strategies
    │     ├── Cleaning and deduplication
    │     ├── Metadata tagging
    │     └── Versioning

    ├── Embeddings
    │     ├── OpenAI / Cohere / BGE / Instructor
    │     ├── Vector normalization
    │     ├── Domain adaptation
    │     └── Re-embedding strategy

    ├── Vector Database
    │     ├── Pinecone / Weaviate / Qdrant / FAISS
    │     ├── Index types (HNSW, IVF, Flat)
    │     ├── Filtering and metadata search
    │     └── Sharding and scaling

    ├── Retrieval
    │     ├── Semantic search
    │     ├── Hybrid retrieval (BM25 + vector)
    │     ├── Re-ranking (cross-encoders)
    │     ├── Query rewriting
    │     └── Multi-hop retrieval

    ├── Prompt and Context Engineering
    │     ├── System, user and tool prompts
    │     ├── Context window management
    │     ├── Citation and grounding
    │     ├── Answer style control
    │     └── Safety and refusal rules

    ├── LLM Layer
    │     ├── GPT / Claude / Mistral / Llama
    │     ├── Temperature and decoding
    │     ├── Function calling and tools
    │     └── Cost and latency optimization

    ├── Generation
    │     ├── Context injection
    │     ├── Structured output (JSON)
    │     ├── Multi-step reasoning
    │     └── Tool-calling agents

    ├── Evaluation
    │     ├── Retrieval metrics (Recall@K, MRR)
    │     ├── Answer quality (faithfulness, relevance)
    │     ├── LLM-as-a-Judge
    │     └── Regression testing

    ├── Feedback Loop
    │     ├── User ratings
    │     ├── Click-through
    │     ├── Failure logging
    │     └── Data refresh triggers

    ├── Caching
    │     ├── Query caching
    │     ├── Embedding caching
    │     └── LLM response caching

    ├── Security and Guardrails
    │     ├── Prompt injection protection
    │     ├── Data isolation
    │     ├── PII filtering
    │     └── Tool permissioning

    ├── Observability
    │     ├── Token usage
    │     ├── Latency per step
    │     ├── Retrieval quality
    │     └── Hallucination tracking

    ├── Orchestration
    │     ├── LangChain / LlamaIndex / custom pipelines
    │     ├── Async flows
    │     └── Retry and fallback models

    ├── Infrastructure
    │     ├── API gateway
    │     ├── Vector DB hosting
    │     ├── Model routing
    │     └── Cost tracking

    └── Programming Language
          └── Python or TypeScript
```

### The 80/20 for Understanding RAG

Focus on these layers first (in order):

1. **Retrieval** — This is where quality is won or lost
2. **Chunking** — Bad chunks = bad retrieval
3. **Evaluation** — Without metrics, you're flying blind
4. **Prompt engineering** — How you inject context affects answer quality

---

## PageIndex - Vectorless Reasoning-based RAG

**Source**: https://github.com/VectifyAI/PageIndex

### Core Insight

> **"Similarity ≠ Relevance. Relevance requires reasoning."**

Vector search finds things that are *semantically similar* to your query. But what you actually need is things that are *relevant* — and determining relevance requires **reasoning**, not just pattern matching.

### How PageIndex Works

**Step 1: Build a tree index (like a smart Table of Contents)**

```
Document
├── Financial Stability (pages 21-22)
│   ├── Monitoring Financial Vulnerabilities (pages 22-28)
│   └── Domestic and International Cooperation (pages 28-31)
├── Monetary Policy (pages 32-45)
│   └── ...
```

**Step 2: Use LLM to reason through the tree**

When you ask a question, the LLM doesn't do similarity search. Instead, it:
- Looks at the tree structure
- Reasons: "This question about interest rates... that's probably under Monetary Policy..."
- Navigates down the tree like a human expert would
- Retrieves the relevant sections

### Mental Model Comparison

| Approach | Analogy |
|----------|---------|
| **Vector RAG** | "Find pages that *sound like* my question" |
| **PageIndex** | "If I were a domain expert, where would I *look* for this answer?" |

### Three Retrieval Philosophies Compared

| Repo | Approach | Core mechanism |
|------|----------|----------------|
| **pg_textsearch** | Keyword search | BM25 term matching |
| **QMD** | Hybrid search | BM25 + Vector + Reranking |
| **PageIndex** | Reasoning search | Tree structure + LLM navigation |

### When to Use What

| Use case | Best approach |
|----------|---------------|
| Short documents, simple queries | Vector or keyword search |
| Long structured documents (reports, manuals) | PageIndex tree navigation |
| General knowledge bases | Hybrid (QMD pattern) |
| Domain-specific professional docs | PageIndex + domain expertise |

### Trade-offs

**PageIndex advantages:**
- Better for long, structured documents
- Explainable — you can see *why* it retrieved something
- No chunking artifacts
- 98.7% accuracy on FinanceBench (vs typical RAG ~70-80%)

**PageIndex costs:**
- Requires LLM calls for retrieval ($$, latency)
- Documents need structure (doesn't work well on unstructured text)
- More complex to implement than vector search

---

## OpenAI PostgreSQL Scaling

**Source**: https://openai.com/index/scaling-postgresql/

### The Headline: No Sharding, Just PostgreSQL

OpenAI runs ChatGPT's backend on:
- **1 primary PostgreSQL instance** (for writes)
- **~50 read replicas** (for reads)
- **Millions of queries per second**
- **No sharding**

### Key Strategies

#### 1. Connection Pooling (PgBouncer)
Database response times improved from ~50ms to ~5ms after introducing connection pooling.

#### 2. Read Replica Scaling
Added dozens of read replicas—including cross-region replicas—to serve worldwide users with low latency.

#### 3. Offload Writes
Implemented numerous optimizations, offloading write loads wherever possible and avoiding addition of new services to the primary database.

#### 4. Priority-Based Replica Routing
For high-priority requests, allocated dedicated read-only replicas to prevent impact from low-priority ones.

#### 5. Strict Schema Discipline
- Creating new tables or adding new workloads: NOT allowed
- Adding or removing columns: Allowed (with 5-second timeout)
- Operations requiring full table rewrite: NOT allowed
- Creating or removing indexes: Must use CONCURRENTLY

### The Architecture Pattern

```
                    ┌─────────────────┐
                    │   Application   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   PgBouncer     │  ← Connection pooling
                    │  (Pool conns)   │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   ┌─────────┐         ┌─────────┐         ┌─────────┐
   │ Primary │         │ Replica │   ...   │ Replica │  ← ~50 replicas
   │ (Write) │────────►│  (Read) │         │  (Read) │
   └─────────┘  WAL    └─────────┘         └─────────┘
```

### Key Insight

| What people assume | What OpenAI proved |
|-------------------|-------------------|
| "You need sharding at scale" | Single primary + replicas handles 1M+ QPS |
| "You need specialized databases" | Standard PostgreSQL with good ops works |
| "Writes are the bottleneck" | True, but you can minimize/defer writes |

### Meta-Lesson

OpenAI's approach is "boring technology, excellent operations." They mastered PostgreSQL fundamentals:
- Connection management
- Read/write separation
- Careful schema changes
- Monitoring and observability

---

## Connection Pooling Explained

### The Problem: Database Connections Are Expensive

Every time your app talks to PostgreSQL, it needs a **connection**. Creating a connection involves:
- TCP handshake (network round-trip)
- Authentication (username/password verification)
- Memory allocation (PostgreSQL reserves ~5-10MB per connection)
- Process spawning (PostgreSQL creates a new backend process)

This takes **50-100ms** and consumes resources on both sides.

### The Analogy: Restaurant Phone Lines

**Without connection pooling:**
```
Customer 1 calls → Install new phone line → Take order → Hang up → Remove phone line
Customer 2 calls → Install new phone line → Take order → Hang up → Remove phone line
```

Every customer needs a new phone line installed. Slow and wasteful.

**With connection pooling:**
```
┌─────────────────────────────────────────┐
│  Pool of 20 phone lines (always ready)  │
└─────────────────────────────────────────┘
        │         │         │
        ▼         ▼         ▼
   Customer 1  Customer 2  Customer 3
   (uses line, returns it when done)
```

Phone lines stay installed. Customers borrow one, use it, return it. Next customer reuses the same line.

### How It Works Technically

**Without pooling:**
```
App Request 1 → Open connection → Query → Close connection (100ms overhead)
App Request 2 → Open connection → Query → Close connection (100ms overhead)
```

**With pooling (PgBouncer):**
```
                    ┌──────────────┐
App Request 1 ──────►              │
                    │  PgBouncer   │ ◄── Maintains 20 open connections
App Request 2 ──────►  (pooler)    │     to PostgreSQL
                    │              │
App Request 3 ──────►              │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  PostgreSQL  │
                    │ (20 conns)   │
                    └──────────────┘
```

### The Numbers (from OpenAI's case)

| Metric | Without pooling | With pooling |
|--------|----------------|--------------|
| Response time | ~50ms | ~5ms |
| Connections to DB | 1 per request | Shared pool |
| Memory per 1000 users | ~10GB | ~200MB |

### The Three Pooling Modes (PgBouncer)

| Mode | How it works | Best for |
|------|--------------|----------|
| **Session** | Connection tied to client session | Apps that use session features |
| **Transaction** | Connection returned after each transaction | Most web apps ✓ |
| **Statement** | Connection returned after each query | Simple stateless queries |

Transaction mode is the sweet spot for most applications — it's what OpenAI uses.

---

## BM25 Problems & Solutions

**Source**: https://www.tigerdata.com/blog/you-dont-need-elasticsearch-bm25-is-now-in-postgres

### The 4 Problems with Native PostgreSQL Search

#### Problem 1: Keyword Stuffing Wins

```
Search: "database"

Native PostgreSQL ranking:
#1: "Database database database. Learn about database..."  ← SPAM
#2: "Database connection pooling improves performance..."  ← Actually useful
```

**BM25 fix:** Term frequency saturation. After a few mentions, additional repetitions barely help.

#### Problem 2: Common Words Dominate

```
Search: "database authentication"

Documents mentioning "database": 10+
Documents mentioning "authentication": 1
```

Native Postgres treats both words equally. But "authentication" is the signal — it's rare and specific.

**BM25 fix:** Inverse Document Frequency (IDF). Rare terms get weighted higher.

#### Problem 3: Long Documents Win Unfairly

```
Search: "EXPLAIN ANALYZE"

80-word guide: mentions it 8 times → Native ranks #1
15-word tip: mentions it 2 times → Native ranks lower

But the 15-word tip is ENTIRELY about EXPLAIN ANALYZE.
```

**BM25 fix:** Length normalization. A focused short doc beats a long rambling one.

#### Problem 4: All-or-Nothing Matching

```
Search: "database connection pooling"

Native with AND: Only 2 results (must have ALL 3 words)
Native with OR: 13 results, but many have identical scores
```

**BM25 fix:** Ranked retrieval. Every doc gets a meaningful relevance score.

### The BM25 Formula

```
BM25 Score = IDF × Term Frequency (with saturation) × Length Normalization

Where:
- IDF: Rare words matter more ("authentication" > "database")
- TF Saturation: 12 mentions ≠ 12× better (diminishing returns)
- Length Norm: Short focused docs can beat long rambling ones
```

### Hybrid Search for AI Agents

| Query | BM25 finds | Vector finds | Hybrid finds |
|-------|-----------|--------------|--------------|
| "error PG-1234" | ✓ Exact code doc | Generic error docs | Exact code doc |
| "why is my database slow" | ✗ Nothing | Performance docs | Performance docs |
| "fix connection timeout" | Timeout configs | Troubleshooting guides | Both, ranked |

### The RRF Query Pattern in SQL

```sql
-- Hybrid search with Reciprocal Rank Fusion
WITH bm25 AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY content <@> to_bm25query($1)) as rank
  FROM docs LIMIT 20
),
vector AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> $2) as rank  
  FROM docs LIMIT 20
)
SELECT id, 1.0/(60+bm25.rank) + 1.0/(60+vector.rank) as score
FROM bm25 FULL JOIN vector USING (id)
ORDER BY score DESC LIMIT 10;
```

---

## BM25 for WhatsApp Bot Discussion

### Bot Context

- **667 contacts** (small dataset)
- **Tag/category matching** + **vector search** (hybrid already)
- **Queries**: "electrician in Andheri", "plumber", "bijli wala"
- **Working well** in production

### Where BM25 Would Help

| Query type | Vector search | BM25 | Current tags |
|------------|---------------|------|--------------|
| "Ramesh electrician" (exact name) | Maybe wrong Ramesh | ✓ Exact match | Partial |
| "9876543210" (phone number) | ✗ Poor | ✓ Exact match | ✗ |
| "someone to fix my tap" (semantic) | ✓ Great | ✗ Poor | ✗ |
| "paani ka kaam" (Hinglish semantic) | ✓ If embeddings handle it | ✗ Poor | ✗ |

### Honest Assessment

**For 667 contacts, BM25 probably won't noticeably improve UX.**

Why:
1. Tag matching already covers the keyword case
2. Small dataset = fast enough anyway
3. Real edge cases are semantic, not keyword
4. Added complexity for marginal gain

### Recommended Alternative

Instead of BM25, consider simple pre-filters:

```
Query flow:
    │
    ├─► Exact name match? → Return directly
    │
    ├─► Phone number? → Return directly  
    │
    └─► Otherwise → Existing hybrid search
```

This gives BM25's benefits for the cases that matter, without the complexity.

---

## Semantic Highlighting UX Problem

**Source**: Twitter post by @akshay_pachaar

### The Core Insight

**Retrieval and highlighting are mismatched:**

| Stage | Method | Understanding |
|-------|--------|---------------|
| **Retrieval** | Semantic (vectors) | "iPhone performance" → finds docs about A15 chip |
| **Highlighting** | Keyword (exact match) | Only highlights literal words "iPhone" and "performance" |

The system *found* the right document using meaning, but then *shows* the user using word matching.

### The User Experience Breakdown

```
User searches: "iPhone performance"
        │
        ▼
Semantic Retrieval (finds A15 Bionic, benchmarks, lag)
        │
        ▼
Keyword Highlighting (highlights: nothing - no "iPhone" found)
        │
        ▼
User sees 3000 words with no highlights: "Why is this here?"
```

### The Solution: Semantic Highlighting

Instead of highlighting exact word matches, highlight **semantically related spans**.

| Query | Keyword highlighting | Semantic highlighting |
|-------|---------------------|----------------------|
| "iPhone performance" | ~~nothing~~ | "A15 Bionic chip", "benchmarks", "zero lag" |
| "cost reduction" | ~~nothing~~ | "cut expenses by 30%", "budget optimization" |

### Why Not Just Use an LLM?

Highlighting happens on every query, for every retrieved document. 

| Approach | Latency | Cost |
|----------|---------|------|
| LLM per highlight | 500ms-2s | $$$$ |
| Specialized small model | ~10ms | $ |

### The Zilliz Model

Trained a small model (0.6B parameters) specifically for semantic highlighting:
- 8K context window
- Millisecond inference
- Works in English and Chinese
- MIT licensed

### The Principle for WhatsApp Bot

> Your response UX should match your retrieval intelligence.

If your bot uses semantic search to find "electrician" when someone asks for "someone to fix wiring," the response should make that connection clear.

```
❌ "Here's a contact: Ramesh (Electrician)"

✅ "Ramesh is an electrician who can help with wiring work. 
    Contact: 98765..."
```

---

## Agentic Search vs RAG

**Source**: Twitter discussion between Boris Cherny (Claude Code) and Daniel San (Hedgineer.io)

### The Surprising Finding

**RAG + vector DB was abandoned in favor of "just let the agent grep around."**

Claude Code's evolution:
```
Early version: RAG + local vector DB
Current version: Agentic search (glob/grep/read)

Result: Agentic search won.
```

### Why Agentic Search Beat RAG for Code

| Challenge | RAG approach | Agentic approach |
|-----------|--------------|------------------|
| **Staleness** | Embeddings get outdated as code changes | Always reads current files |
| **Privacy** | Code must be sent to embedding service | Stays local |
| **Re-indexing** | Continuous background job needed | No index to maintain |
| **Reliability** | Depends on embedding quality | Direct file access |
| **Simplicity** | Complex pipeline | Just bash tools |

### The Agentic Search Pattern

Instead of pre-indexing everything, let the LLM search on-demand:

```
User: "Find where we handle authentication"

RAG approach:
  Query → Vector search → Return chunks → LLM reads chunks

Agentic approach:
  LLM thinks: "Authentication... probably in /src/auth or files named *auth*"
  LLM runs: glob("**/auth*")
  LLM runs: grep -r "authenticate" src/
  LLM runs: read specific files
  LLM synthesizes answer
```

The agent **reasons about where to look**, then uses simple tools to look there.

### Connection to PageIndex

Both use **LLM reasoning** instead of (or in addition to) similarity matching:

| Approach | How it finds things |
|----------|---------------------|
| **Vector RAG** | "Find code that sounds similar to the query" |
| **PageIndex** | "Reason through document structure to find relevant sections" |
| **Agentic search** | "Reason about codebase structure, then look directly" |

### The Trade-off Spectrum

```
Simplicity ◄─────────────────────────────────────► Sophistication

Agentic          Hybrid           Full RAG         RAG + AST +
(grep/glob)      (BM25+Vector)    Pipeline         Tree-sitter

├── No index     ├── Some index   ├── Full index   ├── Multiple indexes
├── No staleness ├── Some lag     ├── Staleness    ├── Complex sync
├── More LLM     ├── Balanced     ├── Less LLM     ├── Least LLM calls
    calls            calls            calls            (but most infra)
```

### When Each Approach Wins

| Use case | Best approach | Why |
|----------|---------------|-----|
| **Code search (live repo)** | Agentic | Code changes constantly |
| **Documentation search** | Hybrid RAG | Docs are stable, worth indexing |
| **Chat history** | Vector + tags | Small dataset, doesn't change much |
| **Financial reports** | PageIndex | Structured, reasoning-heavy |
| **Log analysis** | BM25 | Exact matches matter, high volume |

---

## Supermemory - Context Infrastructure

**Source**: https://supermemory.ai

### What is Supermemory?

It's the "memory layer" that sits between your agent and your users:

```
User conversations ──► Supermemory ──► Extracted facts + Knowledge graph
                                              │
                                              ▼
                            Your AI Agent (with perfect recall)
```

### The Three Components

| Component | What it does | Analogy |
|-----------|--------------|---------|
| **Memory API** | Learns facts about users, handles updates/conflicts | "This user prefers Python, changed jobs in March" |
| **User Profiles** | Static + dynamic context that agent always knows | "Always remember: user is vegetarian" |
| **RAG** | Traditional semantic search over raw content | What we've been discussing |

### Hard Problems They Solve

#### 1. Knowledge Updates

```
Day 1: User says "I work at Google"
Day 30: User says "I just joined Meta"

Naive memory: Now has conflicting facts
Supermemory: Updates the graph, knows current employer is Meta
```

#### 2. Temporal Reasoning

```
"What did we discuss last week about the project?"
vs
"What's my current stance on the project?"

These require different retrieval strategies.
```

#### 3. Static vs Dynamic Context

```
Static: User's name, preferences, role (rarely changes)
Dynamic: Recent conversation topics, current project status
```

### The "Context Engineering" Framing

This is the discipline of getting the right information to your LLM at the right time.

What we've focused on:
- How to **find** relevant information (search)
- How to **rank** it (BM25, vector, hybrid, reranking)

What Supermemory adds:
- How to **remember** things about users across sessions
- How to **evolve** that knowledge over time
- How to **structure** context for the LLM

---

## The Emerging AI Stack

### The Complete Stack with Analogies

```
┌─────────────────────────────────────────────────────────────┐
│                    🤖 AI AGENT                               │
│            (The assistant's brain + voice)                   │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   📓 MEMORY   │    │   🗄️ SEARCH   │    │  🧠 REASONING │
│               │    │               │    │               │
│ "Who is this  │    │ "Find the     │    │ "Figure out   │
│  user? What   │    │  right info   │    │  where to     │
│  do I know?"  │    │  quickly"     │    │  look"        │
├───────────────┤    ├───────────────┤    ├───────────────┤
│ • User facts  │    │ • BM25        │    │ • PageIndex   │
│ • Knowledge   │    │   (labels)    │    │   (navigate)  │
│   graph       │    │ • Vector      │    │ • Agentic     │
│ • Profiles    │    │   (meaning)   │    │   (explore)   │
│ • History     │    │ • Hybrid      │    │ • Multi-hop   │
│               │    │ • Rerank      │    │               │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    🐘 POSTGRESQL                             │
│                                                              │
│   Your actual data lives here. All the layers above         │
│   are ways to ACCESS and UNDERSTAND this data.              │
│                                                              │
│   • pgvector (for semantic search)                          │
│   • pg_textsearch (for BM25)                                │
│   • Regular tables (for your contacts, users, etc.)         │
└─────────────────────────────────────────────────────────────┘
```

### Layer 1: Memory — "The Assistant Who Remembers You"

**Analogy: Your assistant's personal notebook about YOU**

| Component | Analogy | What it does |
|-----------|---------|--------------|
| **Fact extraction** | Highlighting key info as you talk | Pulls out "user lives in Mumbai" |
| **Knowledge graph** | Connecting related facts | "Ayush → works at → IndustryPrime" |
| **Temporal handling** | Dating entries | Knows old vs current facts |
| **Conflict resolution** | Crossing out old info | Keeps latest/correct version |
| **User profiles** | Summary page at front | Quick reference of key facts |

### Layer 2: Search — "The Filing Cabinet System"

**Analogy: Your assistant has access to a massive filing cabinet**

| Strategy | Analogy | Strength |
|----------|---------|----------|
| **BM25** | Looking for exact folder labels | Fast, finds exact matches |
| **Vector** | Understanding what you mean | Handles synonyms, meaning |
| **Hybrid** | Check both labels AND meaning | Gets best of both |
| **Reranking** | Quick review of candidates | AI picks truly best results |

### Layer 3: Reasoning — "The Assistant Who Can Figure Things Out"

**Analogy: Navigating a library vs just searching keywords**

| Component | Analogy | What it does |
|-----------|---------|--------------|
| **PageIndex** | Using table of contents | Build structure, reason through it |
| **Agentic search** | "Let me poke around" | Agent uses tools to explore |
| **Multi-hop** | Following a trail of clues | Find A → points to B → answers question |

### Complete Example: How They Work Together

**Query:** "That electrician my neighbor recommended last month — available in Andheri West?"

```
MEMORY LAYER checks notebook:
  "Last month, Sharma ji recommended Ramesh Electric"
  → Now I know we're looking for "Ramesh Electric"

SEARCH LAYER searches contacts:
  BM25: Finds "Ramesh Electric" (exact match)
  Vector: Confirms it's an electrician
  Metadata: Checks service areas
  → Found: Ramesh Electric, serves Andheri West ✓

REASONING LAYER thinks:
  "User asked about availability — should I mention 
   the positive past interaction?"
  → Decides to include context

RESPONSE:
  "Yes! Ramesh Electric (the one Sharma ji recommended)
   does serve Andheri West. Here's his number: 98765...
   Last time you mentioned he was very reliable."
```

### When Do You Need Each Layer?

| If users say... | You need... |
|-----------------|-------------|
| "It doesn't remember what I told it last time" | Memory layer |
| "It found the wrong contact" | Better search (hybrid) |
| "It doesn't understand what I mean" | Vector/semantic search |
| "It's slow to find things" | BM25 + proper indexing |
| "It can't answer questions about long documents" | Reasoning layer |
| "It doesn't explain why it gave me this result" | Better UX |

---

## Skill Graphs

**Source**: Twitter thread by @arscontexta (Heinrich)

### The Core Insight

**Single skill files hit a ceiling. Complex domains need interconnected knowledge.**

```
Current approach:
┌─────────────────────────────────────────┐
│           SKILL.md (one file)           │
│  "Here's how to do X"                   │
│  (Limited by file size / context)       │
└─────────────────────────────────────────┘

Skill graph approach:
┌─────────┐     ┌─────────┐     ┌─────────┐
│ Skill A │────►│ Skill B │────►│ Skill D │
└─────────┘     └────┬────┘     └─────────┘
                     │
                     ▼
               ┌─────────┐     ┌─────────┐
               │ Skill C │────►│ Skill E │
               └─────────┘     └─────────┘
               
(Agent navigates the graph based on what's relevant)
```

### The Analogy: Library vs Book

| Approach | Analogy |
|----------|---------|
| **Single SKILL.md** | A really good book on one topic |
| **Skill Graph** | A library where books reference each other |

### How It Works: Progressive Disclosure

The agent doesn't read everything. It navigates:

```
Level 1: INDEX
         "Here are the main topics and how they connect"
              │
Level 2: DESCRIPTIONS (YAML frontmatter)
         "This file is about X, useful when Y"
         Agent decides: "Do I need to read this?"
              │
Level 3: LINKS IN PROSE
         "[[attachment theory]] matters when patient shows [[avoidant patterns]]"
         Links carry MEANING because they're in sentences
              │
Level 4: SECTIONS
         Agent reads relevant sections, not whole file
              │
Level 5: FULL CONTENT
         Only when truly needed
```

### The Primitives

| Primitive | What it does |
|-----------|--------------|
| **Wikilinks in prose** | Links carry context because they're in sentences |
| **YAML frontmatter** | Agent can scan without reading full file |
| **MOCs (Maps of Content)** | Organize clusters of related skills |
| **Index file** | Entry point that shows the landscape |

### Example Domains

| Domain | Why one file fails | Why graph works |
|--------|-------------------|-----------------|
| **Therapy** | CBT + attachment + listening + regulation = too much | Each technique is a node |
| **Trading** | Risk + psychology + sizing + analysis = too much | Agent navigates by relevance |
| **Legal** | Contracts + compliance + jurisdictions + precedents | Follow paths for specific case |
| **Company** | Org structure + products + processes + culture | Navigate to relevant nodes |

### This is PageIndex for Skills

| Domain | Old approach | New approach |
|--------|--------------|--------------|
| **Document retrieval** | Chunk + embed + similarity | PageIndex (reason through structure) |
| **Code search** | RAG + vector DB | Agentic search (grep/glob/read) |
| **Agent skills** | One big SKILL.md | Skill graph (navigate by relevance) |

**The pattern: Structure + reasoning beats flat + similarity for complex domains.**

---

## Personal Learning System Discussion

### When Skill Graphs Make Sense

**Code defines WHAT the system does.** The code IS the source of truth.

**Skill graphs define KNOWLEDGE about a domain.** Expertise that isn't captured in code.

| In code (don't need skill graph) | NOT in code (could use skill graph) |
|----------------------------------|-------------------------------------|
| How hybrid search works | Why you chose hybrid over pure vector |
| Database schema | Data modeling decisions |
| Message parsing logic | How to handle ambiguous queries |

### When Skill Graphs Would Help

1. **Sales/BD knowledge at IndustryPrime**
   - How to position against competitors
   - Which customer segments respond to which arguments
   - Industry-specific pain points

2. **Personal learning system**
   - Accumulated knowledge across multiple chat threads
   - Connections between concepts from different sources
   - Navigable graph of insights

3. **Complex domain the bot might grow into**
   - Legal queries about society bylaws
   - Medical referrals
   - Financial advice

### What a Personal Learning Graph Could Look Like

```
┌─────────────────────────────────────────────────────────────┐
│                 Ayush's Learning Graph                       │
└─────────────────────────────────────────────────────────────┘

                        [[retrieval]]
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
   [[keyword]]          [[semantic]]        [[reasoning]]
        │                    │                    │
        ▼                    ▼                    ▼
   [[BM25]]             [[vector-search]]    [[PageIndex]]
   [[pg_textsearch]]    [[pgvector]]         [[agentic-search]]
        │                    │                    │
        └────────────────────┼────────────────────┘
                             ▼
                      [[hybrid-search]]
                             │
                      [[QMD]] [[RRF]]
                             │
                             ▼
                      [[reranking]]
```

### Structure for a Learning Graph

**Index file (entry point):**

```markdown
# Ayush's Learning Index

## Core Domains
- [[databases]] — PostgreSQL, scaling, indexing patterns
- [[search-and-retrieval]] — How to find information effectively
- [[ai-agents]] — Memory, context, reasoning architectures

## Key Insights
- [[similarity-vs-relevance]] — The fundamental tension in search
- [[hybrid-beats-pure]] — Why combining approaches wins
- [[structure-enables-reasoning]] — Why PageIndex and skill graphs work

## Sources & People
- [[Boris-Cherny]] — Claude Code, agentic search
- [[Tobi-Lutke]] — QMD, practical hybrid search
- [[Heinrich]] — Skill graphs concept
```

**A concept node:**

```markdown
---
description: Combining keyword (BM25) and semantic (vector) search
related: [[BM25]], [[vector-search]], [[RRF]], [[reranking]]
sources: [[QMD]], [[pg_textsearch-article]]
---

# Hybrid Search

The insight: Neither keyword nor semantic search alone is complete.

## How to combine: [[RRF]]
Reciprocal Rank Fusion merges results by rank position, not score.

## Implementations I've studied
- [[QMD]] — Tobi Lütke's CLI tool
- [[pg_textsearch]] + [[pgvector]] — Pure PostgreSQL approach
```

### What This Enables

**Query**: "I'm researching search for a new project. What do I know?"

**Agent traversal**:
```
Reads index → finds [[search-and-retrieval]]
Follows to → [[hybrid-search]], [[BM25]], [[vector-search]]
Sees related → [[reranking]], [[RRF]]
Finds implementations → [[pg_textsearch]], [[QMD]]
Checks insights → [[similarity-vs-relevance]]

Returns: Synthesized answer from YOUR accumulated knowledge
```

---

## Key Insights Summary

### The Recurring Pattern

**Structure + reasoning beats flat + similarity for complex domains.**

| Domain | Flat approach | Structured approach |
|--------|---------------|---------------------|
| Documents | Chunk + embed | PageIndex tree |
| Code | RAG + vectors | Agentic grep/glob |
| Skills | Single SKILL.md | Skill graph |
| Search | Pure vector | Hybrid BM25 + vector |

### The Similarity ≠ Relevance Principle

Vector search finds things that are *semantically similar*. But what you need is things that are *relevant* — and relevance requires **reasoning**.

### Modern Search is Hybrid by Default

- Pure keyword search misses meaning
- Pure vector search misses exact matches
- The combination outperforms both
- LLM reranking is the final quality layer

### PostgreSQL Scales Further Than You Think

OpenAI proves it: 1 primary + 50 replicas, millions of QPS, no sharding. Master the fundamentals:
- Connection pooling
- Read/write separation
- Careful schema changes
- Good observability

### The Three-Layer AI Stack

1. **Memory** — Who is this user? What do I know about them?
2. **Search** — Find the right information quickly
3. **Reasoning** — Navigate complex information intelligently

---

## Sources & References

1. **pg_textsearch**: https://github.com/timescale/pg_textsearch
2. **QMD**: https://github.com/tobi/qmd
3. **PageIndex**: https://github.com/VectifyAI/PageIndex
4. **OpenAI PostgreSQL Scaling**: https://openai.com/index/scaling-postgresql/
5. **TigerData BM25 Article**: https://www.tigerdata.com/blog/you-dont-need-elasticsearch-bm25-is-now-in-postgres
6. **Supermemory**: https://supermemory.ai
7. **Semantic Highlighting**: Twitter @akshay_pachaar
8. **Agentic Search Discussion**: Twitter @AkhileshBCherny, @dcsn89
9. **Skill Graphs**: Twitter @arscontexta

---

*Exported from Claude conversation on February 24, 2026*
