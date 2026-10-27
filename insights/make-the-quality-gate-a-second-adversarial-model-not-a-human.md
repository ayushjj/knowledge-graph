---
title: "The quality gate should be a second adversarial model, not a human"
description: "Blomfield argues the reviewing step in an AI loop should be a human only in the most extreme cases — an adversarial LLM checking for prompt injection, policy breach, or code defects keeps the loop running unattended"
topics: [ai-agents, ai-native-product-architecture]
source: "Tom Blomfield (General Partner, Y Combinator) — \"Building And Structuring An AI Native Company\", Startup School Paris"
source_file: "sources/tom-blomfield-yc-building-ai-native-company.md"
date: 2026-08-21
domain: "ai"
kind: "principle"
---

The quality gate is the layer where most teams instinctively put a person. Blomfield argues it "probably should not be a human in all but the most extreme cases," and that the gate is often better served by a second adversarial LLM: one that inspects the output and asks whether prompt injection is happening, or — in a bank — whether the response constitutes financial advice, which the system is not permitted to give. For engineers the easy version is a second model doing code review.

The move is what makes unattended operation possible, so it is inseparable from [[a-human-in-the-loop-caps-the-loop-at-waking-hours]]: a human gate does not merely cost money, it reimposes waking hours on the whole loop. This is the enforcement arm of the policy layer described in [[a-learning-mechanism-is-what-separates-a-loop-from-a-pipeline]], and it is a specific instance of the broader claim in [[verification-multiplies-agent-output-quality]] that checking is where the leverage lives. The implication worth flagging is that an adversarial checker is only as good as what it is told to catch — which is where [[private-evals-measure-business-outcomes-not-benchmarks]] becomes the binding constraint rather than model quality. Ron Minsky draws the line in a different place: [[human-code-review-is-for-understanding-not-only-bug-catching]] keeps AI review for finding defects and a person's read for understanding the system, a job a model gate does not replace.
