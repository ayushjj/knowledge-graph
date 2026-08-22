---
title: "Know which computation belongs in latent space and which belongs in deterministic space"
description: "Tan attributes every agent failure he has seen to confusing the two: taste and judgment live in the model steered by markdown, while arithmetic and state must live in code and a database the markdown calls"
topics: [ai-native-product-architecture, ai-agents]
source: "Garry Tan (President & CEO, Y Combinator) — \"Own Your Intelligence\", Startup School 2026"
source_file: "sources/garry-tan-yc-own-your-intelligence.md"
date: 2026-08-21
domain: "ai"
---

Tan calls this the most important question to ask about any agent system — "where is the computation happening?" — and says there are exactly two answers, and that confusing them "causes every agent failure I've ever seen." Some computation belongs in latent space: taste, judgment, reading what a human actually wants from a vague request. That lives in the model and you steer it with a markdown file. Some belongs in deterministic space: the arithmetic, the SQL query, anything that has to hold state and stay consistent.

His worked example is the conference the audience is sitting in. Seating five people around a table is latent-space work — just ask. Producing custom schedules for six thousand people in an arena is not, and the latent-space agent has to write code and keep the result in a database. The formulation he leaves is "markdown files calling databases and scripts," and the justification is unusually honest about why: "the model fails where we fail. The fix is having the model compute the way humans compute." This is the architectural discipline underneath [[if-a-smart-intern-could-follow-it-an-agent-can-run-it]] — the intern test tells you a skill file is clear, not that its work belongs in prose. It refines [[navigation-beats-search-for-knowledge-retrieval]]'s instinct to let each source keep its native interface, applied to computation rather than retrieval, and it is the practical answer to the failure mode named in [[the-80-99-gap-is-where-ai-products-die]], since the last stretch of reliability is usually arithmetic someone left in latent space.
