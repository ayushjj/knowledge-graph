---
title: "Navigation beats search for knowledge retrieval — let each data source keep its native query interface"
description: "Vector similarity search flattens everything into one embedding space, losing native query affordances; better to let SQL be SQL, files be files, and build a routing layer that picks the right source per question type"
topics: [knowledge-systems, ai-native-product-architecture]
source: "Ayush Jhunjhunwala — KG Architecture Comparative Research (10+ systems analyzed)"
source_file: specs/knowledge-graph-architectures/research.md
date: 2026-04-04
domain: ai
---

Pal's most important architectural claim, confirmed across multiple systems: **vector similarity search flattens everything into the same embedding space, losing the native query affordances of each data source**. SQL is excellent at filtering, aggregating, and joining structured data. File systems are excellent at hierarchical browsing and pattern matching. Wikis are excellent at following cross-references. Embedding all of these into vectors and searching by cosine similarity discards what each format is naturally good at.

The alternative: keep each source in its native format and build a **routing layer** that picks the right source per question type. "What did I learn about agents last week?" routes to a structured index with date filters. "Explain the dual-layer pattern in depth" routes to a prose file. "Which insights connect agents to memory?" routes to a graph traversal.

Our graph already follows this pattern — [[structure-plus-reasoning-beats-flat-similarity]] was the first articulation, and graph-index.yaml is literally a navigation index, not a vector store. This insight makes the pattern explicit: it's not just that structured navigation beats flat similarity for our use case — it's an architectural principle that applies to any multi-format knowledge system. It reinforces why [[similarity-is-not-relevance-relevance-requires-reasoning]] — the routing layer IS the reasoning that makes retrieval relevant rather than merely similar. It also connects to [[agentic-search-beats-rag-for-live-codebases]], where Claude Code abandoned vector RAG for direct file navigation with agent reasoning.
