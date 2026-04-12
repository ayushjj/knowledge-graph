---
title: "Memory is where agent lock-in lives — without it, agents are commoditized"
description: "Stateless model APIs are easily swapped; stateful memory creates a proprietary dataset of user interactions and preferences that makes the agent sticky and differentiated"
topics: [business-models, ai-agents]
source: "@hwchase17 (Harrison Chase) — Your harness, your memory"
source_file: "sources/hwchase17-your-harness-your-memory.md"
date: 2026-04-12
domain: ai
---

Chase argues that switching model providers has been easy precisely because providers are stateless — "you have to change prompts a little bit, but that's not that hard." The moment state is associated with an agent, switching becomes costly, because memory is what makes the agent personalized to a user's preferences, tone, and usage patterns. Without memory, "your agents are easily replicable by anyone who has access to the same tools." The article's personal anecdote — Chase's internal email assistant was accidentally deleted, and recreating it from the same template produced a much worse experience because the accumulated memory was gone — is the stickiness argument in concrete form.

This reframes the competitive question: the moat isn't the model weights or even the prompt, it's the proprietary dataset of interactions and preferences the agent builds up. It compounds [[context-is-the-product-not-the-model]] and extends [[proprietary-feedback-loops-widen-the-moat]] by locating the feedback loop specifically in memory state. It also explains why model providers are so incentivized to push memory behind their APIs — see [[closed-harnesses-behind-apis-create-memory-lock-in]]. For vertical builders, this argues that owning the memory layer is a more durable position than owning the model or the UI.
