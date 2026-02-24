---
title: "Treat AI like a distributed team, not a single assistant"
description: "Running 15 parallel Claude streams with specialized roles (writer, reviewer, architect) produces better results than one perfect conversation"
topics: [ai-coding-tools, ai-agents]
source: "Boris Cherny — Creator of Claude Code"
date: 2025-01-13
---

Cherny runs 5 Claude instances in terminal, 5-10 on claude.ai in browser — 15 parallel streams simultaneously, each with a different task. This isn't multitasking for efficiency; it's a mental model shift. The AI isn't your assistant. It's your team.

The writer/reviewer pattern makes this concrete: Session A implements, Session B reviews the implementation, feedback flows back to Session A. Test-first variant: Session A writes tests, Session B writes code to pass them. Fan-out for batch: a shell loop processes dozens of files in parallel. Each stream has isolated context, which addresses [[context-window-is-the-fundamental-constraint]] — instead of cramming everything into one conversation, you distribute work across separate context windows.

Cherny's CLAUDE.md insight reinforces [[compound-engineering-makes-future-work-easier]]: it's checked into git, the whole team contributes, and every mistake becomes institutional knowledge. The AI gets smarter every sprint. Combined with PostToolUse hooks for auto-formatting and smart permissions shared via settings.json, the system becomes a self-improving engineering organization, not just a tool you prompt. The natural extension — where [[parallel-agents-create-management-problem-not-coding-problem]] — reveals that as you scale to many simultaneous agents, the bottleneck shifts from coding speed to coordination overhead. Shipper's [[deputies-and-sheriffs-distribute-agent-authority]] formalizes this into an organizational model: Deputies are personal agents trained by individuals, Sheriffs manage permissions across the team — essentially the org chart of agents mirroring the org chart of humans.
