---
title: "Separate research from implementation to preserve agent context for execution"
description: "Mixing research and implementation pollutes context with irrelevant alternatives — split them into separate agent sessions so the implementer gets only the chosen approach"
topics: [ai-coding-tools, ai-agents]
source: "@systematicls — How To Be A World-Class Agentic Engineer"
date: 2026-03-05
domain: "ai"
---

When you say "go build an auth system," the agent must research alternatives, evaluate options, and then implement — but by implementation time, its context is polluted with details about approaches it won't use. The fix: create a research task to evaluate implementation possibilities, decide on the approach (yourself or via a decision agent), then hand the chosen approach to a fresh-context agent for implementation. The implementer gets "implement JWT authentication with bcrypt-12 password hashing, refresh token rotation with 7-day expiry" — no research residue.

This is a workflow-level application of [[context-inefficiency-compounds-three-penalties]] — research tokens don't just waste space, they actively degrade implementation quality by introducing confusion. The pattern also connects to [[specs-are-external-memory-surviving-context-resets]], where the research output becomes a spec that persists across the context boundary between research and implementation sessions.
