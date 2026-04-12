---
title: "Memory is a harness responsibility, not a pluggable component"
description: "Managing context — what enters, what survives compaction, what's queryable — is a core capability of the harness itself, not an add-on service"
topics: [ai-native-product-architecture, knowledge-systems]
source: "@hwchase17 (Harrison Chase) — Your harness, your memory (citing Sarah Wooders, Letta)"
source_file: "sources/hwchase17-your-harness-your-memory.md"
date: 2026-04-12
domain: ai
---

Sarah Wooders' line, quoted in Harrison Chase's article, captures the architectural claim precisely: "Asking to plug memory into an agent harness is like asking to plug driving into a car." Short-term memory (conversation messages, large tool-call results) is managed by the harness. Long-term memory (cross-session state) must be written and read by the harness. How CLAUDE.md loads, how skill metadata is surfaced, what survives compaction, whether interactions are queryable — every one of these is a harness decision, not a decision a standalone memory service can make after the fact.

This has immediate bearing on [[two-tier-agent-memory-separates-org-from-user]] and [[agent-memory-preserves-institutional-knowledge]]: the separation between org and user memory is only meaningful if the harness exposes both tiers consistently to the model. It also complicates the popular "bring-your-own-memory" framing — until harness-memory abstractions standardize, memory isn't portable across harnesses, only across backing stores. This suggests that choosing a harness is effectively choosing a memory model, which connects to [[context-is-the-product-not-the-model]].
