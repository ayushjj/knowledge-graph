---
title: "Detect everything, notify selectively — the observability-to-notification ratio determines system trust"
description: "Watch every signal but ensure alerts reaching humans always mean something; teams ignore noisy monitors AND noisy agents equally fast"
topics: [ai-agents, ai-native-product-architecture]
source: "@RampLabs — How We Made Ramp Sheets Self-Maintaining"
date: 2026-03-24
domain: "ai"
---

Ramp's self-maintaining system watches every signal — 1,000+ auto-generated monitors covering new code on every PR merge — but applies aggressive filtering before anything reaches a human. An agent triages each alert, assesses scope, and only notifies when the issue is real and impactful. Noise gets silently handled: the monitor is tuned or deleted, with state stored on the monitor itself (PR link appended) to prevent duplicate alerts.

The principle is that detection breadth and notification selectivity must scale independently. [[observability-is-the-missing-agent-discipline]] establishes that you need telemetry everywhere — this insight adds the architectural constraint that telemetry must NOT flow directly to humans. An agent intermediary that scopes, judges impact, and filters noise is what makes exhaustive monitoring sustainable rather than overwhelming. LangChain's self-healing pipeline extends this further: [[causal-triage-must-gate-automated-fixes]] shows that when moving from notification to automated action, the triage layer must establish causal links (was this YOUR code change or a third-party API?) before feeding errors to a fixing agent. This connects to [[production-agents-route-decisions-not-every-call-to-llm]] — the same routing principle (handle routine cases automatically, reserve humans for complexity) applies to monitoring output, not just request handling. And [[harness-quality-beats-model-intelligence]] is validated here: the monitoring harness (triage step, sandbox reproduction, state-on-monitor dedup) matters more than which model does the debugging.
