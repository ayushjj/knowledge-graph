---
title: "If the agent can't see something, it makes it up — give it every view of the system a person has"
description: "Thorsten Ball credits tool calls with stopping hallucination, and concludes the agent should see everything the team sees: production logs, deploys, rollouts, feature flags, bug reports and the customer"
topics: [ai-agents, ai-coding-tools]
source: "@thorstenball (Thorsten Ball) — How I work with Agents"
source_file: sources/thorstenball-how-i-work-with-agents.md
date: 2026-10-27
domain: ai
kind: principle
---

Thorsten Ball's question: "What stopped hallucinations? Tool calls. They let agents touch our reality. If the agent can't see something, it makes it up." His conclusion is to make the whole development cycle visible to the agent: let it run what it builds end to end, "read production logs, deploy, watch the rollout, cut the release, flip the flag, triage the bug report and email the customer." His rule is short: "Anything you can see, the agent should see too." His team built custom plugins for exactly these views, covering bug reports, emailing users, "Is our system healthy?" and granting feature flags.

He pairs visibility with proof. His "biggest game changer" is asking the agent for "irrefutable proof" (end-to-end walkthroughs, demo videos, before/after numbers) and writing down in AGENTS.md what does *not* count as evidence. An agent that can see production can produce evidence from production; one that cannot can only produce claims.

This treats hallucination as a gap in what the agent can see rather than a defect of the model, so the fix belongs in the harness. It is the reality-facing twin of [[capability-overhang-tools-unlock-latent-model-ability]]: there, a tool lets the model use what it already knows; here, a tool replaces guessing with observation. It also turns [[observability-is-the-missing-agent-discipline]] around — telemetry is not only for humans watching the agent but for the agent watching the system — and it explains why [[data-agents-fail-from-missing-context-not-sql-gaps]]: the failure was never the generation, it was what the agent could not see.
