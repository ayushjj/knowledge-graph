---
title: "Tribal knowledge is the irreducible human input that enables agent automation"
description: "Automated context construction handles most of the corpus, but the most critical context is implicit, conditional, and historically contingent — only humans can provide it"
topics: [ai-agents, knowledge-systems]
source: "@jasonscui — Your Data Agents Need Context, a16z"
date: 2026-03-11
domain: "ai"
---

LLMs can automate much of initial context gathering — scanning query history to find the most referenced tables, extracting definitions from dbt or LookML models. But the most important context is implicit, conditional, and historically contingent, and only exists as tribal knowledge inside teams. A concrete example: "for CRM data, look at Affinity for all new USCAN deals from 2025 onwards but Salesforce for all global leads before that." No automated scan discovers that rule.

This is the human refinement step that provides the final crucial links enabling true agent automation. It connects to [[agent-memory-preserves-institutional-knowledge]] — tribal knowledge is exactly the institutional knowledge that walks out the door with employees. The implication is that [[context-is-the-product-not-the-model]] needs a qualifier: the context itself requires human curation to be valuable. Purely automated knowledge capture, however sophisticated, can't close the last mile.
