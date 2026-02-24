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
- [[build-for-obsolescence-models-eat-scaffolding]] — Improving models will make today's workarounds unnecessary
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
