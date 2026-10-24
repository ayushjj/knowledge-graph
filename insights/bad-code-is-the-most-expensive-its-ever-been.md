---
title: "Bad code is the most expensive it's ever been"
description: "The specs-to-code movement assumes code is cheap; the opposite is true — a hard-to-change codebase blocks you from the full bounty AI can offer, so architecture quality now matters more, not less"
topics: [ai-coding-tools]
source: "Matt Pocock — Software Fundamentals Matter More Than Ever (AI Engineer conference)"
source_file: "sources/mattpocock-software-fundamentals-matter-more-than-ever.md"
date: 2026-07-09
domain: ai
kind: "principle"
---

The specs-to-code movement runs on an unstated premise: code is cheap, so don't bother inspecting it — just rewrite the spec and regenerate. Matt Pocock argues this premise is backward. If a codebase is hard to change, you cannot take advantage of what AI can offer, because AI performs "really, really well" in a good codebase and poorly in a bad one — the AI amplifies whatever architecture already exists rather than fixing it. This is why [[harness-quality-beats-model-intelligence]]: the codebase itself is part of the harness, and a codebase that resists change caps how much value any model version can extract from it.

The practical framing he lands on: treat AI as a tactical, on-the-ground programmer — "a sergeant" executing changes — while the human retains the strategic role of designing the system. Kent Beck's maxim "invest in the design of the system every day" is the operating discipline this implies. Specs-to-code inverts it: by never looking at the code and only ever rewriting the spec, you are divesting from system design rather than investing in it, so complexity compounds unseen with every regeneration cycle. This connects to [[deep-modules-make-codebases-ai-legible-and-testable]] — the concrete mechanism by which "investing in design" pays off in an AI-assisted workflow — and stands in tension with treating [[specs-are-external-memory-surviving-context-resets]] as sufficient on its own: a spec is good external memory for intent, but it is not a substitute for a human periodically inspecting and improving the actual code.
