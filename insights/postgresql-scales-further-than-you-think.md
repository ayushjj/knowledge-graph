---
title: "PostgreSQL scales further than you think"
description: "OpenAI runs ChatGPT on one PostgreSQL primary plus ~50 read replicas handling millions of QPS — no sharding, no specialized databases, just excellent operations"
topics: [ai-native-product-architecture]
source: "OpenAI — https://openai.com/index/scaling-postgresql/"
date: 2026-02-24
---

The assumption "you need sharding at scale" is wrong. OpenAI proved that a single PostgreSQL primary with ~50 read replicas handles millions of queries per second for ChatGPT's backend. Their strategy is boring: connection pooling (PgBouncer dropped response times from 50ms to 5ms), read/write separation, careful schema discipline (no new tables, no full-table rewrites, all index operations CONCURRENTLY), and good observability.

This is [[boring-tech-wins-for-ai-native-startups]] at extreme scale — if OpenAI doesn't need specialized databases at millions of QPS, most startups definitely don't. It validates the [[three-layer-ai-stack-memory-search-reasoning]] vision where Memory, Search, and Reasoning all run on PostgreSQL (pg_textsearch for BM25, pgvector for semantic search, regular tables for everything else). The meta-lesson connects to [[middleware-dies-infrastructure-survives]]: PostgreSQL is infrastructure that survives because it's the universal substrate that every layer builds on.
