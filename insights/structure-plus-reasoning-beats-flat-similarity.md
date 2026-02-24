---
title: "Structure plus reasoning beats flat similarity for complex domains"
description: "Across documents, code, and skills, the same pattern holds: structured knowledge navigated by reasoning outperforms flat indexes searched by similarity"
topics: [ai-native-product-architecture, knowledge-systems, ai-agents]
source: "Recurring pattern across PageIndex, Claude Code agentic search, and @arscontexta skill graphs"
date: 2026-02-24
---

The same architectural pattern keeps winning across completely different domains. For document retrieval, PageIndex builds tree structures and has LLMs reason through them — beating chunk-and-embed RAG. For code search, Claude Code abandoned RAG and vectors for [[agentic-search-beats-rag-for-live-codebases]] with grep/glob — the agent reasons about codebase structure, then looks directly. For agent skills, [[skill-graphs-enable-progressive-disclosure]] replaces monolithic SKILL.md files with interconnected knowledge that agents navigate by relevance.

The common thread: flat structures searched by similarity hit a ceiling. Complex domains need **hierarchy** (trees, graphs, directories) and **reasoning** (LLMs deciding where to look) rather than **embedding distance** (cosine similarity, nearest neighbors). This is why [[files-are-the-universal-agent-interface]] is so powerful — plain files naturally support hierarchy through directories and linking, giving both humans and agents navigable structure. It's also why [[context-is-the-product-not-the-model]] — the structure you wrap around data determines retrieval quality more than the model powering the search.
