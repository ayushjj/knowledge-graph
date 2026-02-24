# AI Product Building Knowledge Graph

50 curated insights about building AI products — structured for both human browsing and agent traversal.

## Why this exists

I didn't come up with any of these ideas — they come from people like Nicolas Bustamante, Andrej Karpathy, Boris Cherny, Clara Shih, Dan Shipper, and many others listed below. I just organized them into a connected graph so the patterns between them become visible.

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

These ideas belong to the people below — I'm just the curator who connected them.

**Major contributors (2+ insights):**

- **Nicolas Bustamante ([@nicbstme](https://twitter.com/nicbstme))** — AI agents for financial services, agent-native architecture, API-first SaaS
- **Rohit ([@rohit4verse](https://twitter.com/rohit4verse))** — Agent memory, knowledge transfer, tiered retrieval, embeddings
- **Anthropic Engineering** — Tool design, agent evaluation, best practices
- **Boris Cherny** — Claude Code team, agentic search, distributed agent workflows
- **Ashpreet Bedi ([@ashpreetbedi](https://twitter.com/ashpreetbedi))** — Spec-first development, error memory, Agno framework
- **[Dan Shipper](https://twitter.com/danshipper)** — Every, agent-native architectures
- **Alton Syn ([@WorkflowWhisper](https://twitter.com/WorkflowWhisper))** — Implementation gap, technical knowledge as liability

**Single-insight contributors:**

- **[Andrej Karpathy](https://twitter.com/karpathy)** — Declarative programming for agents
- **[Clara Shih](https://twitter.com/clarashih)** — SaaS as governance layer
- **Chrys Bader ([@chrysb](https://twitter.com/chrysb))** — Apps are dead, UI moat collapse
- **[Matt Shumer](https://twitter.com/mattshumer_)** — AI self-improvement loop
- **Nader Dabit ([@dabit3](https://twitter.com/dabit3))** — Software abundance
- **Will Manidis ([@WillManidis](https://twitter.com/WillManidis))** — Against taste / patron vs. discriminator
- **Steven Sinofsky ([@stevesi](https://twitter.com/stevesi))** — Technology transitions
- **Myles Marino ([@MylesMarino1](https://twitter.com/MylesMarino1))** — Middleware dies, vendor audits
- **Natasha Malpani ([@natashamalpani](https://twitter.com/natashamalpani))** — AI gold rush infrastructure
- **Gokul R ([@gokulr](https://twitter.com/gokulr))** — OpenClaw skills paradigm
- **Jaya Gupta ([@JayaGup10](https://twitter.com/JayaGup10))** — Decision traces, context graphs
- **Akshay Pachaar ([@akshay_pachaar](https://twitter.com/akshay_pachaar))** — Semantic highlighting research
- **Vasuman ([@vasuman](https://twitter.com/vasuman))** — AI Agents 101, decision routing
- **Benjamin De Kraker** — Compound engineering
- **Kushal Byatnal** — Boring tech wins (Extend)
- **Tobi Lütke ([@tolobi](https://twitter.com/tolobi))** — Malleable software, Shopify
- **[Ryan Carson](https://twitter.com/ryancarson)** — Autonomous coding loops (Ralph)
- **Heinrich ([@arscontexta](https://twitter.com/arscontexta))** — Skill graphs, progressive disclosure
- **[shadcn](https://twitter.com/shadcn)** — Session capture patterns
- **Jarrod Watts** — Context window constraints
- **[VectifyAI](https://github.com/VectifyAI/PageIndex)** — PageIndex, similarity vs. relevance

## How it grows

I add insights weekly as I encounter ideas that change how I build. There are two ways to add to the graph:

### Single URL or text — `/learn`

In Claude Code, run `/learn` and either:
- Paste a URL (tweet, article, blog post) — it fetches the content automatically via [Jina Reader](https://jina.ai/reader/)
- Paste raw text (notes, conversation summary, article excerpt)

The skill extracts insights, creates linked files, updates topic MOCs, and connects new nodes to the existing graph.

### Batch bookmarks — `/ingest`

For processing many bookmarks at once:

1. **Export your Twitter/X bookmarks** using a browser extension like [twitter-web-exporter](https://github.com/prinsss/twitter-web-exporter) (exports as JSON/CSV)
2. **Run `/ingest path/to/bookmarks.json`** in Claude Code
3. **Review the created insights** — the skill deduplicates against existing nodes, fetches content via Jina Reader, and runs `/learn` on each bookmark

This keeps the human in the loop — you decide when to process and can review what gets added.

Star or watch to get updates.

---

Built by [Ayush](https://github.com/ayushjj) with Claude Code.
