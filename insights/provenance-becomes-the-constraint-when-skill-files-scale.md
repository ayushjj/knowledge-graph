---
title: "Once skill files accumulate, provenance becomes the binding constraint"
description: "The agentic-company loop works until the markdown files pile up; at that point Tan locates the failure in provenance and conflict management — two facts disagree, and provenance decides which one wins, enforced by a job that continuously sweeps for accuracy"
topics: [knowledge-systems, ai-agents]
source: "Garry Tan (President & CEO, Y Combinator) — The a16z Show with Anish Acharya, \"New Rules for Founders\""
source_file: "sources/garry-tan-a16z-new-rules-for-founders.md"
date: 2026-08-21
domain: "ai"
kind: "principle"
---

Asked where the recursive self-improvement loop starts to fall over — whether errors compound, whether exception handling constrains it — Tan locates the failure precisely: "once you get a lot of markdown files, or yeah, anytime you have like some large amount of data, that's where like provenance matters. That's where conflict management — when you have two facts, if you have provenance then you're like, well, this is the more recent one, this is the one that wins. You need a cron job that's sort of sweeping through that and making sure that things are accurate and from the right places."

Three things follow, and they are worth separating. Recency is the tie-breaker, which means every fact needs a timestamp and a source, not just a value. Accuracy decays on its own, so the sweep has to be continuous rather than a one-time validation. And the constraint appears only at scale — a handful of skill files never surfaces it, which is exactly why it arrives as a surprise.

This is the failure mode that [[evolving-summaries-beat-append-only-memory]] is designed around, seen from the other side: evolving a summary is one way of resolving conflicts, but it presumes you can already tell which version supersedes which, and provenance is what supplies that. It bounds [[domain-skill-libraries-are-the-real-agent-moat]] with a maintenance cost — an accumulated library is a moat only while its contents remain trustworthy, and an unswept library quietly becomes a liability. The same caveat applies to [[agent-memory-preserves-institutional-knowledge]], where preserved knowledge that nobody reconciles preserves the contradictions too.

In his Startup School keynote Tan states the same constraint as a warning rather than a prediction: "a brain nobody curates is a garbage dump with great search." Retrieval will surface a stale fact with total confidence, and a bad skill file encodes a bad process forever, so the primitive he names is memory *plus hygiene* — provenance on every fact, contradiction checks when new information collides with old, and "a librarian whose actual job is pruning." Treat the brain like production infrastructure and it compounds; treat it as a dumping ground and you get "a very confident agent that is wrong in ways nobody can trace." That is the curation half of [[being-worth-retrieving-from-is-the-product]], and the reason the capture discipline in [[never-do-one-off-work-skillify-every-task]] needs pruning attached to it rather than capture alone.
