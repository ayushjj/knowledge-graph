---
title: "Knowledge evolution is the biggest unsolved problem across all graph architectures"
description: "Almost nobody has solved how knowledge graphs grow without rotting — most are append-only, auto-decay is too aggressive, and even the best systems only add links without pruning, merging, or detecting contradictions"
topics: [knowledge-systems, ai-native-product-architecture]
source: "Ayush Jhunjhunwala — KG Architecture Comparative Research (10+ systems analyzed)"
source_file: specs/knowledge-graph-architectures/research.md
date: 2026-04-04
domain: ai
---

Across 10+ knowledge graph systems studied, **almost nobody has solved knowledge evolution well**. This is the biggest unsolved problem in the space. Most systems are append-only — they grow but never prune, merge, or update. The few that attempt evolution either go too far (StixDB's auto-decay with 48-hour half-life actively destroys knowledge) or not far enough (Pal's linter agent is aspirational code that depends on LLM choosing to act).

Our own /connect skill is the closest thing to systematic maintenance across the systems studied, but it only adds links — it doesn't prune outdated insights, merge near-duplicates, or detect contradictions. This means every knowledge graph, including ours, accumulates noise over time. Nodes that were accurate when written may become outdated or contradicted by newer insights, but nothing in the system surfaces this.

The contradiction detection problem is particularly important: two insights that directly contradict each other are both invisible to the graph unless explicitly linked. Per our design decision, [[evolving-summaries-beat-append-only-memory]] captures one evolution strategy — rewriting profiles instead of appending — but this only works for summaries, not for atomic insights. The [[context-layers-must-be-living-systems]] insight articulates the principle (context layers need self-updating feedback loops) but no system we studied has actually implemented this for a curated graph. The [[verification-is-a-red-queen-race]] pattern applies here too: any automated quality check on a graph will degrade as the graph learns to pass it.
