---
title: "Observability is the missing discipline for agent systems — you can't improve what you can't measure"
description: "Agent systems need telemetry (token usage, latency, error rates, cost per task) as a first-class engineering concern, not an afterthought bolted on after production failures"
topics: [ai-agents, ai-native-product-architecture]
source: "Geoff Huntley — Latent Patterns Principles (verification over testing)"
date: 2026-03-16
domain: "ai"
---

Most agent systems are built with zero observability — no token tracking, no error rate dashboards, no cost-per-task visibility. Teams discover problems through user complaints, not telemetry. This is the equivalent of running a web service without logging or metrics — technically possible, but operationally reckless.

The minimum viable observability for agents includes: token usage per session (are costs spiking?), latency distribution (are some tasks mysteriously slow?), error rates by task type (which capabilities are unreliable?), and cost per completed task (is the unit economics viable?). This extends [[decision-traces-are-the-missing-data-layer]] from "why did we decide this?" to "how did the system behave while deciding?" — decision traces capture reasoning, observability captures performance. Combined with [[kv-cache-hit-rate-determines-agent-economics]], token-level telemetry reveals whether your caching strategy is actually working or just theoretically sound. And [[error-memory-enables-learning-without-retraining]] becomes far more powerful when error patterns are detected systematically through telemetry rather than discovered anecdotally.
