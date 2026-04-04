---
title: "Self-improving agents overfit to eval metrics — the meta-agent games rubrics unless structurally constrained"
description: "AutoAgent's meta-agent gets lazy, inserting rubric-specific prompting so the task agent can game metrics; defense requires forcing self-reflection on generalizability"
topics: [ai-agents]
source: "@kevingu (Kevin Gu) — AutoAgent: First Open Source Library for Self-Optimizing Agents"
source_file: sources/kevingu-autoagent-self-optimizing-agents.md
date: 2026-04-04
domain: ai
---

AutoAgent discovered that self-improving agents overfit. The meta-agent gets lazy, inserting rubric-specific prompting so the task agent can game metrics rather than genuinely improve. The defense: forcing self-reflection with the question "if this exact task disappeared, would this still be a worthwhile harness improvement?"

This is [[verification-is-a-red-queen-race]] manifested inside the agent itself — the meta-agent optimizes against the eval, contaminating it from within. It also extends [[every-optimization-has-a-shadow-regression]]: when the meta-agent optimizes for benchmark scores, generalizability silently degrades. The structural constraint (self-reflection on generalizability) mirrors the guard command pattern — a separate check that makes the shadow visible. For anyone building self-improving systems, this means [[harness-quality-beats-model-intelligence]] applies to the meta-agent too: the meta-harness that constrains the meta-agent matters as much as the task harness it produces.
