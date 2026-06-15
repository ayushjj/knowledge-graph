---
title: "A loss curve is reassurance, not analysis — pull a hundred failures and read every one"
description: "Experiments throw off far more information than you consume — transcripts, failure cases, the strange tail — and most of it dies unread. Most ML bugs live in the data and fail silently; Ng's move is to pull 100 failures, sort them into piles, and attack the biggest pile"
topics: [ai-native-product-architecture, knowledge-systems]
source: "@itsreallyvivek (vivek) — how to be good at research"
source_file: "sources/itsreallyvivek-how-to-be-good-at-research.md"
date: 2026-06-15
domain: "ai"
---

Vivek's warning: "a descending loss curve is not analysis, it's reassurance. your experiments throw off far more information than you consume: transcripts, failure cases, the strange tail of the distribution. most of it dies unread in a logs folder." Karpathy's recipe "starts before any training code gets written, with hours spent on the raw data by hand," because "most ml bugs live in the data, and they fail silently. nothing crashes. you simply get a mediocre model and a wrong theory about why." Andrew Ng's decade-old move still wins: "pull a hundred failures, read all of them, sort them into piles, attack the biggest pile" — and it applies to evals too, where "a benchmark you've never read transcripts from is a benchmark you don't actually understand."

This is the research-craft root of why [[traces-replace-code-as-agent-source-of-truth]] — the transcript, not the aggregate metric, is where understanding lives, and reading the strange tail is the actual analysis. It's the human discipline that [[observability-is-the-missing-agent-discipline]] tries to systematize. The "benchmark you've never read transcripts from" line is exactly why [[llm-judge-must-calibrate-against-human-judgment]] — a score you haven't traced back to behavior is unanchored. And it generalizes [[revealed-preferences-trump-stated-preferences]]: the failure cases reveal what your system actually does, versus what the loss curve says it does. Aggregate similarity hides this, which is why [[similarity-is-not-relevance-relevance-requires-reasoning]].
