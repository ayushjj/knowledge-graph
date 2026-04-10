---
title: "Conflicting context causes agent collapse, not graceful degradation"
description: "When an LLM encounters contradictory information in its context, it enters extended deliberation loops rather than choosing one interpretation — production finding from Hex"
topics: [ai-agents, ai-native-product-architecture]
source: "@izzymiller (Izzy Miller, Hex) — Building AI Agents for Data Analytics"
source_file: sources/izzymiller-hex-building-ai-agents-data.md
date: 2026-04-10
domain: "ai"
---

Hex ran evaluations specifically on conflicting context and found that Sonnet 4.6 runs "fairly efficiently and quickly up to a point" — but when injected with contradictory information, "it will spend 30 minutes pondering, going 'wait, but let me see, hm, actually' and enter this crazy collapse mode." This happens at smaller scales constantly in production.

The failure mode isn't wrong answers — it's extended deliberation that burns time and tokens without resolution. This has direct architectural implications: context assembly must establish authority hierarchies so the model never faces two equally-weighted contradictory signals. Hex's solution: a verification hierarchy (semantic model > admin-endorsed assets > raw SQL). This connects to [[two-tier-agent-memory-separates-org-from-user]] — the tier separation isn't just organizational, it's a technical necessity to prevent collapse. User-level memory is "very scary" for data teams precisely because a user could store a wrong metric definition, and the resulting conflict with admin-governed definitions triggers collapse rather than graceful override. The practical rule: governed context must always outrank user context, and the system must never present them as equal-weight alternatives.
