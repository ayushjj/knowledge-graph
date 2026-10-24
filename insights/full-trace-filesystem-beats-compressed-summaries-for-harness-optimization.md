---
title: "Full trace filesystems beat compressed summaries for harness optimization — 10M tokens of context outperforms 26K"
description: "Meta-Harness gives its proposer agent a filesystem containing full source code, scores, and execution traces of every prior candidate, enabling up to 10M tokens of diagnostic context per iteration — dramatically outperforming prior methods limited to 26K compressed tokens"
topics: [ai-agents, ai-coding-tools, ai-native-product-architecture]
source: "Yoonho Lee et al. — Meta-Harness: End-to-End Optimization of Model Harnesses (arXiv:2603.28052)"
source_file: sources/yoonholee-meta-harness.md
date: 2026-04-06
domain: ai
kind: "principle"
---

Meta-Harness's key architectural decision: instead of compressing optimization history into brief summaries or sliding windows, it gives the proposer agent a full filesystem containing source code, scores, and execution traces of every prior candidate. The agent navigates this using standard Unix tools (grep, cat) to diagnose failure modes — the same pattern [[agentic-search-beats-rag-for-live-codebases]] describes for code navigation. This approach enabled up to 10 million tokens of context per iteration, versus prior methods' 26K-token maximum.

The results validate the approach: on TerminalBench-2, Meta-Harness achieved 76.4% pass rate on Claude Opus 4.6 (#2 overall) and 37.6% on Haiku 4.5 (#1 overall). The Label-Primed Query harness it discovered beat the prior state-of-the-art (48.6% vs 40.9%) while using 4x fewer tokens. This is [[traces-are-the-universal-substrate-for-agent-learning]] made operational — the filesystem IS the trace archive, and the proposer agent IS the learning loop. It also reinforces [[meta-agents-beat-manual-harness-engineering]]: AutoAgent proved meta-agents can optimize harnesses autonomously, and Meta-Harness proves that giving them richer context (full filesystem vs compressed summaries) dramatically improves the result.

AutoAgent found the same thing from the other direction (@kevingu — "AutoAgent: First Open Source Library for Self-Optimizing Agents", `sources/kevingu-autoagent-self-optimizing-agents.md`): when its meta-agent received only scores without trajectories, its improvement rate dropped hard. Understanding why something improved matters as much as knowing that it improved — traces give the optimizer interpretability over the task agent's reasoning, which is what makes targeted edits possible rather than blind grid search. Telemetry that captures only outcomes misses that reasoning layer, the gap [[observability-is-the-missing-agent-discipline]] names for agent systems generally.
