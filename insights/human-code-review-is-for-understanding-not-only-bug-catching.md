---
title: "Human code review is for understanding the system, not only catching bugs — expect tests put an agent's behaviour change next to its code change"
description: "Ron Minsky treats AI review as useful but a distinct thing from a person understanding the system; expect tests commit readable program output to the repo, so a diff shows both the change in logic and the change in behaviour"
topics: [ai-coding-tools, ai-agents]
source: "Ron Minsky (Jane Street) — Now more than ever: building reliable software in the age of agents (talk, shared by @poteto)"
source_file: sources/yminsky-reliable-software-in-the-age-of-agents.md
date: 2026-10-27
domain: ai
kind: principle
---

Ron Minsky says code review "catches bugs, but it also spreads best practices," and in the current world it is "maybe like the most important thing that a human can do in the context of software engineering" — "sitting down and understanding systems and helping making sure that they're doing the right thing... in a good way." He calls AI code review "incredibly helpful," especially for auditing a bad practice across a whole tree, but "a distinct thing from the process of driving human understanding of what's happening in the system," and keeps the two as separate concepts. Agents make the human part harder: eyes glaze over, agents reward-hack (the classic case is deleting the tests that were supposed to pass), and they "break the kind of social contract around code review," because a large diff no longer signals that someone invested thought in it.

His main tool is the expect test: the test prints readable output and the printout is committed beside the code. Like a spreadsheet, which shows the data that ordinary code hides, it gives you both views: "when you get back the diff from an agent... you get to read both the change to the logic and then the induced change to the traces of the program." He defends these example-based tests as "unreasonably effective," which is a counterweight to [[property-based-testing-explores-agent-input-spaces]]: properties widen coverage, but a readable printout is what a person can actually understand.

This draws the line differently from [[make-the-quality-gate-a-second-adversarial-model-not-a-human]]. The two are compatible if the model gate is for defects and the human read is for understanding. It also explains why [[specs-to-code-degrades-without-reading-the-code]]: what is lost is not a bug check but anyone's understanding of the system. Minsky adds that agents work better in a well-tended codebase, the same point as [[bad-code-is-the-most-expensive-its-ever-been]].
