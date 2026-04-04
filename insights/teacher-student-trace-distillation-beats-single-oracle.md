---
title: "Teacher-student trace distillation with consensus validation beats single-oracle learning"
description: "A single high-reasoning teacher trace isn't reliable enough for enterprise learning; comparing multiple student traces under production constraints with consensus validation produces trustworthy strategies"
topics: [ai-agents, ai-native-product-architecture]
source: "@tonygentilcore (Tony Gentilcore, Glean) — Trace Learning for Self-Improving Agents"
source_file: sources/tonygentilcore-trace-learning-self-improving-agents.md
date: 2026-04-04
domain: ai
---

Glean's trace learning has two components: offline mining of strategies from historical traces, and online retrieval and application at runtime. The key design decision is in the offline phase — Glean found that a single teacher trace, even with the highest reasoning effort, wasn't reliable enough on its own. Instead, they run a high-reasoning "teacher" agent alongside multiple "student" agents operating under real production constraints (tighter budgets, stricter tool sets, latency limits). They extract factual claims across responses, check for agreement, and only learn when outputs are consistent or verifiable. If inconsistencies cannot be resolved, the system generates no learning at all.

This is a direct extension of [[traces-not-scores-enable-agent-improvement]] — Glean's approach shows that even rich traces need multi-perspective validation before distilling into strategies. It also connects to [[error-memory-enables-learning-without-retraining]]: the distilled strategies are compact natural-language memories, not model weights, enabling continuous improvement without fine-tuning. The contrastive element — learning from both successes AND failures — echoes the ReasoningBank pattern of isolating which decisions actually mattered by comparing where execution diverged.
