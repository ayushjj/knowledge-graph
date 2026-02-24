# AI Coding Tools

Claude Code, Cursor, Windsurf, and leveraging AI to build software faster and better.

## Key Themes

### From Writing to Specifying
The workflow shifts from typing code to describing outcomes. Tests-first + declarative success criteria = the new engineering workflow.

### Context as the Bottleneck
The context window (~120k usable) is the fundamental constraint. Every effective practice — subagents, /clear, specs files, focused tasks — is a context management strategy.

### Compound Over Linear
Engineering with AI can compound: each iteration's learnings feed the next through updated CLAUDE.md, pattern docs, and skill files. The review phase (40% of time) is the compounding mechanism.

### Verification Over Prompting
The single highest-leverage practice isn't better prompts — it's giving the agent a way to check its own work. Tests, screenshots, subagent reviews — all are verification strategies that 2-3x quality.

## Insights
- [[declarative-beats-imperative-for-agents]] — Karpathy: success criteria > step-by-step instructions
- [[implementation-gap-collapsed]] — Building went from hours to minutes; clarity is the new skill
- [[technical-knowledge-becomes-liability]] — Implementation reflexes slow you down when agents handle the building
- [[software-abundance-unlocks-categories-that-never-existed]] — AI drops development costs 10-20x, making new software categories viable
- [[compound-engineering-makes-future-work-easier]] — Plan 40% / Work 20% / Review 40% makes each iteration smarter
- [[context-window-is-the-fundamental-constraint]] — Every AI coding best practice traces back to managing context
- [[verification-multiplies-agent-output-quality]] — Giving agents verification 2-3x quality of output
- [[autonomous-loops-need-small-stories-and-fast-feedback]] — Ralph ships 13 features/hour with context-sized tasks + tests
- [[boring-tech-wins-for-ai-native-startups]] — Simpler stack = faster AI-assisted shipping; monorepo is a superpower
- [[specs-are-external-memory-surviving-context-resets]] — Spec files bridge human intent across context resets
- [[treat-ai-like-distributed-team-not-assistant]] — 15 parallel streams with specialized roles > one perfect conversation
- [[agentic-search-beats-rag-for-live-codebases]] — Claude Code abandoned RAG for grep/glob; agent reasons about where to look
- [[prompt-caching-makes-long-context-economically-viable]] — Prefix matching enables 80%+ cost reduction, making rich context affordable
- [[parallel-agents-create-management-problem-not-coding-problem]] — Multiple agents shift bottleneck from coding to coordination
- [[building-beats-following-for-ai-mastery]] — Building real projects teaches AI faster than structured 30-day roadmaps
- [[session-capture-compounds-development-knowledge]] — shadcn's /done skill turns AI sessions into persistent, searchable knowledge
- [[tools-are-contracts-between-deterministic-and-nondeterministic-systems]] — Agent tools need design for non-deterministic consumers
- [[evaluate-tools-with-real-multi-step-tasks]] — Evaluate tools with chained calls and verifiable outcomes, not toy examples
- [[orchestrator-agent-replaces-human-coordination]] — Meta-agent manages agent swarm: spawns, routes by model strength, monitors via deterministic scripts
- [[multi-model-ensemble-catches-single-model-blindspots]] — Three different LLMs review the same PR for adversarial robustness
