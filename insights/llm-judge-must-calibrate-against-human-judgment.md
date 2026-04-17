---
title: "LLM-as-judge must be calibrated against human judgment — uncalibrated judges are worse than no judges"
description: "An LLM judge without human-labeled calibration data produces false confidence; the bridge is humans labeling traces, then training the judge to replicate those labels"
topics: [ai-agents, ai-native-product-architecture]
source: "@hwchase17 (Harrison Chase) — Context Engineering Our Way to Long-Horizon Agents"
source_file: sources/hwchase17-context-engineering-long-horizon-agents.md
date: 2026-04-17
domain: ai
---

Harrison Chase on the gap between LLM-as-judge and actual evaluation: "A big part of it is making sure that they're aligned with your human judgment and human preferences. And because if they're not, then your grader is just bad."

The pattern LangSmith implements to solve this:

1. **Humans label traces** — annotators review real agent execution traces and score them
2. **LLM judge is built FROM those annotations** — LangSmith's "aligned evals" calibrate the judge against the human-labeled set
3. **The judge is continuously validated** — if judge scores drift from human scores, recalibrate

This matters because uncalibrated LLM judges create false confidence. An agent can report "92% accuracy" on a judge that systematically disagrees with what humans would accept — and you'd never know without the calibration step.

Chase also notes that LLM-as-judge operates in multiple contexts: offline eval scoring, online quality monitoring, and even agent self-correction (when an agent hits an error and corrects). "It's all kind of the same thing" — reflecting on traces and updating behavior.

Connects to [[evals-are-behavioral-pressure-vectors-not-neutral-measurements]] — an uncalibrated judge exerts behavioral pressure in the wrong direction. Also connects to [[verification-is-a-red-queen-race]] — the judge itself degrades as the agent adapts to it.
