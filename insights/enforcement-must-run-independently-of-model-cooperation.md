---
title: "Policy enforcement must run independently of model cooperation — hooks, not prompt instructions"
description: "Hermes runs lifecycle hooks that block, rewrite, or audit operations at fixed events, so policy and side-effects never depend on the model choosing to comply"
topics: [ai-agents, ai-native-product-architecture]
source: "@aparnadhinak (Aparna Dhinakaran) — Hermes Harness Architecture"
source_file: "sources/aparnadhinak-hermes-harness-architecture.md"
date: 2026-06-01
domain: "ai"
---

If your safety and auditing live in the system prompt, they hold only as long as the model cooperates — which is exactly when you can't count on it. Hermes places enforcement in lifecycle hooks that fire at fixed points (pre/post tool call, gateway dispatch, approval) and can block, rewrite, or pass through any operation, plus filesystem-installed scripts for host side-effects — both designed so policy, auditing, and side-effects execute independently of model cooperation. This generalizes [[safety-enforcement-belongs-in-tool-design-not-prompts]] from the tool API out to the whole loop, and it's a concrete expression of how [[intelligence-location-determines-system-fragility]]: deterministic code carries the guarantees while the model carries the judgment, the same division that lets [[production-agents-route-decisions-not-every-call-to-llm]].
