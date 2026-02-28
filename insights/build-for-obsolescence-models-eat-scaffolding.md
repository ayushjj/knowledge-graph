---
title: "Build for obsolescence — improving models will eat your scaffolding"
description: "Every elaborate skill workaround you build today simplifies as models improve; design skills that gracefully shed complexity while keeping sandboxes and evals permanent"
topics: [ai-native-product-architecture, ai-agents]
source: "@nicbstme (Nicolas Bustamante) — Lessons from Building AI Agents for Financial Services"
date: 2026-02-24
---

Bustamante's uncomfortable truth: "everything I just told you about skills? It's temporary." Models improve so fast that elaborate scaffolding becomes unnecessary — "every few months, there's a new model that makes half your code obsolete." The practical advice: write skills, delete them when they become unnecessary, and actively feed model limitations back to AI labs to accelerate their obsolescence.

Crucially, this applies to **skills and scaffolding only** — not to sandboxes or evaluation systems. Bustamante is explicit: "The Sandbox Is Not Optional" and "Evaluation Is Not Optional." The temporary layer is the workaround code; the permanent layer is the safety and quality infrastructure.

His prediction: "in two years, most of our basic skills will be one-liners." Skills don't disappear — they simplify for routine tasks while the frontier shifts to harder problems. As basic tasks get commoditized, teams push into more complex territory. This connects to [[skills-as-markdown-replace-fine-tuning]] — today's skill files will evolve and simplify, not vanish. The key design principle is building systems that gracefully shed complexity while the value stays in [[context-is-the-product-not-the-model]] — the context layer, not the model layer.
