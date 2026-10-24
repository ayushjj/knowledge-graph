---
title: "Intelligence location — code vs prompts — determines system fragility and flexibility"
description: "Critical architectural fork: prompt-driven systems (Pal's 400-line routing prompt) are flexible but break when models change; code-driven systems (our validate-graph.js) are rigid but reliable — best systems need both"
topics: [knowledge-systems, ai-native-product-architecture, ai-agents]
source: "Ayush Jhunjhunwala — KG Architecture Comparative Research (10+ systems analyzed)"
source_file: specs/knowledge-graph-architectures/research.md
date: 2026-04-04
domain: ai
kind: "principle"
---

Where you put the intelligence in a knowledge system — **in the code or in the prompts** — is a critical architectural fork with real consequences. Pal puts nearly everything in a 400-line prompt: routing, compilation, schema creation, even learning. Our graph puts structure in YAML/markdown with deterministic validation (validate-graph.js handles 7 structural checks in 0.3s). The trade-off is sharp:

**Prompt-driven** intelligence is more flexible — you can change behavior by editing text, no deploy needed. But it's fragile: it breaks when models change behavior between versions, when instruction-following degrades under token pressure, or when instructions are simply misunderstood. Every prompt is a bet that the model will interpret it the same way next time.

**Code-driven** intelligence is rigid but reliable — validate-graph.js will catch a missing reciprocal link every time, regardless of which model is running. But it can't handle nuance, context, or judgment calls.

The best systems will likely need both: **deterministic structure** for what can be verified mechanically, plus **LLM-powered operations** for what requires judgment. Our graph already does this — [[features-are-prompts-not-code]] describes the prompt-driven side (agent skills as prompts), while [[enforcement-must-run-independently-of-model-cooperation]] captures the principle that deterministic constraints belong in code. The [[harness-quality-beats-model-intelligence]] insight explains why: the surrounding machinery (code-driven) matters more than the model capability (prompt-driven) for reliable systems. This is also why [[production-agents-route-decisions-not-every-call-to-llm]] — the routing structure should be deterministic, with LLMs invoked only for genuinely ambiguous cases.

Garry Tan reaches the same fork from agent failures (Garry Tan — "Own Your Intelligence", Startup School 2026, `sources/garry-tan-yc-own-your-intelligence.md`). He calls "where is the computation happening?" the most important question to ask about any agent system, says there are exactly two answers, and says confusing them "causes every agent failure I've ever seen." Taste, judgment and reading what a human actually wants from a vague request belong in latent space — the model, steered with a markdown file. The arithmetic, the SQL query, anything that has to hold state and stay consistent belongs in deterministic space. His worked example: seating five people around a table is latent-space work — just ask; producing custom schedules for six thousand people in an arena is not, and the agent has to write code and keep the result in a database. His formulation is "markdown files calling databases and scripts," because "the model fails where we fail. The fix is having the model compute the way humans compute." This is the discipline underneath [[if-a-smart-intern-could-follow-it-an-agent-can-run-it]] — the intern test tells you a skill file is clear, not that its work belongs in prose — and it often answers [[the-80-99-gap-is-where-ai-products-die]], since the last stretch of reliability is usually arithmetic someone left in latent space.
