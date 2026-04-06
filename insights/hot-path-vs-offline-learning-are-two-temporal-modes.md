---
title: "Hot-path and offline learning are two temporal modes for agent context updates — each with different tradeoffs"
description: "Agents can update their context in the hot path (during task execution, like saving to memory while working) or offline (batch processing recent traces after the fact, like OpenClaw's 'dreaming'), with an additional dimension of explicit vs implicit memory updates"
topics: [ai-agents, knowledge-systems]
source: "@hwchase17 (Harrison Chase) — Continual Learning for AI Agents"
source_file: sources/hwchase17-continual-learning-ai-agents.md
date: 2026-04-06
domain: ai
---

Chase identifies two temporal modes for context updates: **hot-path** (the agent updates memory while executing its core task — the user prompts it or the harness instructs it to save learnings in real-time) and **offline** (batch processing recent traces to extract insights — what OpenClaw calls "dreaming"). A third dimension cuts across both: how explicit the update is — whether the user actively prompts the agent to remember, or the agent remembers based on standing instructions in the harness.

This frames your own learning architecture precisely. Your `/learn` skill is hot-path + explicit (you prompt the agent to extract insights during the session). Your auto-memory system in CLAUDE.md is hot-path + implicit (the harness instructs the agent to save memories without you asking). The `/wrap` skill is closer to offline — it batch-processes the session's learnings at the end. OpenClaw's "dreaming" is fully offline + implicit. This connects to [[session-capture-compounds-development-knowledge]] — shadcn's /done pattern is hot-path + explicit, while [[evolving-summaries-beat-append-only-memory]] describes the storage strategy that offline learning needs (rewrite profiles, don't accumulate raw facts). The tradeoff: hot-path learning is immediate but adds latency to the primary task; offline learning is thorough but introduces a delay before the agent benefits from what it learned.
