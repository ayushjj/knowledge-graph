---
title: "Parallel agents create a management problem, not a coding problem"
description: "When AI agents can work on multiple projects simultaneously, the bottleneck shifts from writing code to coordinating parallel workstreams"
topics: [ai-coding-tools, ai-agents]
source: "Learning Technical Concepts chat — Theo's tweet about multiple projects with agents"
date: 2026-02-24
---

Theo observed the emerging problem: with AI coding agents, you're no longer working on one project at a time. You have Claude Code running on Project A in one terminal, checking Project B in another, while Project C finishes in the background. The old mental model of "everything open relates to what I'm working on" breaks completely. The challenge isn't getting the agent to write code — it's managing which agent is working on what, when to context-switch your own attention, and how to review multiple streams of output.

This extends [[treat-ai-like-distributed-team-not-assistant]] to its logical conclusion: if you're managing 15 parallel streams, you need project management skills more than coding skills. It's a concrete instance of [[implementation-gap-collapsed]] — when building is fast and cheap, the coordination overhead becomes the dominant cost. The solution patterns are the same ones that work for human teams: [[autonomous-loops-need-small-stories-and-fast-feedback]] keeps each stream focused, while [[specs-are-external-memory-surviving-context-resets]] ensures each agent knows its scope without requiring your constant attention. Elvis Sun's OpenClaw takes this further: [[orchestrator-agent-replaces-human-coordination]] — the management problem itself gets solved by another agent, an orchestrator that spawns, routes, and monitors the specialized agents autonomously.
