---
title: "How We Built a Virtual Filesystem for Our Assistant"
author: "Mintlify"
url: https://www.mintlify.com/blog/how-we-built-a-virtual-filesystem-for-our-assistant
date: 2026-03-24
type: article
---

ChromaFs: Virtual Filesystem for Documentation Assistance

Mintlify created ChromaFs, a virtual filesystem that enables AI assistants to efficiently explore documentation without traditional sandbox infrastructure.

Key Problem Solved: Traditional RAG systems retrieve only matching text chunks, failing when answers span multiple pages. Using real filesystems required spinning up isolated sandboxes with ~46-second initialization times and annual costs exceeding $70,000 at scale.

The Solution: Rather than deploying actual virtual machines, Mintlify built an illusion of a filesystem by intercepting Unix commands and translating them into database queries against their existing Chroma vector database.

Performance Improvements:
- Boot time: Reduced from approximately 46 seconds to 100 milliseconds
- Cost: Dropped from $0.0137 per conversation to zero marginal cost
- Scale: Now handles 30,000+ conversations daily across 850,000 monthly sessions

Directory Structure: The system stores file trees as compressed JSON, enabling instant ls, cd, and find operations through local memory caches.

Access Control: User permissions filter files before agent initialization — "If a user lacks access to a file, that file is excluded from the tree entirely."

Page Reconstruction: Documents split into database chunks are reassembled when agents execute cat commands, with results cached to prevent redundant queries.

Recursive Search: grep -r operations use Chroma as a coarse filter, then refine results in-memory, completing in milliseconds rather than network-dependent timeframes.

Technical Foundation: ChromaFs builds on Vercel Labs' just-bash, a TypeScript bash implementation providing a pluggable filesystem interface for command parsing and execution.
