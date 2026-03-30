---
title: "Uncorrelated context windows are a form of test time compute — fresh perspectives multiply capability"
description: "Multiple agents with independent context windows avoid polluting each other's reasoning, and throwing more context at a problem from different angles increases capability"
topics: [ai-agents, ai-coding-tools]
source: "Boris Cherny (@bcherny) — Inside Claude Code With Its Creator, Y Combinator Light Cone podcast"
date: 2026-03-30
---

Boris Cherny describes a key insight behind agent topologies: "Multiple agents, they have fresh context windows that aren't essentially polluted with each other's context or their own previous context. And if you throw more context at a problem, that's like a form of test time compute."

The practical proof: Claude Code's plugins feature "was entirely built by a swarm over a weekend. It just ran for a few days. There wasn't really human intervention." An engineer gave Claude a spec and told it to use an Asana board. Claude created tickets, spawned agents, and the agents started picking up tasks independently — each with its own uncorrelated context window.

Boris also reveals that "the majority of agents are actually prompted by Claude today in the form of sub agents. A sub agent is just a recursive Claude Code" — internally called "mama Claude." His personal workflow mirrors this: "80% of my sessions I start in plan mode. Claude will start making a plan. I'll move on to my second terminal tab and then I'll have it make another plan. When I run out of tabs I open the desktop app."

This extends [[treat-ai-like-distributed-team-not-assistant]] with a theoretical foundation — it's not just about parallelism for throughput, it's that independent context windows produce qualitatively better reasoning by avoiding cross-contamination. It also connects to [[context-window-is-the-fundamental-constraint]]: if context is the bottleneck, the solution isn't just managing it better within one window — it's multiplying windows.
