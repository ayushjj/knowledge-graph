---
title: "Task horizon breaks seat-based pricing — usage scales with workflow depth × length, not headcount"
description: "Task horizon is the length dial: how long an AI works on its own before a human steps in. The unit shifted from the call to the workflow — agents run for hours, spawn sub-agents, and burn millions of tokens per decision path, so usage stops scaling with seats; multiply length by depth to get the token bill"
topics: [business-models, ai-agents]
source: "@JayaGup10 (Jaya Gupta) — Who will set price / intelligence?"
source_file: "sources/jayagup10-who-sets-price-of-intelligence.md"
date: 2026-06-15
domain: "ai"
---

Gupta defines task horizon as "the length dial: how long an AI works on its own before a human steps back in. The unit shifted from the call to the workflow." The pricing consequence is structural: "Agents run for hours, spawn sub-agents, and burn millions of tokens per decision path, so usage stops scaling with seats. Multiply length by depth and you get the token bill every Fortune 500 CFO now asks about." Depth (inference-time compute) times length (task horizon) is the new cost surface — and it severs the seat-based logic SaaS was priced on.

This is the demand-side mechanism behind [[token-spend-replaces-headcount-as-scaling-unit]] — when one agent burns millions of tokens per decision path, compute, not seats, is the scaling unit. It explains why [[autopilots-capture-work-budget-not-tool-budget]] and [[sell-the-work-not-the-tool]]: once usage tracks workflow length rather than logins, you're selling completed work, not access. Managing long horizons cheaply is exactly the [[autonomous-loops-need-small-stories-and-fast-feedback]] discipline, and the depth half of the multiplication is [[inference-time-compute-makes-cost-per-outcome-a-choice]].
