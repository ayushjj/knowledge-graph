---
title: "Compression should be a forking lifecycle event, not a destructive rewrite"
description: "Instead of repeatedly overwriting one transcript, Hermes seeds a child session from each summary and records parent-child lineage — producing an auditable chain of compressions"
topics: [ai-agents, ai-native-product-architecture]
source: "@aparnadhinak (Aparna Dhinakaran) — Hermes Harness Architecture"
source_file: "sources/aparnadhinak-hermes-harness-architecture.md"
date: 2026-06-01
domain: "ai"
---

When an agent's context fills up, the common move is to summarize older turns in place — destroying the originals. Hermes instead treats each compression as a fork: it closes the current session, seeds a child session with the summary, rotates the session ID, and records parent-child lineage, so a long conversation becomes a lineage chain rather than one repeatedly rewritten transcript. This is a direct structural answer to how [[reasoning-evaporation-destroys-agent-decision-chains]] — the pre-summary detail stays recoverable instead of vanishing once the window closes. It sits in productive tension with [[evolving-summaries-beat-append-only-memory]]: rewrite the working summary for the live context, but keep the lineage so nothing is silently lost — all still operating under the hard limit that [[context-window-is-the-fundamental-constraint]]. Treating compression this way is what lets [[sessions-are-runtime-infrastructure-not-just-transcripts]] rather than disposable scratchpads.
