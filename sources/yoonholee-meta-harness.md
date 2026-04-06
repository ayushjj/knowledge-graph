---
title: "Meta-Harness: End-to-End Optimization of Model Harnesses"
author: "Yoonho Lee, Roshen Nair, Qizheng Zhang, Kangwook Lee, Omar Khattab, Chelsea Finn"
url: https://yoonholee.com/meta-harness/
date: 2026-04-06
type: article
---

Meta-Harness distinguishes itself through access to comprehensive diagnostic information. Rather than compressing optimization history into summaries or brief windows, the system "gives the proposer a filesystem containing the full source code, scores, and execution traces of every prior candidate." This approach enables up to 10 million tokens of context per iteration, dramatically exceeding prior methods' 26K-token maximum.

The optimization loop operates in three stages: (1) a Claude Code agent reviews the filesystem of candidates and proposes improvements, (2) the proposed harness undergoes evaluation on held-out tasks, and (3) all logs are archived for subsequent iterations. The agent uses standard Unix tools like grep and cat to access needed information, enabling targeted diagnosis of failure modes.

Key Results:

Text Classification: The discovered Label-Primed Query harness achieved 48.6% accuracy versus ACE's 40.9% across three datasets (LawBench, Symptom2Disease, USPTO-50k), using approximately 4x fewer context tokens. Improvements concentrated on large label spaces.

Math Reasoning: A single evolved retrieval harness improved performance by 4.7 percentage points average (34.1% to 38.8%) across five held-out models on IMO-level problems.

Agentic Coding: On TerminalBench-2, Meta-Harness achieved 76.4% pass rate on Claude Opus 4.6 (ranking #2 overall) and 37.6% on Claude Haiku 4.5 (ranking #1).

Reference: Lee et al. (2026). arXiv:2603.28052
