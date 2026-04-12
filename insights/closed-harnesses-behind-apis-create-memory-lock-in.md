---
title: "Closed harnesses behind APIs create memory lock-in by design"
description: "When the harness lives behind a proprietary API, memory state and schema become invisible and non-portable — model providers are incentivized to push more of the harness behind their APIs"
topics: [ai-agents, business-models]
source: "@hwchase17 (Harrison Chase) — Your harness, your memory"
source_file: "sources/hwchase17-your-harness-your-memory.md"
date: 2026-04-12
domain: ai
---

Chase separates lock-in into three escalating levels. Mildly bad: stateful APIs like OpenAI's Responses API or Anthropic's server-side compaction store state on the provider's server, preventing mid-thread model swaps. Bad: closed harnesses like Claude Agent SDK (built on Claude Code, which is not open source) interact with memory in ways unknown to the developer, so any client-side artifacts are non-transferable to other harnesses. Worst: the whole harness, including long-term memory, sits behind an API — the concrete example given is Anthropic's Claude Managed Agents, which "puts literally everything behind an API, locked into their platform." Even nominally open systems drift this way: Codex is open source but generates an encrypted compaction summary usable only inside the OpenAI ecosystem.

The "models will absorb more of the harness" narrative is, in this reading, a euphemism for memory moving behind provider APIs. This directly challenges the assumption that model-provider APIs are stateless-and-swappable forever — see [[context-is-the-product-not-the-model]] and [[proprietary-feedback-loops-widen-the-moat]]. The implication for product builders is that any dependence on provider-managed state should be scored against the cost of eventual migration, not treated as free infrastructure. This tightens [[memory-is-where-agent-lock-in-lives]].
