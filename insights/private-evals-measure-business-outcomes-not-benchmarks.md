---
title: "Private evals should measure business outcomes that matter — not external benchmarks"
description: "A firm's learning loop runs on private evals tied to real business outcomes and private RL environments trained on internal traces, so the model improves against what the company cares about rather than public leaderboards"
topics: [ai-native-product-architecture, ai-agents]
source: "@satyanadella (Satya Nadella) — A frontier without an ecosystem is not stable"
source_file: "sources/satyanadella-frontier-without-ecosystem.md"
date: 2026-06-15
domain: "ai"
---

Nadella specifies the machinery a firm needs to turn workflows and judgment into improving AI: "Private evals should capture whether a model is actually improving against outcomes that matter to the business (not just external benchmarks!). Private reinforcement learning environments should let models grow stronger on real traces from inside the organization." The knowledge base then "makes institutional memory queryable and use of tokens more efficient." Public benchmarks measure generic capability; private evals measure whether the system is getting better at *your* outcomes.

This is the firm-level instantiation of treating [[evals-are-behavioral-pressure-vectors-not-neutral-measurements]] — what you measure privately is what your system optimizes toward. It runs on the same substrate as [[decision-traces-are-the-missing-data-layer]] and is why [[traces-not-scores-enable-agent-improvement]]: the internal traces are both the RL signal and the institutional memory. Wired together, private evals plus internal-trace RL are the engine that powers the [[trace-to-eval-flywheel-compounds-agent-quality]].
