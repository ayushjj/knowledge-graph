---
title: "One session per contract beats long-running agent sessions"
description: "Fresh context per task contract outperforms 24-hour agent sessions because cross-contract context bloat degrades performance by construction"
topics: [ai-agents, ai-coding-tools]
source: "@systematicls — How To Be A World-Class Agentic Engineer"
date: 2026-03-05
domain: "ai"
---

Long-running 24-hour agent sessions force context bloat by introducing context from unrelated contracts into the same session. The better architecture: define task contracts (with tests, screenshots, and verification criteria as completion conditions), use stop-hooks to prevent termination until the contract is fulfilled, and create a new session for each contract. An orchestration layer handles spawning new contracts whenever something needs to be done and creating fresh sessions to work on them.

This extends [[autonomous-loops-need-small-stories-and-fast-feedback]] with a specific mechanism — the contract as the unit of work and the session boundary as the context hygiene tool. The stop-hook pattern ensures agents reach genuine completion rather than implementing stubs, connecting to [[specs-are-external-memory-surviving-context-resets]] where the spec IS the contract. The orchestration layer that spawns sessions per contract is a lightweight instance of [[orchestrator-agent-replaces-human-coordination]].
