---
title: "How My Agents Self-Heal in Production"
author: "Vishnu Suresh (Software Engineer @ LangChain)"
url: https://blog.langchain.com/production-agents-self-heal/
date: 2026-04-06
type: article
---

The article describes an automated system that detects production regressions after deployment, determines causation, and automatically generates fixes — eliminating manual intervention until code review stage.

Problem: The fundamental challenge isn't deployment itself but rather "figuring out if your last deploy broke something, whether it's actually your fault" and fixing it proactively.

Three-Layer Defense Strategy:

1. Build Failure Detection — Catches Docker build errors immediately by piping CLI logs and recent git diffs to an automated coding agent. This works because "build failures are almost always caused by the most recent change, so a narrow diff gives Open SWE enough context."

2. Statistical Regression Detection — Uses Poisson distribution modeling to distinguish deployment-caused errors from baseline production noise. Collected "a baseline of all error logs from the past 7 days" and normalized them into signatures, then compared post-deployment error rates statistically rather than making naive comparisons.

3. Triage Agent Validation — Acts as a critical gating mechanism because "server errors aren't always independent." The triage agent classifies changed files and establishes concrete causal links between code changes and observed errors, preventing false positives.

Why Naive Approaches Fail: Raw statistical testing alone cannot "distinguish 'this error spiked because of our code change' from 'this error spiked because a third-party API went down.'" Correlated failures from external sources violate independence assumptions. Additionally, feeding all spiked errors directly to the fixing agent risks hallucination — the triage layer ensures "Open SWE receives a focused investigation prompt rather than a dump."

Real-World Effectiveness: Most valuable for "silent failures that return wrong defaults, configuration mismatches between code and deployment, and cascading regressions."

Limitations:
- Temporal blindness: Current diff-only lookback misses bugs introduced in earlier deployments surfacing later
- Error grouping imprecision: Regex sanitization sometimes fails to bucket related errors
- Binary decision-making: Always fixes forward rather than deciding between patches and rollbacks based on severity
