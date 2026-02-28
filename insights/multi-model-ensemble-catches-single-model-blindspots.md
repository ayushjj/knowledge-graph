---
title: "Multi-model code review creates adversarial robustness — each model catches what others miss"
description: "Using 3 different LLMs to review the same PR exploits the fact that models have different failure modes, creating emergent coverage no single model achieves"
topics: [ai-coding-tools, ai-agents]
source: "@elvissun (Elvis Sun) — OpenClaw Agent Swarm"
date: 2026-02-24
---

Elvis's agent swarm doesn't just use multiple models for generation — it uses three different models to review every PR before human approval. The effect is adversarial: requiring all three models to pass before merging means each model's blindspots are covered by the others.

This multiplies the insight from [[verification-multiplies-agent-output-quality]]: if verification 2-3x quality, verification by diverse verifiers compounds further. It's the code review equivalent of [[treat-ai-like-distributed-team-not-assistant]] — not just parallel work, but parallel judgment. Combined with [[evaluate-tools-with-real-multi-step-tasks]], the implication is that evaluation itself benefits from model diversity, not just task execution.
