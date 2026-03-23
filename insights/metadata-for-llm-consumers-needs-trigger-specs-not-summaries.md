---
title: "Metadata consumed by LLMs needs trigger specifications, not human summaries"
description: "When an LLM scans metadata to decide what to invoke, the description should specify when to activate — not summarize what the thing does — because LLMs are a fundamentally different consumer than humans"
topics: [ai-native-product-architecture, knowledge-systems]
source: "@trq212 (Thariq) — Lessons from Building Claude Code: How We Use Skills"
date: 2026-03-18
domain: ai
---

When Claude Code starts a session, it builds a listing of every available skill with its description and scans this listing to decide "is there a skill for this request?" This means the description field is not a summary — it is a trigger specification. Writing "Process content into graph nodes" tells the model *what* the skill does; writing "Use when you have a URL or article to extract insights from" tells it *when* to activate. The difference is the same as [[features-are-prompts-not-code]]: you are programming the model's routing behavior through natural language.

This principle generalizes beyond skills to any metadata consumed by LLMs: API descriptions, tool schemas, system prompt routing tables. The insight from [[claude-md-should-be-routing-table-not-knowledge-base]] — that CLAUDE.md should be minimal IF-ELSE conditionals — is the same pattern applied to project configuration. Designing metadata for its actual consumer (an LLM doing pattern-matching) rather than its historical consumer (a human reading documentation) is a quiet but high-leverage shift in [[context-is-the-product-not-the-model]] thinking. The flip side of this consumer shift: when the consumer can infer, [[inference-capability-lowers-input-fidelity-requirements]] — not just for metadata format, but for every input surface the LLM touches.
