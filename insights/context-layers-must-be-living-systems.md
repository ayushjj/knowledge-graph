---
title: "Context layers must be living systems, not static artifacts"
description: "Unlike semantic layers that rot when maintainers leave, context layers need self-updating feedback loops where agent errors refine the context corpus"
topics: [ai-native-product-architecture, ai-agents]
source: "@jasonscui — Your Data Agents Need Context, a16z"
date: 2026-03-11
domain: "ai"
---

A cautionary pattern from the article: semantic layer YAML files were last updated by a data team member who left the company, are no longer used by BI tools, and don't include two new product lines launched since. Static context rots. Data systems are never static, and the context layer shouldn't be either — data sources change upstream, business requirements evolve, and agents encounter novel situations that expose gaps.

The solution is self-updating context flows: when a data agent provides incorrect data and requires accuracy refinement, that correction feeds back into the context layer. This creates a living, constantly evolving corpus. The pattern connects to [[error-memory-enables-learning-without-retraining]] — error-driven learning applied to the context layer itself, not just agent behavior. It also reinforces [[compound-engineering-makes-future-work-easier]]: each agent correction compounds the context layer's accuracy for all future queries. A survey of 10+ knowledge graph architectures confirms this is the hardest problem in the space: [[knowledge-evolution-is-the-biggest-unsolved-problem]] shows that most systems are append-only, and even the best only add links without pruning, merging, or detecting contradictions.
