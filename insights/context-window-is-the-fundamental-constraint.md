---
title: "The context window is the fundamental constraint — everything else follows"
description: "Every best practice in AI coding (subagents, /clear, focused tasks, specs files) traces back to managing a single scarce resource: context"
topics: [ai-coding-tools, ai-agents]
source: "Anthropic Official Best Practices + Jarrod Watts"
date: 2025-01-15
---

Claude's 200k token context window is significantly less than 200k usable before performance degrades. This single constraint explains every effective AI coding practice: subagents isolate research into separate context, `/clear` resets between unrelated tasks, specs files persist knowledge across context resets, and one-objective-per-conversation keeps focus sharp.

Watts frames it as "context engineering" — a level beyond prompt engineering. Where [[context-is-the-product-not-the-model]] argues that context is the product differentiator, here the claim is more operational: context is the bottleneck you're always managing. Treat it like RAM — precious, limited, and requiring active garbage collection. This is the basis for [[treat-agent-as-operating-system-not-function]] — the full OS mental model (RAM as context, hard drive as persistent memory, garbage collection as decay) turns context management from ad-hoc to systematic. The economics compound the constraint: without [[prompt-caching-makes-long-context-economically-viable]], every conversation turn resends the full context at full price, making large context windows prohibitively expensive in practice.

The practical implication: five failure patterns (kitchen-sink sessions, correction loops, over-specified CLAUDE.md, trust-then-verify gaps, infinite exploration) are all context management failures. Fixing any of them means respecting the fundamental constraint. This is why [[declarative-beats-imperative-for-agents]] matters operationally — verbose step-by-step instructions waste tokens that could carry actual working context.
