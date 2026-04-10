---
title: "Long-horizon evals test compounding behavior, not point-in-time accuracy"
description: "Hex's Metric City benchmark simulates 90 days of agent use with evolving data to measure whether the agent gets smarter over time — Day 0: 4%, Day 90: 24%"
topics: [ai-agents, ai-native-product-architecture]
source: "@izzymiller (Izzy Miller, Hex) — Building AI Agents for Data Analytics"
source_file: sources/izzymiller-hex-building-ai-agents-data.md
date: 2026-04-10
domain: "ai"
---

Izzy Miller is building "Metric City" — a long-horizon eval benchmark with a fake company (Shorelane Commerce) that simulates 90 days of operations: daily data changes, incoming tickets, and the agent accumulating knowledge. Day 0 accuracy: ~4%. Day 90 with Sonnet 4.6: 24% (target: 100% if the agent demonstrates ideal compounding behavior). Plans to open-source it.

Most data benchmarks test SQL syntax or needle-in-a-haystack retrieval — what Izzy calls "syntactic" evaluation. The actually interesting thing is "behavioral" evaluation: does the agent exhibit analytical skepticism? His favorite failing eval: "I introduced a fan-out bug making every AE look like they're at 900%+ quota. Every agent says 'best quarter ever!' None catch the bug. But if you then say 'that doesn't seem right,' it takes 10 seconds." This gap between capability and skepticism is the frontier.

This extends [[evals-are-gradient-signal-for-harness-engineering]] into a temporal dimension — static evals measure the harness at one point, but Metric City measures the *learning trajectory*. It also provides a concrete implementation of [[holdout-sets-gate-autonomous-harness-optimization]] at the platform level: the simulated 90-day data stream is a holdout set that can't be gamed by prompt engineering. The methodology validates [[trace-to-eval-flywheel-compounds-agent-quality]] — the eval literally measures whether the trace-to-improvement flywheel works.
