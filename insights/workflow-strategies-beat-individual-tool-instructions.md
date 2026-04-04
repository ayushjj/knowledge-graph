---
title: "Agents need workflow-level tool strategies, not individual tool instructions — the hard part is how tools combine"
description: "In enterprise environments, the challenge isn't finding the right tool but understanding how tools work together; intentionally narrow strategies that capture workflow patterns generalize better than broad abstractions"
topics: [ai-agents, knowledge-systems]
source: "@tonygentilcore (Tony Gentilcore, Glean) — Trace Learning for Self-Improving Agents"
source_file: sources/tonygentilcore-trace-learning-self-improving-agents.md
date: 2026-04-04
domain: ai
---

Glean made a conscious decision to store learnings that were intentionally narrow — guidance like "in this situation, prefer this strategy" rather than prescribing exact sequences or abstracting too broadly. The insight is that trace learning shifts the focus from "which tool to call" to "how to accomplish a task across tools." In an environment with hundreds of connectors and actions, agents need to learn reusable patterns: when to parallelize versus sequence tool calls, when one system is authoritative for analytics versus record-level detail, and how multiple tools combine into a single workflow.

This is the runtime manifestation of what [[domain-skill-libraries-are-the-real-agent-moat]] describes at the strategic level — accumulated domain workflows are the moat. Glean's approach shows HOW those workflows get learned: through execution traces, not manual specification. The narrow-but-generalizable granularity also connects to [[skill-graphs-enable-progressive-disclosure]] — the learned strategies serve as high-level workflow primitives that reduce the action space at runtime, much like skill graph nodes reduce the navigation space for knowledge retrieval.
