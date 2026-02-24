---
name: learn
description: Process content into knowledge graph nodes — extracts insights, creates linked files, updates topic MOCs
user_invocable: true
---

# /learn — Add Knowledge to the Graph

You are processing content into Ayush's personal AI knowledge graph. The user will paste content (article text, tweet thread, conversation summary, or raw notes). Your job: extract distinct insights and weave them into the existing graph.

## Step 1: Read Current State

Before doing anything:
1. Read `~/desktop/knowledge-graph/index.md` to understand existing topic structure
2. Glob `~/desktop/knowledge-graph/insights/*.md` to see what nodes already exist
3. If insights exist, read a few to understand the existing graph and find connection opportunities

## Step 2: Extract Insights

From the pasted content, identify **distinct, atomic insights**. Each insight is ONE clear idea.

**Quality bar:**
- Insight titles MUST be claims or statements, not labels
  - GOOD: "Agents need external structures to think effectively"
  - BAD: "Agent architecture"
  - GOOD: "Context engineering replaces prompt engineering"
  - BAD: "Context engineering overview"
- Each insight should stand alone — someone reading just that file should understand the idea
- Aim for 3-8 insights per paste (fewer if the content is narrow, more if it's rich)
- Skip generic/obvious points. Keep only things worth remembering.

## Step 3: Create Insight Files

For each insight, create a file in `~/desktop/knowledge-graph/insights/` with this structure:

**Filename:** `{slug}.md` — lowercase, hyphens, descriptive (e.g., `agents-need-external-structures.md`)

**Content:**
```markdown
---
title: "The insight as a claim/statement"
description: "One sentence expanding on what this means"
topics: [topic-slug-1, topic-slug-2]
source: "attribution — @handle, article title, or conversation"
date: YYYY-MM-DD
---

2-4 sentences of prose explaining the insight. Weave [[wikilinks]] naturally into
the sentences — they should read as normal text that happens to link to related concepts.

Connect to other ideas: how this relates to [[other-insight-slug]] or implications
for [[yet-another-insight]]. If no existing insights connect, link to topic MOCs
like [[ai-agents]] or [[knowledge-systems]].
```

**Wikilink rules:**
- Links go to other insight slugs (filenames without .md) or topic slugs
- Weave links INTO prose naturally: "This connects to [[context-engineering-replaces-prompt-engineering]] because..."
- Do NOT put a links section at the bottom. Links live in the sentences.
- Link to EXISTING insights when possible (you read them in Step 1)
- For new concepts that don't exist yet, still create the wikilink — it becomes a future node
- Each insight should have 2-5 wikilinks

**Topic assignment:**
- Use the existing topic slugs: `future-of-ai-business`, `ai-native-product-architecture`, `ai-agents`, `ai-coding-tools`, `knowledge-systems`, `business-models`
- Most insights touch 1-2 topics. Rarely 3.
- If content doesn't fit ANY topic, note this — we may need to add one.

## Step 4: Update Topic MOCs

For each topic that received new insights:
1. Read the topic file (e.g., `~/desktop/knowledge-graph/topics/ai-agents.md`)
2. Add a link under the `## Insights` section: `- [[insight-slug]] — one-line description`
3. If you notice a cluster forming (3+ related insights), add or update a theme under `## Key Themes`

## Step 5: Update Index

Add new insights to the `## Recent Additions` section of `index.md`:
```
- [[insight-slug]] — brief description (YYYY-MM-DD)
```
Keep only the 10 most recent entries. Remove older ones (they're still findable via topic MOCs).

If any insight spans 3+ topics, also add it to `## Cross-Domain Insights`.

## Step 6: Report to User

Show a summary:
```
📝 Created X insights:
  - insight-title-1
  - insight-title-2
  - ...

📂 Updated topics: topic-1, topic-2

🔗 Connected to N existing insights:
  - linked-to-insight-1 (via new-insight)
  - ...

💡 Graph now has N total insights across M topics.
```

## Edge Cases

- **Content is too vague/generic:** Tell the user "This content is too general to extract specific insights. Could you paste something more specific?" Don't create low-quality nodes.
- **Content overlaps with existing insights:** Update or enrich the existing insight file instead of creating a duplicate. Mention this in the report.
- **Content suggests a new topic:** Create the insights with the closest existing topics, and suggest to the user: "This content touches on [new area] — want me to create a new topic MOC for it?"
- **URL provided instead of text:** Use WebFetch to retrieve the content, then proceed normally.
