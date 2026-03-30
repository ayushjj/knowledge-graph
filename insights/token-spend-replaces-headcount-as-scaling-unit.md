---
title: "Cap headcount, not compute — token spend per engineer replaces headcount as the scaling unit"
description: "At $1,000/month per engineer as table stakes, top engineers manage 20-30 agents simultaneously; R&D scales through compute investment, not hiring"
topics: [future-of-ai-business, business-models]
source: "@DavidGeorge83 (David George, a16z) — There Are Only Two Paths Left for Software"
date: 2026-03-24
domain: ai
---

David George frames the internal economics shift bluntly: "Token spend per engineer is investment, not cost." The practical numbers: $1,000/month token spend per engineer is table stakes, top engineers see order-of-magnitude productivity gains and manage 20-30 agents simultaneously, and the organizational unit shrinks from 10-person committees to 4-person strike teams (design + product + engineering collapsed). The hiring model inverts — find ~5 people who will deliver 100x value regardless of seniority, then scale through compute, not headcount.

This is the internal R&D economics that makes [[autopilots-capture-work-budget-not-tool-budget]] possible: if your own engineers are 10x more productive via token spend, you can build the autopilots that capture the 6x-larger services TAM. The "20-30 agents simultaneously" is exactly what [[orchestrator-agent-replaces-human-coordination]] enables operationally — a single engineer managing an agent swarm, not manually coordinating human teams. The counterintuitive implication connects to [[automation-amplifies-expert-demand]]: fewer engineers total, but each one doing far higher-value work at dramatically higher effective output. And the margin structure explains why [[platform-economics-beat-labor-arbitrage]] holds — companies that invest in compute infrastructure create flywheels, while those that hire bodies cannot keep pace. Boris Cherny provides the clearest evidence: [[uncorrelated-context-windows-are-test-time-compute]] — at Anthropic, he starts 80% of sessions in plan mode across multiple terminal tabs and desktop app windows simultaneously, each with an independent context window. The plugins feature was "entirely built by a swarm over a weekend" with no human intervention.
