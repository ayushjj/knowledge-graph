# Session: 2026-04-06 - Hub-and-Spoke Ingestion + Decision Filter

## What Worked
- Hub-and-spoke ingestion: processing the hub article first, then chasing the 2-3 best sub-links, produced higher insight density than random browsing
- Applying the "decision filter" upfront: 3 LangChain articles fetched, 1 skipped entirely (middleware = execution-level), 2 yielded insights
- Processing the user's meta-question ("is this relevant to the project?") before diving into extraction — saved time and established admission criteria

## What Didn't Work
- Nothing notable — session was clean

## Key Insight
**Article admission criteria for a decision-focused knowledge graph:** "Does this change how I'd decide?" → extract. "Does this tell me how to execute a decision I've already made?" → skip. This prevented 3 redundant middleware nodes that would have duplicated existing insights. Worth codifying in the /learn skill as a pre-extraction gate.

## Files Changed
- 8 new insight files, 4 new source files, 6 existing insights back-linked
- graph-index.yaml: 153 → 161 nodes

## Metrics
- Before: 153 insights
- After: 161 insights (8 new from 4 sources, 2 articles skipped by filter)
- Sources processed: @hwchase17 article, Meta-Harness paper, 2 LangChain blog posts
- Sources filtered out: LangSmith docs (definitional), middleware article (execution-level)
