---
title: "Cross-user knowledge transfer works without fine-tuning — just a database and prompt engineering"
description: "When one person teaches an agent something, another person benefits automatically — no RLHF, no training infrastructure, just structured storage and retrieval"
topics: [knowledge-systems, ai-agents]
source: "Ashpreet Bedi — Agents That Learn (Agno Framework)"
date: 2025-01-28
---

Bedi draws a sharp line: memory stores what you said, learning figures out what it means. Most "memory" implementations (session history, RAG, even fine-tuning) don't actually learn — they retrieve or replay. True agent learning means knowledge from one user's session benefits a completely different user later, with no fine-tuning infrastructure required.

The Agno framework implements this through three memory types — session memory (conversation context), user memory (preferences and profile), and learned memory (knowledge that compounds across users) — with modes including always-extract, agent-decides, and human-confirms. The breakthrough is the learned memory scoped across users: Engineer 1 discovers cloud egress costs matter → Agent saves insight → Engineer 2 asks about cloud providers a week later → Agent surfaces the egress insight unprompted. Bedi calls this "GPU Poor Learning."

This extends [[agent-memory-preserves-institutional-knowledge]] from single-agent persistence to organizational intelligence. It also validates [[skills-as-markdown-replace-fine-tuning]] at the architectural level — if structured retrieval can replace fine-tuning for knowledge transfer, the moat of "we trained on proprietary data" weakens for everyone.
