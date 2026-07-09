---
title: "A Field Guide to Claude Fable 5: Finding Your Unknowns"
author: "Thariq Shihipar (Anthropic, Member of Technical Staff)"
url: https://claude.com/blog/a-field-guide-to-claude-fable-finding-your-unknowns
date: 2026-07-06
type: article
---

[Note: this source file is a paraphrased summary with a few short attributed quotes, not a full reproduction of the article — the original is copyrighted; read it directly at the URL above for the complete text, including the full technique list with example prompts (blind spot pass, brainstorms/prototypes, interviews, references, implementation plans, implementation notes, pitches/explainers, quizzes) and the Fable-launch-video case study.]

Companion blog post to Thariq Shihipar's "Field Guide to Fable" conference talk (see `sources/thariq-field-guide-to-fable.md`), published a few days prior and covering the "finding your unknowns" material in more depth. Core argument: the map (your prompt, plan, and context) is never identical to the territory (the actual codebase and real-world constraints), and the gap between them is what the author calls an "unknown" — a decision point Claude has to resolve on its own guess. The article states: "Claude Fable is the first model where I find the quality of the work is bottlenecked by my ability to clarify its unknowns," and frames unknown-discovery as continuous rather than one-time: "Working with Fable is an iterative process of discovering my unknowns before, during, and after implementation."

The article restates the known-knowns / known-unknowns / unknown-knowns / unknown-unknowns 2x2 (matching the conference talk) and adds two claims not in the talk: first, that unknown-reduction is itself a trainable skill — "reducing and planning for your unknowns is the skill of agentic coding... this is a skill you can improve at, by working with Claude" — with expertise measured by how few unknowns an expert's prompts leave open. Second, a symmetric failure mode in instruction-giving: over-specifying blocks Claude from pivoting when it should, while under-specifying lets it fall back on generic industry-best-practice assumptions that may not fit the actual task — "when you don't account for your unknowns, you fail both ways."

The bulk of the article is a technique list (blind spot pass, brainstorms/prototypes, interviews, references, implementation plans, implementation notes, pitches/explainers, quizzes) with example prompts for each — this is Claude Code operator-manual material, out of scope for this knowledge graph's AI-wisdom/company-building charter, and is not extracted here. Only the two claims above, plus the iterative-loop framing (folded into the existing map/territory node), were extracted as wisdom.
