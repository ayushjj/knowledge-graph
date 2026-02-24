---
title: "In agent-native architecture, features are prompts — not code"
description: "The shift from coding specific functions to describing outcomes that agents achieve by composing atomic tools"
topics: [ai-agents, ai-native-product-architecture]
source: "@danshipper — Agent-Native Architectures (co-authored with Claude)"
date: 2026-02-24
---

The old model treats features as functions you coded. The agent-native model gives an agent atomic tools and describes outcomes — features become prompts, and the agent loops until the outcome is achieved. This is the core of [[ai-native-product-architecture]].

The five principles that make this work are parity (agent can do anything UI can), granularity (tiny primitive tools), composability (new prompts = new features), emergent capability (agent does things you never designed), and improvement over time. The composability principle means you [[build-for-obsolescence-models-eat-scaffolding]] naturally — new capabilities ship without code changes.

The ultimate test: describe an outcome within your application's domain that you didn't build a specific feature for. If the agent figures it out, you're agent-native. This connects to why [[declarative-beats-imperative-for-agents]] — you define success criteria, not steps. Taken to its extreme, this becomes [[malleable-software-writes-its-own-extensions]] — the application itself generates new prompts to match user behavior, extending its own capabilities without developer intervention.
