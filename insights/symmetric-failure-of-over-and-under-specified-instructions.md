---
title: "You fail both ways: over-specified instructions block a needed pivot, under-specified ones default to the wrong assumptions"
description: "Being too precise stops an agent from deviating even when deviation is correct; being too vague lets it fall back on generic best-practice defaults that may not fit — both failures trace to not having accounted for your own unknowns"
topics: [ai-agents, ai-coding-tools]
source: "Thariq Shihipar (Anthropic) — A Field Guide to Claude Fable 5: Finding Your Unknowns"
source_file: "sources/thariq-a-field-guide-to-claude-fable-finding-your-unknowns.md"
date: 2026-07-09
domain: ai
---

Thariq Shihipar names a symmetric failure in how people instruct agents: over-specify, and "Claude follows instructions even when pivoting would be better" — the precision itself becomes a cage once reality diverges from what you specified. Under-specify, and the agent fills the gap with "assumptions based on industry best practices that may not fit your task" — reasonable defaults for a generic case, wrong for yours. His diagnosis: "when you don't account for your unknowns, you fail both ways. You don't know when the path will be filled with obstacles, and you don't know when the path will be clear, but you still want Claude to veer." Neither more detail nor less detail is the fix — the fix is knowing which of your own unknowns the current instruction is silently assuming away.

This sharpens [[declarative-beats-imperative-for-agents]] rather than contradicting it: giving success criteria over step-by-step instructions is the right default, but "declarative" isn't automatically well-calibrated — a declarative spec can still be over- or under-specified relative to what you actually know versus don't know. The real lever is [[reducing-your-unknowns-is-the-trainable-skill-of-agentic-coding]]: the amount of detail an instruction needs isn't a fixed property of good prompting, it's a function of how well you've already located your own unknowns before you write it.
