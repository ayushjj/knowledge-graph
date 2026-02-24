---
title: "Compound engineering makes each unit of work improve all future work"
description: "The Plan 40% / Work 20% / Review 40% ratio ensures learning compounds across iterations, not just code"
topics: [ai-coding-tools, knowledge-systems]
source: "Benjamin De Kraker — Compound Engineering"
date: 2025-01-15
---

Most engineering treats work as linear — you finish one thing, start the next. Compound engineering inverts this: each unit of work makes the next one easier. The key is the ratio: 40% planning, 20% execution, 40% review. The review phase IS the compounding mechanism — it's where patterns get extracted, mistakes get documented, and [[skills-as-markdown-replace-fine-tuning]] grow.

The 12-agent parallel review in De Kraker's system (architecture, security, performance, simplicity reviewers running simultaneously) is an implementation of [[declarative-beats-imperative-for-agents]] — each reviewer has success criteria, not step-by-step instructions. The result compounds because updated CLAUDE.md files, pattern docs, and skill files mean the agent on iteration N+1 is fundamentally better than on iteration N.

This is the engineering equivalent of [[agent-memory-preserves-institutional-knowledge]]: documentation isn't a chore at the end — it's the mechanism that makes compound growth possible. Skip the review phase and you get linear productivity. Do it consistently and you get exponential. shadcn's /done skill demonstrates this practically — [[session-capture-compounds-development-knowledge]] turns every Claude session into searchable development memory, making the review-and-extract pattern lightweight enough to sustain daily.
