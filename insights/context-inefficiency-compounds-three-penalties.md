---
title: "Context inefficiency compounds three penalties: cost, latency, and quality degradation"
description: "Every wasted token in an LLM context window doesn't just cost money — it slows responses and degrades output quality, creating a triple tax on production agents"
topics: [ai-native-product-architecture, knowledge-systems]
source: "@nicbstme — The LLM Context Tax: Best Tips for Tax Avoidance"
date: 2026-03-05
domain: "ai"
---

The "context tax" isn't just financial. Every unnecessary token sent to an LLM creates three compounding penalties: higher API costs (output tokens cost 5x input), slower response times from processing irrelevant information, and degraded output quality as the model's attention dilutes across noise. This reframes [[context-window-is-the-fundamental-constraint]] from a capacity problem to an economics problem — even when content fits in the window, bloated context degrades performance.

Practical mitigations map to architectural decisions: preprocessing data before tokenization (HTML to Markdown yields 90%+ token reduction), delegating to subagents for 67% fewer tokens through context isolation, and storing tool outputs as [[files-are-the-universal-agent-interface]] rather than embedding them in context (Cursor's approach reduced tokens by 46.9%). The cheapest token is the one you never send.
