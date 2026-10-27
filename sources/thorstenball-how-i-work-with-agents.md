---
title: "How I work with Agents"
author: "@thorstenball (Thorsten Ball)"
url: https://x.com/thorstenball/status/2114386050638336082
date: 2026-10-25
type: article
---

AUTHOR: Thorsten Ball @thorstenball DATE: Sun Oct 25 15:58:12 +0000 2026
TEXT: Finally summarized what I've been sending to friends in DMs https://x.com/i/article/2114385531811319808
ARTICLE TITLE: How I work with Agents
... as of October 2026.
Use the latest and greatest models. Everything else is potentially a waste of time. If a model is wrong 10% of the time, you don't know which 10%, so you end up making multiple attempts. When do you really want to hire a generalist who's 50% cheaper but also randomly 20% dumber? Who's still using Opus 4.5? Exactly.
Stop worrying about accumulating slop. "It'll turn your codebase into an unmaintainable mess." Maybe that was true six months ago. Now? I'm not convinced it adds slop. And even if it does, I'm not convinced the result is unmaintainable.
Prompt the What, not the How. Describe What you want, now How you'd do it. You'll often get better results. "Make the bytecode compiler and VM AS FAST AS YOU CAN. Do not stop until it's 2x faster." "Here's how it should work in the end"
Make the whole SDLC legible to the agent. What stopped hallucinations? Tool calls. They let agents touch our reality. If the agent can't see something, it makes it up. So let it run what it builds end to end, let it read production logs, deploy, watch the rollout, cut the release, flip the flag, triage the bug report and email the customer. Anything you can see, the agent should see too.
Give it tools for the SDLC. We have custom plugins for bug reports, emailing users, "Is our system healthy?" and granting featuer flags.
Eval agentic knowledge. Knowledge piles up in the codebase: AGENTS.md files, skills, scripts, docs. But do agents actually use it? Spawn five blind agents, control vs. treatment, and find out. Agents are really, really good at running experiments.
Local dev feels yucky now. Each agent should be able to install and run whatever it needs to get job done. Easy in remote machines, yucky in local dev. Hard to not run into resource conflicts locally when you want agents testing stuff end to end.
Don't iterate with the agent. Let it build tools to iterate. Not "let's try this. ... ah no, let's try that." Instead: "Generate 20 variations and a little page that lets me combine and test them." Not only applies to solution space, but also problem space: "Give me 4 theories on why this is slow, then check all four."
Ask for irrefutable proof. Biggest game changer. Agents are really good at producing proof: end-to-end walkthroughs, demo videos, before/after numbers. You have to build up trust and an instinct for this. Put "this is not evidence" in your AGENTS.md.
Don't wait for your agents. Let them wait on you. If you worry about TTFT, you're probably doing something wrong. Lean into async. Give them bigger tasks, be more ambitous. Batch instead of back and forth.
Automation/schedules/wake-up/heartbeat are killer feature. Didn't realize it, but missed it dearly once it was off. Use it all the time. "Check the logs in 2hrs." "Let me know once this is live" "Check every day at 9am".
Stop manually managing context. Every thought you spend wondering about "is it using 300k or 380k tokens?" is wasted time. Compaction works incredibly well. Don't manage context by hand. One thread = one task. Some threads are 46 messages, some are 3,714.
Threads are your company memory. (In Amp) "Why did we do this?" The more team uses Amp the more knowledge multiplies. Threads are connected to git commits. Game changer. Avoids duplicate work.
Don't let agents write for humans. Except: debugging steps, inicident reports, some docs. Mechanical stuff where human on other end doesn't matter that much.
Review only code with high blast radius. There are <5 central files -- those I review. Database migrations, yes. Closure vs. class, a neater type, variable names, even duplication: I don't care anymore. Does it work? Do I understand it at the arrows-in-a-diagram level? Did the agent test it end to end? Can I change it in a month? If yes, might review code.
