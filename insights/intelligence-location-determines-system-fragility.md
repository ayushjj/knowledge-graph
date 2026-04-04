---
title: "Intelligence location — code vs prompts — determines system fragility and flexibility"
description: "Critical architectural fork: prompt-driven systems (Pal's 400-line routing prompt) are flexible but break when models change; code-driven systems (our validate-graph.js) are rigid but reliable — best systems need both"
topics: [knowledge-systems, ai-native-product-architecture, ai-agents]
source: "Ayush Jhunjhunwala — KG Architecture Comparative Research (10+ systems analyzed)"
source_file: specs/knowledge-graph-architectures/research.md
date: 2026-04-04
domain: ai
---

Where you put the intelligence in a knowledge system — **in the code or in the prompts** — is a critical architectural fork with real consequences. Pal puts nearly everything in a 400-line prompt: routing, compilation, schema creation, even learning. Our graph puts structure in YAML/markdown with deterministic validation (validate-graph.js handles 7 structural checks in 0.3s). The trade-off is sharp:

**Prompt-driven** intelligence is more flexible — you can change behavior by editing text, no deploy needed. But it's fragile: it breaks when models change behavior between versions, when instruction-following degrades under token pressure, or when instructions are simply misunderstood. Every prompt is a bet that the model will interpret it the same way next time.

**Code-driven** intelligence is rigid but reliable — validate-graph.js will catch a missing reciprocal link every time, regardless of which model is running. But it can't handle nuance, context, or judgment calls.

The best systems will likely need both: **deterministic structure** for what can be verified mechanically, plus **LLM-powered operations** for what requires judgment. Our graph already does this — [[features-are-prompts-not-code]] describes the prompt-driven side (agent skills as prompts), while [[safety-enforcement-belongs-in-tool-design-not-prompts]] captures the principle that deterministic constraints belong in code. The [[harness-quality-beats-model-intelligence]] insight explains why: the surrounding machinery (code-driven) matters more than the model capability (prompt-driven) for reliable systems. This is also why [[production-agents-route-decisions-not-every-call-to-llm]] — the routing structure should be deterministic, with LLMs invoked only for genuinely ambiguous cases.
