# Contributing

Thanks for wanting to add to the graph. Here's how.

## Adding an insight

1. **Fork** this repo and clone it
2. **Copy** an existing file in `insights/` as a template
3. **Write** your insight following the format below
4. **Submit a PR** — I review everything before merging

## Insight format

Each insight is a markdown file in `insights/` with YAML frontmatter:

```yaml
---
title: "Your insight title — specific and atomic"
description: "One sentence that captures the core idea"
topics: [ai-agents]  # 1-2 topics from the list below
source: "Author Name — Article Title"
source_url: "https://..."
date: 2026-03-11
domain: ai  # or mental-models
---
```

Then write 2-4 paragraphs of prose explaining the insight. Link to related insights using `[[wikilinks]]`.

## What makes a good insight

- **Atomic**: One idea per file. If you're writing "and also," split it into two insights.
- **Linked**: Connect to at least one existing insight via wikilinks.
- **Source-verified**: Every claim should be traceable to the original author and article.
- **Not a summary**: Capture the _insight_, not the article. What changed how you think?

## Available topics

**AI Product Building**: `ai-agents`, `ai-native-product-architecture`, `ai-coding-tools`, `future-of-ai-business`, `business-models`, `knowledge-systems`

**Mental Models**: `psychology`, `economics`, `mathematics`, `engineering`, `decision-making`, `philosophy`

## Questions?

Open an issue or reach out. Happy to help with your first contribution.
