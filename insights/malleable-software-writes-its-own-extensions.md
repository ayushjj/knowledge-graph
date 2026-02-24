---
title: "Malleable software — a tiny core that writes its own plugins — replaces fixed-feature applications"
description: "Instead of adapting your workflow to the tool, the tool observes your workflow and extends itself to match it"
topics: [ai-agents, future-of-ai-business]
source: "@tolobi (Tobi Lutke, Shopify CEO) — Pi and Clawdbot"
date: 2026-02-24
---

Shopify's CEO described Pi as "the most interesting agent harness" — a tiny core that writes plugins for itself as you use it, reinforcement-learning itself into the agent you need. When he wanted Claude Code's tasks feature, he told Pi to spawn Claude in tmux, interrogate it about the feature, and implement a version. The agent used another AI to learn, then modified itself.

This is the logical endpoint of [[features-are-prompts-not-code]]: features aren't just described in natural language — they're discovered by the tool observing what you need and self-generating. It inverts traditional software where you adapt your workflow to the tool. The [[ai-self-improvement-loop-accelerates-everything]] that Shumer describes at the model level is happening at the application level too — each self-extension makes the tool more capable, which surfaces more extension opportunities. The risk is the same as [[build-for-obsolescence-models-eat-scaffolding]] warns: self-generated plugins are ephemeral scaffolding that better models may internalize entirely.
