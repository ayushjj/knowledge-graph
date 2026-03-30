# AI Concepts Lattice: Quick Reference Card

*Generated from interactive session on 2026-03-28. This is a reference, not a replacement for the conversation that built it.*

## The 5 Shelves

### 1. The Kitchen — Context Is the Product
**Core claim:** The AI model is the stove — everyone buys the same one. Your restaurant wins on recipes (domain knowledge), ingredients (data), menu (UX), and chef training (skills).

| Term | Everyday Equivalent | Why It Matters |
|------|-------------------|----------------|
| Context window | Countertop space | How much the AI can see at once — finite, so what you put on it is everything |
| Token | One ingredient card on the counter | Each takes up space; junk cards crowd out useful ones |
| Context engineering | Deciding what goes on the countertop | The real skill — curating information the AI receives before it works |
| RAG | Prep cook fetching from the pantry | Pre-fetches seemingly relevant info; chef only sees what the prep cook brings |
| Fine-tuning | Sending chef to culinary school | Expensive, slow, may lose general skills — often a recipe card on the counter works just as well |

**Mental model:** Circle of Competence — your domain knowledge IS your competitive advantage in AI

---

### 2. The Race Track — Harness Quality Beats Model Intelligence
**Core claim:** A mediocre car on a well-designed track finishes the race. A Formula 1 car with no guardrails crashes.

| Term | Everyday Equivalent | Why It Matters |
|------|-------------------|----------------|
| Harness | The track itself | Everything around the AI: how work launches, failures are caught, progress is measured |
| Eval | Timing gates and scoring | Measures whether AI output is actually good, not just plausible-looking |
| Sandbox | Practice track with foam barriers | Isolated environment where AI can crash without real consequences |
| Rollback | Rewind to last checkpoint | Makes mistakes cheap to undo — enables autonomy through safety, not intelligence |
| Deterministic vs. non-deterministic | Train vs. taxi | AI is the taxi (same question, different answers); harness keeps it on acceptable routes |

**Mental model:** Lollapalooza / Confluence of Tendencies — missing safety layers don't add risk, they multiply it. Design the cash register, don't preach honesty.

**Key "why":** Evals degrade like a teacher giving the same test every semester (Red Queen Race). Verification is a permanent race, not a solved problem.

---

### 3. The Team — Agents Work Declaratively
**Core claim:** An agent isn't one smart employee — it's a company with a sheriff (governance), deputies (personal agents), orchestrator (manager), and specialists.

| Term | Everyday Equivalent | Why It Matters |
|------|-------------------|----------------|
| Agent | An employee who acts, not just answers | The shift from asking questions to hiring someone to do jobs |
| MCP | Standardized onboarding packet for tools | Universal format so any agent can use any tool without custom integration |
| Declarative vs. imperative | "Kitchen clean by 6pm" vs. step-by-step manual | Outcomes let agents find better paths than you'd specify |

**Mental model:** Incentive-Caused Bias — technical experts resist declarative because their identity is tied to knowing the "how." Non-technical people naturally operate in declarative mode and sometimes ship faster.

**Key shift:** Managing AI is becoming a management problem, not a coding problem. Coordination > coding.

---

### 4. The Storefront — Agents Are the New Customers
**Core claim:** When your customers are personal assistants, not humans, the window display stops mattering and the back door (API) becomes everything.

| Term | Everyday Equivalent | Why It Matters |
|------|-------------------|----------------|
| API | The back door for agents | Structured, machine-readable entrance — agents never use the front door (UI) |
| Embeddings / Vectors | Map of meaning — text converted to coordinates | Similar things are neighbors on the map; how AI finds "related" content |

**Mental model:** Scale Advantages Cascade (flywheel: more agents → more data → better platform → more agents). Incentive-Caused Bias (companies keep building dashboards because designers are rewarded for human-facing work).

**Key shifts:**
- "Sell the work, not the tool" — AI + tool = deliver outcomes, not just capabilities
- Technology transitions create MORE, not less — software abundance unlocks categories that never existed

---

### 5. The Snowball — Knowledge Compounds (Only With Processing)
**Core claim:** Each unit of learning makes the next one easier — but only if you stop to extract and connect. Consuming without processing = carrying snowballs uphill and dropping them.

| Term | Everyday Equivalent | Why It Matters |
|------|-------------------|----------------|
| Agentic search | Chef walks to pantry and reasons about what's needed | More expensive than a prep cook guessing, dramatically more accurate |
| Similarity vs. relevance | Nearby on map vs. actually useful | Similar ≠ relevant; bridging the gap requires reasoning, not just proximity |

**Mental model:** Latticework of Models (full circle) — 80-90 models carry 90% of the freight. The 5 shelves ARE the latticework for AI.

**The test:** Can you classify a new term into the right shelf without knowing its definition? If yes, the latticework is working.

---

## How to Use This Reference

- **Hearing a new AI term?** → Ask: which shelf does this belong to?
- **Evaluating an AI product?** → Check: what's their kitchen (context)? What's their track (harness)?
- **Building with AI?** → Start with the kitchen (what context do I need?), design the track (how will I verify?), structure the team (declarative outcomes), consider the storefront (who's the real user?)
- **Learning a new AI domain?** → Apply the Lattice Learning Framework (`specs/lattice-learning/design.md`) — same 7 principles, new Big Ideas

## Source Mapping

Each shelf maps to 8-15 insights in the knowledge graph. Full mapping in `specs/lattice-learning/design.md` under "Mapped Graph Insights (by Big Idea)."
