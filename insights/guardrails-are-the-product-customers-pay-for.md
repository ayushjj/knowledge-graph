---
title: "Guardrails aren't just safety — they're what the customer is paying for"
description: "Per-use-case, per-customer, continuously-audited governance is the product in a regulated vertical; becoming the compliance control plane is a moat a horizontal player can't credibly hold"
topics: [ai-native-product-architecture, business-models]
source: "@joeschmidtiv (Joe Schmidt IV, a16z) — Avoiding Death on the Yellow Brick Road"
source_file: sources/joeschmidtiv-yellow-brick-road.md
date: 2026-06-01
domain: ai
---

11x's Prabhav Jain inverts the usual view: "Guardrails aren't just to prevent bad stuff from happening. That's what your customers are paying you for." Even inside one product, every use case needs its own — a regulated financial-services prospect demands different guarantees than a mid-market SaaS customer, and those guarantees determine how the agent is allowed to write, who it can contact, what data it can touch, what it can say on a call, and how every decision gets logged. So guardrails must be "built per use case, configured per customer, and audited continuously."

Schmidt generalizes this to governance: the vertical company becomes the control plane where permissions, auditing, what-the-agent-is-allowed-to-do, and what-it-actually-did converge, and it absorbs the regulatory complexity (HIPAA, SEC/FINRA, FRCP and bar rules) the end buyer can't take on alone — something a horizontal player "can't credibly do without becoming a hundred different verticals at once." This is the offensive case for [[saas-survives-as-governance-and-coordination-layer]], it depends on [[enforcement-must-run-independently-of-model-cooperation]], and it surfaces [[permissioned-inference-is-harder-than-permissioned-retrieval]] as the hard unsolved part — all rolling up into [[system-of-work-is-the-moat-not-the-model]].
