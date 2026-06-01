---
title: "Unattended agent jobs must run through the same permission machinery as interactive sessions"
description: "Hermes makes cron a first-class subsystem — scheduled jobs are gated by the same permissions, delivered through the same paths, and isolated per profile, instead of living as peripheral scripts"
topics: [ai-agents, ai-native-product-architecture]
source: "@aparnadhinak (Aparna Dhinakaran) — Hermes Harness Architecture"
source_file: "sources/aparnadhinak-hermes-harness-architecture.md"
date: 2026-06-01
domain: "ai"
---

The usual pattern is to bolt unattended automation on as scripts that bypass the safety machinery built for interactive use — exactly where an unsupervised agent is most dangerous. Hermes instead makes cron a first-class subsystem: scheduled jobs are durable, gated by the same permissions as interactive sessions, delivered through the same gateway paths, and isolated per profile. Forcing unattended operation through the main architecture rather than the periphery is the operational form of why [[safety-enforcement-belongs-in-tool-design-not-prompts]] and a precondition for being able to [[detect-everything-notify-selectively]] over autonomous runs. It depends on the fact that [[sessions-are-runtime-infrastructure-not-just-transcripts]] and shares the principle that [[enforcement-must-run-independently-of-model-cooperation]].
