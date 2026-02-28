---
title: "Similarity is not relevance — relevance requires reasoning"
description: "Vector search finds semantically similar content, but what users need is relevant content, and determining relevance requires LLM reasoning, not just pattern matching"
topics: [ai-native-product-architecture]
source: "PageIndex by VectifyAI — https://github.com/VectifyAI/PageIndex"
date: 2026-02-24
---

The foundational insight behind PageIndex: vector embeddings measure semantic distance, but distance and relevance are different things. A document about "interest rates" might be semantically similar to a query about "monetary policy effects on housing," but the actually relevant section lives inside a chapter on domestic policy implications — something only [[structure-plus-reasoning-beats-flat-similarity]] can find.

PageIndex proves this by building a tree index (like a table of contents optimized for LLMs) and having the LLM reason through it like a domain expert would — "this question about interest rates is probably under Monetary Policy" — achieving 98.7% accuracy on FinanceBench, significantly outperforming traditional vector-based RAG systems. This is the same principle driving [[agentic-search-beats-rag-for-live-codebases]]: the agent reasons about *where* to look rather than relying on similarity to surface the right chunks. It also connects to why [[context-is-the-product-not-the-model]] — the quality of retrieval depends on how you structure context, not which model you use for embeddings.
