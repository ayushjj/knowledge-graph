---
title: "AI trace data has an indefinite useful lifespan — SaaS observability's 30-day retention model destroys institutional knowledge"
description: "Infrastructure metrics expire quickly but AI conversations and reasoning traces gain value over time; 30-day retention windows erase the very data that reveals failure patterns and training signals"
topics: [ai-native-product-architecture, ai-agents]
source: "@aparnadhinak (Aparna Dhinakaran) — Data Architectures For Tracing Harnesses & Agents"
source_file: sources/aparnadhinak-data-architectures-tracing.md
date: 2026-04-04
domain: ai
---

Most observability platforms were designed for infrastructure metrics — CPU utilization, stack traces — data with a short useful lifespan. AI data is fundamentally different. A conversation from six months ago might reveal a failure pattern you only recognize today. The reasoning traces from your best-performing agent sessions are training signals for the next iteration of agents or employees. Sending this to a 30-day retention window is, as Harvey puts it, "like writing your institutional knowledge on a whiteboard and erasing it every month."

This challenges the default assumption behind [[observability-is-the-missing-agent-discipline]]: it's not enough to measure — you must also retain. The architectural implication is that AI traces should live in your own data lake in open formats (Parquet, Iceberg), not in a provider's proprietary silo. This connects directly to [[decision-traces-are-the-missing-data-layer]] — the traces Dhinakaran describes ARE the missing data layer, and their value compounds over time rather than decaying.
