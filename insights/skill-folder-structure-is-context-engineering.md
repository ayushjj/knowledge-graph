---
title: "A skill's folder structure is its context architecture — the file system is a form of context engineering"
description: "Skills are not just markdown files but folders where scripts, references, and assets enable progressive disclosure — the agent reads deeper files only when it reaches the relevant step"
topics: [knowledge-systems, ai-agents]
source: "@trq212 (Thariq) — Lessons from Building Claude Code: How We Use Skills"
date: 2026-03-18
domain: ai
---

The most common misconception about agent skills is that they are "just markdown files." In practice, a skill is a folder that can include scripts, assets, data, and reference documents that the agent discovers and reads at appropriate times. This reframes the file system itself as a [[skill-graphs-enable-progressive-disclosure]] mechanism — you split detailed API signatures into `references/api.md`, output templates into `assets/`, and helper libraries into `scripts/`, and the agent navigates this structure progressively rather than loading everything upfront.

This is a concrete implementation of the principle that [[files-are-the-universal-agent-interface]]: the folder hierarchy becomes deliberate information architecture, not just file organization. The same way [[claude-md-should-be-routing-table-not-knowledge-base]] keeps the top-level file minimal and points deeper, a well-structured skill keeps its SKILL.md as a workflow outline with pointers to reference files that get loaded only when needed — reducing context waste while preserving access to the full knowledge.
