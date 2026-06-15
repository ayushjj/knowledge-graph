---
title: "Research speed is mostly the speed at which you discover you're wrong — which makes tooling a first-class research activity"
description: "The edge isn't a stroke of genius but volume: more runs per day, more wrong ideas discarded per week, a faster-updating model of reality. That makes one-command runs, config-reproducible experiments, and seconds-not-archaeology run comparison core research work, not chores"
topics: [ai-coding-tools, engineering]
source: "@itsreallyvivek (vivek) — how to be good at research"
source_file: "sources/itsreallyvivek-how-to-be-good-at-research.md"
date: 2026-06-15
domain: "ai"
---

Vivek locates the real game in throughput of disconfirmation: the stories about Alec Radford "involve volume. more runs per day, more wrong ideas discarded per week, a model of reality that updated faster than anyone else's... research speed is mostly the speed at which you discover you're wrong." The consequence is that "tooling is a first-class research activity" — "launching a run should be one command... comparing two runs should take seconds, not an afternoon of archaeology." Karpathy's "overfit a single batch before training at scale" is the canonical cheap-first move: "thirty seconds, half your bugs, gone."

This is the research-craft root of [[autonomous-loops-need-small-stories-and-fast-feedback]] — fast disconfirmation requires small, cheap, reproducible iterations, the same loop that lets agents ship overnight. It's why [[harness-quality-beats-model-intelligence]] generalizes from agents to researchers: the machinery that turns ideas into tested results is the multiplier, not raw capability. And it carries the warning of [[speed-without-feedback-amplifies-errors]] in reverse — speed is only an edge when each run actually tells you you were wrong, which is what overfitting one batch and comparing runs in seconds buys you. Building that machinery yourself is the move in [[engineering-and-research-have-fused-at-the-frontier]].
