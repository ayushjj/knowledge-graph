---
title: "Compilation scales but curation compounds — two camps for knowledge graph construction"
description: "LLM-compiled systems (Karpathy, Pal) grow fast by feeding raw content through model judgment; human-curated systems (our graph, brainctl) grow slowly but every node is validated — compilation scales linearly, curation compounds through connections"
topics: [knowledge-systems, ai-agents]
source: "Ayush Jhunjhunwala — KG Architecture Comparative Research (10+ systems analyzed)"
source_file: specs/knowledge-graph-architectures/research.md
date: 2026-04-04
domain: ai
---

Two distinct camps emerge from comparing knowledge graph construction approaches. **LLM-compiled** systems (Karpathy's wiki, Pal's compiler agent) feed raw content into an LLM that produces structured articles automatically. **Human-curated** systems (our graph, brainctl) have a human deciding what matters and how to connect it, with LLM assistance for extraction but human judgment for inclusion and linking.

The trade-off is sharp: **compilation scales, curation compounds**. Karpathy's system reached ~100 concept articles and ~400K words — volume that would take months of human curation. But compiled wikis have a quality ceiling determined by model judgment. Curated graphs grow slowly, but every node is validated and every connection is intentional — the graph's value comes from the cross-links, not the node count.

Our /learn pipeline sits between the two camps: LLM-assisted extraction (compilation-like speed) with human-curated connections and a fidelity audit gate (curation-like quality). The 43% error rate found in our 2026-03-02 audit demonstrates why pure compilation is dangerous — nearly half the extracted claims had fidelity issues before human review caught them.

This connects to [[compound-engineering-makes-future-work-easier]] — curation compounds because each validated node becomes reliable context for future decisions. It connects to [[skill-graphs-enable-progressive-disclosure]] — curated graphs naturally develop layered structure that compiled wikis lack. And it informs [[evolving-summaries-beat-append-only-memory]] — the evolution challenge is harder for compiled systems because they can't easily distinguish validated knowledge from model-generated filler.
