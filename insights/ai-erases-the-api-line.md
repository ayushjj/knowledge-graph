---
title: "AI erases the API line — the side that takes orders can now negotiate"
description: "Venkatesh Rao's rule was to fight your way above the API line, because below it you do what the API tells you; Tan argues agents dissolve the line, citing a YC company that shipped a bug-report endpoint built for agents rather than humans, which replies in real time with a triage decision and a workaround"
topics: [ai-native-product-architecture, future-of-ai-business]
source: "Garry Tan (President & CEO, Y Combinator) — The a16z Show with Anish Acharya, \"New Rules for Founders\""
source_file: "sources/garry-tan-a16z-new-rules-for-founders.md"
date: 2026-08-21
domain: "ai"
---

Tan invokes Venkatesh Rao's framing — "you need to be above the API line; if Uber came out, like if you're an Uber driver, you're below the API line, you should be fighting to be above the API line" — and then rejects its permanence: "I actually think AI erases the API line." His example is a YC-funded API company that "released a bug report endpoint that is not for humans to use, it's for agents who use their software to use," backed by an LLM that answers in the moment: "that's a good bug, we filed it, we're going to fix it next week, but also like try this workaround." What he cannot stop thinking about is the shape it implies for companies generally: "instead of being below the API line and having to do what the API tells you to do, this can be a back and forth."

He grounds the principle in manufacturing rather than software. Japanese cars overtook American ones in the 1980s because of the Toyota production system, which held that "if you are the person doing the work on the line, you should be allowed to change the line, because you are the person with the most amount of cont[ext] to be able to improve your own working situation" (the captions render it "contacts") — a bottom-up method from a hierarchical culture that bought, in the interviewer's words, "arguably a 40-year generational run because of process power."

The design consequence is that an agent-facing surface should be built to argue, not merely to accept. This extends [[reorganize-around-agents-dont-bolt-them-onto-old-workflows]] past internal workflow into the interface between companies, and it gives a concrete mechanism to [[supervise-loops-from-a-leveraged-point-not-from-inside-them]]: the leverage comes from the endpoint carrying enough context to resolve a case itself instead of escalating it. Anyone designing for [[ai-native-product-architecture]] should ask whether their API's error paths assume a human will read them.

*(Attribution note: the transcript came from auto-generated captions and the company's name could not be reliably resolved, so it is deliberately not asserted here.)*
