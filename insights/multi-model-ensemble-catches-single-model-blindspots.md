---
title: "Multi-model code review creates adversarial robustness — each model catches what others miss"
description: "Using 3 different LLMs to review the same PR exploits the fact that models have different failure modes, creating emergent coverage no single model achieves"
topics: [ai-coding-tools, ai-agents]
source: "@elvissun (Elvis Sun) — OpenClaw Agent Swarm"
date: 2026-02-24
kind: "practice"
---

Elvis's agent swarm doesn't just use multiple models for generation — it uses three different models to review every PR before human approval. The effect is adversarial: requiring all three models to pass before merging means each model's blindspots are covered by the others.

This multiplies the insight from [[verification-multiplies-agent-output-quality]]: if verification 2-3x quality, verification by diverse verifiers compounds further. It's the code review equivalent of [[treat-ai-like-distributed-team-not-assistant]] — not just parallel work, but parallel judgment. Combined with [[evaluate-tools-with-real-multi-step-tasks]], the implication is that evaluation itself benefits from model diversity, not just task execution. A more deliberate version of this pattern is [[weaponize-sycophancy-with-adversarial-agent-ensembles]], where competing scoring incentives (bug-finder vs. adversary vs. referee) exploit each agent's eagerness to please rather than fighting it.

Theo Browne's sol-loop skill writes down the rules that keep a cross-model review loop from running away: one model writes, a different provider's model reviews, with a budget of 3 rounds (5 only for security, permissions, auth, data loss or concurrency), stopping early when a round returns only nits. "Another path, rare case, or small cost is a nit, whatever label it came with," and after each round: "If review grew the diff, cut first. Do not agree just to end the loop." He also prints the reviewer's verdict in the PR because he noticed the writing model "almost wants to hide the fact" that the reviewer was unhappy. Whether such a loop is worth its cost is a measurement question, which [[score-an-ai-reviewer-on-escapes-noise-and-convergence]] answers with recall on past escapes, noise and cycles-to-pass.
