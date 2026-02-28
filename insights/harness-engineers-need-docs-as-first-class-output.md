---
title: "Harness engineering — humans steer, agents execute, documentation is the system of record"
description: "OpenAI built a million-line production codebase with zero manually-written code in 5 months. The discipline shifted from writing code to designing the harness: architecture constraints, documentation, tooling, and feedback loops that make agents reliable at scale."
topics: [ai-coding-tools, knowledge-systems]
source: "OpenAI Codex Team — Harness Engineering: Leveraging Codex in an Agent-First World"
date: 2026-02-28
---

"Humans steer. Agents execute." OpenAI's Codex team built a production product — a million lines of code across application logic, infrastructure, tooling, and docs — with zero manually-written code in five months. Three engineers drove ~1,500 merged PRs at 3.5 PRs per engineer per day.

The insight isn't "use AI to code faster." It's that engineering becomes a different discipline entirely. Building software still demands discipline, but "the discipline shows up more in the scaffolding rather than the code." The *harness* — architecture constraints, documentation, tooling, feedback loops — is the actual product of engineering work.

Documentation becomes the system of record, structured as a map rather than an encyclopedia. A short `AGENTS.md` (~100 lines) serves as a table of contents pointing to deeper sources in a structured `docs/` directory. Knowledge in Google Docs, Slack, or people's heads "effectively doesn't exist" to Codex. This is [[specs-are-external-memory-surviving-context-resets]] taken to its logical extreme — not just specs surviving context resets, but the entire knowledge base being agent-navigable by design. It's also why [[files-are-the-universal-agent-interface]]: the harness runs on files the agent can read.

Architecture becomes constraint rather than art. Rigid layered dependencies, enforced by custom linters, encode "taste" directly into tooling. The resulting code "does not always match human stylistic preferences, and that's okay" — as long as it's correct, maintainable, and legible to future agent runs. This is [[declarative-beats-imperative-for-agents]] at the system level: describe the constraints, let agents satisfy them.

Background Codex tasks function as "garbage collection" — continuously enforcing golden principles rather than accumulating tech debt. Doc-gardening agents scan for stale information. This is [[verification-multiplies-agent-output-quality]] embedded into the workflow, and it compounds over time through [[compound-engineering-makes-future-work-easier]] because the harness itself improves with every iteration.

The team estimates they built in 1/10th the time of manual coding. The implication: "give Codex a map, not a 1,000-page instruction manual."
