---
title: "Hybrid search is the default, not the exception"
description: "Neither keyword nor semantic search alone is complete — combining BM25 and vector search with reranking is the baseline for production systems"
topics: [ai-native-product-architecture]
source: "QMD by Tobi Lütke, pg_textsearch by Timescale, TigerData BM25 article"
date: 2026-02-24
---

Pure keyword search misses meaning ("someone to fix wiring" won't find "electrician"). Pure vector search misses exact matches (error codes, phone numbers, proper nouns). Every production search system converges on the same architecture: BM25 for precision, vectors for recall, Reciprocal Rank Fusion to merge rankings, and an LLM reranker as the final quality layer.

Tobi Lütke's QMD reference implementation makes this concrete — it combines BM25 (SQLite FTS5), vector search (local embeddings via node-llama-cpp with GGUF models), and LLM reranking (qwen3-reranker) with position-aware blending that trusts high-confidence retrieval results over reranker opinion. This is the practical foundation underneath [[similarity-is-not-relevance-relevance-requires-reasoning]] — hybrid search doesn't solve the relevance-vs-similarity problem entirely, but it establishes the baseline that [[three-layer-ai-stack-memory-search-reasoning]] builds upon. For [[ai-native-product-architecture]], hybrid search on [[postgresql-scales-further-than-you-think]] (pg_textsearch + pgvector) may be all most products need — though as [[response-ux-should-match-retrieval-intelligence]] warns, semantic retrieval paired with keyword-based highlighting creates a confusing mismatch that undermines the intelligence behind the search.
