# AI Product Building Knowledge Graph

50 curated insights about building AI products — distilled from experts like Karpathy, Dan Shipper, Clara Shih, Addy Osmani, and others. Structured for both human browsing and agent traversal.

## Why this exists

I follow AI builders and thinkers daily. The best insights are scattered across tweets, essays, and conversations. This graph captures the ones that actually changed how I build — connected so you can follow threads across topics.

## How to use it

### Browse on GitHub

Start with a topic, then follow links to individual insights:

| Topic | What it covers |
|-------|---------------|
| [AI Agents](topics/ai-agents.md) | Autonomous systems, tool use, multi-agent, agent frameworks |
| [AI-Native Product Architecture](topics/ai-native-product-architecture.md) | Database, search, context graphs, RAG, system design |
| [AI Coding Tools](topics/ai-coding-tools.md) | Claude Code, Cursor, leveraging AI to build faster |
| [Future of AI Business](topics/future-of-ai-business.md) | How businesses will be created and run in the AI age |
| [Business Models](topics/business-models.md) | AI-native SaaS, pricing, GTM, revenue models |
| [Knowledge Systems](topics/knowledge-systems.md) | Context engineering, skill graphs, second brains, memory |

### Clone as Obsidian vault

```bash
git clone https://github.com/ayushjj/knowledge-graph.git
```

Open the cloned folder in Obsidian. All `[[wikilinks]]` resolve natively — you get full graph visualization showing how insights connect across topics.

### Use with Claude Code or other AI agents

Point your agent at `graph-index.yaml` — it contains all 50 nodes' metadata, descriptions, and link structure in a single file. An agent can read this one file and navigate the entire graph without scanning individual files.

```
# Example: add to your CLAUDE.md or agent context
Read graph-index.yaml from [repo-path] for AI product building knowledge
```

## How it's structured

```
knowledge-graph/
├── index.md              # Entry point — topic map + cross-domain highlights
├── graph-index.yaml      # Machine-readable graph (all nodes + links)
├── topics/               # 6 topic MOCs (Maps of Content)
│   ├── ai-agents.md
│   ├── ai-native-product-architecture.md
│   ├── ai-coding-tools.md
│   ├── future-of-ai-business.md
│   ├── business-models.md
│   └── knowledge-systems.md
└── insights/             # 50 individual insight files
    ├── context-is-the-product-not-the-model.md
    ├── features-are-prompts-not-code.md
    └── ...
```

**Topics** are Maps of Content — each groups related insights with key themes and wikilinks.

**Insights** are atomic nodes with YAML frontmatter (title, description, topics, source) and prose. Each connects to other insights via typed links.

**graph-index.yaml** is the materialized link map — read this instead of scanning all files. Contains every node's metadata, outgoing links, and incoming links.

## Cross-domain insights

Some insights span multiple topics. These are the most connected nodes in the graph:

- **Context is the product, not the model** — spans architecture, business models, knowledge systems (11 incoming links)
- **Middleware dies, infrastructure survives** — spans business models, future of AI (7 incoming links)
- **Declarative beats imperative for agents** — spans agents, coding tools (8 incoming links)
- **Compound engineering makes future work easier** — spans coding tools, knowledge systems (9 incoming links)

## Sources

Insights are distilled from these people and teams:

- **[Dan Shipper](https://twitter.com/danshipper)** — Every, AI-native product thinking
- **[Andrej Karpathy](https://twitter.com/karpathy)** — AI fundamentals, declarative programming
- **[Clara Shih](https://twitter.com/clarashih)** — AI business strategy, SaaS evolution
- **[Addy Osmani](https://twitter.com/addyosmani)** — AI-assisted engineering practices
- **Rohit ([@rohit4verse](https://twitter.com/rohit4verse))** — Agent memory, knowledge transfer
- **[Matt Shumer](https://twitter.com/mattshumer_)** — AI self-improvement, creative AI
- **Boris Cherny** — Claude Code team, agentic search
- **[Ryan Carson](https://twitter.com/ryancarson)** — Autonomous coding loops
- **Anthropic Engineering** — Tool design, agent evaluation
- **[shadcn](https://twitter.com/shadcn)** — Session capture patterns
- **Evan Schwartz** — OpenAI infrastructure
- **Heinrich ([@arscontexta](https://twitter.com/arscontexta))** — Skill graphs

## How it grows

I add insights weekly as I encounter ideas that change how I build. New nodes get linked to the existing graph via a `/learn` skill in Claude Code.

Star or watch to get updates.

---

Built by [Ayush](https://github.com/ayushjj) with Claude Code.
