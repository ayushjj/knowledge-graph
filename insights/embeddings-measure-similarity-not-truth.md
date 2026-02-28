---
title: "Embeddings measure similarity, not truth — vector databases have a temporal blind spot"
description: "Vector search can't resolve contradictions or understand time; 'I love my job' and 'I'm quitting' retrieve with equal confidence"
topics: [knowledge-systems, ai-native-product-architecture]
source: "Rohit (@rohit4verse) — How to Build Agents That Never Forget"
date: 2026-01-24
---

The standard RAG pattern treats all stored content as equally valid, but real information evolves and contradicts itself. "I love my job" (Week 1) and "I'm thinking about quitting" (Week 2) both retrieve with equal confidence because embeddings have no concept of recency, supersession, or conflict resolution. Without explicit resolution logic, the agent fails to recognize that the newer fact invalidates the older one.

This is a deeper version of what [[similarity-is-not-relevance-relevance-requires-reasoning]] identifies in search: similarity is not truth, and truth requires temporal reasoning that embeddings fundamentally cannot perform. The fix requires explicit conflict resolution logic — archiving old facts as "past history" when contradicted by newer ones — which is why [[three-layer-ai-stack-memory-search-reasoning]] places a Reasoning layer on top of Search. Without that reasoning layer, memory systems "remember everything but know nothing." The practical fix is [[evolving-summaries-beat-append-only-memory]] — rewriting category profiles rather than accumulating facts sidesteps the temporal problem entirely, ensuring summaries always reflect current truth.
