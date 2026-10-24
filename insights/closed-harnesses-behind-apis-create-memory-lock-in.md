---
title: "Closed harnesses behind APIs create memory lock-in by design"
description: "When the harness lives behind a proprietary API, memory state and schema become invisible and non-portable — model providers are incentivized to push more of the harness behind their APIs"
topics: [ai-agents, business-models]
source: "@hwchase17 (Harrison Chase) — Your harness, your memory"
source_file: "sources/hwchase17-your-harness-your-memory.md"
date: 2026-04-12
domain: ai
kind: "principle"
---

Chase separates lock-in into three escalating levels. Mildly bad: stateful APIs like OpenAI's Responses API or Anthropic's server-side compaction store state on the provider's server, preventing mid-thread model swaps. Bad: closed harnesses like Claude Agent SDK (built on Claude Code, which is not open source) interact with memory in ways unknown to the developer, so any client-side artifacts are non-transferable to other harnesses. Worst: the whole harness, including long-term memory, sits behind an API — the concrete example given is Anthropic's Claude Managed Agents, which "puts literally everything behind an API, locked into their platform." Even nominally open systems drift this way: Codex is open source but generates an encrypted compaction summary usable only inside the OpenAI ecosystem.

The "models will absorb more of the harness" narrative is, in this reading, a euphemism for memory moving behind provider APIs. This directly challenges the assumption that model-provider APIs are stateless-and-swappable forever — see [[context-is-the-product-not-the-model]] and [[proprietary-feedback-loops-widen-the-moat]]. The implication for product builders is that any dependence on provider-managed state should be scored against the cost of eventual migration, not treated as free infrastructure.

Lock-in sits in memory because memory is what makes an agent sticky. Switching model providers has been easy precisely because providers are stateless — "you have to change prompts a little bit, but that's not that hard." The moment state is associated with an agent, switching becomes costly, because memory is what personalizes it to a user's preferences, tone and usage patterns; without it, "your agents are easily replicable by anyone who has access to the same tools." Chase's own anecdote makes it concrete: his internal email assistant was accidentally deleted, and recreating it from the same template produced a much worse experience because the accumulated memory was gone. For vertical builders, owning the memory layer is a more durable position than owning the model or the UI; Chase later extends the point in [[memory-defines-the-agent-portable-memory-is-frontier]]. Turned around, the same mechanism is an argument for the user: [[personal-agi-is-an-asset-you-build-not-a-subscription-you-rent]] — the lock-in is real either way, and the question is which side of it you are standing on.
