# Lattice Learning Framework

## Problem Statement

Consuming large volumes of content (articles, books, podcasts, courses) without structured processing leads to cognitive overwhelm — the "reading treadmill." Information is collected but not internalized. Technical terms are heard but not understood. The user can't connect dots across domains or apply knowledge when building.

Dan Koe's framing: "infinite input with zero processing" — the third Narrower of the Mind. Your mental metabolism can't digest faster than you consume, so unprocessed information accumulates without compounding.

Munger's framing: "You can't really know anything if you just remember isolated facts. If the facts don't hang together on a latticework of theory, you don't have them in a usable form."

## Goal

A reusable framework for transforming any body of consumed content into an internalized mental latticework — a structure where new concepts have a place to land, technical terms carry intuitive meaning, and cross-domain connections emerge naturally.

## Who This Is For

Non-technical learners who consume content about technical domains. People who can explain *what* something is but not *why* it matters or *when* it applies. Builders who want to connect dots across projects.

## Core Principles

### 1. Digestion, Not Consumption
The framework processes existing knowledge. It does NOT introduce new information. Every concept discussed must already exist in the learner's collected materials. This is the "Day 3-4" of Koe's protocol: "things will start surfacing — unfinished thoughts, random connections, ideas you forgot existed."

### 2. Analogy First, Term Second
Every technical concept gets its everyday equivalent BEFORE the technical name. The analogy creates the mental slot; the term fills it. If you say "RAG" first, the learner stores a meaningless acronym. If you say "a prep cook who runs to the pantry and grabs ingredients before the chef starts cooking" first, the learner has a vivid image — THEN you label it "RAG."

### 3. Sequential Building (Floor by Floor)
Concepts are ordered so each builds on the previous. You cannot understand why verification matters (floor 2) until you understand what context is (floor 1). The sequence creates a feeling of inevitability — each new idea feels obvious given what came before.

### 4. Cluster, Don't Enumerate
Never present all insights at once. Group them into 4-7 "Big Ideas" (meta-themes). Each Big Idea contains 5-15 specific insights, but the learner interacts with the Big Idea as a single unit. This mirrors Munger: "80-90 important models carry 90% of the freight."

### 5. Bridge to Existing Mental Models
Every new concept should connect to something the learner already understands deeply. Cross-domain bridges (psychology explaining AI behavior, economics explaining business model shifts) are the strongest retention mechanism. They answer "why does this work this way?" with "because the same pattern shows up in X, which you already know."

### 6. Verify Before Advancing
After each Big Idea, ask 1-2 understanding-check questions. If the learner struggles, REFRAME — don't add more information. The check isn't a test; it's a digestion signal. If they can explain it in their own words, the latticework node is placed.

### 7. Partial Sessions Are Complete Sessions
Internalizing 2 Big Ideas thoroughly beats skimming 5. Each Big Idea is self-contained even though they build sequentially. Stopping mid-framework is explicitly supported — it avoids recreating the overwhelm the framework is designed to fix.

## Framework Template: How to Build a Lattice Session

### Step 1: Inventory the Raw Material
Catalog what the learner has consumed. What topics? What volume? What format? The key question: "What have you been reading/hearing about but don't feel you truly understand?"

### Step 2: Identify the Big Ideas (4-7 Meta-Themes)
Cluster all consumed content into meta-themes. Each Big Idea should:
- Be nameable in 5-7 words
- Contain a clear "why this matters" claim
- Map to an everyday analogy
- Cover 5-15 specific concepts/insights

### Step 3: Sequence the Big Ideas
Order them so each builds on the previous. Rules:
- Concrete before abstract
- "What is it?" before "Why does it matter?"
- Individual concepts before systemic effects
- Foundation (the thing itself) before implications (what changes because of it)

### Step 4: For Each Big Idea, Prepare:

**a) The Anchor Analogy** — One extended metaphor from everyday life (kitchen, race track, company, storefront, snowball). The analogy must be rich enough that 2-4 technical terms can be explained within it.

**b) Technical Terms** — 2-4 terms that live within this analogy. Each term gets:
- The everyday equivalent (inside the analogy)
- The technical name
- One sentence on why it matters (the "so what?")

**c) The Mental Model Bridge** — One connection to a principle the learner already knows. This is the "aha" that makes retention stick. Format: "[Existing concept] explains why [new concept] works this way."

**d) Understanding Check** — 1-2 questions that require the learner to synthesize, not recall. Good: "If two companies both use the same AI, what determines who wins?" Bad: "What does RAG stand for?"

**e) Transition** — One sentence that makes the next Big Idea feel inevitable given what was just learned.

### Step 5: Run the Session Interactively
- Present one Big Idea at a time
- Give the analogy, then layer terms onto it
- Surface the mental model bridge
- Ask the understanding check
- Only advance when the learner demonstrates comprehension
- Periodically connect back to the motivating problem ("this is why you felt overwhelmed — you had the pieces but no structure")

### Step 6: (Optional) Create Summary Artifact
After the session, if the learner wants a reference, produce a single-page summary: Big Idea name, analogy, key terms, and the "one sentence" for each. This is a reference, not a replacement for the conversation.

## First Application: AI Concepts from the Knowledge Graph

### Raw Material
124 insights across AI agents, architecture, coding tools, business models, knowledge systems, future of AI — plus 66 mental-models insights (Munger psychology, economics, philosophy).

### The 5 Big Ideas

| # | Name | Analogy | Key Terms | Mental Model Bridge |
|---|------|---------|-----------|-------------------|
| 1 | "The Kitchen, Not the Stove" — Context Is the Product | Restaurant kitchen (stove = model, countertop = context window, recipe = skill, ingredients = data) | Context window, token, RAG, fine-tuning, context engineering | Circle of Competence |
| 2 | "The Race Track, Not the Race Car" — Harness & Verification | Race track (guardrails, pit stops, timing gates, foam practice track) | Harness, eval, sandbox, deterministic/non-deterministic, rollback | Confluence of Tendencies (Lollapalooza) |
| 3 | "A Team, Not an Employee" — How Agents Work | Company with roles (sheriff, deputies, orchestrator, specialists) | Agent, MCP, declarative vs. imperative | Incentive-Caused Bias |
| 4 | "Agents Are the New Customers" — Business Shifts | Storefront redesign (customers are now personal assistants) | API, embeddings/vectors | Scale Advantages Cascade |
| 5 | "The Snowball" — Knowledge Compounds | Snowball rolling downhill (each learning makes the next easier) | Agentic search, similarity vs. relevance | Latticework of Models (full circle) |

### Sequence Rationale
1 → 2: "Context is the product" → "But how do you ensure quality?" → harness
2 → 3: "Harness controls one AI" → "What about many?" → agents as teams
3 → 4: "Agents do work" → "That changes who buys software" → business shifts
4 → 5: "All of this compounds" → "But only if you process it" → snowball / latticework

### Mapped Graph Insights (by Big Idea)

**Idea 1 — Context:** `context-is-the-product-not-the-model`, `context-window-is-the-fundamental-constraint`, `skills-as-markdown-replace-fine-tuning`, `files-are-the-universal-agent-interface`, `data-agents-fail-from-missing-context-not-sql-gaps`, `prompt-caching-makes-long-context-economically-viable`, `context-inefficiency-compounds-three-penalties`, `model-market-fit-before-product-market-fit`

**Idea 2 — Harness:** `harness-quality-beats-model-intelligence`, `verification-multiplies-agent-output-quality`, `verification-is-a-red-queen-race`, `rollback-safety-nets-enable-autonomy-not-intelligence`, `the-80-99-gap-is-where-ai-products-die`, `every-optimization-has-a-shadow-regression`, `tools-are-contracts-between-deterministic-and-nondeterministic-systems`, `safety-enforcement-belongs-in-tool-design-not-prompts`, `stronger-models-expand-the-verification-gap`

**Idea 3 — Agents:** `declarative-beats-imperative-for-agents`, `features-are-prompts-not-code`, `deputies-and-sheriffs-distribute-agent-authority`, `treat-ai-like-distributed-team-not-assistant`, `parallel-agents-create-management-problem-not-coding-problem`, `production-agents-route-decisions-not-every-call-to-llm`, `autonomous-loops-need-small-stories-and-fast-feedback`, `technical-knowledge-becomes-liability`, `one-session-per-contract-beats-long-running-agents`, `webmcp-turns-websites-into-agent-native-interfaces`

**Idea 4 — Business:** `ui-moat-collapses-api-becomes-purchasing-criterion`, `agents-become-the-buyer`, `saas-survives-as-governance-and-coordination-layer`, `technology-transitions-create-more-not-less`, `software-abundance-unlocks-categories-that-never-existed`, `sell-the-work-not-the-tool`, `autopilots-capture-work-budget-not-tool-budget`, `llms-selectively-destroy-vertical-software-moats`, `llms-complete-aggregation-theory-by-collapsing-interface-layer`, `outsourcing-is-the-autopilot-wedge`

**Idea 5 — Compounding:** `compound-engineering-makes-future-work-easier`, `similarity-is-not-relevance-relevance-requires-reasoning`, `agentic-search-beats-rag-for-live-codebases`, `structure-plus-reasoning-beats-flat-similarity`, `agent-memory-preserves-institutional-knowledge`, `domain-skill-libraries-are-the-real-agent-moat`, `proprietary-feedback-loops-widen-the-moat`, `tribal-knowledge-is-the-last-mile-for-agent-automation`, `session-capture-compounds-development-knowledge`, `evolving-summaries-beat-append-only-memory`

## Future Applications

This framework is domain-agnostic. Potential future applications:
- **Mental models domain:** Digest the 66 Munger/psychology/economics insights into their own latticework
- **New technical domain:** If the user enters a new field (e.g., product management, design), apply the same template
- **Book processing:** After /learn-book extracts insights from a book, run a lattice session to internalize them
- **Post-ingest digestion:** After a batch /ingest of bookmarks, run a lattice session on the newly added insights

## Success Criteria

- Learner can explain each Big Idea in their own words using the analogy
- Learner can classify a NEW concept they encounter into one of the Big Ideas
- Learner can answer "why does X matter?" not just "what is X?"
- Learner reports feeling less overwhelmed and more oriented
- Framework is reusable: can be applied to a different domain with only Step 2-4 changing

## Risks

- **Oversimplification:** Analogies can mislead if pushed too far. Mitigated by naming where analogies break down.
- **Session too long:** 5 Big Ideas at 12-15 min each = 60-75 min. Mitigated by Principle 7 (partial sessions are complete).
- **Analogy mismatch:** The chosen everyday domain might not resonate with the specific learner. Mitigated by interactive format — can swap analogies on the fly.
- **Coverage gaps:** Not all 124 insights map neatly to 5 themes. ~15-20 insights may be orphaned. Acceptable — the latticework doesn't need to be exhaustive to be useful.
