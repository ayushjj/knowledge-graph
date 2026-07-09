---
title: "Models are grown, not designed — treat a new model class as biology, not physics"
description: "You don't design a 99%-on-SWE-bench target and build to spec; you grow the model with data, feedback, and compute, then discover empirically what it can do — the same empirical stance has to carry over to how you work with it"
topics: [ai-agents, ai-coding-tools]
source: "Thariq Shihipar (Anthropic) — A Field Guide to Fable"
source_file: "sources/thariq-field-guide-to-fable.md"
date: 2026-07-09
domain: ai
---

Thariq Shihipar's framing for why working with each new model class feels disorienting: "the models are grown, not designed... we don't wake up and say we need 99% on SWE-bench... it's a little bit organic, and we sort of figure out and learn with the model as we use it." He deliberately reaches for a biology metaphor over a physics one: "we don't know all the rules, but there is some sort of science behind it — there is an intuition to build as well," pointing to Anthropic's "biology of a large language model" research as the closest analogue to how you should expect to relate to the model's behavior.

The practical consequence is that "what contains them is us" — the harness and the prompting are a function of current understanding of the model, not a fixed spec the model was built to satisfy. This is the epistemic stance behind [[capability-overhang-tools-unlock-latent-model-ability]] (you discover latent capability by probing, not by reading a spec sheet) and [[map-is-not-the-territory-unknowns-are-the-real-bottleneck]] (the plan you hold in your head is necessarily incomplete, because the model's actual behavior space wasn't designed in from a blueprint — it was grown and has to be explored).
