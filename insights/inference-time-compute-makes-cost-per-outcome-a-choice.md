---
title: "Inference-time compute makes cost-per-outcome a choice — and that's the application layer's counterattack on the labs"
description: "No prior software had a dial where 10x more compute buys a better answer; a 10-second and a 10-minute query on the same model are different products at different prices. Margin depends on the system's judgment of where to spend tokens, not on model pricing — the lab wants to expand usage, the application wants to spend only where the outcome is worth it"
topics: [ai-native-product-architecture, business-models]
source: "@JayaGup10 (Jaya Gupta) — Who will set price / intelligence?"
source_file: "sources/jayagup10-who-sets-price-of-intelligence.md"
date: 2026-06-15
domain: "ai"
---

Gupta isolates what's genuinely new about inference-time compute: "no prior software had a dial where spending ten times more compute bought a better answer. It makes cost per outcome a choice. A ten-second query and a ten-minute query on the same model are different products at different prices, so margin depends on the system's judgment, not just model pricing." This is "the application-layer counterattack against the labs": as frontier models absorb product logic, every application has to prove "it can allocate the customer's tokens better than the provider can." The incentives diverge cleanly — "The lab is incentivized to expand usage; the application is incentivized to spend only where the outcome is worth it."

This makes token allocation a moat, which is why [[operate-across-the-whole-model-market-not-just-one-lab]] and [[multi-model-orchestration-beats-any-single-family]] — spending the right amount of the right model per sub-task is the judgment being sold. It is the application-layer expression of [[system-of-work-is-the-moat-not-the-model]]: the labs own the model, but the system that decides *how much intelligence each step deserves* is the defensible surface. Operationally it extends [[production-agents-route-decisions-not-every-call-to-llm]] — routing isn't just latency/cost hygiene, it's the core economic decision. The length counterpart to this depth dial is [[task-horizon-breaks-seat-based-pricing]].
