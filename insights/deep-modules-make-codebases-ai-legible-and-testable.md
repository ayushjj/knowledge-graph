---
title: "Deep modules make a codebase both AI-legible and safe to gray-box"
description: "Ousterhout's deep-vs-shallow-module distinction determines whether an AI can navigate a codebase at all, and whether a human can delegate implementation while reviewing only the interface"
topics: [ai-coding-tools]
source: "Matt Pocock — Software Fundamentals Matter More Than Ever (AI Engineer conference)"
source_file: "sources/mattpocock-software-fundamentals-matter-more-than-ever.md"
date: 2026-07-09
domain: ai
---

Matt Pocock returns to John Ousterhout's *A Philosophy of Software Design* to define what a testable, AI-navigable codebase looks like: "relatively few large deep modules with simple interfaces," where a deep module hides a lot of functionality behind a simple interface, versus a shallow module which exposes a complex interface for comparatively little functionality. A codebase full of shallow modules looks like "a ton of different tiny little blobs that the AI has to walk through and navigate" — and this is "really hard for the AI to explore," so the agent frequently fails to reach the right module or understand the dependencies between them. AI is, in his words, "really good at creating codebases like this" even though it then struggles to work inside them — a self-inflicted failure mode.

The payoff of restructuring toward deep modules is twofold. First, testability: "you test at the interface, you verify using that interface, and you're good to go" — this is the architectural precondition behind [[feedback-loop-speed-is-the-ais-speed-limit]] and the reason TDD only "rewards" a well-structured codebase. Second, a genuine reduction in the human's cognitive load: deep modules can be treated as gray boxes — "I'm going to just design the interface, but I'm not going to review the implementation too much" — for parts of the app that aren't critical (finance-adjacent code being the named exception). Design the interface, delegate the implementation. This only works if the interfaces are given real design attention — "you should probably have a lot of control over them... otherwise AI might mess up the design" — which is exactly the ongoing investment [[bad-code-is-the-most-expensive-its-ever-been]] argues software fundamentals still demand, and it requires the module map to be part of the same shared vocabulary as [[ubiquitous-language-file-reduces-ai-verbosity-and-drift]].
