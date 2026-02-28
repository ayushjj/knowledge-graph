---
title: "Files are the universal interface between humans and agents"
description: "Markdown and YAML files on disk beat databases because agents already know file operations and humans can inspect everything"
topics: [ai-native-product-architecture, knowledge-systems]
source: "@danshipper + @nicbstme — Agent-Native Architectures + Fintool"
date: 2026-02-24
---

Agents already know `cat`, `grep`, `mv`, `mkdir`. Users can inspect and edit what agents create. File paths are self-documenting — `/projects/acme/notes/` beats `SELECT * FROM notes WHERE project_id = 123`. iCloud handles multi-device sync for free.

Nicolas Bustamante at Fintool stores user data (watchlists, portfolio, preferences, memories, skills) in S3 as YAML files instead of a traditional database. This makes everything debuggable with `cat`, versionable for free, and directly editable by users. The `context.md` pattern — a single markdown file as agent working memory — embodies this same idea and connects to why [[context-is-the-product-not-the-model]].

This pattern is why [[skills-as-markdown-replace-fine-tuning]] works in practice — when the knowledge layer is plain files, both humans and agents can read, write, and evolve it without deployment cycles.

This extends beyond developer tooling into enterprise architecture: [[rigid-schemas-exist-because-rigid-apps-demand-them]] — when agents replace rigid apps, files become the source of truth and databases become regenerable caches derived from those files.
