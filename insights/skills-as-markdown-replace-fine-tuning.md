---
title: "Markdown skill files may replace expensive fine-tuning"
description: "A SKILL.md file that teaches an agent how to do something specific can match domain-specific fine-tuned models — at zero training cost"
topics: [ai-agents, ai-native-product-architecture]
source: "@nicbstme + @gokulr — Fintool + OpenClaw Skills Paradigm"
date: 2026-02-24
---

A skill is just a markdown file that tells the agent how to do something specific. Non-engineers can create skills (analysts, customers), no deployment is needed — change the file, it takes effect immediately, and everything is readable and auditable.

Gokul Rajaram asks the key question: can skill files match hand-crafted fine-tuned models? If yes, the moat of "we trained on proprietary data" weakens dramatically. Anyone could write a SKILL.md file. Vertical AI startups whose differentiation was domain-specific fine-tuning face disruption from [[features-are-prompts-not-code]] — self-learning agents with skill files, not expensive training runs.

Bustamante's "shadowing system" shows this in practice: if you don't like how the agent does DCF valuations, write your own skill file and your version wins. This is why [[context-is-the-product-not-the-model]] — the skill layer IS the product, and it's built on [[files-are-the-universal-agent-interface]].
