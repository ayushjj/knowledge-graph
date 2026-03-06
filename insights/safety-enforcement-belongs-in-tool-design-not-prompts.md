---
title: "Safety enforcement belongs in tool design, not system prompts"
description: "At scale, embedding safety constraints in the tool's API (blocking destructive operations by default) beats relying on behavioral compliance with system prompt instructions"
topics: [ai-agents, ai-native-product-architecture]
source: "@nicbstme — article title unverified (not found in Substack archive; may be X Article)"
date: 2026-03-05
domain: "ai"
partial-source: true
---

Reverse-engineering three production Excel AI agents revealed a critical architectural divergence in safety. Claude embeds overwrite protection at the API level — "the blocking is in the tool, the consent is in the prompt" — while Microsoft Copilot and Shortcut AI rely on system prompt instructions to prevent destructive operations. Behavioral compliance is inherently unreliable at millions of sessions; tool-enforced safety is deterministic.

This is a concrete example of [[tools-are-contracts-between-deterministic-and-nondeterministic-systems]] — the tool contract must encode safety invariants that the non-deterministic model cannot violate. It also connects to [[production-agents-route-decisions-not-every-call-to-llm]]: safety decisions should be deterministic code, not LLM judgment calls. The same principle applies to the five universal agent design questions Bustamante identifies: safety, verification, visibility, capability, and memory — each has a tool-enforced and a behavioral option, and the tool-enforced version scales.
