---
title: "Enterprise agents need deterministic structure while startups need autonomous loops — same models, different harnesses"
slug: enterprise-agents-need-deterministic-structure-startups-need-loops
topics: [ai-agents, future-of-ai-business]
source: "@hwchase17 (Harrison Chase) — Everything Gets Rebuilt: Agents, Harnesses, and the New Compute Layer"
source_file: sources/hwchase17-everything-gets-rebuilt-agents-harnesses.md
date: 2026-04-17
domain: ai
---

Harrison Chase on the enterprise/startup divergence: "At a startup you're far more likely to build something like Claude Code that is just running in a loop and doing stuff. At an enterprise... you need more precision, you need more control. It's not okay to have 95%, you need certainty that this step's always going to happen after that step."

This manifests in LangChain's product split:
- **LangGraph** (deterministic + non-deterministic mixing) is "much more popular in enterprises"
- **Deep Agents** (loop-based) is "much more popular in startups"

The same underlying models power both, but the harness architecture differs fundamentally. Enterprises need to guarantee that specific steps execute in specific order — regulatory compliance, audit trails, approval workflows. Startups can tolerate the model making its own execution decisions.

Chase expects convergence: "We expect that those will make their way for sure" — loop-based agents will enter enterprise as trust builds. But at this moment, the gap is real and product-defining.

This connects to [[production-agents-route-decisions-not-every-call-to-llm]] — the enterprise pattern is to use deterministic routing for known cases and LLMs only for ambiguity. Also connects to [[saas-survives-as-governance-and-coordination-layer]] — the deterministic structure IS the governance layer that enterprises require.
