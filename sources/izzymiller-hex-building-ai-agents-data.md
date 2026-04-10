---
title: "Building AI Agents for Data Analytics — Izzy Miller (Hex)"
author: "@izzymiller (Izzy Miller)"
url: https://www.youtube.com/watch?v=Xyh1EqcjGME
date: 2026-04-10
type: transcript
---

[Source file: procurement-intelligence/research/external/hex-izzy-miller-building-ai-agents-data.md]
[Full auto-caption transcript downloaded via yt-dlp, cleaned and synthesized]

Speaker: Izzy Miller, AI Engineer at Hex. Former DevRel/marketing, transitioned to AI engineering.
Hex: AI-native data analytics platform, $70M Series C, customers include Anthropic, Reddit, Figma, NBA.
Podcast: Max Agency

Key Frameworks:
- Sand vs Stone (Barry McCardel): If models get 2x better, what washes away (sand) vs remains valuable (stone)?
- Day 0 vs Day 90: Point-in-time accuracy vs compounding context value
- Dynamic vs Static Context: Static (prompts, tools) vs Dynamic (harvested from workspace)
- Verification Hierarchy: Semantic model > admin-endorsed > raw SQL

Product Lessons:
- Single-shot text-to-SQL was wrong for iterative data work
- "High horsepower beast driving 25 in a school zone" — models needed more scope
- Don't introduce new capabilities — make existing ones accessible (Nadella/Word insight)
- "A remarkable amount of things that at one point we felt very proud of building and were in fact necessary are now hobbling the agent" — 5+ per week
- ~100K tokens of tools. "Too many tools. I'm not proud of it."
- Ephemeral queries: brilliant but agent hides proof from users
- Agent UX will flip — showing what's happening becomes impossible as speed increases

Technical:
- Custom orchestrator → migrated to Temporal
- Sonnet 4.6 + GPT-5.4 primary models
- 1M context "hurts at margins" — compact at 300K for best results
- Conflicting context causes Sonnet 4.6 to "spend 30 minutes pondering... crazy collapse mode"
- Capability bundles: tools + static context + prompts + behavioral rules

Build vs Buy:
- Orchestration: built custom → Temporal
- Eval/Observability: built "The Shoebox" (named temporary, now permanent)
- Agent framework: built custom for speed
- Model provider features: selective adoption where evals prove value

Moat:
- Context flywheel (user work → artifacts → admin observability → better agent)
- Domain-encoded opinions (visualization experts)
- Multi-layered context graph

Memory:
- User memory "very scary" for data teams — wrong definitions create conflicting context
- Admin-governed context must remain authoritative

Eval Innovation — Metric City:
- 90-day simulation, fake company "Shorelane Commerce"
- Day 0: ~4% accuracy. Day 90: Sonnet 4.6 gets 24% (target 100%)
- Favorite failing eval: fan-out bug makes all AEs at 900%+ quota, every agent says "best quarter ever!"

On AI Engineer Role:
- Best AI engineers: domain empathy + opinionated taste + AI coding tools
- Technical skill less of a barrier; domain expertise is the differentiator
