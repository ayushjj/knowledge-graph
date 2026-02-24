---
title: "Tools are a new kind of software — contracts between deterministic systems and non-deterministic agents"
description: "Agent tools must be designed for how agents think (context-limited, non-deterministic, description-dependent), not how programmers think"
topics: [ai-agents, ai-coding-tools]
source: "Anthropic Engineering — Writing Effective Tools for Agents"
date: 2026-02-24
---

Anthropic's engineering team frames agent tools as a fundamentally new category of software. Traditional APIs are contracts between two deterministic systems — both sides behave predictably. Agent tools are contracts between a deterministic system and a non-deterministic agent that chooses tools based on descriptions, operates within limited context, and may interpret outputs creatively.

The design implications are specific: namespace tools clearly (`asana_projects_search` not `search`), return meaningful context (names not just UUIDs), consolidate multi-step workflows into single tools, and add response format parameters to control token usage. Every principle traces back to [[context-window-is-the-fundamental-constraint]] — agents can't hold unlimited tool outputs, so tools must be token-efficient by design. This reframes [[declarative-beats-imperative-for-agents]] from the tool-builder's perspective: the tool description IS the declarative contract, and a vague description produces unpredictable agent behavior. The collaborative iteration pattern — paste evaluation transcripts into Claude Code, let it analyze failures and refactor tools — is [[compound-engineering-makes-future-work-easier]] applied to tool development.
