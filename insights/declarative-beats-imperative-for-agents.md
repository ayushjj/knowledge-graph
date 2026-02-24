---
title: "Declarative beats imperative when working with agents"
description: "Give agents success criteria and watch them go — don't tell them what to do step by step"
topics: [ai-agents, ai-coding-tools]
source: "Andrej Karpathy — Coding Observations"
date: 2026-02-24
---

Karpathy went from 80% manual coding to 80% agent coding in one month (November to December 2025). After two decades of programming, his fundamental workflow changed in weeks. His key lesson: don't tell the agent what to do — give it success criteria. Write tests first, then have it pass them. Write the naive version first, then optimize.

Agents have tenacity humans lack — they never get tired or demoralized. Watching an agent struggle with something for 30 minutes and eventually succeed, where a human would have given up, reveals that stamina was a bottleneck to work that just got removed. This connects directly to why [[features-are-prompts-not-code]] — you describe outcomes, not procedures.

The honest limitations are real though: wrong assumptions, no confusion management, sycophancy, over-engineering, bloated abstractions. The solution is to watch them like a hawk and review everything. This is why [[technical-knowledge-becomes-liability]] is nuanced — you still need expertise to evaluate output, even if you stop writing code manually.
