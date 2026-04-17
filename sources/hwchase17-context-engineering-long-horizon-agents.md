---
title: "Context Engineering Our Way to Long-Horizon Agents"
author: "@hwchase17 (Harrison Chase, LangChain CEO)"
url: https://www.youtube.com/watch?v=vtugjs2chdA
date: 2026-04-17
type: transcript
---

[Full auto-caption transcript downloaded via yt-dlp, cleaned and synthesized]

Key topics covered:

1. TRACES AS SOURCE OF TRUTH: "In agents, they're running and repeating and so you don't actually know what the context at step 14 will be because there's 13 steps before that that could pull arbitrary things in. Traces just tell you what's in your context and that's so important." — Traces become the collaboration artifact (replaces "show me the code" with "send me the trace"). Source of truth shifts from code to traces.

2. BUILDING AGENTS IS MORE ITERATIVE: "With agents, you don't know what the agent does before you ship it. You have an idea, but you don't really know what it does before you ship it." Building software: you know what it does before shipping. Building agents: behavior emerges from real-world inputs. Online testing more important than offline.

3. FIRST-DRAFT PATTERN: "If you can find these framings where they run for a long period of time but produce like a first draft of something, those to me are the killer applications of long horizon agents right now." Examples: coding PRs, AI SRE incident reports, research reports, customer support escalation reports. Agent produces first draft, human reviews.

4. MEMORY REDUCES DEV ITERATION: "Memory is learning from those interactions... if there's a way where the system can kind of like learn by itself that cuts down the iteration that you have to do as a developer." Without memory, developer must change system prompt every time. Memory = self-improvement loop.

5. COMPACTION STILL UNSOLVED: "Compaction is still very manual. The harness author decides what to do with it. Anthropic has some interesting things where they let the model decide when to compact things. We don't really see a ton of people using that."

6. LLM-AS-JUDGE CALIBRATION: "A big part of it is making sure that they're aligned with your human judgment and human preferences... we have a concept in LangSmith called aligned evals where a human goes in, labels some traces, and then that builds an LLM as a judge that is calibrated against those traces."

7. DATA VALUE RISING: "The value of data is just going up and up and up. So if you're a previous software vendor and you have this data that is valuable, you should be able to expose it to agents and get a lot of value out of that." Domain knowledge (instructions on what to do with data) is net-new.

8. SUB-AGENT COMMUNICATION: Sub-agents doing work then returning "look at my work above" — main agent can't see it. Prompting sub-agents for complete, self-contained responses is a real engineering challenge.

9. ASYNC/SYNC MODE SWITCHING: "I don't think that just having an async mode really works right now." Need to switch between async management (kick off many agents) and sync communication (review, give feedback). Agent inbox + chat = unlock.

10. SPECIFICITY MOVES TO PROMPTS: "A lot of the specificity for tasks previously that might have been in LangGraph because you needed to put more structure on the models. Now that specificity is moving into the tools and the instructions." Harness stays general, domain knowledge lives in natural language.

11. AGENT ENGINEERING SKEWS JUNIOR: "We have consistently heard that a lot of the people who are on these agent engineering teams are more junior developers who don't have those preconceived notions."

12. FILE SYSTEM ESSENTIAL: "I very very strongly believe that right now if you're building a long horizon agent, you need to give it access to a file system." Compaction strategy: summarize but store full messages in file system for lookup.
