---
title: "Verification is the single highest-leverage practice for agent-assisted coding"
description: "Giving an agent a way to verify its own work 2-3x the quality of output — without verification, you're shipping blind"
topics: [ai-coding-tools]
source: "Boris Cherny + Anthropic Official Best Practices"
date: 2025-01-15
---

Both the creator of Claude Code (Boris Cherny) and Anthropic's official documentation converge on the same claim: verification is the single highest-leverage thing you can do. Not better prompts, not more context, not smarter models — just giving the agent a way to check its own work. The quality multiplier is 2-3x.

Verification takes many forms: running test suites, executing bash commands, taking screenshots and comparing to designs, using subagents as reviewers. The key insight is that agents with verification enter a self-correcting loop — they detect their own errors and fix them before presenting results. Without it, plausible-looking output hides edge case failures.

This connects to [[declarative-beats-imperative-for-agents]] — tests ARE declarative success criteria. Write the test first, then let the agent pass it. The test is both the specification and the verification. It also strengthens the case for [[compound-engineering-makes-future-work-easier]]: the review phase (40% of time) is systematic verification that catches what the implementation phase missed.
