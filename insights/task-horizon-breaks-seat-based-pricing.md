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

Garry Tan states the founder-side consequence as a design constraint rather than a forecast. Doing an analysis of his own pure-SaaS holdings, he concluded that "a pure per-seat SaaS thing — not totally clear it will exist in another 5 or 10 years. It's perfectly fine as a wedge, but if you're doing that now in 2026, you better hope that's a leap to some sort of moat around data or network effects or something else." He marks how recently the opposite was received wisdom: two years earlier "SaaS was God… the 10, 20x next-12-months revenue multiple was iron law. And it's hard to believe — oh yeah, no, that's not true at all now." The prescription that falls out is sequencing: seats are an acceptable way in, but the business has to be designed for the jump to a durable asset, and a company that never plans the jump has mistaken its wedge for its destination. The window in which to make that jump is what [[institutional-slowness-is-the-runway-not-the-threat]] describes.

This is the demand-side mechanism behind [[token-spend-replaces-headcount-as-scaling-unit]] — when one agent burns millions of tokens per decision path, compute, not seats, is the scaling unit. It explains why [[autopilots-capture-work-budget-not-tool-budget]] and [[sell-the-work-not-the-tool]]: once usage tracks workflow length rather than logins, you're selling completed work, not access. Managing long horizons cheaply is exactly the [[autonomous-loops-need-small-stories-and-fast-feedback]] discipline, and the depth half of the multiplication is [[inference-time-compute-makes-cost-per-outcome-a-choice]].
