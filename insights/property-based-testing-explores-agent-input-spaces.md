---
title: "Property-based testing explores agent input spaces that example-based tests miss"
description: "Generative tests that produce random or adversarial inputs discover edge cases in agent behavior that hand-written examples never cover — verification over testing means proving properties, not checking cases"
topics: [ai-coding-tools, ai-agents]
source: "Geoff Huntley — Latent Patterns Principles (verification over testing)"
date: 2026-03-16
domain: "ai"
---

Example-based tests check known cases; property-based tests explore unknown territory. For agent systems, where inputs are natural language with infinite variation, hand-written test cases cover a vanishingly small fraction of the input space. Property-based testing generates hundreds of inputs with varying structure, length, ambiguity, and edge-case characteristics — then verifies that agent behavior satisfies invariants regardless of specific input.

The shift from "testing" to "verification" means defining properties that must always hold (e.g., "the agent never executes a destructive action without confirmation," "token usage stays below budget," "output always contains a source citation") rather than checking specific input-output pairs. This amplifies [[verification-multiplies-agent-output-quality]] — if single-case verification 2-3x quality, systematic exploration of the input space catches the long tail of failures that spot-checks miss. It also strengthens [[evaluate-tools-with-real-multi-step-tasks]] by generating realistic multi-step scenarios programmatically rather than hand-crafting each test case. The feedback loop into [[autonomous-loops-need-small-stories-and-fast-feedback]] tightens when property tests run automatically as part of the agent's own verification cycle.
