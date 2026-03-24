# AI Agents

Autonomous systems, tool use, multi-agent coordination, agent frameworks, and the path to useful autonomy.

## Key Themes

### Agent as Composer, Not Executor
Agents work best when given atomic tools and success criteria, not step-by-step instructions. The architecture shifts from coded features to prompted outcomes.

### Agent Knowledge Layer
Skills, memory, and context files give agents domain expertise without fine-tuning — and these layers are built on plain files that both humans and agents can evolve.

### Autonomous Agent Loops
Agents can work autonomously when given small enough stories, explicit acceptance criteria, and fast feedback (tests). Fresh context each cycle prevents degradation. Learnings compound across iterations.

### Agent Search: Reasoning Over Indexing
Agents search by reasoning about where to look, not by pre-indexing and similarity matching. This applies to codebases (grep/glob), documents (tree navigation), and knowledge (skill graph traversal).

### Personal Software & Agent Trust
Agents develop through relationship with individual users, not configuration. Trust transfers socially — colleagues trust agents operated by people they already trust. Organizational structures (Deputies/Sheriffs) emerge naturally from human authority hierarchies.

## Insights
- [[features-are-prompts-not-code]] — Agent-native means outcomes via prompts, not coded functions
- [[skills-as-markdown-replace-fine-tuning]] — Skill files may match fine-tuned models at zero training cost
- [[declarative-beats-imperative-for-agents]] — Give success criteria, not step-by-step instructions
- [[agent-memory-preserves-institutional-knowledge]] — Persistent memory files outlive employee turnover
- [[ai-self-improvement-loop-accelerates-everything]] — Each AI generation builds the next faster
- [[context-window-is-the-fundamental-constraint]] — Context is the bottleneck agents constantly manage
- [[autonomous-loops-need-small-stories-and-fast-feedback]] — Ralph pattern: context-sized tasks + tests = overnight shipping
- [[cross-user-knowledge-transfer-needs-no-fine-tuning]] — One user teaches, another benefits — no training infrastructure needed
- [[treat-ai-like-distributed-team-not-assistant]] — Distribute work across parallel streams with specialized roles
- [[three-layer-ai-stack-memory-search-reasoning]] — Memory + Search + Reasoning as the emerging agent architecture
- [[skill-graphs-enable-progressive-disclosure]] — Agents navigate interconnected knowledge progressively, not monolithic files
- [[webmcp-turns-websites-into-agent-native-interfaces]] — Websites expose structured tools to agents instead of relying on screen-scraping
- [[parallel-agents-create-management-problem-not-coding-problem]] — Multiple simultaneous agents shift bottleneck from coding to coordination
- [[structure-plus-reasoning-beats-flat-similarity]] — Structured knowledge navigated by reasoning outperforms flat similarity search
- [[evolving-summaries-beat-append-only-memory]] — Agents should rewrite memory profiles, not accumulate append-only facts
- [[treat-agent-as-operating-system-not-function]] — The OS mental model (RAM, hard drive, GC, I/O) unlocks architectural clarity for agents
- [[production-agents-route-decisions-not-every-call-to-llm]] — Decision trees for routine cases, LLMs only for ambiguous situations
- [[malleable-software-writes-its-own-extensions]] — Tiny core + self-extension replaces fixed-feature applications
- [[error-memory-enables-learning-without-retraining]] — Store error patterns to learn continuously without fine-tuning
- [[tools-are-contracts-between-deterministic-and-nondeterministic-systems]] — Agent tools are a new category of software requiring different design principles
- [[evaluate-tools-with-real-multi-step-tasks]] — Strong eval tasks require chained calls, ambiguity, and verifiable outcomes
- [[personal-software-grows-through-relationship-not-configuration]] — Agents evolve personality through ongoing interaction, not configuration
- [[agent-trust-transfers-from-human-credibility]] — Colleagues adopt agents operated by people they trust
- [[deputies-and-sheriffs-distribute-agent-authority]] — Two-tier agent hierarchy: personal Deputies + organizational Sheriffs
- [[orchestrator-agent-replaces-human-coordination]] — Meta-agent spawns, routes, and monitors specialized agents autonomously
- [[multi-model-ensemble-catches-single-model-blindspots]] — Triple-model review exploits diverse failure modes for emergent coverage
- [[tool-design-is-continuous-observation-see-like-an-agent]] — Tool design is iterative observation: watch the model, reshape the tool, repeat
- [[multi-model-orchestration-beats-any-single-family]] — AI is the computer: Perplexity orchestrates 19 models as a unified agent system
- [[kv-cache-hit-rate-determines-agent-economics]] — Cache hit rate is the #1 metric for production agents; append-only context is key
- [[safety-enforcement-belongs-in-tool-design-not-prompts]] — Tool-enforced safety scales; behavioral compliance with system prompts doesn't
- [[domain-skill-libraries-are-the-real-agent-moat]] — Core infrastructure is replicable in months; domain skill libraries take years
- [[weaponize-sycophancy-with-adversarial-agent-ensembles]] — Bug-finder/adversary/referee pattern exploits competing biases for high-fidelity results
- [[one-session-per-contract-beats-long-running-agents]] — Fresh context per task contract; orchestration layer spawns sessions
- [[separate-research-from-implementation-to-preserve-context]] — Split research and implementation into separate agent sessions
- [[frontier-companies-absorb-every-useful-agentic-pattern]] — Useful agentic patterns get absorbed into foundation company products
- [[intelligence-judgement-ratio-determines-automation-order]] — Intelligence-heavy professions automate first; judgement remains human
- [[data-agents-fail-from-missing-context-not-sql-gaps]] — Data agents fail from missing business context, not SQL generation gaps
- [[tribal-knowledge-is-the-last-mile-for-agent-automation]] — The most critical context is implicit and historically contingent — only humans provide it
- [[context-layers-must-be-living-systems]] — Context layers need self-updating feedback loops, not static YAML definitions
- [[observability-is-the-missing-agent-discipline]] — Agent systems need telemetry as a first-class engineering concern
- [[property-based-testing-explores-agent-input-spaces]] — Generative tests explore agent behavior across input spaces
- [[harness-quality-beats-model-intelligence]] — A mediocre agent inside a strong harness outperforms a stronger agent in a messy one
- [[rollback-safety-nets-enable-autonomy-not-intelligence]] — Cheap rollback makes aggressive autonomous exploration safe
- [[verification-is-a-red-queen-race]] — Optimizing against a fixed eval contaminates it — verification is a permanent race
- [[trust-boundaries-must-be-mapped-and-externalized]] — Where agent behavior is understood vs. unknown must be made auditable
- [[every-optimization-has-a-shadow-regression]] — Guard commands catch silent regressions in dimensions you're not optimizing
- [[time-bounded-evaluation-optimizes-for-usefulness]] — Fixed time budgets force optimization for real-world throughput
- [[skill-folder-structure-is-context-engineering]] — A skill's folder structure is its context architecture — file system as progressive disclosure
- [[detect-everything-notify-selectively]] — Watch every signal, but filter aggressively before alerting humans
- [[auto-generated-monitors-beat-handwritten-broad-checks]] — 1,000+ code-shaped monitors catch more than 10 hand-written broad checks
- [[unfocused-agents-develop-path-dependency]] — Broad mandates cause agents to explore the same paths repeatedly
- [[reasoning-evaporation-destroys-agent-decision-chains]] — Multi-step reasoning exists only in the context window; session close destroys it permanently
- [[agent-trace-accumulation-produces-emergent-world-models]] — Accumulated agent traces form discovered world models nobody explicitly designed
