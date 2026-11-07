---
title: "A green check proves one property — define \"verified\" before the run, read the evidence before the summary, and ask what the check missed"
description: "Verification itself can be surrendered: cheap agent-written tests make green everywhere, a test with the same mistake as the code still passes, and after the fact you will rationalize any result"
topics: [ai-coding-tools, ai-agents]
source: "@addyosmani (Addy Osmani) — Critical thinking when agents do the work"
source_file: sources/addyosmani-critical-thinking-when-agents-do-the-work.md
date: 2026-11-07
domain: ai
kind: practice
---

Giving an agent a way to check its own work is what lets it loop without you, but Addy Osmani warns: "You can also surrender verification." The question "Is there evidence that supports my conclusion?" quietly becomes "Did the check turn green?" Agents make tests cheap, so there is a lot of green, and "If the test is written with the same mistake as the feature, it'll pass. And a green check only conveys one property. It's too easy to imagine it covers everything." His practice: "When a check goes green, ask what it proved. Then ask what it didn't."

Two habits carry the reason with them. Define "verified" upfront, "because post-facto, you'll rationalize any outcome." And make the finish line something tangible — "a test passing, a screenshot, a log or trace" — then, when the agent reports done, read the command it ran and its output before the summary, so finishing is a fact rather than "it looks like it's done." The same holds outside code: if an agent summarized fifty customer calls, check a couple of the source documents and recompute the number the recommendation depends on. He closes the point with: "Agents have made verification cheap to set up. What's difficult for you is knowing what good verification looks like."

This is the other side of [[verification-multiplies-agent-output-quality]]: the loop only helps if someone knows what it does not cover, and his quoted rule — "If you can't say what the checks would miss, ask for a real review rather than a quick approval" — is the same discipline as [[score-an-ai-reviewer-on-escapes-noise-and-convergence]]. Reading the run before the summary is the agent version of [[stare-at-raw-outputs-not-the-loss-curve]]. His suggested fresh-context self-critique on every run fits [[make-the-quality-gate-a-second-adversarial-model-not-a-human]], but it still leaves the question of what "verified" meant to the person who set it.
