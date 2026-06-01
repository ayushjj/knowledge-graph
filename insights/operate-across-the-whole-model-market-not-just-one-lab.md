---
title: "Routing across the whole model market — and absorbing every migration — is a defense the labs can't copy"
description: "A vertical company picks the best model per sub-task across all vendors, absorbs eval/migration work on every upgrade, and sells the lowest cost for the exact intelligence each step needs"
topics: [ai-native-product-architecture, business-models]
source: "@joeschmidtiv (Joe Schmidt IV, a16z) — Avoiding Death on the Yellow Brick Road"
source_file: sources/joeschmidtiv-yellow-brick-road.md
date: 2026-06-01
domain: ai
---

A defense the labs structurally can't copy: the vertical company picks the best model for each sub-task across the *entire* model market — including a competitor's model or an open-source fine-tune for the narrow piece where it's actually best — while a lab can only sell you its own model and tell you to migrate.

Schmidt frames two jobs here. First, absorbing migration: re-running evals on every upgrade, recalibrating prompts for the customer's edge cases, rolling out without breaking production — "The Rest of Oz company absorbs the migration." Second, inverting the price curve: "The labs price the floor — the least intelligence available at $X. The Rest of Oz company sells the inverse — the lowest dollar cost for the specific level of intelligence the workflow actually requires," which is only possible if you know exactly what each sub-task needs. This is the productized, customer-facing version of [[multi-model-orchestration-beats-any-single-family]]; it is why [[vertical-models-beat-frontier-models-in-their-domain]] and why [[open-harnesses-with-owned-databases-prevent-model-provider-lock-in]] keep the model swappable underneath.
