---
title: "How We Build Evals for Deep Agents"
author: "LangChain team"
url: https://blog.langchain.com/how-we-build-evals-for-deep-agents/
date: 2026-03-26
type: article
---

Core thesis: Agent evaluation quality depends on targeted, behavior-focused testing rather than test quantity. "More evals ≠ better agents. Instead, build targeted evals that reflect desired behaviors in production."

Why Traditional Approaches Fail:

The Illusion of Progress: Accumulating hundreds of tests without strategic purpose creates "an illusion of improving your agent" while evals may not measure production-relevant capabilities. Each eval acts as a behavioral pressure vector — poorly chosen ones distort agent development in unproductive directions.

Misaligned Metrics: Including SDK unit tests in scoring provides "no signal" since all models pass them equally. This noise obscures meaningful capability comparisons.

Why Their Approach Works:

Behavior-Driven Curation: Three data sources ensure relevance:
1. Dogfooding catches real failure modes worthy of formalization
2. External benchmarks (BFCL, Terminal Bench 2.0) provide validation
3. Artisanal evals target specific isolated behaviors

Taxonomy Over Aggregation: Grouping by what evals test (file operations, retrieval, tool use) rather than source creates actionable middle-ground visibility — avoiding both single-number oversimplification and individual-run noise.

Dual-Metric Evaluation: Correctness alone misleads. An agent may succeed inefficiently, creating latency and cost penalties. They measure step ratio, tool call ratio, and latency ratio against "ideal trajectories" to capture practical performance differences.

Key Example: A weather/time query — two trajectories: one completes in 4 steps with 4 tool calls (~8 seconds); an alternative succeeds but requires 6 steps, 5 calls, and 14 seconds. Correctness is identical; efficiency differs fundamentally. Only the second metric set reveals this operational difference.
