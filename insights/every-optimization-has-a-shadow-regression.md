---
title: "Every optimization has a shadow regression — guard commands make the shadow visible"
description: "When optimizing metric A, metric B silently degrades unless you run a separate invariant check (a guard) alongside the primary verification"
topics: [ai-agents, decision-making]
source: "Udit Goenka (@uditg) — autoresearch Claude Code skill v1.6.1 (Guard feature by Roman Pronskiy, JetBrains)"
date: 2026-03-17
domain: "ai"
---

In any iterative optimization loop, improving one metric risks silently degrading another. Karpathy's Autoresearch verifies val_bpb after every experiment, but the original design has no mechanism to check whether VRAM usage exploded or code complexity ballooned. The guard command pattern — a separate invariant check that runs alongside the primary metric — makes these shadow regressions visible before they compound.

This is [[invert-always-invert-to-solve-hard-problems]] applied to optimization: instead of only asking "did the metric improve?", also ask "what could have gotten worse?" The guard is the structural answer to that inversion. It connects to [[verification-multiplies-agent-output-quality]] because verification without guards is single-dimensional — you're measuring what you optimized while ignoring what you didn't. And it reinforces why [[harness-quality-beats-model-intelligence]]: the agent doesn't need to understand multi-objective tradeoffs if the harness enforces them mechanically.
