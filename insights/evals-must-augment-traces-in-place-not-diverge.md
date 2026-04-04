---
title: "Evaluations must augment trace data in place — divergent copies drift by design"
description: "The moment you export traces to a separate eval system, the copy diverges from where annotations run; evals, annotations, and traces should share a single source of truth"
topics: [ai-native-product-architecture]
source: "@aparnadhinak (Aparna Dhinakaran) — Data Architectures For Tracing Harnesses & Agents"
source_file: sources/aparnadhinak-data-architectures-tracing.md
date: 2026-04-04
domain: ai
---

Harvey's data architecture makes a sharp distinction: evaluations are assessments OF your traces, not a parallel dataset. They should augment the data directly so you can slice results by customer segment, agent version, or time window at scale. When a domain expert marks a false positive or edits a label, that correction must land on the trace data itself — not in a sidecar system.

The critical insight is that continuous exports create drift by design. The moment you export, the copy diverges from the system where annotations and evals run. This is the same principle behind [[decision-traces-are-the-missing-data-layer]] applied at the infrastructure level: when traces, evaluations, and annotations coexist in a unified layer, what emerges is a "business context graph" — the queryable record of every decision your AI made, every assessment of those decisions, and every human correction. This suggests that [[agent-edits-are-automatic-decision-instrumentation]] becomes far more valuable when those edits land directly on the trace data rather than in a disconnected correction log.
