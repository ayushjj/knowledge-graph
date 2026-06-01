---
title: "Delegation is not orchestration — durable, externally-steerable child runs are the architectural leap"
description: "Hermes can spawn child runs with their own task IDs that return structured summaries, but they die with the parent; true orchestration needs run IDs, lifecycle control, and steering that survive parent completion"
topics: [ai-agents, ai-coding-tools]
source: "@aparnadhinak (Aparna Dhinakaran) — Hermes Harness Architecture"
source_file: "sources/aparnadhinak-hermes-harness-architecture.md"
date: 2026-06-01
domain: "ai"
---

It's easy to mistake working delegation for orchestration. Hermes delegates well — a child run gets its own task ID and terminal context, returns a structured summary, and is capped against runaway recursion — but lifecycle ownership stays with the parent: when the parent finishes, the child is gone. Real orchestration is a different tier: durable child runs with their own IDs, explicit lifecycle management, external steering, and cleanup that survives parent completion. This is the gap between [[orchestrator-agent-replaces-human-coordination]] as an aspiration and a mere delegation primitive, and it's why [[parallel-agents-create-management-problem-not-coding-problem]] — once children outlive parents you need a control plane, not just [[one-session-per-contract-beats-long-running-agents]] or the [[treat-ai-like-distributed-team-not-assistant]] metaphor.
