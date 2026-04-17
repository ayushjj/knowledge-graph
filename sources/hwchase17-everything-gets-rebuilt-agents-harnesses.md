---
title: "Everything Gets Rebuilt: Agents, Harnesses, and the New Compute Layer"
author: "@hwchase17 (Harrison Chase, LangChain CEO)"
url: https://www.youtube.com/watch?v=yXgS_8NIDk0
date: 2026-04-17
type: transcript
---

[Full auto-caption transcript downloaded via yt-dlp, cleaned and synthesized]

Key topics covered:

1. HARNESS CONVERGENCE: "A harness is somewhere in between a coding agent and a framework. We started with a framework, LangChain, and went up towards Deep Agents. And then you have Claude Code, which is a coding agent, and went down." Frameworks and coding agents are converging toward harnesses.

2. ENTERPRISE VS STARTUP AGENTS: "At a startup you're far more likely to build something like Claude Code that is just running in a loop. At an enterprise... you need more precision, you need more control. It's not okay to have 95%." LangGraph (deterministic + non-deterministic mixing) much more popular in enterprises.

3. THREE MEMORY TYPES: "Semantic is basically searching facts. Episodic memory is easier, that's just like previous interactions. The most interesting is procedural type of memory, which is like what the agent should actually do, like its core instructions." Procedural = system prompt + skills + tools.

4. PROCEDURAL MEMORY HIGHEST IMPACT: "If I correct it once, I don't want to correct it a second time or third time. That type of procedural memory, I think that's the highest impact."

5. MEMORY DEFINES THE AGENT: "The memory of the agent defines the agent... you could zip up the agent files and say hey this zip file of markdown files is an agent." Portable memory between harnesses = frontier. "Could you take that zip of agent.md and skills from Codex and bring it into Cursor?"

6. KNOWLEDGE ≠ MEMORY: "I do think there's a difference between knowledge and memory. Knowledge would be like 'let's ingest all these documents and put them into a database.' Memory, I think you kind of learn on the fly almost."

7. SLEEP-TIME COMPUTE: Two memory update mechanisms: (1) inline — agent updates as it runs, (2) cron job reviewing all traces overnight. "The folks at Letta came up with 'sleep time compute' for basically doing that."

8. MEMORY STILL UNSOLVED: "We've been thinking about memory for like 2 years. I think we still have like pretty low-level primitives because I don't know if a higher-level primitive right now makes sense."

9. RAG BECOMING ONE TOOL OF MANY: "If the agent doesn't get the right results the first time it can call a second time and a third time... the models are getting really good at this and fast enough and getting cheaper. I think it's just turning into one tool of many."

10. OBSERVABILITY IS UNIVERSAL: "No matter what your agent looks like, you're always going to want to know what's going on inside of it." LangSmith is their most universally adopted product across startups and enterprises.

11. LLM LATENCY DWARFS INFRA: "The calls to the LLMs are much longer than any of these things take. I don't think we've heard many people talk about that as a priority." Half-second vs 200ms tool latency doesn't matter.

12. VIRTUAL FILE SYSTEM: "We have a virtual file system and you can edit them, you can remove them, you can read them... having those tools or having those things represented as files and then just having one set of tools for interacting with files is really useful."

13. HARNESS ≈ APP: "The boundary between an agent harness and a user-facing app is actually very slim. Manifold is an example of this where they have a fantastic agent harness and they're obviously best known for their application."
