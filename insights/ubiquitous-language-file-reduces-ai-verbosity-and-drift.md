---
title: "A ubiquitous-language file cuts AI verbosity and keeps implementation aligned with the plan"
description: "Borrowed from Domain-Driven Design: a shared markdown glossary of codebase terminology, kept open during planning, measurably reduced verbosity in the AI's thinking traces and improved plan-to-implementation alignment"
topics: [ai-coding-tools, knowledge-systems]
source: "Matt Pocock — Software Fundamentals Matter More Than Ever (AI Engineer conference)"
source_file: "sources/mattpocock-software-fundamentals-matter-more-than-ever.md"
date: 2026-07-09
domain: ai
---

Matt Pocock traces AI-generated verbosity to the same root cause as a developer struggling to talk to a domain expert about, say, microchips: a language gap. "You need to establish some kind of shared language, because otherwise they're going to be using terms you don't understand, and you're going to be translating that into code that maybe you don't even understand." Domain-Driven Design's answer is a ubiquitous language, where "conversations among developers, and expressions of the code, and conversations with domain experts are all derived from the same domain model."

He operationalized this as a skill that scans the codebase for terminology and writes it out as markdown tables — a glossary kept open during planning sessions with the AI. The measured effect, from reading the AI's own thinking traces: it "not only improves the planning, but it allows the AI to think in a less verbose way, and actually means that the implementation is more aligned with what you actually planned." This is a concrete, low-cost complement to [[deep-modules-make-codebases-ai-legible-and-testable]] — the glossary names the concepts, the deep modules give the concepts stable homes — and it belongs in the same pre-planning stage as reaching a shared design concept before any plan artifact exists.
