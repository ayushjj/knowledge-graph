---
title: "Evaluate agent tools with real multi-step tasks, not toy single-call examples"
description: "Weak evaluation tasks hide tool design flaws — strong tasks require chained calls, ambiguity resolution, and verifiable outcomes"
topics: [ai-agents, ai-coding-tools]
source: "Anthropic Engineering — Writing Effective Tools for Agents"
date: 2026-02-24
---

Anthropic's tool evaluation methodology distinguishes weak tasks ("search for customer_id=9182") from strong tasks ("customer 9182 was charged 3x — find logs, determine if others affected"). Strong tasks require multiple tool calls, ambiguity resolution, and produce verifiable outcomes. The evaluation tracks not just accuracy but tokens used, tool calls made, errors hit, and reasoning quality via interleaved thinking.

This extends [[verification-multiplies-agent-output-quality]] from code verification to tool design verification — the same principle (give agents a way to check their work) applies to the tools themselves. What agents omit in their reasoning matters as much as what they say, which connects to why [[similarity-is-not-relevance-relevance-requires-reasoning]] — surface-level tool success (it returned results) doesn't mean the tool is well-designed (it returned the right results efficiently). The four-step process (prototype, generate eval tasks, run programmatic evals, collaborate with agents to fix failures) is a tool-specific instance of [[compound-engineering-makes-future-work-easier]] — each evaluation cycle improves the tool for all future uses.
