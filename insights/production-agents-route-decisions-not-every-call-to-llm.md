---
title: "Production agents route routine cases through decision trees, reserving humans for complexity"
description: "Handle exact matches and known patterns without AI; invoke the model for ambiguity, and route genuinely complex cases to human judgment"
topics: [ai-agents, ai-native-product-architecture]
source: "@vasuman — AI Agents 101"
date: 2026-02-24
---

Most agent tutorials show every user input flowing through an LLM. Production agents do the opposite: structured decision logic handles the 80% of routine cases, the model handles genuinely ambiguous situations, and the complex 20% routes to human judgment. This addresses both cost and latency — the two things that kill agents in production.

The pattern is a direct extension of [[declarative-beats-imperative-for-agents]]: the decision logic encodes known paths declaratively, while the LLM handles the ambiguous middle ground that can't be pre-specified. It's also why [[verification-multiplies-agent-output-quality]] matters more in production — when the LLM is only called for harder cases, each call is higher-stakes and needs verification. The orchestration layer, not the agent, enforces guardrails and permissions — validating requests, checking access, and feeding results back. This connects to why [[context-is-the-product-not-the-model]] applies at the system level, not just the prompt level.
