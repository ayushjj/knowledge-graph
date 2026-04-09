---
title: "Meta-agents that autonomously optimize task agents beat hand-engineered harnesses on production benchmarks"
description: "AutoAgent's meta-agent hit #1 on SpreadsheetBench (96.5%) and TerminalBench (55.1%) by autonomously iterating on a task agent's harness for 24+ hours — every other leaderboard entry was hand-engineered"
topics: [ai-agents, ai-coding-tools]
source: "@kevingu (Kevin Gu) — AutoAgent: First Open Source Library for Self-Optimizing Agents"
source_file: sources/kevingu-autoagent-self-optimizing-agents.md
date: 2026-04-04
domain: ai
---

AutoAgent demonstrates the first concrete evidence that agents can autonomously beat manual harness tuning on production benchmarks. The meta-agent experiments on a task agent's harness — tweaking prompts, adding tools, refining orchestration — while spinning up thousands of parallel sandboxes to test improvements. The key architectural insight: being good at a domain and being good at improving at that domain are different capabilities, so the meta/task split lets each specialize.

This operationalizes [[tool-design-is-continuous-observation-see-like-an-agent]] at scale — instead of a human observing agent behavior and iterating tool design, a meta-agent does it autonomously. The emergent behaviors are striking: the meta-agent independently discovered spot-checking, forced verification loops, test-writing, progressive disclosure, and sub-agent orchestration — all patterns that [[harness-quality-beats-model-intelligence]] and [[autonomous-loops-need-small-stories-and-fast-feedback]] describe as critical. The implication for companies is that no team can hand-tune hundreds of domain-specific harnesses, but a meta-agent can. What powers this autonomous loop is [[evals-are-gradient-signal-for-harness-engineering]] — evals serve as the gradient signal that tells the meta-agent which changes improved behavior and which didn't. The Meta-Harness paper takes this further: [[full-trace-filesystem-beats-compressed-summaries-for-harness-optimization]] shows that giving the proposer agent a filesystem of full traces (up to 10M tokens) dramatically outperforms compressed summaries, and [[evolved-harnesses-transfer-across-models]] demonstrates that a single optimized harness transfers to five different models it was never trained on.
