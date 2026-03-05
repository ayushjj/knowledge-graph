---
title: "Evaluate agent tools with real multi-step tasks, not toy single-call examples"
description: "Weak evaluation tasks hide tool design flaws — strong tasks require chained calls, ambiguity resolution, and verifiable outcomes"
topics: [ai-agents, ai-coding-tools]
source: "Anthropic Engineering — Writing Effective Tools for Agents"
date: 2026-02-24
---

Anthropic's tool evaluation methodology distinguishes weak tasks (simple single-call lookups) from strong tasks (e.g., "schedule a meeting with the product team next week" — which requires checking calendars, finding availability, resolving conflicts, and sending invitations). Strong tasks require multiple tool calls, ambiguity resolution, and produce verifiable outcomes. The evaluation tracks not just accuracy but tokens used, tool calls made, errors hit, and reasoning quality via interleaved thinking.

This extends [[verification-multiplies-agent-output-quality]] from code verification to tool design verification — the same principle (give agents a way to check their work) applies to the tools themselves. What agents omit in their reasoning matters as much as what they say, which connects to why [[similarity-is-not-relevance-relevance-requires-reasoning]] — surface-level tool success (it returned results) doesn't mean the tool is well-designed (it returned the right results efficiently). The four-step process (prototype, generate eval tasks, run programmatic evals, collaborate with agents to fix failures) is a tool-specific instance of [[compound-engineering-makes-future-work-easier]] — each evaluation cycle improves the tool for all future uses. Multi-step evaluations also surface [[confluence-of-tendencies-produces-extreme-outcomes]] in agent behavior — compound failures from chained tool calls only emerge under realistic complexity, not isolated single-step tests. Beyond functionality, evaluations should test safety boundaries: [[safety-enforcement-belongs-in-tool-design-not-prompts]] shows that tool-enforced safety (blocking destructive operations at the API level) scales far more reliably than behavioral compliance with system prompts.
