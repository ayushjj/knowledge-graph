---
title: "The trace→eval→harness flywheel compounds agent quality — every production interaction generates its own training data"
description: "Production traces where agents fail become eval cases; better evals improve the harness; better harnesses produce better traces — creating a self-reinforcing improvement loop"
topics: [ai-agents, ai-native-product-architecture]
source: "@Vtrivedy10 (Viv) — Better Harness: A Recipe for Harness Hill-Climbing with Evals"
source_file: sources/vtrivedy10-better-harness-hill-climbing-evals.md
date: 2026-04-09
domain: ai
---

The flywheel is explicit: more usage → more traces → more evals → better harness. Every trace contains valuable data to produce a potential eval, and every good eval makes the harness better. A trace where the agent made a mistake is an eval case; a trace where a user corrected the agent is even better. This builds on [[traces-are-the-universal-substrate-for-agent-learning]] by showing traces don't just feed model/harness/context updates — they also generate the very eval suite that powers autonomous improvement.

This flywheel creates the kind of [[proprietary-feedback-loops-widen-the-moat]] that competitors cannot replicate without equivalent production usage. The practical implication: invest in trace infrastructure early, before you need it for optimization, because every production interaction is generating training data whether you capture it or not. Teams that dogfood agents and directly share trace-linked feedback build shared knowledge of agent behavior that feeds back into the improvement loop.
