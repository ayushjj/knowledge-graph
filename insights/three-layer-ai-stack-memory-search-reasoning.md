---
title: "The three-layer AI stack: Memory, Search, Reasoning"
description: "The emerging AI product architecture has three layers — Memory (who is this user), Search (find the right information), Reasoning (navigate complex information) — all running on PostgreSQL"
topics: [ai-native-product-architecture, ai-agents]
source: "Synthesis from Supermemory, QMD, and PageIndex architectures"
date: 2026-02-24
---

A clear architectural pattern is emerging for AI-native products. The Memory layer handles who the user is — fact extraction, knowledge graphs, temporal handling, conflict resolution, and user profiles (Supermemory's approach). The Search layer finds the right information — BM25 for labels, vectors for meaning, hybrid for both, reranking for quality ([[hybrid-search-is-the-default-not-the-exception]]). The Reasoning layer navigates complex information — PageIndex for structured documents, [[agentic-search-beats-rag-for-live-codebases]] for code, multi-hop for following trails.

The infrastructure insight: all three layers could run on [[postgresql-scales-further-than-you-think]] — pgvector for semantic search, pg_textsearch for BM25, regular tables for memory and profiles. This is [[context-is-the-product-not-the-model]] made architectural — the model is a commodity, but the Memory + Search + Reasoning stack you build around it determines product quality. It's also the foundation for what [[agent-memory-preserves-institutional-knowledge]] describes at the Memory layer: persistent, structured recall that outlives individual sessions. In practice, the Memory layer uses [[tiered-retrieval-prevents-context-overload]] — pulling summaries first, drilling to details only when needed — to stay within the token budgets that make this architecture viable.
