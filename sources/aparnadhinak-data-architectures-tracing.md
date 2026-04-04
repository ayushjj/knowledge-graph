---
title: "Data Architectures For Tracing Harnesses & Agents"
author: "@aparnadhinak (Aparna Dhinakaran)"
url: https://x.com/aparnadhinak/status/2039724128266334257
date: 2026-04-04
type: article
---

Every AI system in production generates two categories of data: conversations, the interactions between agents and customers, between agents and other agents, the reasoning chains that drove every decision, and evaluations, quality judgments on those conversations at the session level, the turn level, or both.
This data is not debugging exhaust. It is the record of what your AI said to your customers, why it said it, and whether it was any good. Most companies treat it as disposable. That is a mistake.
The Monolithic Data Trap
Most observability works like this: you send your data to a SaaS platform. The platform retains it for 15 to 30 days. Then it deletes it. Your data lives in the provider's infrastructure, in a proprietary format, queryable only through their interface.
This model was designed for infrastructure metrics, CPU utilization and stack traces, data with a short useful lifespan. AI data is fundamentally different. A conversation from six months ago might reveal a failure pattern you only recognize today. The reasoning traces from your best-performing agent sessions are a training signal for your next iteration of your agents or employees. You should be able to query it through your own agents, build eval dashboards on it, build analysis, and custom pipelines. Sending this to a 30-day retention window is like writing your institutional knowledge on a whiteboard and erasing it every month.
What the Data Layer Should Actually Look Like
Your AI data is yours, and it should live where the rest of your business data lives.
Standard formats in your data lake. Traces, evaluations, annotations, all in open formats like Parquet and Iceberg.
Evals live on the data, not alongside it. Evaluations are assessments of your traces. They should augment the data directly, so you can slice results by customer segment, agent version, time window, at scale, with the tools you already use.
No divergent copies. Continuous exports create drift by design. The moment you export, the copy diverges from the system where annotations and evals run. The data layer should be the single source of truth. Not a replica.
Annotations augment in place. When a domain expert marks a false positive or edits a label, that correction lands on the trace data. Not in a sidecar system.
The Business Context
Automated agents handle customer interactions, support tickets, financial analysis, code generation. Employees use AI harnesses to augment their own work, drafting, researching, building. Every one of those sessions produces structured traces. Combined, the totality of agent conversations and harness usage becomes a queryable record of organizational intelligence.
We wrote earlier this year about how agent traces are becoming durable business assets. The data layer is the infrastructure that makes this real. Traces flow through OpenTelemetry-based instrumentation. Within minutes, the data lands in your lake in standard formats. Evals run against it in place. Annotations enrich it. Experiments reference it.
No exports. No syncs. No divergence.
When traces, evaluations, and annotations all live in a unified, open-format layer, what emerges is a business context graph, the queryable record of every decision your AI made, every assessment of those decisions, and every human correction applied to them. It is the dataset that makes the difference between "we think the agents are working" and actually knowing.
