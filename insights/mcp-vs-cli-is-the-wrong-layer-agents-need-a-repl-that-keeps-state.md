---
title: "Agents need a REPL that keeps state between steps — the harness decides whether a tool protocol works, not the protocol"
description: "CLI tools beat MCP today only because they are reached through bash, which is a REPL whose state persists in the file system; that is a harness property, not something intrinsic to MCP"
topics: [ai-agents, ai-native-product-architecture]
source: "@tobi (tobi lutke) — MCP vs CLI for LLMs is the wrong discussion"
source_file: "sources/tobi-mcp-vs-cli-wrong-layer-dquickts.md"
date: 2026-10-24
domain: "ai"
kind: "principle"
---

Tobi Lutke's claim is that people are "debating at the wrong layer": MCP and CLI both "work incredibly well as long as they are run through a repl like environment that can persist state." CLI looks better only because CLI tools are usually reached through bash, which "happens to be a repl with persistent state (the file system)." He says this "isn't even close to being an intrinsic property of MCP. Just means that we need better harnesses." The best such environments today, in his list, are bash plus the file system, Jupyter kernels, and code-mode REPLs (usually QuickJS).

His reason: models "understand the concept of forward evolving a system to solve a need very well," which he attributes to agentic RL. They change the state of a codebase, or pull data from a database and then work on it, much as a person would. "But without an execution environment, they actually cannot do this properly." That is [[capability-overhang-tools-unlock-latent-model-ability]] with one more condition. The tool is not enough on its own. The agent needs somewhere its earlier steps are still there when it takes the next one.

This suggests that [[files-are-the-universal-agent-interface]] works partly for a reason it doesn't name: the file system is the state store bash already comes with. It also puts the MCP-vs-CLI choice inside [[harness-quality-beats-model-intelligence]]. The deciding part is the harness, not the tool protocol. Tobi's guess at what this environment becomes is [[agent-inputs-could-compile-to-one-checkable-execution-plan]], and [[durable-execution-snapshots-the-whole-interpreter-so-agent-state-survives]] is the repo he later called an "excellent code mode env".
