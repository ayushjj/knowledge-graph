---
title: "Sessions are runtime infrastructure, not just resumable transcripts"
description: "Hermes stores sessions in SQLite with search and lineage so CLI, messaging platforms, and scheduled jobs all attach to one session plane — routing can resolve before the model even runs"
topics: [ai-agents, ai-native-product-architecture]
source: "@aparnadhinak (Aparna Dhinakaran) — Hermes Harness Architecture"
source_file: "sources/aparnadhinak-hermes-harness-architecture.md"
date: 2026-06-01
domain: "ai"
---

Editor-first harnesses treat a session as a transcript you reload to resume. Hermes treats the session store as live infrastructure: sessions carry source tags, parent-child lineage, and routing metadata, so a chat message, a CLI invocation, or a scheduled job can all attach to the same session plane — and a message can be routed to the right session before inference even begins. It even exposes a model-facing search tool so the agent can recall across prior sessions mid-task rather than relying only on static injection. This is [[treat-agent-as-operating-system-not-function]] taken to its conclusion, and a concrete reason [[memory-is-harness-responsibility-not-plugin]]; persisting the session plane is also the structural fix for how [[reasoning-evaporation-destroys-agent-decision-chains]], extending the everyday logic of [[session-capture-compounds-development-knowledge]] into the runtime itself.
