---
title: "The rate of feedback is the AI's speed limit — TDD forces the small steps it won't take on its own"
description: "LLMs 'outrun their headlights' by default, producing huge amounts of code before checking types or tests; TDD forces the small-step discipline that keeps generation inside what the feedback loop can actually verify"
topics: [ai-coding-tools]
source: "Matt Pocock — Software Fundamentals Matter More Than Ever (AI Engineer conference)"
source_file: "sources/mattpocock-software-fundamentals-matter-more-than-ever.md"
date: 2026-07-09
domain: ai
kind: "principle"
---

Even when an agent has good feedback loops available — static types, browser access, automated tests — Matt Pocock observed it "doesn't use them very well... it doesn't kind of like get the most out of its feedback loops in the way that a veteran developer would." The default failure pattern: produce a huge amount of code, then think belatedly, "Oh, I should probably type check that." The Pragmatic Programmer names this outrunning your headlights — "driving too fast because the rate of feedback is your speed limit." Feedback loops don't make an agent careful by existing; they only bound speed if something forces the agent to actually check in at a pace it can absorb.

His answer is test-driven development, deliberately reframed as an AI-safety mechanism rather than a testing-discipline nicety: "TDD forces the LLM to really take small steps. You create a test first, you make that test pass, and then you refactor." This matters because [[verification-multiplies-agent-output-quality]] is more general — verification improves output — but TDD specifically caps batch size, which a generic "give it tests" instruction doesn't. And it only works well when the codebase is structured so a test can cleanly target one thing: [[deep-modules-make-codebases-ai-legible-and-testable]] is the architectural precondition, since "good codebases are easy codebases to test," and testing a shallow, tangled module forces exactly the large, unverifiable batches TDD is meant to prevent. The fastest loop of all sits below the tests: [[types-are-the-fastest-feedback-an-agent-gets]], answering in moments and holding invariants the agent would otherwise forget deep into a long context.
