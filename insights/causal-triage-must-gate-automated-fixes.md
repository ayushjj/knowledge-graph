---
title: "Causal triage must gate automated fixes — statistical regression detection alone can't distinguish your bugs from external failures"
description: "Raw error-rate spikes after deployment can't tell you whether YOUR code broke or a third-party API went down; a triage agent that establishes causal links between code changes and observed errors must gate any automated fixing agent"
topics: [ai-agents, ai-native-product-architecture]
source: "Vishnu Suresh (LangChain) — How My Agents Self-Heal in Production"
source_file: sources/vishnu-suresh-self-healing-production-agents.md
date: 2026-04-06
domain: ai
---

LangChain's self-healing pipeline reveals a non-obvious failure mode in automated error correction: statistical regression detection (comparing post-deploy error rates to a 7-day baseline using Poisson distribution modeling) is necessary but insufficient. Raw stats "cannot distinguish 'this error spiked because of our code change' from 'this error spiked because a third-party API went down.'" Correlated failures from external sources violate the independence assumptions that statistical tests require.

The solution is a three-layer defense: build failure detection (narrow diff context), statistical regression detection (baseline comparison), and critically, a triage agent that classifies changed files and establishes concrete causal links before any fixing agent acts. Without this triage gate, "Open SWE receives a dump" instead of a focused investigation prompt, leading to hallucinated fixes for problems that aren't yours.

This extends [[detect-everything-notify-selectively]] from notification to automated action: detecting everything is step one, but acting selectively requires causal reasoning, not just statistical significance. It also deepens [[error-memory-enables-learning-without-retraining]] — storing error patterns is valuable, but the self-healing system shows that the pattern must include causation attribution, not just the error signature. The system's most valuable catches were "silent failures that return wrong defaults, configuration mismatches, and cascading regressions" — exactly the class of problems that [[observability-is-the-missing-agent-discipline]] warns are invisible without dedicated infrastructure.
