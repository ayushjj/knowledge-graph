# Session: 2026-04-04 - Knowledge Graph Architecture Comparative Research

## What Worked
- Parallel agent research (6 agents simultaneously) for rapid repo analysis — full landscape in ~2 minutes
- Template-based analysis (same dimensions for each system) made cross-cutting synthesis possible
- Tiered signal strength rating prevented low-quality systems from consuming equal attention

## What Didn't Work
- N/A — research session, no implementation failures

## Key Insight
The biggest unsolved problem across ALL knowledge systems is **evolution** — how graphs grow without rotting. Everyone builds ingestion and retrieval. Almost nobody builds pruning, merging, or contradiction detection. This is the frontier.

Second insight: **match storage to data shape**. Systems that force all knowledge into one format (all vectors, all markdown, all SQL) consistently underperform systems that use the right storage per knowledge type and route between them.

## Files Changed
- `specs/knowledge-graph-architectures/research.md` — living spec with template for future systems
- `specs/knowledge-graph-architectures/analysis-session-2026-04-04.md` — full analysis with analogies
- `memory/project_kg_architecture_research.md` — cross-project memory with transferable patterns

## Metrics
- Systems analyzed: 10 (7 new + 3 prior art)
- Signal strength: 3 HIGH, 2 MEDIUM, 5 LOW/ZERO
- Borrowable ideas identified: 9 (1 flagged "worth building" — contradiction detection)
- Cross-cutting patterns: 5
