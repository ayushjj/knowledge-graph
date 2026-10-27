---
title: "Knowledge an agent can reach is not knowledge it uses — test AGENTS.md, skills and docs with blind control-versus-treatment runs"
description: "Thorsten Ball's rule: as AGENTS.md files, skills, scripts and docs pile up, spawn a handful of blind agents with and without the knowledge and see whether the outcome actually changes"
topics: [ai-agents, knowledge-systems]
source: "@thorstenball (Thorsten Ball) — How I work with Agents"
source_file: sources/thorstenball-how-i-work-with-agents.md
date: 2026-10-27
domain: ai
kind: practice
---

Thorsten Ball calls it "Eval agentic knowledge": "Knowledge piles up in the codebase: AGENTS.md files, skills, scripts, docs. But do agents actually use it? Spawn five blind agents, control vs. treatment, and find out. Agents are really, really good at running experiments."

The reasoning: a file being in the repo, or even being loaded into context, does not show that it changes what the agent does. The only test of an instruction is whether the outcome differs with it versus without it, so the comparison needs a control arm that lacks the knowledge. The runs should be blind so the agent is not performing for the test. This suggests one caveat: a handful of runs per arm can only detect large effects, so a null result on a small change is weak evidence either way.

The practice gives a measurement to several existing ideas. [[claude-md-should-be-routing-table-not-knowledge-base]] argues every unneeded line taxes every session, and a control/treatment run is how you find which lines are unneeded. [[eval-suites-must-shrink-not-just-grow]] applies the same pruning to evals. Once skill files multiply, [[provenance-becomes-the-constraint-when-skill-files-scale]], and an A/B result is the strongest provenance a piece of agent knowledge can carry. It is [[evals-are-gradient-signal-for-harness-engineering]] pointed at the context layer instead of the harness code.
