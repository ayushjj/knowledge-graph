---
title: "Knowledge systems need dual-layer storage — narrative depth and structured queries can't share a format"
description: "Every system beyond 'markdown files in a folder' discovers that narrative depth (rich prose, context, reasoning) and structured querying (filter, aggregate, cross-reference) need different storage layers with a routing mechanism between them"
topics: [knowledge-systems, ai-native-product-architecture]
source: "Ayush Jhunjhunwala — KG Architecture Comparative Research (10+ systems analyzed)"
source_file: specs/knowledge-graph-architectures/research.md
date: 2026-04-04
domain: ai
---

A consistent pattern across knowledge graph architectures: the moment a system grows beyond simple file storage, it discovers that **narrative depth and structured querying pull in opposite directions**. Pal built a wiki for depth alongside PostgreSQL for cross-dimensional queries. Hermes uses curated MEMORY.md alongside SQLite with FTS5 alongside HRR holographic vectors — three layers, each serving a different retrieval shape. Our own graph mirrors this with graph-index.yaml (structured metadata for routing) alongside full insight files (rich prose for understanding).

The question isn't "which storage?" — it's **"how do you route between layers?"** Pal solves this with prompt-engineered metadata routing. We solve it with a CLAUDE.md instruction that directs agents to consult graph-index.yaml first, then drill into full files only when needed. Both are imperfect: Pal's routing depends on LLM judgment per query, ours depends on the agent remembering the instruction.

This connects to [[structure-plus-reasoning-beats-flat-similarity]] — the dual-layer pattern IS the structural precondition for reasoning-based retrieval. You can't reason about which storage to query if everything lives in one flat layer. It also explains why [[files-are-the-universal-agent-interface]] works well as one layer but needs complementary structure: files excel at narrative depth but can't answer "everything about topic X from the last two weeks" without an index layer on top. The [[three-layer-ai-stack-memory-search-reasoning]] pattern describes the same tension at application scale — memory, search, and reasoning each need their own substrate.
