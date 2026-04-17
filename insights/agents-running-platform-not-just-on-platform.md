---
title: "Agents running the platform vs. agents on the platform — the operator shift changes what software must be"
slug: agents-running-platform-not-just-on-platform
topics: [future-of-ai-business, ai-agents]
source: "@dharmesh (Dharmesh Shah, HubSpot CTO)"
source_file: sources/dharmesh-headless-not-brainless.md
date: 2026-04-17
domain: ai
---

Dharmesh Shah's distinction from his internal HubSpot Slack message: "Being agentic is not just about agents running *on* our platform, it's about agents *running* our platform (being able to operate it). That's how you take AI from being a simple tool to a savvy teammate."

The ON → RUNNING shift has three implications:

1. **API completeness**: agents ON a platform need read access. Agents RUNNING a platform need full CRUD plus workflow orchestration — every operation a human operator performs must be programmatically available.

2. **Decision delegation**: agents ON a platform execute predefined tasks. Agents RUNNING a platform make operational decisions — routing, prioritizing, escalating. The platform must expose decision points, not just data endpoints.

3. **Trust infrastructure**: agents ON a platform need authentication. Agents RUNNING a platform need authorization boundaries, audit trails, and reversibility mechanisms — the same governance humans get.

This is the trajectory from [[autopilots-capture-work-budget-not-tool-budget]] made concrete: the tool budget is "agents on the platform." The work budget is "agents running the platform." HubSpot is explicitly targeting the latter.

Connects to [[self-disruption-follows-the-value-chain-downward]] — building agent-operable platforms means disrupting your own human-facing product before someone else does.
