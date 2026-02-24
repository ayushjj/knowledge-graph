# AI-Native Product Architecture

Database design, search systems, context graphs, RAG pipelines, and system design patterns for AI-first products.

## Key Themes

### Context as Moat
The model is a commodity — differentiation lives in the data, skills, and structured context you wrap around it. Products compete on context quality, not model choice.

### Files Over Databases
Plain files (markdown, YAML, JSON) beat traditional databases for agent-native systems: human-inspectable, agent-readable, version-controlled, no deployment needed.

### Search Architecture: Hybrid + Reasoning
Neither keyword nor semantic search alone is complete. The production default is hybrid (BM25 + vector + reranking), but for complex domains, structure + reasoning (PageIndex, agentic search) outperforms flat similarity.

### The Emerging AI Stack
Three layers — Memory (who is this user), Search (find the right info), Reasoning (navigate complexity) — all running on PostgreSQL. The infrastructure is boring; the intelligence is in the layers above.

### Agent-Web Integration
WebMCP and structured tool exposure shift websites from visual interfaces to agent-traversable capability surfaces. The web itself becomes an API layer.

## Insights
- [[context-is-the-product-not-the-model]] — Differentiation is data + skills + UX + domain knowledge, not which model you call
- [[files-are-the-universal-agent-interface]] — Markdown and YAML on disk beat databases for agent systems
- [[features-are-prompts-not-code]] — Architecture where features are prompts composed from atomic tools
- [[skills-as-markdown-replace-fine-tuning]] — Skill files as the knowledge layer of AI products
- [[decision-traces-are-the-missing-data-layer]] — Capturing "why" creates searchable precedent and a new system of record
- [[build-for-obsolescence-models-eat-scaffolding]] — Design systems that gracefully shed complexity
- [[ui-moat-collapses-api-becomes-purchasing-criterion]] — API design becomes the competitive surface
- [[boring-tech-wins-for-ai-native-startups]] — Simpler stack = faster AI-assisted shipping; monorepo amplifies context
- [[similarity-is-not-relevance-relevance-requires-reasoning]] — Vector search finds similar, but relevance requires LLM reasoning (PageIndex: 98.7% vs RAG's 70-80%)
- [[hybrid-search-is-the-default-not-the-exception]] — BM25 + vector + reranking is the production baseline, not an optimization
- [[structure-plus-reasoning-beats-flat-similarity]] — Across documents, code, and skills, structured knowledge navigated by reasoning wins
- [[agentic-search-beats-rag-for-live-codebases]] — Claude Code abandoned RAG for grep/glob; agent reasons about where to look
- [[postgresql-scales-further-than-you-think]] — OpenAI: 1 primary + ~50 replicas, millions QPS, no sharding
- [[three-layer-ai-stack-memory-search-reasoning]] — Memory + Search + Reasoning layers, all on PostgreSQL
- [[response-ux-should-match-retrieval-intelligence]] — If retrieval is semantic, display should be too
- [[webmcp-turns-websites-into-agent-native-interfaces]] — Websites expose structured tools to agents via MCP protocol
- [[prompt-caching-makes-long-context-economically-viable]] — Prefix matching enables 80%+ cost reduction for rich context systems
- [[embeddings-measure-similarity-not-truth]] — Vector databases have a temporal blind spot; cosine similarity can't resolve contradictions
- [[tiered-retrieval-prevents-context-overload]] — Summaries → items → raw resources; LLM decides at each tier if it has enough
- [[production-agents-route-decisions-not-every-call-to-llm]] — Decision trees for routine cases, LLMs only for ambiguity in production
- [[error-memory-enables-learning-without-retraining]] — Dash's six context layers enable GPU-poor continuous learning
