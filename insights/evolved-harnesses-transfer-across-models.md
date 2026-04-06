---
title: "Evolved harnesses transfer across models — a single optimized harness improves five different LLMs"
description: "Meta-Harness discovered a retrieval harness that improved math reasoning by 4.7 percentage points average across five held-out models it was never optimized for, suggesting harness quality is model-agnostic"
topics: [ai-agents, ai-native-product-architecture]
source: "Yoonho Lee et al. — Meta-Harness: End-to-End Optimization of Model Harnesses (arXiv:2603.28052)"
source_file: sources/yoonholee-meta-harness.md
date: 2026-04-06
domain: ai
---

A single evolved retrieval harness, optimized on one model for IMO-level math problems, improved performance by an average of 4.7 percentage points (34.1% to 38.8%) across five completely different held-out models. The harness was never trained on these models — it transferred directly.

This has a profound implication for the investment calculus of [[agents-learn-at-three-layers-model-harness-context]]: if harness improvements transfer across models, then the harness layer has even higher leverage than the model layer — you invest once and benefit regardless of which model you swap in. It strengthens [[harness-quality-beats-model-intelligence]] with hard evidence: the harness isn't just important for one model, it's a model-agnostic amplifier. It also explains why [[build-for-the-model-six-months-from-now]] isn't as scary as it sounds — a well-evolved harness survives model upgrades, while model-specific scaffolding (the [[scaffolding-is-tech-debt-against-the-next-model]] problem) does not. The distinction matters: harness improvements that encode domain patterns and evaluation structures persist; scaffolding that patches model weaknesses expires.
