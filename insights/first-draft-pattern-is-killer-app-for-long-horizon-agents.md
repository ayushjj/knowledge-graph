---
title: "The first-draft pattern is the killer app for long-horizon agents — agents produce, humans review"
description: "Long-horizon agents produce comprehensive first drafts (PRs, analyses, reports) that humans verify — this is where the 10x productivity gain actually lives"
topics: [ai-agents, future-of-ai-business]
source: "@hwchase17 (Harrison Chase) — Context Engineering Our Way to Long-Horizon Agents"
source_file: sources/hwchase17-context-engineering-long-horizon-agents.md
date: 2026-04-17
domain: ai
---

Harrison Chase identifies the pattern that makes long-horizon agents practically useful today: "If you can find these framings where they run for a long period of time but produce like a first draft of something, those to me are the killer applications of long horizon agents right now."

The key insight is that agents aren't reliable enough for end-to-end autonomous execution, but they can do enormous amounts of preparatory work. The human reviews a rich artifact rather than creating from scratch.

Examples Chase cites:
- **Coding**: PRs are reviewed, not pushed directly to production (unless vibe coding)
- **AI SRE**: Traversal produces an incident report that a human reviews
- **Research/report generation**: "You don't send it out to all of your followers right away. You look at it, you edit it."
- **Customer support**: When first-line AI fails, a long-horizon agent runs in the background producing a comprehensive handoff report for the human agent

This is the same pattern behind [[autonomous-loops-need-small-stories-and-fast-feedback]] but at a higher level: the entire agent run is one "story" that produces a reviewable artifact. The human isn't giving step-by-step feedback — they're reviewing the finished first draft.

Connects to [[verification-multiplies-agent-output-quality]] — the first-draft pattern IS a verification pattern: agent generates, human verifies. Also connects to [[autopilots-capture-work-budget-not-tool-budget]] — the first-draft pattern captures the work budget (report creation, research, analysis) while keeping humans in the verification loop.
