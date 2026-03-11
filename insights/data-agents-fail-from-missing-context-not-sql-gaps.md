---
title: "Data agent failures stem from missing business context, not SQL generation gaps"
description: "The industry initially blamed text-to-SQL capability for data agent failures, but the real blockers are undefined business definitions, ambiguous sources of truth, and missing tribal knowledge"
topics: [ai-agents, ai-native-product-architecture]
source: "@jasonscui — Your Data Agents Need Context, a16z"
date: 2026-03-11
domain: "ai"
---

When enterprises deployed data agents in 2024-2025, most failed. The initial diagnosis was that models couldn't write good SQL, but the problem extends far beyond text-to-SQL. A deceptively simple question like "what was revenue growth last quarter?" exposes two deeper gaps: the agent doesn't know how the business actually defines revenue (run rate? ARR? which product lines?), and it doesn't know which of several tables is the source of truth (fct_revenue vs mv_revenue_monthly vs mv_customer_mrr).

This connects to [[context-is-the-product-not-the-model]] — the differentiator isn't model capability but the context layer surrounding it. MIT's "State of AI in Business 2025" report found that AI deployments "most fail due to brittle workflows, lack of contextual learning, and misalignment with day-to-day operations." The pattern mirrors what [[similarity-is-not-relevance-relevance-requires-reasoning]] captures at the retrieval level: raw capability without structured understanding produces unreliable results. Just as [[decision-traces-are-the-missing-data-layer]] identified a gap in capturing organizational decisions, data agents expose a gap in capturing organizational definitions.
