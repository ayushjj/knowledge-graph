---
title: "Evals are behavioral pressure vectors, not neutral measurements — poorly chosen evals distort agent development"
description: "Each eval shapes agent behavior like a selection pressure; accumulating tests without strategic purpose creates 'an illusion of improving your agent' while distorting development in unproductive directions, and correctness alone misleads because agents that succeed inefficiently create hidden cost"
topics: [ai-agents, ai-native-product-architecture]
source: "LangChain — How We Build Evals for Deep Agents"
source_file: sources/langchain-evals-for-deep-agents.md
date: 2026-04-06
domain: ai
---

LangChain's Deep Agents eval methodology starts from a counterintuitive premise: "More evals ≠ better agents." Each eval acts as a behavioral pressure vector — it doesn't just measure the agent, it shapes it. Poorly chosen evals distort development in unproductive directions, creating "an illusion of improving your agent" while the eval suite doesn't reflect production-relevant capabilities.

Two practical principles emerge. First, **correctness alone misleads**: an agent that succeeds in 6 steps with 14 seconds of latency produces identical correctness scores to one that succeeds in 4 steps with 8 seconds. Only measuring step ratio, tool call ratio, and latency ratio against "ideal trajectories" reveals the operational difference. Second, **taxonomy beats aggregation**: grouping evals by what they test (file operations, retrieval, tool use) rather than where they came from creates actionable visibility between the extremes of a single score and overwhelming per-test noise.

This reframes [[verification-is-a-red-queen-race]] from a defensive problem (evals decay) to an offensive one (evals actively shape). It's not just that optimizing against fixed evals contaminates them — it's that the choice of which evals to include is itself a design decision that steers agent behavior. The efficiency measurement connects to [[time-bounded-evaluation-optimizes-for-usefulness]] — Deep Agents measures not just whether the agent solved the problem but whether it solved it within practical resource bounds. And the "include SDK unit tests = no signal" finding reinforces [[self-improving-agents-overfit-to-eval-metrics]]: noise in the eval suite doesn't just waste time, it actively degrades the optimization signal.
