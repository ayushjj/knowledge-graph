---
title: "Virtual filesystems replace sandboxes for agent navigation — intercept commands instead of provisioning infrastructure"
description: "Mintlify's ChromaFs intercepts Unix commands and translates them into database queries, cutting boot time from 46 seconds to 100ms and cost from $70k/year to near-zero"
topics: [ai-native-product-architecture, ai-agents]
source: "Mintlify — How We Built a Virtual Filesystem for Our Assistant"
source_file: sources/mintlify-virtual-filesystem.md
date: 2026-04-04
domain: ai
---

Mintlify built ChromaFs — a virtual filesystem that intercepts Unix commands (ls, cd, cat, grep) and translates them into queries against their Chroma vector database. Boot time dropped from approximately 46 seconds to 100 milliseconds, cost went from $0.0137 per conversation to zero marginal cost, and the system now handles 30,000+ conversations daily across 850,000 monthly sessions.

This extends [[agentic-search-beats-rag-for-live-codebases]] beyond code into documentation: RAG chunk retrieval fails when answers span multiple pages, but agents with filesystem navigation can explore, discover, and assemble context across documents. The key insight is that agents don't need real sandboxes — they need the illusion of [[files-are-the-universal-agent-interface]]. ChromaFs also pre-filters access control by excluding files from the tree before the agent initializes, connecting to the principle from [[structure-plus-reasoning-beats-flat-similarity]] that structured navigation outperforms flat similarity search.
