---
title: "Verification is a Red Queen race — optimizing against a fixed eval contaminates it"
description: "Eval suites degrade the moment you use them to improve an agent — the agent adapts to the distribution, and the eval stops measuring what it was designed to measure"
topics: [ai-agents, ai-native-product-architecture]
source: "@natashamalpani (Natasha Malpani) — The Verification Economy: The Red Queen Problem (Part III)"
date: 2026-03-18
domain: ai
---

Any fixed target that an agent is optimized against will eventually be gamed, whether deliberately or emergently. The eval becomes a benchmark, the benchmark becomes a leaderboard, and the leaderboard stops correlating with the thing you actually cared about. This means [[verification-multiplies-agent-output-quality]] is necessary but the verification system itself must evolve faster than the agent — a fundamentally different infrastructure problem than static test suites.

This explains *why* [[the-80-99-gap-is-where-ai-products-die]] is so persistent: the gap isn't a temporary engineering problem but a structural property of optimization. Static eval suites are necessary but insufficient — the teams getting this right are building something closer to a continuous red team that generates novel failure scenarios faster than the agent can learn to avoid them, combining generative scenario construction, behavioral drift detection, and adversarial input generation. The implication for [[every-optimization-has-a-shadow-regression]] is that shadow regressions aren't just a coding problem — they're the default state of any verified system that stops evolving its verification. AutoAgent demonstrated this concretely: [[self-improving-agents-overfit-to-eval-metrics]] — the meta-agent gets lazy and inserts rubric-specific prompting so the task agent games metrics rather than genuinely improving. LangChain's Deep Agents team frames this even more sharply: [[evals-are-behavioral-pressure-vectors-not-neutral-measurements]] — each eval doesn't just measure behavior, it actively shapes it, making the choice of which evals to include a design decision with compounding consequences.
