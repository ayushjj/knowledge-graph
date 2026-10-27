---
title: "Types are the fastest feedback an agent gets — make illegal states unrepresentable and a mistake becomes impossible everywhere"
description: "Ron Minsky (Jane Street) argues agents thrive on feedback, and a type checker answers faster than any test suite and never forgets an invariant the way a long context does; shaping data so the wrong combination cannot be written enforces a rule across the whole codebase"
topics: [ai-coding-tools, engineering]
source: "Ron Minsky (Jane Street) — Now more than ever: building reliable software in the age of agents (talk, shared by @poteto)"
source_file: sources/yminsky-reliable-software-in-the-age-of-agents.md
date: 2026-10-27
domain: ai
kind: principle
---

Ron Minsky's starting observation is that agents "thrive on feedback," both while running and in training. A type error is feedback that "comes up when you need it," and "it's really fast... this is faster than any of your test suites." It also covers a weakness of the models themselves: they "are stochastic and they have bounded memory" — tell one which build command to use at the start and "230,000 tokens later it may not remember it... Much less the complicated cross-cutting invariants of the system that you're building." Expressing what is structural about the code "in a kind of rigorous way that the models can see" carries that memory for them.

The lever is his catchphrase, "make illegal states unrepresentable": shape the data so the wrong combination cannot be written down at all. In his escaping example, leaving out the call that marks text as escaped is simply a type error. Each example looks trivial locally, but "the types are a kind of global system that tie the invariants together and make sure that you make the mistake nowhere," so "you get to write small typed kernels that can enforce global rules across your whole code base." He adds a caveat: richer type systems only help if their ergonomics and error messages are good.

This is the hardest form of [[systems-that-prevent-bad-behavior-beat-moral-appeals]] applied to agents — a rule the agent cannot break beats an instruction it may forget, the same reasoning as [[enforcement-must-run-independently-of-model-cooperation]]. It sharpens [[feedback-loop-speed-is-the-ais-speed-limit]]: if the feedback rate caps the agent's speed, the fastest available feedback deserves the most investment. And it answers [[context-window-is-the-fundamental-constraint]] from the code side: an invariant held in the types does not decay as the context grows.
