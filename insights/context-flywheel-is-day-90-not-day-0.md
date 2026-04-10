---
title: "The context flywheel is a Day 90 moat — Day 0 comparisons are misleading"
description: "Point-in-time capability benchmarks miss the compounding advantage: on Day 0 a raw model matches your product, but by Day 90 accumulated context creates an unbridgeable gap"
topics: [ai-native-product-architecture, business-models]
source: "@izzymiller (Izzy Miller, Hex) — Building AI Agents for Data Analytics"
source_file: sources/izzymiller-hex-building-ai-agents-data.md
date: 2026-04-10
domain: "ai"
---

"On day zero, Claude with a Snowflake connector is probably just as good. But by day 90, you're operating in a totally different ballgame." Hex's competitive moat is not point-in-time capability — it's the compounding flywheel: user work → artifacts accumulate → admin observability surfaces patterns → guides and semantic models improve → agent gets better → more user work. This flywheel gets stronger over time and is hard to replicate because it requires both time and active usage.

This operationalizes [[context-is-the-product-not-the-model]] with a time dimension: context isn't just a product differentiator, it's a *compounding* differentiator. Day 0 demos are misleading for both builders and buyers. This connects to [[agent-trace-accumulation-produces-emergent-world-models]] — the emergent world model IS the Day 90 advantage. The implication for evaluation is profound: [[evals-are-behavioral-pressure-vectors-not-neutral-measurements]] needs a time axis. Izzy is building "Metric City" — a 90-day simulation to test this compounding: Day 0 accuracy ~4%, Day 90 with Sonnet 4.6: 24% (target: 100%). And for competitors: [[proprietary-feedback-loops-widen-the-moat]] — each day of usage widens the gap, making late entry increasingly expensive.
