---
title: "Auto-generated narrow monitors beat handwritten broad checks — a tight mesh over the exact shape of the code"
description: "1,000+ AI-generated monitors that each target specific code paths catch more bugs than 10 hand-written checks that cover general categories"
topics: [ai-agents, ai-native-product-architecture]
source: "@RampLabs — How We Made Ramp Sheets Self-Maintaining"
date: 2026-03-24
domain: "ai"
---

Ramp scaled from 10 hand-written monitors to 1,000+ AI-generated ones — each shaped to a specific code path introduced by a specific PR. The result was "like a tight mesh over the exact shape of the code," catching one real bug per 75 lines in the first week. The key architectural move: on PR merge, an agent reads the diff and generates monitors tailored to the new code, so the monitoring surface grows with the codebase automatically.

This is [[verification-multiplies-agent-output-quality]] applied to production monitoring rather than development-time checking. Hand-written monitors suffer from the same coverage gap as hand-written tests: the author's imagination is the ceiling. Auto-generated monitors cover the actual code surface, not what a human thought was important. This also extends [[every-optimization-has-a-shadow-regression]] — when every PR automatically gets monitors, shadow regressions become visible by construction rather than by luck. The "keep your existing stack" caveat from Ramp is important: auto-generated monitors are powerful but opaque, so they complement — not replace — hand-written instrumentation you understand. [[property-based-testing-explores-agent-input-spaces]] captures the analogous insight for testing: generative approaches explore spaces that human-written examples miss.
