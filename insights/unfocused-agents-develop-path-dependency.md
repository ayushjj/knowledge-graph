---
title: "Unfocused agents develop path dependency — without a specific mission, they explore the same paths repeatedly"
description: "Agents given broad mandates (like 'find bugs') converge on familiar exploration paths, catching high-radius issues but missing narrow situational problems"
topics: [ai-agents, ai-coding-tools]
source: "@RampLabs — How We Made Ramp Sheets Self-Maintaining"
date: 2026-03-24
domain: "ai"
---

Ramp's first self-maintenance approach was a nightly agent running QA passes — sanity-testing core features, stress-testing recent PRs, probing for latent bugs. The limitation: the agent always followed the same paths. It was good at high-radius issues (things that affect many paths) but consistently missed narrow, situational bugs. This path dependency is an emergent property of unfocused agents — given a broad mandate, they converge on the same exploration strategy each run.

This explains *why* [[autonomous-loops-need-small-stories-and-fast-feedback]] works at a mechanistic level: small, specific stories force agents onto novel paths that a broad mandate would never reach. A focused mission ("check if the new currency formatter handles negative values") explores a path that "run QA on the whole system" never would. Ramp's solution was architectural: instead of one unfocused agent doing broad sweeps, they triggered targeted agents from specific monitors with specific alert context. The fix for path dependency is not a smarter agent but a more specific mission — which connects to [[declarative-beats-imperative-for-agents]]: the constraint (specific success criteria) is what makes the agent effective, not the freedom.
