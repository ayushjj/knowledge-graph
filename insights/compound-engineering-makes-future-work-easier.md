---
title: "Compound engineering makes each unit of work improve all future work"
description: "The 80/20 ratio (80% plan+review, 20% work+compound) ensures learning compounds across iterations, not just code"
topics: [ai-coding-tools, knowledge-systems]
source: "Dan Shipper & Kieran Klaassen (Every) — Compound Engineering"
date: 2025-01-15
---

Most engineering treats work as linear — you finish one thing, start the next. Compound engineering inverts this: each unit of work makes the next one easier. The four-step loop is Plan → Work → Review → Compound, with 80% of time in Plan and Review. The Review phase is the compounding mechanism — it's where patterns get extracted, mistakes get documented, and [[skills-as-markdown-replace-fine-tuning]] grow. The Compound step explicitly records learnings for future use — this is what makes it compound, not just iterative.

The 12-agent parallel review (architecture, security, performance, simplicity reviewers running simultaneously) is an implementation of [[declarative-beats-imperative-for-agents]] — each reviewer has success criteria, not step-by-step instructions. The result compounds because updated CLAUDE.md files, pattern docs, and skill files mean the agent on iteration N+1 is fundamentally better than on iteration N.

This is the engineering equivalent of [[agent-memory-preserves-institutional-knowledge]]: documentation isn't a chore at the end — it's the mechanism that makes compound growth possible. Skip the review phase and you get linear productivity. Do it consistently and you get exponential. shadcn's /done skill demonstrates this practically — [[session-capture-compounds-development-knowledge]] turns every Claude session into searchable development memory, making the review-and-extract pattern lightweight enough to sustain daily. OpenAI's Codex team took this to the extreme: [[harness-engineers-need-docs-as-first-class-output]] describes how they built a million-line codebase with zero manually-written code by making documentation the primary engineering artifact — the compound loop operating at organizational scale. When applied to products rather than engineering process, [[proprietary-feedback-loops-widen-the-moat]] shows the same compounding dynamic: each user interaction improves the system for all future interactions. And [[revealed-preferences-trump-stated-preferences]] sharpens what to compound on — track actual behavior, not survey responses.
