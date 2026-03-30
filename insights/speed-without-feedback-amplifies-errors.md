---
title: "Speed without feedback amplifies errors — agents lack the self-correction mechanism that constrains human mistakes"
description: "Humans serve as natural bottlenecks who self-correct after repeated mistakes; agents perpetuate identical errors indefinitely at unsustainable rates"
topics: [engineering, decision-making]
source: "Mario Zechner — Thoughts on Slowing the Fuck Down"
date: 2026-03-30
domain: "mental-models"
---

Any system that increases output speed without proportional error-correction feedback will compound errors at scale. Humans serve as natural bottlenecks: they make mistakes, feel consequences, and modify behavior. This negative feedback loop limits the daily rate of errors to something sustainable. Agents lack this mechanism entirely — they perpetuate identical errors indefinitely, and orchestrated agent armies generate mistakes at rates where consequences surface long after the damage is done.

Worse, agents operating with purely local visibility become "merchants of complexity." Without system-wide understanding, they create duplication, unnecessary abstractions, and poor architectural decisions drawn from patterns in their training data. Enterprise codebases typically degrade slowly over years; agent-driven systems can reach equivalent chaos within weeks. The root cause is not context window size but genuine search limitations — agent recall decreases proportionally to codebase size.

The general principle extends beyond AI: any speed multiplier (automation, parallelization, delegation) applied to a process without adequate feedback creates a proportional error multiplier. The remedy is not to slow down universally but to ensure feedback loops scale with speed — [[error-memory-enables-learning-without-retraining]] provides one mechanism (storing error patterns), while [[verification-multiplies-agent-output-quality]] provides another (making agents verify their own work). The critical design choice from [[every-optimization-has-a-shadow-regression]]: when you accelerate a system, always ask what error-correction mechanism you just outran.
