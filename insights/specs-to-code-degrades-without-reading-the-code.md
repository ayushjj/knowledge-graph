---
title: "Specs-to-code without reading the code is vibe coding by another name"
description: "Iterating purely by rewriting the spec and re-running the compiler, while deliberately never inspecting the generated code, produces progressively worse code each cycle — an empirically observed failure mode, not a hypothetical one"
topics: [ai-coding-tools]
source: "Matt Pocock — Software Fundamentals Matter More Than Ever (AI Engineer conference)"
source_file: "sources/mattpocock-software-fundamentals-matter-more-than-ever.md"
date: 2026-07-09
domain: ai
kind: "principle"
---

The specs-to-code movement's workflow is: write a spec, generate code from it, and if something's wrong, edit the spec and regenerate — never look at the code itself. Matt Pocock tried this directly: "I would try not to look at the code, but I would look at the code, and I realized... I would get worse code. And I did it again, I got even worse code." Repeating the cycle compounded the degradation rather than converging on quality. His conclusion: "the idea that we can just ignore the code and just have the code manage itself is just sort of vibe coding by another name" — the practice inherits vibe coding's core failure (no one is actually checking the artifact) even though it wears the more disciplined-looking clothing of "specs." Nobody has to decide to stop reading: [[hand-off-where-being-wrong-is-cheap-keep-the-reasoning-where-others-pay]] describes the slide from offloading to surrender, one skimmed answer at a time.

The Pragmatic Programmer's concept of software entropy explains why this happens instead of just staying flat: "every time you make a change to a codebase, if you're only thinking about that change and not thinking about the design of the whole system, your codebase is going to get worse and worse and worse." A spec-only feedback loop has no channel for whole-system design thinking — it can only react to symptoms visible from the spec's altitude. This is the concrete failure case behind [[bad-code-is-the-most-expensive-its-ever-been]], and it argues for treating [[deep-modules-make-codebases-ai-legible-and-testable]] as the fix: a codebase with legible module boundaries is one where a human CAN cheaply glance at "the code" without it costing the time savings specs-to-code was chasing in the first place.
