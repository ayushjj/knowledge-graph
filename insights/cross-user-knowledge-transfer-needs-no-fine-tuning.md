---
title: "Cross-user knowledge transfer works without fine-tuning — just a database and prompt engineering"
description: "When one person teaches an agent something, another person benefits automatically — no RLHF, no training infrastructure, just structured storage and retrieval; the same store of past errors and fixes lets an agent stop repeating its mistakes without retraining"
topics: [knowledge-systems, ai-agents, ai-native-product-architecture]
source: "Ashpreet Bedi — Memory: How Agents Learn (Agno Framework)"
date: 2025-01-28
kind: "principle"
---

Bedi draws a sharp line: memory stores what you said, learning figures out what it means. Most "memory" implementations (session history, RAG, even fine-tuning) don't actually learn — they retrieve or replay. True agent learning means knowledge from one user's session benefits a completely different user later, with no fine-tuning infrastructure required.

The Agno framework implements this through three memory types — session memory (conversation context), user memory (preferences and profile), and learned memory (knowledge that compounds across users) — with modes including always-extract, agent-decides, and human-confirms. The breakthrough is the learned memory scoped across users: Engineer 1 discovers ETF expense ratios matter → Agent saves insight → Engineer 2 asks about investment options a week later → Agent surfaces the expense ratio insight unprompted. Bedi calls this "GPU Poor Learning."

This extends [[agent-memory-preserves-institutional-knowledge]] from single-agent persistence to organizational intelligence. It also validates [[skills-as-markdown-replace-fine-tuning]] at the architectural level — if structured retrieval can replace fine-tuning for knowledge transfer, the moat of "we trained on proprietary data" weakens for everyone.

Bedi's Dash data agent (@ashpreetbedi — Dash, OpenAI-inspired data agent) applies the same "GPU-poor continuous learning" to mistakes. Most text-to-SQL agents are stateless: they make a mistake, you fix it, and they make the same mistake again because every session starts fresh. Dash keeps two complementary stores — a Knowledge layer (validated queries and business context, curated by humans) and a Learnings layer (error patterns and discovered fixes, proposed by the agent and saved with user approval) — so when the agent hits an error it diagnoses, fixes and saves the pattern so it is never repeated. Without that loop, [[speed-without-feedback-amplifies-errors]]; with it, the error log stops being an audit trail and becomes a learning mechanism — the same corrections-feed-the-context move [[context-layers-must-be-living-systems]] asks of enterprise data.
