---
title: "Eval suites must shrink, not just grow — spring cleaning prevents stale behavioral pressure"
description: "Saturated evals waste compute without providing signal; more intelligent models or changed desired behaviors make old evals irrelevant, requiring regular pruning alongside addition"
topics: [ai-agents]
source: "@Vtrivedy10 (Viv) — Better Harness: A Recipe for Harness Hill-Climbing with Evals"
source_file: sources/vtrivedy10-better-harness-hill-climbing-evals.md
date: 2026-04-09
domain: ai
---

Eval suites shouldn't grow monotonically — spring cleaning is good. Regularly assessing whether an eval is still useful given more intelligent models or different desired agent behaviors is essential maintenance. Evals that every model already passes (saturated) waste compute; evals that test for behaviors you no longer want exert the wrong [[evals-are-behavioral-pressure-vectors-not-neutral-measurements]].

This connects to [[build-for-the-model-six-months-from-now]]: if today's scaffolding becomes tech debt against the next model, today's eval suite does too. An eval designed around GPT-4-level tool selection may be trivially passed by Claude Sonnet 4.6, contributing zero signal while consuming budget. The decision is to treat eval curation as an ongoing discipline — not a one-time setup — with regular reviews that remove, replace, and rebalance the suite alongside model and product evolution.
