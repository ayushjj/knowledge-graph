---
title: "Agents learn at three distinct layers — model weights, harness code, and context configuration"
description: "Most people jump to model fine-tuning when discussing agent learning, but learning also happens at the harness layer (code, tools, instructions baked into all instances) and the context layer (per-user or per-tenant configuration like CLAUDE.md and skills)"
topics: [ai-agents, knowledge-systems]
source: "@hwchase17 (Harrison Chase) — Continual Learning for AI Agents"
source_file: sources/hwchase17-continual-learning-ai-agents.md
date: 2026-04-06
domain: ai
---

Harrison Chase proposes a three-layer model for how AI agents improve over time: the **model** (weights updated via SFT, RL, GRPO), the **harness** (the surrounding code, instructions, and tools shared across all instances), and the **context** (configuration that sits outside the harness and customizes it per user or tenant).

The concrete mapping makes this tangible: for Claude Code, the model is claude-sonnet, the harness is Claude Code itself, and the context is CLAUDE.md, /skills, and mcp.json. The harness/context distinction matters because it determines who benefits — harness improvements affect every user, while context improvements are scoped to whoever owns that configuration.

This frames [[harness-quality-beats-model-intelligence]] more precisely: the harness is the layer that powers *all* instances, so investing there has the highest leverage. Meanwhile, [[compound-engineering-makes-future-work-easier]] operates primarily at the context layer — each session's learnings update CLAUDE.md and skills, compounding for that specific user. The model layer is largely outside the control of agent builders, making harness and context the actionable surfaces for improvement. This also reframes [[meta-agents-beat-manual-harness-engineering]] — Meta-Harness and AutoAgent are explicitly automating learning at the harness layer. The durability of this investment is reinforced by [[agent-harnesses-are-persistent-infrastructure]] — if harnesses were transitional scaffolding that stronger models would absorb, harness-layer learning would be a waste; but the 512k LOC inside Claude Code argues the opposite.
