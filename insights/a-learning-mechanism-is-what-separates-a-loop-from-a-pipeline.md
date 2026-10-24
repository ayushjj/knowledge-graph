---
title: "Without a learning mechanism you have an AI pipeline, not an AI loop"
description: "Blomfield's five-part anatomy — real-world signal, policy layer, tool layer, quality gates, learning mechanism — where only the last part closes the circuit back onto the system that produced the output"
topics: [ai-native-product-architecture, ai-agents]
source: "Tom Blomfield (General Partner, Y Combinator) — \"Building And Structuring An AI Native Company\", Startup School Paris"
source_file: "sources/tom-blomfield-yc-building-ai-native-company.md"
date: 2026-08-21
domain: "ai"
kind: "principle"
---

Blomfield decomposes an AI loop into five layers: signal from the real world at the top (product telemetry, inbound messages, billing signals, support tickets, code changes); a policy layer defining what rules constrain the AI, what it must seek approval for, and what it must log; a tool layer for calling internal APIs, sending email, updating billing; a series of quality gates; and finally a learning mechanism that loops back so a deployed change is measured against what it did to the real world.

The first four layers describe most production agent systems today — and they are a pipeline, not a loop. Only the fifth closes the circuit, which is what makes the system improve rather than merely execute. He reduces the whole thing to hill climbing: given a measurable end outcome, generate ideas, test, keep what moved up and discard what moved down, and note that computer systems are unusually good at this because they never stop. That "never stop" property is the same one [[a-human-in-the-loop-caps-the-loop-at-waking-hours]] says a human gate destroys. The policy layer is what keeps this from becoming reckless, and the honest failure mode is the one named in [[holdout-sets-gate-autonomous-harness-optimization]] — a hill-climber optimises the metric you gave it, not the outcome you meant. Compare [[trace-to-eval-flywheel-compounds-agent-quality]] and [[offload-the-task-but-never-the-learning]], which treat the same circuit as an accumulating asset rather than an architecture.
