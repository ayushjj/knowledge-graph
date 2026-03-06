---
title: "KV cache hit rate is the most critical metric for production agents"
description: "Maintaining stable prompt prefixes and append-only context architecture maximizes cache reuse, dramatically reducing both cost and latency for agentic workflows"
topics: [ai-native-product-architecture, ai-agents]
source: "@nicbstme — The LLM Context Tax: Best Tips for Tax Avoidance"
date: 2026-03-05
domain: "ai"
---

Production agent economics hinge on KV cache hits. When a prompt prefix matches a cached computation, the model skips re-processing those tokens entirely — saving both cost and latency. The critical architectural implication: context must be append-only. Modifying earlier content invalidates the cache forward, so the Manus team masks token logits during decoding to constrain available actions rather than dynamically removing tool definitions from the prompt.

Even small design choices matter: including timestamps to the second destroys cache benefits (cache durations are 5 minutes for Anthropic, 10 minutes for OpenAI), while hour-level precision preserves them. This connects to [[context-inefficiency-compounds-three-penalties]] — cache misses compound all three penalties simultaneously. Combined with crossing the 200K input token pricing cliff (which doubles per-token costs), cache-unaware architectures can be up to 10x more expensive than cache-optimized ones running identical workloads.
