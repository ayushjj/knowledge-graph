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

### Software Fundamentals Still Matter
Specs-to-code inverts the discipline that makes AI-assisted coding work: rewriting the spec while never reading the code compounds bad architecture instead of investing in it. Deep modules, TDD-forced small steps, and a shared ubiquitous-language file are the old-books answer (Ousterhout, The Pragmatic Programmer, DDD) to why a codebase is or isn't AI-legible — and why a shared design concept has to exist before any plan artifact does.

## Insights
- [[declarative-beats-imperative-for-agents]] — Karpathy: success criteria > step-by-step instructions
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
- [[tool-design-is-continuous-observation-see-like-an-agent]] — Tools that help weaker models constrain stronger ones; design by observing agent behavior
- [[harness-engineers-need-docs-as-first-class-output]] — Humans steer, agents execute: million-line codebase with zero hand-written code via harness engineering
- [[weaponize-sycophancy-with-adversarial-agent-ensembles]] — Exploit sycophancy through scoring-incentivized adversarial agents
- [[claude-md-should-be-routing-table-not-knowledge-base]] — CLAUDE.md as minimal IF-ELSE directory, not monolithic knowledge dump
- [[frontier-companies-absorb-every-useful-agentic-pattern]] — If it's truly useful, OpenAI/Anthropic will build it in
- [[one-session-per-contract-beats-long-running-agents]] — New session per contract; stop-hooks enforce completion
- [[separate-research-from-implementation-to-preserve-context]] — Research pollutes implementation context; split into separate sessions
- [[property-based-testing-explores-agent-input-spaces]] — Generative tests explore agent behavior that example-based tests miss
- [[rollback-safety-nets-enable-autonomy-not-intelligence]] — Automatic rollback enables autonomous coding loops without AGI
- [[inference-capability-lowers-input-fidelity-requirements]] — Voice/typos work because the LLM consumer infers intent from imprecise input
- [[adversarial-branch-walking-beats-review-for-planning]] — Socratic branch-walking during planning beats post-hoc review for decision quality
- [[unfocused-agents-develop-path-dependency]] — Broad mandates cause agents to explore the same paths repeatedly
- [[build-for-the-model-six-months-from-now]] — Target the capability frontier the model hasn't reached yet
- [[scaffolding-is-tech-debt-against-the-next-model]] — Non-model code gives 10-20% gain but gets wiped with the next model
- [[full-trace-filesystem-beats-compressed-summaries-for-harness-optimization]] — 10M tokens of full traces outperforms 26K compressed summaries
- [[uncorrelated-context-windows-are-test-time-compute]] — Fresh independent context windows multiply capability
- [[every-role-codes-when-implementation-cost-drops-to-zero]] — The generalist builder replaces the specialist software engineer
- [[meta-agents-beat-manual-harness-engineering]] — Autonomous 24hr harness optimization beats hand-engineering on production benchmarks
- [[delegation-is-not-orchestration]] — Spawning a child that dies with its parent is delegation; orchestration needs durable child runs
- [[supervise-loops-from-a-leveraged-point-not-from-inside-them]] — Oversee many agent loops from a leveraged vantage, don't inspect each step
- [[research-speed-is-the-rate-you-discover-youre-wrong]] — Tooling is a first-class research activity; one-command runs, config-reproducible, seconds to compare
- [[engineering-and-research-have-fused-at-the-frontier]] — Building the harness/eval/pipeline is what gets your hypotheses tested, not a junior chore
- [[bad-code-is-the-most-expensive-its-ever-been]] — A hard-to-change codebase blocks you from AI's full bounty; specs-to-code inverts "invest in system design daily"
- [[specs-to-code-degrades-without-reading-the-code]] — Rewrite-the-spec-and-regenerate without reading code compounds worse code each cycle — vibe coding by another name
- [[ubiquitous-language-file-reduces-ai-verbosity-and-drift]] — A DDD-style glossary file cuts AI verbosity and keeps implementation aligned with the plan
- [[feedback-loop-speed-is-the-ais-speed-limit]] — LLMs outrun their headlights by default; TDD forces the small steps that keep generation inside what feedback can verify
- [[deep-modules-make-codebases-ai-legible-and-testable]] — Ousterhout's deep-vs-shallow modules decide whether AI can navigate a codebase and whether you can gray-box delegate to it
- [[system-prompt-guardrails-become-constraints-as-models-get-more-imaginative]] — Claude Code cut 80% of its system prompt because examples built for a weaker model started capping a smarter one
- [[models-are-grown-not-designed-treat-fable-empirically]] — Capability is grown and discovered empirically, not designed to spec — treat it like biology, not physics
- [[capability-overhang-tools-unlock-latent-model-ability]] — A model can already know the answer and still fail to produce it until a tool lets it act on what it knows
- [[reducing-your-unknowns-is-the-trainable-skill-of-agentic-coding]] — Expert prompts leave fewer unknowns open, and working with the agent is how you train that skill
- [[symmetric-failure-of-over-and-under-specified-instructions]] — Over-specify and you block a needed pivot; under-specify and it defaults to the wrong assumptions
