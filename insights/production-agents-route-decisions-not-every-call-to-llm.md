---
title: "Production agents route routine cases through decision trees, reserving LLMs for ambiguity"
description: "Handle exact matches and known patterns without AI; invoke the model only when the decision is genuinely uncertain"
topics: [ai-agents, ai-native-product-architecture]
source: "@vasuman — AI Agents 101"
date: 2026-02-24
---

Most agent tutorials show every user input flowing through an LLM. Production agents do the opposite: structured decision trees handle routine cases, and the model is only invoked for genuinely ambiguous situations. This addresses both cost and latency — the two things that kill agents in production.

The pattern is a direct extension of [[declarative-beats-imperative-for-agents]]: the decision tree encodes known paths declaratively, while the LLM handles the long tail that can't be pre-specified. It's also why [[verification-multiplies-agent-output-quality]] matters more in production — when the LLM is only called for hard cases, each call is higher-stakes and needs verification. The orchestration layer, not the agent, enforces guardrails and permissions — the agent doesn't even know about the constraints it operates under, which connects to why [[context-is-the-product-not-the-model]] applies at the system level, not just the prompt level.
