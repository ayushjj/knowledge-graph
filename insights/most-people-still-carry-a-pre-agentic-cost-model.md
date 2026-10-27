---
title: "Most people still carry a pre-agentic cost model — re-price the problems you stopped trying to fix"
description: "Dan Luu argues that the slow builds and missing tools people complain about daily are now cheap to fix; not attempting them is an old cost estimate, and doing exactly the work of five years ago with AI buys little because of Amdahl's law"
topics: [future-of-ai-business, decision-making]
source: "Dan Luu — We should be more ambitious with the software we build (shared by @dabit3)"
source_file: sources/danluu-we-should-be-more-ambitious.md
date: 2026-10-27
domain: ai
kind: thinking-tool
---

Dan Luu watched people complain for weeks that Rust compilation was slowing them down, and saw problems like it raised daily that "are solvable without a lot of time or effort now." His diagnosis: "these problems are problems because people are implicitly carrying around a pre-agentic cost model." Ten years ago, the person who wrote a new compiler because theirs was slow was "the kind of person who never ships anything," and most productive programmers he knows still have that aversion "even though it is now actually reasonable." In his spare time he built a regex engine that can be tuned faster than general-purpose libraries on a given workload, a ripgrep fork using that engine's native code compiler, and a Rust interpreter to speed up his own builds.

The sharper half of the argument is about what to aim AI at. "If you do exactly what you would've done five years ago, but with AI, the speedup is fairly poor because of Amdahl's law," Luu writes, but "you can choose what to speed up," and that "often seems to involve things that were previously too expensive to do." This is the individual-level version of [[software-abundance-unlocks-categories-that-never-existed]]: the cost curve moved, and the work worth doing moved with it.

Luu publishes the counterweight himself. Yossi Kreinin argues most people should be *less* ambitious, because many problems lack clear pass/fail criteria, people struggle to reason about large black boxes they cannot see inside, and AI speed-ups tend to overfit the case that was tested. Luu's own experience points the same way at the frontier: with each stronger model he ends up "farther from 'it just works'", because what a model can implement keeps outrunning what it can verify — [[stronger-models-expand-the-verification-gap]]. This suggests the useful question at scoping time is not "is this too expensive to build?" but "can I check it once it is built?" — cheap building amplifies whatever judgment chose the target, as [[amplification-widens-the-judgment-gap]] warns.
