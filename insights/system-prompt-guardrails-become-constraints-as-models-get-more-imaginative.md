---
title: "System-prompt guardrails built for a weaker model become constraints on a more imaginative one"
description: "Claude Code removed 80% of its system prompt because examples that once taught a weaker model started capping a stronger, more imaginative one — the fix was giving context instead of constraints"
topics: [ai-coding-tools]
source: "Thariq Shihipar (Anthropic) — A Field Guide to Fable"
source_file: "sources/thariq-field-guide-to-fable.md"
date: 2026-07-09
domain: ai
---

Thariq Shihipar traces the arc of Claude Code's system prompt across model generations: "originally... the best practice for a system prompt was a small system prompt, few tools, and lots of examples." As models got smarter, the prompt grew — "you can give it more information and more instructions, and they start following them... a larger system prompt with lots of examples and many tools." But the arc reversed: "most recently, we found this new class of models want a smaller system prompt. The examples tend to constrain it because it's actually more imaginative than the examples we give it." The team "removed 80% of the system prompt for Claude Code" and shifted from "do not do this" instructions to giving context instead of constraints — "which was really necessary for the previous models" but has become actively counterproductive for the new one.

The mechanism matters more than the anecdote: examples don't just teach, they also implicitly cap — they communicate "the space of acceptable outputs looks like these" and a sufficiently capable model reads that as a boundary rather than a floor. This is the same underlying claim as [[scaffolding-is-tech-debt-against-the-next-model]] — code and prompt scaffolding built to compensate for a weaker model's gaps becomes dead weight, or worse, an active constraint, once the model no longer has that gap — but it names the specific failure mode inside prompt design itself (examples-as-implicit-ceiling) rather than the broader "delete your CLAUDE.md" prescription. It also gives [[build-for-the-model-six-months-from-now]] a concrete diagnostic: if you catch yourself writing another "do not do X" clause, ask whether you're guarding against a limitation the current model generation has already outgrown.
