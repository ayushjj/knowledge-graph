---
title: "Revealed preferences trump stated preferences — track what users do, not what they say"
description: "Users' actual behavior (what they click, skip, edit, redo) is the ground truth for product decisions; stated preferences in surveys and interviews systematically mislead"
topics: [business-models, ai-native-product-architecture]
source: "Nikunj Kothari — Revealed Preferences"
date: 2026-03-16
domain: "ai"
---

Economists have known since Samuelson (1938) that what people do diverges from what they say. In AI products, this gap is amplified: users say they want "more control" but skip configuration screens; they say accuracy matters most but tolerate errors when speed improves; they claim to read documentation but engagement data shows they don't. Building on stated preferences produces features nobody uses.

Revealed preference data — what users actually click, edit, redo, skip, and abandon — is the ground truth for product decisions. This extends [[decision-traces-are-the-missing-data-layer]] from agent decisions to user decisions: capturing not just what the system decided but what the user did in response. The combination creates a closed loop where [[compound-engineering-makes-future-work-easier]] applies to the product itself — each interaction reveals a preference that improves the next interaction. Boris Cherny's [[latent-demand-is-the-strongest-product-signal]] is the product-building version of this: he literally walks around the Anthropic office standing behind engineers to observe how they use Claude Code, and every major feature (CLAUDE.md, plan mode, co-work) emerged from what people were already trying to do. The practical implication is instrumenting user behavior from day one, not waiting for enough scale to "justify" analytics. The cost of building without behavioral data isn't visible in the short term — it shows up as features that demo well but don't retain users.
