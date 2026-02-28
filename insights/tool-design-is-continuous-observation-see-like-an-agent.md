---
title: "Tool design is continuous observation — see like an agent"
description: "Designing effective agent tools requires iterating by watching actual model behavior, not specifying upfront; tools that helped weaker models may constrain stronger ones"
topics: [ai-agents, ai-coding-tools]
source: "@trq212 (Thariq, Claude Code team) — Lessons from Building Claude Code"
date: 2026-02-28
---

"Experiment often, read your outputs, try new things. See like an agent." — Thariq

Three lessons from building Claude Code's tool system:

**1. Dedicated tools beat bolted-on extensions.** AskUserQuestion went through multiple failed iterations — adding questions to exit plans confused the model, markdown formatting wasn't reliable. Only when they created a standalone tool with a structured modal did it work. The lesson: when the model struggles with a capability, the tool shape is wrong, not the model.

**2. Tools that help weaker models constrain stronger ones.** TodoWrite was essential for earlier Claude versions but became limiting as the model improved. They replaced it with a Task tool supporting dependencies and agent coordination. This connects to [[build-for-obsolescence-models-eat-scaffolding]] — the tool itself was scaffolding that needed shedding.

**3. Progressive disclosure beats prompt stuffing.** Instead of embedding all context in system prompts, Claude Code lets the agent build context itself through Grep, web search, skills files, and subagents. This is [[skill-graphs-enable-progressive-disclosure]] applied to tool design — let the agent navigate to what it needs rather than front-loading everything into the [[context-window-is-the-fundamental-constraint]].

The meta-lesson: tool design is not a spec you write once. It's a continuous loop of observing what the agent actually does, identifying where it struggles, and reshaping the tool to match how the model thinks. This extends [[tools-are-contracts-between-deterministic-and-nondeterministic-systems]] — the contract evolves as the non-deterministic side improves.
