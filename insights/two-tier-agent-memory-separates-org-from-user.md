---
title: "Two-tier agent memory separates organizational workflow knowledge from individual user preferences"
description: "Deployment-level memory captures shared tool strategies and sequencing patterns; user-level memory captures personal templates and communication styles — initially skipping user-level had a significant performance impact"
topics: [ai-agents, knowledge-systems]
source: "@tonygentilcore (Tony Gentilcore, Glean) — Trace Learning for Self-Improving Agents"
source_file: sources/tonygentilcore-trace-learning-self-improving-agents.md
date: 2026-04-04
domain: ai
---

Glean structures agent memory across two levels: deployment-level strategies shared within a company, and personalized learnings visible only to the individual user. Deployment-level learning focuses on how tools are used — tool names, sequencing patterns, parameter templates, query types — and explicitly excludes user prompts, document content, and sensitive fields. User-level learning captures preferences like content templates, formatting for documents, and communication styles.

The revealing finding: early versions only stored deployment-level strategies to prioritize security. But user-level strategies had a significant impact on performance, leading to the two-tier structure. This extends [[cross-user-knowledge-transfer-needs-no-fine-tuning]] with a crucial nuance — cross-user transfer works for workflow patterns, but individual preferences need a private layer. It also enriches [[agent-memory-preserves-institutional-knowledge]] by distinguishing which memory is organizational (and should survive personnel changes) versus personal (and should be private and portable). Chase's [[context-learning-spans-agent-tenant-and-org-levels]] generalizes this two-tier structure into a three-tier model: agent-level (shared by all instances), tenant-level (per user/org/team), and mixed — with production systems combining all three simultaneously.
