---
title: "Separate tool registration from tool exposure — install broadly, reveal narrowly"
description: "Hermes registers all tools into a central registry at import time but a separate layer decides what each run actually shows the model, scoped by platform and scenario"
topics: [ai-agents, ai-native-product-architecture]
source: "@aparnadhinak (Aparna Dhinakaran) — Hermes Harness Architecture"
source_file: "sources/aparnadhinak-hermes-harness-architecture.md"
date: 2026-06-01
domain: "ai"
---

Most harnesses conflate "the tool exists" with "the model can see it," which forces a tradeoff between capability and a bloated, risky tool surface. Hermes splits the two: every tool registers into a central registry at import time, but a separate toolset layer decides what any given run exposes to the model, narrowing further for delegated runs. This lets you keep a broad installed library while holding each run's model-visible surface small for both token cost and safety — a direct lever against the way [[context-inefficiency-compounds-three-penalties]], and a complement to how [[safety-enforcement-belongs-in-tool-design-not-prompts]]. Because [[tools-are-contracts-between-deterministic-and-nondeterministic-systems]], fewer exposed tools also means fewer contracts the model can misuse while working under the [[context-window-is-the-fundamental-constraint]].
