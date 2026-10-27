---
title: "When every written source is inconsistent, cross-check them against each other to converge on a spec"
description: "Dan Luu got a near-correct rule set for a board game whose official rules contradict themselves by running consistency checks across all the inconsistent explanations — costlier in tokens than a manual approach, cheaper than his own time writing a clean spec"
topics: [ai-agents, knowledge-systems]
source: "Dan Luu — We should be more ambitious with the software we build (shared by @dabit3)"
source_file: sources/danluu-we-should-be-more-ambitious.md
date: 2026-10-27
domain: ai
kind: practice
---

Guards of Atlantis 2 looks like a poor AI project: its official rules are "a mess of ambiguous and contradictory English text," and its designer has often changed his mind about what they mean. Dan Luu notes that if you try to produce a working rule set naively, "AI won't really help with this (although it can speed up implementation once you have a clean spec)." Instead he set up "some kind of janky set of consistency checks between all of the inconsistent explanations of the game rules," which got "fairly close to a correct set of rules" — about as close as someone else had got with much more human effort — and close enough to compare against another implementation and reach a working set.

It was not cheap: it cost "a lot more in tokens than a more manual approach," roughly a month or two of a $200/month subscription. But that was less than the cost of his own time writing a consistent, correct spec by hand. His broader claim is that "you can often set up systems that have some kind of self-checking property even when most people wouldn't," the way fuzzing and property-based testing worked for him in domains where people said they would not.

The implication is that disagreement between sources is information: each contradiction marks exactly where the spec is ambiguous, while any single source hides its gaps. That makes this a mechanical version of [[resolve-ambiguity-before-passing-it-downstream]] — resolve the spec before implementation, because [[conflicting-context-causes-agent-collapse-not-graceful-degradation]] if the contradictions reach the builder unresolved. It is also a cousin of [[derive-the-manual-from-observed-practice-not-written-procedure]]: when the written procedure cannot be trusted, triangulate from every account you have rather than picking one.
