---
title: "WebMCP turns websites into agent-native interfaces"
description: "Chrome's MCP integration lets websites expose structured tools to agents instead of agents scraping and guessing at UI elements"
topics: [ai-agents, ai-native-product-architecture]
source: "Learning Technical Concepts chat — Chrome for Developers WebMCP announcement"
date: 2026-02-24
---

Today's browser agents work by screenshotting pages, reading HTML, and guessing which elements are buttons — essentially screen-scraping with extra steps. WebMCP flips this: websites expose structured tools directly via `navigator.modelContext.registerTool()`, telling agents exactly what actions are available and what parameters they accept. Instead of guessing "this looks like a search box," the agent knows "call searchFlights(from, to, date)."

This is the practical realization of [[ui-moat-collapses-api-becomes-purchasing-criterion]] — when every website can expose its capabilities as structured tools, the visual interface becomes irrelevant for agent interactions. It accelerates [[agents-become-the-buyer]] because agents can now evaluate and transact with services programmatically. The pattern mirrors [[features-are-prompts-not-code]]: the website's value shifts from its rendered interface to the structured capabilities it exposes. WebMCP is to websites what MCP was to developer tools — a standard protocol that makes the entire web [[ai-agents]]-traversable. Each `registerTool()` call is a formal contract, and [[tools-are-contracts-between-deterministic-and-nondeterministic-systems]] explains why these interfaces must be designed for non-deterministic consumers who rely on descriptions, not source code.
