---
title: "Policy enforcement must run independently of model cooperation — hooks, not prompt instructions"
description: "Hermes runs lifecycle hooks that block, rewrite, or audit operations at fixed events, so policy and side-effects never depend on the model choosing to comply"
topics: [ai-agents, ai-native-product-architecture]
source: "@aparnadhinak (Aparna Dhinakaran) — Hermes Harness Architecture"
source_file: "sources/aparnadhinak-hermes-harness-architecture.md"
date: 2026-06-01
domain: "ai"
kind: "principle"
---

If your safety and auditing live in the system prompt, they hold only as long as the model cooperates — which is exactly when you can't count on it. Hermes places enforcement in lifecycle hooks that fire at fixed points (pre/post tool call, gateway dispatch, approval) and can block, rewrite, or pass through any operation, plus filesystem-installed scripts for host side-effects — both designed so policy, auditing, and side-effects execute independently of model cooperation. This generalizes the tool-API case below out to the whole loop, and it's a concrete expression of how [[intelligence-location-determines-system-fragility]]: deterministic code carries the guarantees while the model carries the judgment, the same division that lets [[production-agents-route-decisions-not-every-call-to-llm]].

The tool-API case comes from reverse-engineering three production Excel AI agents (@nicbstme — "Lessons from Reverse Engineering Excel AI Agents"). Claude embeds overwrite protection at the API level — "the blocking is in the tool, the consent is in the prompt" — while Microsoft Copilot has no overwrite protection at all (it just overwrites) and Shortcut AI relies on system-prompt instructions to prevent destructive operations. Behavioral compliance is inherently unreliable at millions of sessions; tool-enforced safety is deterministic. The tool contract is where to encode safety invariants the non-deterministic model cannot violate, per [[tools-are-contracts-between-deterministic-and-nondeterministic-systems]], and it pairs with [[separate-tool-registration-from-tool-exposure]] — the fewer tools a run reveals, the smaller the surface any guardrail has to defend.
