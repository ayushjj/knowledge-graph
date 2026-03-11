---
title: "Context layers supersede semantic layers for agent autonomy"
description: "Traditional semantic layers handle metric definitions but agents need a superset: canonical entities, identity resolution, tribal knowledge instructions, and governance guidance"
topics: [ai-native-product-architecture, knowledge-systems]
source: "@jasonscui — Your Data Agents Need Context, a16z"
date: 2026-03-11
domain: "ai"
---

A traditional semantic layer in BI (like LookML or dbt) handles specific metric definitions — revenue, churn, ARPU — using hand-constructed syntax connected to a single BI tool. A modern context layer must become a superset of this: canonical entities, identity resolution, specific instructions to dissect tribal knowledge, and governance guidance. This is [[structure-plus-reasoning-beats-flat-similarity]] applied to enterprise data — flat metric definitions aren't enough when agents need to reason across disparate sources.

The context layer becomes a multi-dimensional corpus where code lives alongside natural language. Just as developers set up .cursorrules files to guide coding agents, data practitioners maintain rules and guidelines for data agents. This mirrors the pattern in [[skill-graphs-enable-progressive-disclosure]] — layered, structured context beats monolithic definitions. The context layer can be exposed to agents via API or MCP, connecting to [[domain-skill-libraries-are-the-real-agent-moat]] — the structured knowledge about a specific enterprise's data is the moat, not the agent infrastructure.
