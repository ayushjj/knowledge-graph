---
title: "Prompt caching makes long context economically viable"
description: "Prefix-matching cache enables 80%+ cost reduction for multi-turn conversations, making rich context systems affordable at scale"
topics: [ai-native-product-architecture, ai-coding-tools, ai-agents]
source: "Anthropic documentation — Prompt Caching"
date: 2026-02-24
kind: "principle"
---

Without caching, every turn in a conversation resends the entire context — system prompts, conversation history, tool definitions — at full price. Prompt caching stores processed prefix tokens so subsequent requests reuse them at ~90% discount. The critical constraint is the prefix matching rule: cache hits only work when the beginning of the request is identical. Change anything in the middle and the cache breaks.

This is the economic enabler for [[context-window-is-the-fundamental-constraint]] — large context windows are only useful if they're affordable to fill on every turn. It directly shapes how [[three-layer-ai-stack-memory-search-reasoning]] works in practice: the Memory layer (system prompt, skill files, CLAUDE.md) sits at the prefix where it caches perfectly, while the Search and Reasoning layers add variable content at the end. The ordering constraint (stable content first, variable content last) is an architectural decision driven by economics, connecting to [[context-is-the-product-not-the-model]] — designing the context system includes designing for cache efficiency.

At production scale, KV cache hit rate becomes the most critical metric for an agent (@nicbstme — "The LLM Context Tax: Best Tips for Tax Avoidance"). When a prompt prefix matches a cached computation, the model skips re-processing those tokens entirely, saving both cost and latency, so context must be append-only: modifying earlier content invalidates the cache forward. The Manus team masks token logits during decoding to constrain available actions rather than dynamically removing tool definitions from the prompt. Small choices matter — including timestamps to the second destroys cache benefits (cache durations are 5 minutes for Anthropic, 10 minutes for OpenAI), while hour-level precision preserves them — and combined with crossing the 200K input-token pricing cliff, which doubles per-token costs, cache-unaware architectures can be up to 10x more expensive than cache-optimized ones running identical workloads. Cache misses compound all three of the [[context-inefficiency-compounds-three-penalties]], and the concrete pattern for keeping the prefix stable is to [[order-system-prompt-by-volatility-for-cache-reuse]].
