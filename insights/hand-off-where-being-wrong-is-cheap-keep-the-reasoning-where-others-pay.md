---
title: "Trust in agents slides from offloading to deferral to surrender in reasonable-looking steps — hand off where being wrong is cheap, keep the reasoning where others pay for mistakes"
description: "Addy Osmani's spectrum: offloading keeps ownership, deferral turns output into your next input, surrender makes it your own unchecked; the line is the cost of being wrong and whether you can still explain the answer"
topics: [ai-coding-tools, ai-agents, decision-making]
source: "@addyosmani (Addy Osmani) — Critical thinking when agents do the work"
source_file: sources/addyosmani-critical-thinking-when-agents-do-the-work.md
date: 2026-11-07
domain: ai
kind: thinking-tool
---

Addy Osmani describes reliance on agents as a spectrum. At the top is cognitive offloading, "delegating tasks to the AI, but maintaining ownership of the result." In the middle is deferral, where "the output of the tool becomes your new input; the result has ceased to be a hypothesis." At the bottom is cognitive surrender (a term from Steven Shaw and Gideon Nave at Wharton): "the AI's output quietly becomes your own, you feel no need to check it." People drift down it in steps that each seem reasonable: "You read the last answer well, so you skim the next one. You just scan the skeleton of the one after that. Then you get asked about a line and can't explain it, even with your agent's help." The drift is hard to notice because, as models improve, most outputs "will be well-written and mostly correct, but they won't demand a second look."

The test he gives is answerability: "When you can't explain the answer to a question, even by way of your agent, you've ceded ownership." That is not always wrong. He let an AI pick one of three similarly rated hotels and would do it again, but not for how to invest money, how to advise his kids on their careers, or at work for "what we should build, what changes affect what users, whether it's safe to ship." His rule: "Take the handoff where being wrong is cheap, keep the reasoning where others will have to deal with the consequences." He also does not ask anyone to hold a full mental model of a large codebase; it is enough to rebuild the slice you need on demand, as long as you "know what you don't have."

This suggests the same split as [[type-1-vs-type-2-decisions-allocate-thinking-modes]], applied to delegation: the cost and reach of an error, not the share of work the agent did, decides how much reasoning to keep. It explains how [[specs-to-code-degrades-without-reading-the-code]] happens without anyone choosing it, and why [[ai-compresses-execution-not-judgment]]: the agent can take the work and much of the checking, but in Osmani's words "not the accountability." A person reading for understanding, as in [[human-code-review-is-for-understanding-not-only-bug-catching]], is how you stay at the offloading end.
