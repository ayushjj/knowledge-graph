---
title: "Model compensations become liabilities as capabilities advance — yesterday's fixes hobble today's agent"
description: "Engineering workarounds for earlier model limitations accumulate as technical debt that actively degrades agent performance when models improve"
topics: [ai-agents, ai-native-product-architecture]
source: "@izzymiller (Izzy Miller, Hex) — Building AI Agents for Data Analytics"
source_file: sources/izzymiller-hex-building-ai-agents-data.md
date: 2026-04-10
domain: "ai"
---

"A remarkable amount of things that at one point we felt very proud of building and were in fact necessary are now hobbling the agent." Hex estimates 5+ examples per week of once-necessary, now-harmful systems. Concrete example: they built a complex ID-mapping/reference-registry system because earlier models hallucinated cell IDs in notebooks with 50+ cells. Current models don't need it — but the compensation code introduces bugs, complexity, and behavioral constraints that actively degrade the agent.

This extends [[scaffolding-is-tech-debt-against-the-next-model]] from a forward-looking caution to a retroactive reality: the debt isn't hypothetical, it's accruing right now at production scale. The implication is that [[build-for-the-model-six-months-from-now]] isn't just about targeting future capabilities — it's about actively auditing and removing past compensations. Hex's experience suggests a regular "compensation audit" practice: systematically testing whether old workarounds still help or hurt. The rate — 5+ per week — indicates this is a continuous maintenance task, not a one-time cleanup. The failure mode is [[tool-design-is-continuous-observation-see-like-an-agent]]: tools designed for weaker models constrain stronger ones.
