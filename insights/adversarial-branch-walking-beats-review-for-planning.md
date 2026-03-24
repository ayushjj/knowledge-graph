---
title: "Adversarial branch-walking beats review for planning — walk every design branch until resolved"
description: "The most effective planning intervention is not post-hoc review or divergent brainstorming but convergent, exhaustive questioning that traverses each branch of the decision tree with recommended answers"
topics: [ai-coding-tools, decision-making]
source: "@mattpocockuk (Matt Pocock) — grill-me skill (mattpocock/skills, 9.5K stars, 151K views)"
date: 2026-03-24
domain: ai
---

Matt Pocock's 4-sentence "grill-me" skill became the most viral Claude Code skill (151K views) because it fills a gap no other intervention covers: the DURING-planning phase between premise-checking ("should we build this?") and plan-review ("does this plan hold up?"). The skill instructs the agent to "interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one."

The mechanism is Socratic branch-walking: systematically traverse a decision tree through adversarial questioning, where the interviewer recommends but the human decides. This directly combats [[first-conclusions-become-nearly-permanent]] — by forcing explicit consideration of every branch, it prevents the Inconsistency-Avoidance Tendency from locking in whichever design the planner thought of first. The pattern applies [[invert-always-invert-to-solve-hard-problems]] to planning: instead of asking "what should we build?", it asks "what would break if we chose this branch?" at every node.

Branch-walking is convergent (narrows toward a decision) AND exhaustive (covers all branches), which distinguishes it from brainstorming (divergent, generates options) and review (post-hoc, validates a completed plan). It produces the same benefit as [[verification-multiplies-agent-output-quality]] but applied upstream — verifying the plan before code exists is cheaper than verifying the code after. The resolved decision tree then feeds directly into [[autonomous-loops-need-small-stories-and-fast-feedback]], where each resolved branch becomes a small, well-scoped story with clear acceptance criteria. Pocock uses it "even outside of coding," suggesting the pattern is domain-general: any complex decision with branching dependencies benefits from adversarial traversal before commitment.
