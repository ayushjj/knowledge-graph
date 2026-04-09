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
- [[ui-moat-collapses-api-becomes-purchasing-criterion]] — API design becomes the competitive surface
- [[boring-tech-wins-for-ai-native-startups]] — Simpler stack = faster AI-assisted shipping; monorepo amplifies context
- [[similarity-is-not-relevance-relevance-requires-reasoning]] — Vector search finds similar, but relevance requires LLM reasoning (PageIndex: 98.7% vs RAG's 70-80%)
- [[hybrid-search-is-the-default-not-the-exception]] — BM25 + vector + reranking is the production baseline, not an optimization
- [[verification-is-a-red-queen-race]] — Eval suites degrade the moment you optimize against them — structural property of verification
- [[stronger-models-expand-the-verification-gap]] — More capability means more deployment surface, harder verification
- [[trust-boundaries-must-be-mapped-and-externalized]] — Trust characterization must be auditable and connected to deployment gates
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
- [[rigid-schemas-exist-because-rigid-apps-demand-them]] — Agents clone entire CRMs in seconds; the rigid app was the constraint, data moats evaporate
- [[lakebases-decouple-compute-from-storage]] — Third-gen databases: serverless Postgres on cloud object stores, instant branching, scale to zero
- [[multi-model-orchestration-beats-any-single-family]] — The computer is the orchestration system: 19 models as unified intelligence
- [[context-inefficiency-compounds-three-penalties]] — Wasted tokens create a triple tax: higher cost, slower responses, degraded output quality
- [[kv-cache-hit-rate-determines-agent-economics]] — Stable prefixes + append-only context maximize cache reuse, slashing cost and latency
- [[safety-enforcement-belongs-in-tool-design-not-prompts]] — Embed safety invariants in the tool API, not in system prompt instructions
- [[data-agents-fail-from-missing-context-not-sql-gaps]] — Data agents fail from missing business context, not SQL generation gaps
- [[context-layers-supersede-semantic-layers]] — Context layers are a superset of semantic layers: entities, identity resolution, tribal knowledge, governance
- [[context-layers-must-be-living-systems]] — Context layers need self-updating feedback loops, not static artifacts
- [[observability-is-the-missing-agent-discipline]] — Agent systems need telemetry as a first-class engineering concern
- [[revealed-preferences-trump-stated-preferences]] — Track what users do, not what they say, for product decisions
- [[harness-quality-beats-model-intelligence]] — The surrounding machinery matters more than model capability
- [[time-bounded-evaluation-optimizes-for-usefulness]] — Fixed time budgets force practical optimization over idealized performance
- [[metadata-for-llm-consumers-needs-trigger-specs-not-summaries]] — Metadata consumed by LLMs needs trigger specifications, not human summaries
- [[inference-capability-lowers-input-fidelity-requirements]] — Smart listeners make imprecise input work — input quality bars drop when the consumer infers
- [[detect-everything-notify-selectively]] — Watch every signal, but filter aggressively before alerting humans
- [[auto-generated-monitors-beat-handwritten-broad-checks]] — 1,000+ code-shaped monitors catch more than 10 hand-written broad checks
- [[reasoning-evaporation-destroys-agent-decision-chains]] — Multi-step reasoning exists only in the context window; session close destroys it permanently
- [[latent-demand-is-the-strongest-product-signal]] — Make what people already do easier; CLAUDE.md, plan mode, and co-work all emerged from observed behavior
- [[scaffolding-is-tech-debt-against-the-next-model]] — Non-model code is ephemeral; the bitter lesson applied to product building
- [[agent-edits-are-automatic-decision-instrumentation]] — Agent proposals + human corrections = automatic decision trace capture
- [[permissioned-inference-is-harder-than-permissioned-retrieval]] — Enterprise context graphs need reasoning-level access control, not just data access
- [[traces-not-scores-enable-agent-improvement]] — Without reasoning trajectories, improvement rate drops hard
- [[virtual-filesystems-replace-sandboxes-for-agent-navigation]] — Intercept Unix commands → DB queries for 460x faster agent navigation
- [[trace-data-retention-must-match-ai-knowledge-lifespan]] — AI trace data has indefinite value; 30-day SaaS retention destroys institutional knowledge
- [[evals-must-augment-traces-in-place-not-diverge]] — Evaluations should live on trace data, not alongside it; divergent copies drift by design
- [[teacher-student-trace-distillation-beats-single-oracle]] — Multi-student + teacher consensus beats relying on a single high-reasoning trace
- [[shadow-execution-enables-safe-trace-learning]] — Shadow-path write replays enable learning from realistic flows without touching production
- [[knowledge-systems-need-dual-layer-storage]] — Every mature system discovers narrative depth and structured queries need separate storage
- [[navigation-beats-search-for-knowledge-retrieval]] — Native query interfaces beat flattening everything into vector embeddings
- [[knowledge-evolution-is-the-biggest-unsolved-problem]] — Append-only graphs rot; nobody has solved pruning, merging, or contradiction detection
- [[intelligence-location-determines-system-fragility]] — Where you put intelligence (code vs prompts) determines fragility and flexibility
- [[traces-are-the-universal-substrate-for-agent-learning]] — All learning loops consume the same raw material: execution traces
- [[evolved-harnesses-transfer-across-models]] — A single optimized harness improves five different LLMs
- [[causal-triage-must-gate-automated-fixes]] — Statistical regression detection can't distinguish your bugs from external failures
- [[evals-are-behavioral-pressure-vectors-not-neutral-measurements]] — Evals shape agent behavior like selection pressure; quality over quantity
- [[evals-are-gradient-signal-for-harness-engineering]] — ML training rigor (data quality, curation, train/test splits) applies to eval design
- [[trace-to-eval-flywheel-compounds-agent-quality]] — Usage → traces → evals → better harness: the self-reinforcing improvement loop
