---
title: "Time-bounded evaluation forces optimization for real-world usefulness instead of idealized performance"
description: "A fixed wall-clock budget per experiment makes results comparable, normalizes across hardware, and forces agents to optimize for improvement per unit time"
topics: [ai-agents, ai-native-product-architecture]
source: "Manthan Gupta (@manthanguptaa) — How Karpathy's Autoresearch Works And What You Can Learn From It"
date: 2026-03-17
domain: "ai"
---

Karpathy's Autoresearch gives every experiment exactly 5 minutes of wall-clock time. The question shifts from "what model is best after N steps?" to "what configuration gives the best result within this exact time budget?" That reframing changes the optimization surface entirely — the agent must optimize for improvement per unit time, not abstract model quality.

Time bounds are a resource constraint that shapes behavior, just as [[context-window-is-the-fundamental-constraint]] shapes how agents plan and decompose work. In both cases, the constraint is not a limitation to work around but a design force that produces better outcomes: context limits force decomposition into small stories, time limits force optimization for real-world throughput. This principle connects to [[harness-quality-beats-model-intelligence]] — the time budget is part of the harness, and it does more to ensure practical results than a smarter agent running unbounded would. It also strengthens [[autonomous-loops-need-small-stories-and-fast-feedback]] by adding a concrete mechanism: fixed time = fast feedback guaranteed.
