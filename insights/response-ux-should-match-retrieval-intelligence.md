---
title: "Response UX should match retrieval intelligence"
description: "If your system uses semantic search to find results, the display should reflect that intelligence — keyword highlighting on semantic results creates a confusing mismatch"
topics: [ai-native-product-architecture]
source: "@akshay_pachaar — semantic highlighting research, Zilliz model"
date: 2026-02-24
---

A subtle UX failure in search systems: semantic retrieval finds a document about "A15 Bionic chip benchmarks" when you search "iPhone performance," but keyword highlighting finds nothing to highlight because the exact words "iPhone" and "performance" don't appear. The user sees 3000 words with no highlights and asks "Why is this here?" The retrieval was intelligent; the display was not.

The fix — semantic highlighting using small specialized models (0.6B parameters, millisecond inference) — points to a broader principle: every layer of the user experience should reflect the system's actual intelligence level. This connects to [[ui-moat-collapses-api-becomes-purchasing-criterion]] — if the UI can't communicate *why* a result is relevant, the intelligence behind the retrieval is invisible to users. It also matters for [[three-layer-ai-stack-memory-search-reasoning]]: the Reasoning layer should surface its reasoning, not just its conclusions. For agent-native products described in [[features-are-prompts-not-code]], the agent should explain its retrieval path, not just return results.
