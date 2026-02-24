---
title: "Session capture turns ephemeral AI conversations into a compounding knowledge base"
description: "shadcn's /done pattern — dumping key decisions, questions, and follow-ups to markdown after each Claude session — applies file-based memory architecture to development workflow"
topics: [ai-coding-tools, knowledge-systems]
source: "shadcn (via X/Twitter) — /done skill pattern"
date: 2026-01-24
---

shadcn's innovation is a `/done` skill that runs after every Claude Code session, capturing key decisions, questions asked, follow-ups needed, and context — dumped to a markdown file tagged with session ID and branch name. "Helpful when I need context later" understates the effect: it creates a searchable development memory that compounds over months.

This is file-based memory architecture (the Resources → Items → Categories pattern from [[agent-memory-preserves-institutional-knowledge]]) applied to the development workflow itself. Raw conversations are Resources, extracted decisions and follow-ups are Items, and project-level documentation is the Category layer. It extends [[specs-are-external-memory-surviving-context-resets]] beyond project specs to capture the reasoning and context that specs omit — the "why did we consider and reject X" that [[decision-traces-are-the-missing-data-layer]] identifies as a trillion-dollar gap. The pattern is lightweight enough to sustain daily, which is what makes [[compound-engineering-makes-future-work-easier]] practical rather than aspirational.
