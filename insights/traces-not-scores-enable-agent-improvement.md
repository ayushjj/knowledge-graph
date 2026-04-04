---
title: "Traces not scores enable agent improvement — without trajectories, improvement rate drops hard"
description: "When AutoAgent's meta-agent received only pass/fail scores without reasoning traces, the improvement rate dropped significantly; understanding why matters as much as knowing that"
topics: [ai-agents, ai-native-product-architecture]
source: "@kevingu (Kevin Gu) — AutoAgent: First Open Source Library for Self-Optimizing Agents"
source_file: sources/kevingu-autoagent-self-optimizing-agents.md
date: 2026-04-04
domain: ai
---

AutoAgent found that when the meta-agent received only scores without trajectories, its improvement rate dropped hard. Understanding why something improved matters as much as knowing that it improved. Traces give the meta-agent interpretability over the task agent's reasoning — that is what makes targeted edits possible rather than blind grid search.

This reinforces [[decision-traces-are-the-missing-data-layer]] from a new angle: traces aren't just valuable for humans auditing agent behavior — they're essential for agents improving other agents. The same principle applies to [[observability-is-the-missing-agent-discipline]]: telemetry that only captures outcomes (success/failure, latency, cost) misses the reasoning layer that enables systematic improvement. Combined with [[error-memory-enables-learning-without-retraining]], the pattern is clear — the full trajectory of an agent's reasoning is the most valuable artifact for continuous improvement, whether the improver is human or machine.
