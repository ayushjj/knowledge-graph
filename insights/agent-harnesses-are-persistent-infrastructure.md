---
title: "Agent harnesses are persistent infrastructure, not scaffolding models will absorb"
description: "As models improve, old scaffolding disappears but new scaffolding replaces it — harnesses aren't going away, they're evolving"
topics: [ai-agents, ai-native-product-architecture]
source: "@hwchase17 (Harrison Chase) — Your harness, your memory"
source_file: "sources/hwchase17-your-harness-your-memory.md"
date: 2026-04-12
domain: ai
---

A common sentiment holds that stronger models will absorb the scaffolding around them, eventually making harnesses obsolete. Harrison Chase argues the opposite: the scaffolding needed in 2023 (RAG chains, LangGraph flows) has been replaced, not eliminated — by agent harnesses like Claude Code, Deep Agents, Codex, OpenCode, and Letta Code. The concrete evidence is that Claude Code's leaked source code weighs 512k lines; even the makers of the best model in the world invest heavily in harness engineering. Web search "built into" OpenAI and Anthropic APIs is itself just a lightweight harness doing tool calling behind the curtain.

This reframes harness engineering as durable infrastructure, which connects to [[agents-learn-at-three-layers-model-harness-context]] — harness is a first-class learning surface, not a transitional artifact. It also anchors [[harness-quality-beats-model-intelligence]]: if harnesses persist, investing in their design is not premature optimization. For builders, the implication is to pick a harness stance deliberately rather than hoping the question disappears.
