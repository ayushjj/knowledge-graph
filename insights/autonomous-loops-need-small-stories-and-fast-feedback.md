---
title: "Autonomous coding loops need small stories and fast feedback to work"
description: "The Ralph pattern ships 13 features in 1 hour by decomposing into context-window-sized tasks with explicit acceptance criteria and test-based feedback"
topics: [ai-agents, ai-coding-tools]
source: "Ryan Carson — Ralph / Autonomous Coding Loop"
date: 2025-01-15
---

Carson's Ralph pattern — a bash loop that reads a task list, implements, tests, commits, and repeats — shipped 13 features in 1 hour versus 26-52 hours manually. But the loop itself is trivial. The real insight is what makes it work: stories small enough to fit in one context window, explicit acceptance criteria, and test suites that provide fast binary feedback (pass/fail) — a direct application of why [[verification-multiplies-agent-output-quality]]. But the quality of those test suites matters: [[evaluate-tools-with-real-multi-step-tasks]] shows that toy single-step checks miss the integration flaws that chained, multi-step tasks expose.

Each iteration starts with fresh context (reading updated prd.json and progress.txt), which directly addresses [[context-window-is-the-fundamental-constraint]] — the agent never accumulates stale context because it resets every cycle. The learnings from each iteration compound via progress.txt, connecting to [[compound-engineering-makes-future-work-easier]].

The advanced version (nightly two-part loop) shows the full vision: a compound review job at 10:30 PM extracts learnings into CLAUDE.md, then an auto-compound job at 11:00 PM implements the top priority using those fresh learnings. You wake up to draft PRs. This is [[agent-memory-preserves-institutional-knowledge]] made autonomous — the agent both learns and applies its learnings without human intervention.
