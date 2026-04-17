---
title: "Knowledge is not memory — ingesting documents is solved, learning from interactions is not"
description: "Knowledge (ingesting documents into RAG) is largely solved; memory (learning from task execution to improve future behavior) remains unsolved after 2+ years of industry effort"
topics: [knowledge-systems, ai-agents]
source: "@hwchase17 (Harrison Chase) — Everything Gets Rebuilt: Agents, Harnesses, and the New Compute Layer"
source_file: sources/hwchase17-everything-gets-rebuilt-agents-harnesses.md
date: 2026-04-17
domain: ai
---

Harrison Chase draws a critical distinction: "I do think there's a difference between knowledge and memory. Knowledge would be like 'hey, let's ingest all these documents and put them into a database.' And great, like semantic search over that is solved. Memory, I think you kind of learn on the fly almost."

The practical consequence: teams that conflate the two build excellent ingestion pipelines and declare the problem solved, while the harder problem — learning from interactions — remains unaddressed.

This maps to a specific architectural decision: knowledge is a write-once, read-many system (ingest → index → query). Memory is a continuous learning system (observe → learn → update → observe). They require different infrastructure, different update patterns, and different quality guarantees.

Chase has been working on memory for 2 years and says: "We still have pretty low-level primitives because I don't know if a higher-level primitive right now makes sense." This is an honest signal from the person building the tooling — if LangChain hasn't solved it, it's genuinely hard.

Connects to [[knowledge-evolution-is-the-biggest-unsolved-problem]] — the evolution/learning challenge is exactly what separates knowledge from memory. Also connects to [[context-layers-must-be-living-systems]] — memory systems must be living, not static.
