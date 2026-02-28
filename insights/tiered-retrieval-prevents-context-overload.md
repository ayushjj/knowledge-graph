---
title: "Tiered retrieval prevents context overload — summaries first, details on demand"
description: "Reading category summaries first, then drilling to items, then raw resources only if needed keeps memory retrieval within token budgets"
topics: [ai-native-product-architecture, knowledge-systems]
source: "Rohit (@rohit4verse) — How to Build Agents That Never Forget"
date: 2026-01-24
---

The naive approach to memory retrieval dumps everything potentially relevant into the prompt. The smarter approach uses tiered retrieval: pull category summaries first, ask the LLM "is this enough?", and only drill down to atomic facts or raw resources if the summary is insufficient. Each tier is progressively more detailed and more expensive in tokens.

This is [[skill-graphs-enable-progressive-disclosure]] applied to memory instead of knowledge: just as an agent navigates from index to YAML frontmatter to prose to full content, a memory system navigates from summaries to items to raw resources. The constraint driving both patterns is the same — [[context-window-is-the-fundamental-constraint]] means you can't load everything, so you need a strategy for loading the right level of detail. Time decay compounds the effect: the system weights recent memories higher, ensuring current state wins over stale data, connecting to why [[embeddings-measure-similarity-not-truth]] — recency matters as much as similarity.
