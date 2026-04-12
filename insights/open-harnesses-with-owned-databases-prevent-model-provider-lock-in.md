---
title: "Open harnesses with customer-owned databases are the antidote to model-provider lock-in"
description: "An open, model-agnostic harness that stores memory in a database you control (Postgres, Mongo, Redis) keeps both model choice and memory portable"
topics: [ai-native-product-architecture, business-models]
source: "@hwchase17 (Harrison Chase) — Your harness, your memory"
source_file: "sources/hwchase17-your-harness-your-memory.md"
date: 2026-04-12
domain: ai
---

The article's prescription is explicit: memory must be owned by whoever is developing the agentic experience, and memory — and therefore harnesses — should be separate from model providers. Chase positions LangChain's Deep Agents as the concrete pattern: open source, model-agnostic, using open standards like agents.md and skills, with plugins for Mongo, Postgres, and Redis, deployable either via LangSmith or any standard web hosting framework. The through-line is that the storage backend is pluggable but the harness itself is open and client-controlled, so the proprietary dataset accumulated through user interactions is never held hostage to a model provider's platform decisions.

This gives builders a third option beyond "build a harness from scratch" and "adopt a closed provider harness" — adopt an open harness but own the memory substrate. It aligns with [[boring-tech-wins-for-ai-native-startups]]: Postgres and Mongo as memory backends are deliberately unglamorous choices. It pairs with [[evolved-harnesses-transfer-across-models]] — if your harness is open and your memory is in your own database, swapping the model becomes a prompt-tuning exercise rather than a full rebuild. For domain-intelligence products where memory is the moat, this is the default stance implied by [[memory-is-where-agent-lock-in-lives]].
