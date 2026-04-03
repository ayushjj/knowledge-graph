---
title: "Decision traces are the missing data layer — a trillion-dollar gap"
description: "Systems store what happened but not why; capturing the reasoning behind decisions creates searchable precedent and a new system of record"
topics: [ai-native-product-architecture, future-of-ai-business]
source: "Jaya Gupta & Ashu Garg — Foundation Capital, Context Graphs"
date: 2026-02-24
---

Current systems store what happened but not why. They don't store who approved the deviation, under what policy, what precedent justified the exception, what context from multiple systems led to that decision. That "why" lives in Slack threads, deal desk conversations, and people's heads.

When you capture decision traces over time, they form a context graph — entities connected by decision events with "why" links explaining the reasoning. This becomes searchable precedent: "how did we handle this situation before?" instead of re-learning the same edge case in Slack every quarter.

The key architectural question is: are you in the write path or the read path? By the time a decision lands as final state in a system of record, the "why" is gone. Salesforce stores current state (not state at decision time). Snowflake and Databricks receive data via ETL after decisions are made — they get the output of decisions, not the reasoning. The strategic surface is the point where decisions become binding: the approval step, the redline, the escalation, the agent proposal, the human override. Systems-of-agents startups sit in the write path by default, capturing rationale at the moment decisions become binding. And [[agent-edits-are-automatic-decision-instrumentation]] shows the concrete mechanism: every time a human corrects an agent's proposal, tacit judgment becomes a structured signal.

This connects to [[context-is-the-product-not-the-model]] and explains why [[agent-memory-preserves-institutional-knowledge]] — memory files are a lightweight version of decision traces. At the enterprise scale, [[tribal-knowledge-is-the-last-mile-for-agent-automation]] captures the same gap: the most critical context is implicit, conditional, and historically contingent — exactly the kind of "why" that decision traces aim to formalize. Without [[observability-is-the-missing-agent-discipline]] to track how agents actually behave, even well-designed decision traces miss the performance context. And [[revealed-preferences-trump-stated-preferences]] extends the principle further: capture not just agent reasoning but user reactions to that reasoning. At scale, these context graphs require [[permissioned-inference-is-harder-than-permissioned-retrieval]] — controlling not just who sees data but whose history shapes reasoning.
