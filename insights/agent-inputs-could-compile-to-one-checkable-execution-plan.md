---
title: "Bash, code and tool calls could compile to one execution plan that is security-checked before it runs"
description: "Tobi Lutke's bet: an embeddable, sqlite-style mini execution environment that turns bash, TypeScript or tool calls into a common intermediate plan, checks it before executing, and is built for durable execution, so CLI, MCP and WebMCP become interchangeable inputs"
topics: [ai-agents, ai-native-product-architecture]
source: "@tobi (tobi lutke) — MCP vs CLI for LLMs is the wrong discussion"
source_file: "sources/tobi-mcp-vs-cli-wrong-layer-dquickts.md"
date: 2026-10-24
domain: "ai"
---

Tobi Lutke labels this explicitly as a bet, not a finding: "Sometime soon someone will (or has already?) create a embeddable, sqlite style mini execution environment that parses bash, typescript, or tool calls into a common IL execution plan that's easy to security check before executing. And design this specifically for durable execution environments." After that, "we will just connect cli, mcp, webmcp, whatever to that and it accepts any of the input modalities as they can all be represented as each other."

The prediction follows from [[mcp-vs-cli-is-the-wrong-layer-agents-need-a-repl-that-keeps-state]]. If the stateful environment is what matters, then the input format (a shell line, a script, an MCP call, a [[webmcp-turns-websites-into-agent-native-interfaces]] call) is a front end that should compile to the same thing. The security point is worth noting. A single plan that is checked before it runs puts the guard in the execution layer rather than in the prompt or in each tool separately. That is [[safety-enforcement-belongs-in-tool-design-not-prompts]] moved one level down, under every tool at once.

This is a prediction from one person, not a description of a shipped system. Tobi's later pointer, [[durable-execution-snapshots-the-whole-interpreter-so-agent-state-survives]], covers the durability part. Its own README says snapshots are trusted input and malicious ones are not detected, so it does not cover the check-before-run part.
