---
title: "Evolving summaries beat append-only memory — rewrite profiles, don't accumulate facts"
description: "An evolve_summary() function that rewrites category profiles with new information handles contradictions naturally, unlike append-only logs"
topics: [knowledge-systems, ai-agents]
source: "Rohit (@rohit4verse) — How to Build Agents That Never Forget"
date: 2026-01-24
---

The critical innovation in file-based agent memory is a function that rewrites summaries rather than appending to them. When a user switches jobs, the system updates their profile — it doesn't add a second employer alongside the first. This handles contradictions naturally: the summary always reflects current truth, while the raw resources layer preserves the historical record for audit.

The write path makes this concrete through four stages: resource ingestion, extraction, batching, and evolving summaries. This is the mechanism behind what [[agent-memory-preserves-institutional-knowledge]] describes at scale — the "daily changelogs and decision logs" only stay useful if they're periodically consolidated into evolving summaries. It's also why [[specs-are-external-memory-surviving-context-resets]] works: spec files are living documents that get rewritten as understanding deepens, not append-only logs that grow stale. Glean's trace learning extends this pattern by recognizing that [[two-tier-agent-memory-separates-org-from-user]] — deployment-level summaries capture shared workflow strategies while user-level summaries capture individual preferences, each evolving independently. Yet evolving summaries are only one piece of the puzzle: [[knowledge-evolution-is-the-biggest-unsolved-problem]] reveals that across 10+ knowledge graph architectures, nobody has fully solved graph maintenance — summaries handle profile-level evolution, but atomic insights still lack pruning, merging, and contradiction detection.
