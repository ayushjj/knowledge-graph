---
title: "Agentic search beats RAG for live codebases"
description: "Claude Code abandoned RAG and vector DB in favor of letting the agent grep/glob/read — reasoning about where to look outperforms pre-indexed similarity search for code"
topics: [ai-native-product-architecture, ai-coding-tools]
source: "Boris Cherny (Claude Code team) — Twitter discussion with Daniel San"
date: 2026-02-24
---

Claude Code's search evolution tells a clear story: the early version used RAG with a local vector DB, and the current version uses agentic search (glob/grep/read). The agent won. For live codebases, the problems with RAG are compounding: embeddings go stale as code changes, re-indexing needs a continuous background job, code must be sent to an embedding service (privacy concern), and retrieval quality depends on chunking choices that may not match the query's needs.

Agentic search sidesteps all of this — the LLM thinks "authentication logic probably lives in /src/auth or files named *auth*," runs glob and grep to verify, then reads the specific files. No index, no staleness, no privacy leakage. This is [[similarity-is-not-relevance-relevance-requires-reasoning]] applied to code: the agent **reasons** about codebase structure rather than relying on embedding similarity. It connects to [[context-window-is-the-fundamental-constraint]] because the agent's search strategy is fundamentally about managing what enters the context window. The trade-off is more LLM calls per search — but for [[boring-tech-wins-for-ai-native-startups]], the simplicity of "just use bash tools" beats maintaining a complex indexing pipeline.
