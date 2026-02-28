---
title: "Decision traces are the missing data layer — a trillion-dollar gap"
description: "Systems store what happened but not why; capturing the reasoning behind decisions creates searchable precedent and a new system of record"
topics: [ai-native-product-architecture, future-of-ai-business]
source: "Jaya Gupta & Ashu Garg — Foundation Capital, Context Graphs"
date: 2026-02-24
---

Current systems store what happened but not why. They don't store who approved the deviation, under what policy, what precedent justified the exception, what context from multiple systems led to that decision. That "why" lives in Slack threads, deal desk conversations, and people's heads.

When you capture decision traces over time, they form a context graph — entities connected by decision events with "why" links explaining the reasoning. This becomes searchable precedent: "how did we handle this situation before?" instead of re-learning the same edge case in Slack every quarter.

Existing systems can't capture this because Salesforce stores current state (not state at decision time) and Snowflake receives data via ETL after decisions are made. The structural advantage goes to startups building agent orchestration layers that sit in the execution path. This connects to [[context-is-the-product-not-the-model]] and explains why [[agent-memory-preserves-institutional-knowledge]] — memory files are a lightweight version of decision traces.
