---
title: "Procedural memory is the highest-impact type of agent memory — it determines what the agent actually does"
description: "Of three memory types (semantic/episodic/procedural), procedural — instructions, skills, and tools — has the highest impact because it changes what the agent actually does"
topics: [ai-agents, knowledge-systems]
source: "@hwchase17 (Harrison Chase) — Everything Gets Rebuilt: Agents, Harnesses, and the New Compute Layer"
source_file: sources/hwchase17-everything-gets-rebuilt-agents-harnesses.md
date: 2026-04-17
domain: ai
---

Harrison Chase identifies three types of long-term memory (mapping from human psychology):

1. **Semantic memory** — facts in a database, searched via semantic search. "We know how to do that."
2. **Episodic memory** — previous interactions. "That's just like giving the agent a tool to look at its previous conversations."
3. **Procedural memory** — "what the agent should actually do, like its core instructions." This includes system prompts, skills, and even tool configuration.

His ranking: "That type of procedural memory, I think that's the highest impact. That's the type that we've probably built to the most into the framework."

Why procedural memory matters most: agents do repeated tasks. "I have an email agent, it looks at every single email. If I correct it once, I don't want to correct it a second time or third time." Semantic memory retrieves facts. Episodic memory recalls what happened. Procedural memory determines what the agent *does differently next time*.

The update mechanism is still open: does procedural memory update inline (agent edits its own instructions while running) or via sleep-time compute (cron job reviews traces overnight)? Chase: "We think it's still really early, but that's [procedural memory] where we've built the most."

Connects to [[agents-learn-at-three-layers-model-harness-context]] — procedural memory maps to the context layer. Also connects to [[compound-engineering-makes-future-work-easier]] — procedural memory is the mechanism by which each correction compounds.
