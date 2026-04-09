---
title: "Evals are the gradient signal for harness engineering — the same data quality rigor from ML training applies"
description: "The analogy between ML training and agent development is structural: evals encode desired behavior like training data encodes ground truth, and the same principles (data quality, curation, train/test splits) determine outcomes"
topics: [ai-agents, ai-native-product-architecture]
source: "@Vtrivedy10 (Viv) — Better Harness: A Recipe for Harness Hill-Climbing with Evals"
source_file: sources/vtrivedy10-better-harness-hill-climbing-evals.md
date: 2026-04-09
domain: ai
---

The mapping is direct: model + training data + gradient descent → better model, and harness + evals + harness engineering → better agent. Each eval case contributes a signal — "did the agent take the right action?" — that guides the next proposed edit to the harness. This means the same rigor around data quality and curation that determines model training outcomes also determines [[harness-quality-beats-model-intelligence]].

This reframes how to invest in agent improvement. If [[evals-are-behavioral-pressure-vectors-not-neutral-measurements]], then curating those pressure vectors with the same care as ML training data is the highest-leverage activity. A small set of well-tagged evals covering the behaviors you care about beats thousands of noisy high-coverage evals — quality over quantity, exactly like training data. The implication for [[agents-learn-at-three-layers-model-harness-context]] is that the harness layer has its own training loop, distinct from model fine-tuning but equally rigorous.
