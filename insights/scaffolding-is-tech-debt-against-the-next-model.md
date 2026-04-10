---
title: "Scaffolding is tech debt against the next model — the bitter lesson applied to product building"
description: "Code built to extend model capability 10-20% becomes worthless when the next model ships, making most product scaffolding an ephemeral trade-off rather than a lasting investment"
topics: [ai-coding-tools, ai-native-product-architecture]
source: "Boris Cherny (@bcherny) — Inside Claude Code With Its Creator, Y Combinator Light Cone podcast"
date: 2026-03-30
---

The Claude Code team has a framed copy of Rich Sutton's "The Bitter Lesson" on the wall. Boris Cherny calls all non-model code "scaffolding" and describes a constant trade-off: "Engineering work now to extend capability maybe 10-20% in whatever domain, or you just wait for the next model."

The practical consequence is radical: "There is no part of Claude Code that was around six months ago. It's just constantly rewritten." The team unships tools every couple weeks and adds new tools every couple weeks. This isn't technical debt in the traditional sense — it's intentional impermanence. The UI stayed as a CLI specifically because "we felt there is no UI we could build that would still be relevant in 6 months because the model was improving so quickly."

The same pattern appeared with verbose output. Boris tried hiding file reads and searches, but couldn't ship it six months earlier because the model wasn't ready — "it would have read the wrong thing pretty often." The feature only worked when the model improved enough to be "on the right track almost every time." The scaffolding (showing file reads) was necessary until the model made it unnecessary. This connects to [[tool-design-is-continuous-observation-see-like-an-agent]] — tools designed for weaker models constrain stronger ones, and [[build-for-the-model-six-months-from-now]] — if you accept scaffolding's shelf life, you invest only where the model genuinely can't reach yet.

Boris's CLAUDE.md philosophy embodies this: "Delete your CLAUDE.md and just start fresh. The capability changes with every model. Do the minimal possible thing in order to get the model on track." This reinforces [[claude-md-should-be-routing-table-not-knowledge-base]] — minimalism isn't just a preference, it's a survival strategy against model capability turnover. Hex's production experience confirms this at scale: [[model-compensations-become-liabilities-as-capabilities-advance]] — they find 5+ once-necessary, now-harmful workarounds per week. And the [[sand-vs-stone-separates-durable-from-disposable-product-value]] framework makes this actionable: scaffolding is definitionally sand.
