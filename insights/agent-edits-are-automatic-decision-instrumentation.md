---
title: "Agent edits are automatic decision instrumentation — every human correction is a structured signal"
description: "When agents propose and humans edit, the delta between proposal and correction captures tacit judgment as first-class data without requiring manual logging"
topics: [ai-agents, ai-native-product-architecture]
source: "@JayaGup10 (Jaya Gupta) — The Trillion Dollar Loop B2B Never Had"
source_file: sources/jayagup10-trillion-dollar-loop-b2b.md
date: 2026-04-03
domain: ai
---

An agent drafts a pricing proposal; the sales rep adjusts the discount from 25% to 30% and adds a note about competitive pressure. That edit is a decision trace. The model's proposal is a structured prior — what the system thought was right. The human's modification is the judgment signal — what actually matters that the model missed.

This is the mechanism that closes the gap identified in [[decision-traces-are-the-missing-data-layer]]: instead of bolting on decision logging after the fact, agent-mediated workflows make instrumentation a byproduct of how work gets done. As agents insert themselves into more workflows, more judgment is forced to become explicit through edits, approvals, exceptions, and overrides. The strongest objection — that the most valuable judgment lives in intuition and side conversations — is real, but the thesis only requires enough repeated, high-value decisions to become explicit for the system to start learning.

This connects to [[revealed-preferences-trump-stated-preferences]] at the enterprise level: don't ask people why they made a decision — observe the delta between what the agent proposed and what the human actually did. And it gives [[proprietary-feedback-loops-widen-the-moat]] a concrete capture mechanism: each agent correction is a proprietary signal that competitors cannot replicate. These correction traces are also the richest source of eval cases — a trace where a user corrected the agent is even better than a failure trace, feeding directly into the [[trace-to-eval-flywheel-compounds-agent-quality]].
