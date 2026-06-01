---
title: "Order the system prompt by volatility to keep prompt prefixes cache-friendly"
description: "Hermes composes the system prompt in three tiers — stable, context, volatile — so the unchanging prefix stays cacheable while turn-by-turn data lives at the end"
topics: [ai-native-product-architecture, ai-agents]
source: "@aparnadhinak (Aparna Dhinakaran) — Hermes Harness Architecture"
source_file: "sources/aparnadhinak-hermes-harness-architecture.md"
date: 2026-06-01
domain: "ai"
---

Prompt caching only pays off when the prefix is byte-stable, so where you place changing content directly determines your cache hit rate. Hermes makes this explicit by composing the system prompt in three tiers ordered by how often each changes: stable (identity, tool guidance, skills index), context (project files from the working directory), and volatile (memory snapshots, user profile, the timestamp line). Keeping stable content first and volatile last means normal turns reuse the cached prefix — the concrete design pattern behind why [[kv-cache-hit-rate-determines-agent-economics]] and what makes [[prompt-caching-makes-long-context-economically-viable]]. It's the same instinct as [[claude-md-should-be-routing-table-not-knowledge-base]]: keep the durable layer where it won't churn the prefix.
