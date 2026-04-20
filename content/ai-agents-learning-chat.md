# AI Agents Learning Chat

A collection of Twitter posts and discussions about AI agents, tools, and architecture patterns.

---

## Topic 1: AI Agents 101 (by @vasuman)

### Source Post Summary

**What Are Agents**

An agent is a system that takes actions on your behalf based on the goals you give it, not instructions. The difference is important:
- Script: "send this email" → does only that
- Agent: "make sure this customer gets a response within 4 hours" → figures out what needs to happen (check if someone responded, draft reply if not, escalate if complex, verify customer received it)

**The Agent Loop:**
1. Observes the current state (read emails, check databases)
2. Decides what action to take based on the goal
3. Takes the action (sends message, triggers workflow)
4. Observes the result
5. Repeats until the goal is met or hits a stopping condition

**The Three Components Every Agent Needs:**

1. **Perception**: How the agent sees the world (APIs, databases, document stores)
2. **Decision Logic**: How the agent chooses what to do next. Production agents use structured decision trees for routine cases and only invoke the model for ambiguous situations
3. **Action Interface**: How the agent affects the world. Every action needs to be logged, reversible where possible, and gated by permissions

**Tools Are How Agents Take Actions**

Tools are functions the agent can call. Each tool does one thing: send an email, query a database, create a calendar event.

The model doesn't execute tools directly. It returns a structured request: "I want to call the send_email tool with these parameters." The orchestration layer then validates, executes, and feeds results back.

**Context Windows & Memory**

- Context windows are limited (even 200K tokens can't fit entire project history)
- External memory = files or databases the agent can read and write
- Pattern: use context window for active work (current task), external memory for history (completed tasks)
- Memory also serves as an audit trail

**Planning vs Execution**

Most agent failures happen because people skip planning. For anything non-trivial, planning should be first:
- Agent breaks down goal into steps
- Identifies dependencies
- Human reviews and corrects misunderstandings
- Then execution

**Handling Failures:**
1. Retry with backoff (for transient failures)
2. Human-in-the-loop (for low-confidence decisions)
3. Safe failures (never delete old data)

**Guardrails and Permissions:**
- Guardrails = hard limits agent can't bypass
- Permissions = role-based access controls
- Agent doesn't know about constraints; orchestration layer enforces rules

### Discussion Notes

**The Core Distinction: Goals vs Instructions**

| Bot with Instructions | Agent Version |
|----------------------|---------------|
| User asks → search → return results | User asks → understand intent → search → evaluate quality → maybe ask clarifying question → return best matches → follow up if needed |

**Key Insight for Production:**

> "Production agents use structured decision trees for routine cases and only invoke the model for ambiguous situations"

This addresses response time issues. Handle exact matches without AI, use AI only for ambiguous queries, cache common patterns.

---

## Topic 2: Malleable Software (by @tolobi - Shopify CEO)

### Source Post

> "Pi is the most interesting agent harness. Tiny core, able to write plugins for itself as you use it. It RLs itself into the agent you want. I was missing cc's tasks system and told it to spawn Claude in tmux and interrogate it about it and make an implementation for itself. It nailed it, including the UX. Clawdbot is based on it and now it makes sense why it feels so magical. Dawn of the age of malleable software."

### Discussion Notes

**The Architecture Pattern: Tiny Core + Self-Extension**

Traditional software: Fixed features → you adapt your workflow to the tool

Malleable software: Minimal core → tool adapts itself to your workflow

**Pi's approach:**
```
Tiny Core (basic agent loop)
    ↓
Observes what you're trying to do
    ↓
Writes plugins/extensions for itself
    ↓
Learns from your usage (RL = reinforcement learning)
    ↓
Becomes the agent YOU specifically need
```

**The Example:**
Tobi wanted Claude Code's "tasks" feature in Pi. Instead of filing a feature request or building it manually, he told Pi: "Go figure out how cc's tasks work and build that for me."

Pi then:
1. Spawned Claude in tmux
2. Asked Claude about its own tasks system
3. Implemented a version
4. Got the UX right

**The agent used another AI to learn, then modified itself.**

---

## Topic 3: Dash - Self-Learning Data Agent (by @ashpreetbedi)

### Source Post Summary

OpenAI published how they built their internal data agent. Dash is an open-source implementation inspired by it.

**The Problem:**
> "Most Text-to-SQL agents are stateless—they make mistakes, you fix them, then they make the same mistake again because every session starts fresh."

**The 6 Layers of Context:**

1. **Table Usage**: schema, columns, relationships
2. **Human Annotations**: metrics, definitions, gotchas
3. **Query Patterns**: SQL that's known to work
4. **Institutional Knowledge**: external docs, research
5. **Memory**: error patterns, discovered fixes
6. **Runtime Context**: live schema when things change

**The Self-Learning Loop:**

Instead of fine-tuning or retraining, Dash learns through two complementary systems:

| System | Stores | How It Evolves |
|--------|--------|----------------|
| **Knowledge** | Validated queries, business context | Curated by you + dash |
| **Learnings** | Error patterns and fixes | Managed automatically |

```
User Question
     ↓
Retrieve Knowledge + Learnings
     ↓
Reason about intent
     ↓
Generate grounded SQL
     ↓
Execute and interpret
     ↓
 ┌────┴────┐
 ↓         ↓
Success    Error
 ↓         ↓
 ↓         Diagnose → Fix → Save Learning
 ↓                           (never repeated)
 ↓
Return insight
 ↓
Optionally save as Knowledge
```

**GPU-Poor Continuous Learning:**
No fine-tuning, no retraining. Just 5 lines of code to enable learning.

### Discussion Notes

**Dash is SQL-only** - built for Text-to-SQL, not document search.

**But Agno (the framework Dash is built on) supports document RAG:**
- PDF, DOCX, Text, JSON ingestion
- PgVector with hybrid search
- Self-learning (Learning Machine)
- User memory across sessions

**For building an internal knowledge base (meeting transcripts, OneDrive docs), use Agno directly instead of Dash.**

---

## Topic 4: Writing Effective Tools for Agents (Anthropic Engineering)

### Source
https://www.anthropic.com/engineering/writing-tools-for-agents

### Core Insight

> "Tools are a new kind of software which reflects a contract between deterministic systems and non-deterministic agents."

Agents aren't normal software—they're non-deterministic, context-limited, and rely on tool descriptions to choose. Design tools for *how agents think*, not how programmers think.

### The 4-Step Process

**Step 1: Build a Prototype**
- Stand up tools quickly (Claude Code can one-shot them)
- Wrap in local MCP server or Desktop extension
- Test yourself first to identify rough edges

**Step 2: Generate Evaluation Tasks**
- Real-world complexity, not toy problems
- Tasks that require multiple tool calls
- Pair each prompt with a verifiable response

| Weak Task | Strong Task |
|-----------|-------------|
| "Search for customer_id=9182" | "Customer 9182 was charged 3x. Find logs, determine if others affected" |
| "Schedule meeting with jane@acme.corp" | "Schedule meeting with Jane next week about Acme project. Attach last meeting notes, reserve room" |

**Step 3: Run Programmatic Evaluations**
- Track: accuracy, tokens, tool calls, errors, reasoning
- Use interleaved thinking to see *why* agent chose tools
- Read between the lines—what agents omit matters

**Step 4: Collaborate with Agents**
- Paste evaluation transcripts into Claude Code
- Let Claude analyze failures and refactor tools
- Use held-out test sets to avoid overfitting

### Design Principles

| Principle | Bad | Good |
|-----------|-----|------|
| **Choose right tools** | `list_contacts` (returns everything) | `search_contacts` (targeted) |
| **Consolidate workflows** | `list_users` + `list_events` + `create_event` | `schedule_event` (handles all) |
| **Namespace clearly** | `search` | `asana_projects_search` |
| **Return meaningful context** | `uuid: "a1b2c3..."` | `name: "Jane Smith"` |
| **Token efficiency** | Return everything | Paginate, filter, truncate with defaults |
| **Helpful errors** | `Error: Invalid parameter` | `Error: user_id must be numeric. Example: user_id=12345` |

### Response Format Pattern

Add a `response_format` parameter to control verbosity:

```python
enum ResponseFormat {
   DETAILED = "detailed",  # includes IDs for chaining
   CONCISE = "concise"     # just content, ~⅓ tokens
}
```

### What to Avoid

- Too many overlapping tools
- Cryptic or noisy outputs
- Vague descriptions that mislead the agent
- Evaluation tasks that are too simple to reveal real problems

---

## Key Takeaways

1. **Goals vs Instructions**: Agents work on goals, not step-by-step instructions
2. **Three Components**: Perception, Decision Logic, Action Interface
3. **Planning First**: Most failures come from skipping the planning step
4. **Context is Everything**: 6 layers of context + self-learning beats stateless agents
5. **Tool Design Matters**: Tools should match how agents think, not how APIs work
6. **Evaluate Systematically**: Real tasks, multiple tool calls, track reasoning
7. **Iterate with Agents**: Let Claude analyze failures and improve tools

---

## Resources

- [Anthropic: Writing Effective Tools for Agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
- [Dash GitHub](https://github.com/agno-agi/dash)
- [Agno Framework](https://docs.agno.com)
- [Tool Evaluation Cookbook](https://platform.claude.com/cookbook/tool-evaluation-tool-evaluation)
