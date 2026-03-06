---
title: "Weaponize sycophancy with adversarial agent ensembles instead of fighting it"
description: "Deploy bug-finder, adversary, and referee agents with scoring incentives that exploit each agent's eagerness to please — triangulating truth from competing biases"
topics: [ai-agents, ai-coding-tools]
source: "@systematicls — How To Be A World-Class Agentic Engineer"
date: 2026-03-05
domain: "ai"
---

Agents are hard-programmed to please, which means asking "find me a bug" will produce a bug even if one doesn't exist. Rather than fighting this sycophancy, the technique weaponizes it through competing agents: a bug-finder scores +1/+5/+10 by severity (producing a superset of all possible bugs), an adversarial agent scores points for disproving bugs but faces -2x penalty for wrong dismissals (producing a subset of real bugs), and a referee agent — told the ground truth exists — adjudicates both inputs.

This exploits each agent's eagerness to follow instructions in opposing directions, triangulating high-fidelity results. The approach extends [[verification-multiplies-agent-output-quality]] from self-checking to ensemble adversarial checking — no single agent's sycophantic bias survives scrutiny from agents biased in the opposite direction. The scoring incentive design also connects to [[evaluate-tools-with-real-multi-step-tasks]] — the referee's adjudication is itself a multi-step verification task requiring reasoning across competing claims, not surface-level "did it work?" checks.
