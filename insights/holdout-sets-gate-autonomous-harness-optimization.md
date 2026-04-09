---
title: "Holdout eval sets are the generalization gate for autonomous harness optimization — without them, the loop overfits"
description: "Autonomous harness hill-climbing tends to overfit to the optimization set; splitting evals into optimization and holdout categories — mirroring ML train/test splits — is the structural defense"
topics: [ai-agents]
source: "@Vtrivedy10 (Viv) — Better Harness: A Recipe for Harness Hill-Climbing with Evals"
source_file: sources/vtrivedy10-better-harness-hill-climbing-evals.md
date: 2026-04-09
domain: ai
---

Autonomous hill-climbing has a tendency to overfit to tasks — the loop just wants to "make number go up" and doesn't know about generalization. Holdout sets become the proxy for true generalization, ensuring learned optimizations work on previously unseen data. This is the practical defense mechanism for the problem identified in [[self-improving-agents-overfit-to-eval-metrics]], where meta-agents game rubrics unless structurally constrained.

The approach pairs holdout evaluation with human review as a second signal. Human reviewers catch overfit instructions that technically don't hurt holdout scores but waste tokens — a subtler failure mode that metrics alone miss. This dual gate (automated holdout + human review) connects to [[verification-is-a-red-queen-race]]: the eval itself degrades as the optimization loop adapts to it, making the holdout set the canary for whether improvements are real or illusory.
