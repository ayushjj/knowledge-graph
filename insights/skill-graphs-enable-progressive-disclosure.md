---
title: "Skill graphs enable progressive disclosure for complex domains"
description: "Single skill files hit a ceiling — complex domains need interconnected knowledge that agents navigate progressively from index to description to links to sections to full content"
topics: [knowledge-systems, ai-agents]
source: "@arscontexta (Heinrich) — Twitter thread on skill graphs"
date: 2026-02-24
---

A single SKILL.md file is a really good book on one topic. A skill graph is a library where books reference each other. When domains get complex — therapy (CBT + attachment + regulation), trading (risk + psychology + sizing), legal (contracts + compliance + jurisdictions) — a monolithic file becomes unnavigable. Skill graphs solve this with progressive disclosure: the agent reads the index first, scans YAML frontmatter to decide relevance, follows wikilinks in prose that carry semantic meaning, reads specific sections, and only loads full content when truly needed.

The primitives are the same ones powering this knowledge graph: [[files-are-the-universal-agent-interface]] for the substrate, wikilinks in prose for meaningful connections, YAML frontmatter for scannable metadata, and MOCs for clustering. This is [[structure-plus-reasoning-beats-flat-similarity]] applied to agent knowledge — the agent navigates by reasoning rather than searching by similarity. It extends [[skills-as-markdown-replace-fine-tuning]] from single files to interconnected graphs, and connects to [[context-window-is-the-fundamental-constraint]] because progressive disclosure is fundamentally about loading only what's relevant into a limited context window.
