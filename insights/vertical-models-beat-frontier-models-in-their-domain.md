---
title: "Vertical models beat frontier models in their domain — specialization wins on every metric"
description: "Intercom's Apex, a specialized customer service LLM, beat every frontier model including Anthropic and OpenAI on resolution rate, latency, hallucination rate, and cost"
topics: [business-models, ai-agents]
source: "@eoghan (Eoghan McCabe, Intercom CEO) — Never Stop Disrupting Yourself: Introducing the Fin API Platform"
source_file: sources/eoghan-fin-api-platform.md
date: 2026-04-04
domain: ai
---

Intercom's Apex — described as the world's first specialized customer service LLM — beat every frontier model in production tests over six months on resolution rate, latency, hallucination rate, and cost. Fin already resolves over 2M customer issues per week across ~8k companies. This suggests that [[model-market-fit-before-product-market-fit]] has a corollary: once you cross the capability threshold, vertical training data creates a compounding advantage that generalist models cannot match.

The implication for [[domain-skill-libraries-are-the-real-agent-moat]] is that the moat extends below the skill layer into the model itself. When the model is trained on millions of real customer service conversations, prompt engineering and skill libraries become less critical — the domain knowledge lives in the weights. This challenges the assumption that [[context-is-the-product-not-the-model]], at least for domains with enough training data to specialize.
