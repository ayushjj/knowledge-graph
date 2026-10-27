---
title: "Score an automated code reviewer on the bugs that escaped it, the noise it makes, and whether its loop converges"
description: "The Claude Code team re-runs its review system daily against every incident-causing PR, measures noise by what people did with each comment, and caps review cycles after one agent-vs-agent PR looped more than fifty times overnight"
topics: [ai-coding-tools, ai-agents]
source: "@addyosmani (Addy Osmani) — How the Claude Code team does code review"
source_file: sources/addyosmani-how-the-claude-code-team-does-code-review.md
date: 2026-10-27
domain: ai
kind: practice
---

**Recall on escapes.** The Claude Code team "collected incident-causing PRs, their fix-forwards and reverts," had engineers who know the code verify where each bug was, and evaluates the review system against that collection daily. "Every incident adds to the collection and every change to the review system is evaluated against the entire collection." When the reviewer misses something, they ask "what wasn't in the model's context" and turn the answer into a CLAUDE.md file, a skill or a new check.

**Noise.** "It's easy to improve our bug-finding rate if we're okay with reporting lots of non-bugs," so each comment is classified by what the person on the PR did with it: fixed it, rejected it, clarified it as intentional, or decided it didn't matter. They also run the reviewer on PRs known to be clean. Noise costs more when the author is an agent: a person dismisses a nit in a second, but an agent turns it into another commit and another review cycle.

**Convergence.** "The review process must converge." One PR cycled more than fifty times overnight between an agent author and an agent reviewer. Running git blame on what the reviewer kept flagging showed about 59% was code that had been there since its first pass: it was "rarely finding new bugs, but finding a few more old ones on each cycle." The fixes were to ask the author to rethink the approach after three cycles, re-review only the diff after the first cycles, name the class of bug rather than one line, and never re-report a finding. They now track cycles-to-pass alongside recall.

This is [[llm-judge-must-calibrate-against-human-judgment]] applied to a reviewer, with real incidents as the labels. The guardrail follows [[every-optimization-has-a-shadow-regression]]: revert and incident rates are watched because "if these metrics increase, we haven't reduced human time, just relocated it." An adversarial gate like [[make-the-quality-gate-a-second-adversarial-model-not-a-human]] is only as trustworthy as this kind of scoring shows it to be.
