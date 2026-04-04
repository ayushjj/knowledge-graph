---
title: "Shadow execution enables safe trace learning — replay write operations without touching production data"
description: "By replaying actions that would write to external apps in a shadow path, agents can learn from realistic end-to-end flows without impacting customer data"
topics: [ai-agents, ai-native-product-architecture]
source: "@tonygentilcore (Tony Gentilcore, Glean) — Trace Learning for Self-Improving Agents"
source_file: sources/tonygentilcore-trace-learning-self-improving-agents.md
date: 2026-04-04
domain: ai
---

Glean's trace learning replays actions that would write to apps like Google Drive, Salesforce, Jira, Asana, or Slack in a shadow path without touching production data. This lets the system learn from realistic end-to-end flows — including the write operations that are most informative about workflow patterns — without impacting customer data.

This is a critical enabler for [[error-memory-enables-learning-without-retraining]]: you can't learn from write-path failures if you never execute the write path. Shadow execution solves the tension between learning and safety, serving a similar architectural role to [[rollback-safety-nets-enable-autonomy-not-intelligence]] — both make aggressive exploration safe, but shadow execution does it by never touching production at all rather than by reverting changes after the fact. The implication is that any agent system serious about [[traces-not-scores-enable-agent-improvement]] needs a shadow execution layer for the subset of traces that involve external writes.
