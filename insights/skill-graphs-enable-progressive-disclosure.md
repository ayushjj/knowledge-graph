---
title: "Skill graphs enable progressive disclosure for complex domains"
description: "Single skill files hit a ceiling — complex domains need interconnected knowledge that agents navigate progressively from index to description to links to sections to full content"
topics: [knowledge-systems, ai-agents]
source: "@arscontexta (Heinrich) — Twitter thread on skill graphs"
date: 2026-02-24
kind: "principle"
---

A single SKILL.md file is a really good book on one topic. A skill graph is a library where books reference each other. When domains get complex — therapy (CBT + attachment + regulation), trading (risk + psychology + sizing) — a monolithic file becomes unnavigable. Skill graphs solve this with progressive disclosure: the agent navigates progressively from metadata to wikilinks to specific sections to full content, loading only what's relevant at each step.

The primitives are the same ones powering this knowledge graph: [[files-are-the-universal-agent-interface]] for the substrate, wikilinks in prose for meaningful connections, YAML frontmatter for scannable metadata, and MOCs for clustering. This is [[similarity-is-not-relevance-relevance-requires-reasoning]] applied to agent knowledge — the agent navigates by reasoning rather than searching by similarity. It extends [[skills-as-markdown-replace-fine-tuning]] from single files to interconnected graphs, and connects to [[context-window-is-the-fundamental-constraint]] because progressive disclosure is fundamentally about loading only what's relevant into a limited context window. At the market level, [[domain-skill-libraries-are-the-real-agent-moat]] validates this architecture — when Excel AI agents were reverse-engineered, the real competitive advantage wasn't core infrastructure but accumulated domain skill libraries that took years to build.

The same progressive disclosure works inside a single skill, as Thariq (@trq212) describes in "Lessons from Building Claude Code: How We Use Skills." The common misconception is that skills are "just markdown files"; in practice a skill is a folder that can include scripts, assets, data and reference documents the agent discovers and reads at the step where it needs them. Split detailed API signatures into `references/api.md`, output templates into `assets/` and helper libraries into `scripts/`, and keep SKILL.md as a workflow outline with pointers — the folder hierarchy becomes deliberate information architecture, not just file organization, the same move as [[claude-md-should-be-routing-table-not-knowledge-base]].
