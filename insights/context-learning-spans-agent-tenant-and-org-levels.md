---
title: "Context learning spans agent, tenant, and org levels — and you can mix all three"
description: "Agent-level context updates the agent's own configuration over time; tenant-level (user/org/team) gives each tenant their own evolving context; production systems mix multiple levels simultaneously"
topics: [ai-agents, knowledge-systems]
source: "@hwchase17 (Harrison Chase) — Continual Learning for AI Agents"
source_file: sources/hwchase17-continual-learning-ai-agents.md
date: 2026-04-06
domain: ai
---

Chase identifies three granularities at which context learning happens: **agent-level** (the agent updates its own persistent configuration — OpenClaw's SOUL.md that evolves over time), **tenant-level** (each user, org, or team gets their own context that updates independently — Hex's Context Studio, Decagon's Duet, Sierra's Explorer), and **mixed** (an agent can have agent-level + user-level + org-level context updates simultaneously).

This directly extends [[two-tier-agent-memory-separates-org-from-user]], which identified the deployment/user split in Glean's trace learning system. Chase's framework adds the agent level as a third tier — the agent itself has persistent configuration that evolves independently of any tenant. Your own setup is a living example: CLAUDE.md skills and memory operate at the "tenant" level (you, Ayush), while Claude Code's built-in behaviors are the "agent" level, and Anthropic's model improvements are the "model" level. The implication for [[cross-user-knowledge-transfer-needs-no-fine-tuning]] is that transfer happens at the tenant level — one user's context learnings can benefit others at the org level without touching the model or harness.
