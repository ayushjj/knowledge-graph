---
title: "CLAUDE.md should be a routing table, not a knowledge base"
description: "Treat CLAUDE.md as a minimal IF-ELSE directory pointing to context files — not a 26,000-line monolith that bloats every session"
topics: [ai-coding-tools, knowledge-systems]
source: "@systematicls — How To Be A World-Class Agentic Engineer"
date: 2026-03-05
domain: "ai"
kind: "practice"
---

The most effective CLAUDE.md is "a logical, nested directory of where to find context given a scenario and an outcome" — as barebones as possible, containing only the IF-ELSE routing of where to seek context. If coding, read coding-rules.md. If tests are failing, read coding-test-failing-rules.md. Rules encode preferences; skills encode recipes. This nested conditional structure lets agents load precisely the context they need without polluting their window with irrelevant instructions.

This is a specific instance of [[context-window-is-the-fundamental-constraint]] — every unnecessary line in CLAUDE.md taxes every session. The routing-table pattern also complements [[skill-graphs-enable-progressive-disclosure]], where agents navigate to deeper knowledge only when needed rather than loading everything upfront. As rules and skills accumulate, they inevitably contradict each other and degrade performance — periodic consolidation ("spa days") keeps the system clean, which connects to why [[compound-engineering-makes-future-work-easier]] requires active maintenance, not just accumulation.

A routing table solves navigation; it doesn't solve vocabulary. [[ubiquitous-language-file-reduces-ai-verbosity-and-drift]] is the complementary file — a glossary derived from Domain-Driven Design that keeps the terms in CLAUDE.md's routing rules and the terms in conversation with the agent pointing at the same underlying concepts, which is what actually cuts verbosity rather than just cutting file length.
