---
title: "Traces replace code as the source of truth for agent systems — debugging shifts from 'show me the code' to 'send me the trace'"
slug: traces-replace-code-as-agent-source-of-truth
topics: [ai-agents, ai-native-product-architecture]
source: "@hwchase17 (Harrison Chase) — Context Engineering Our Way to Long-Horizon Agents"
source_file: sources/hwchase17-context-engineering-long-horizon-agents.md
date: 2026-04-17
domain: ai
---

In traditional software, the code IS the source of truth for how the system behaves — you can read it, set breakpoints, trace execution deterministically. In agent systems, that breaks down completely.

Harrison Chase describes the shift: "In agents, they're running and repeating and so you don't actually know what the context at step 14 will be because there's 13 steps before that that could pull arbitrary things in."

This has cascading implications:

1. **Debugging changes**: "People use traces from the start to just tell what's going on under the hood." In software, traces are production-only and error-focused. In agents, traces are the primary development artifact from day one.

2. **Collaboration changes**: When something goes wrong, the response shifts from "show me the code" to "send me a LangSmith trace." The trace — not the codebase — is where teams converge to diagnose issues.

3. **Testing changes**: "In order to get what the test cases are, you probably want to use the traces to construct that. You probably want to be testing online." Offline unit tests still work for harness components, but agent behavior emerges from real-world inputs, making online testing more important.

This is distinct from [[traces-are-the-universal-substrate-for-agent-learning]] (which focuses on traces as learning data). Here the point is that traces replace code as the *debugging and collaboration* artifact — the place where teams go to understand what happened and why.

Connects to [[decision-traces-are-the-missing-data-layer]] — if traces are the source of truth, then not storing them is not just a missed opportunity, it's discarding your system's primary diagnostic record.
