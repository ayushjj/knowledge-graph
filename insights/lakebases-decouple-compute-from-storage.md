---
title: "Lakebases decouple compute from storage — databases become elastic infrastructure"
description: "Third-generation databases separate compute and storage entirely, putting data in open formats on cloud object stores; the database becomes a serverless layer that scales to zero"
topics: [ai-native-product-architecture]
source: "Databricks (Ali Ghodsi, Matei Zaharia et al.) — What Is a Lakebase"
date: 2026-02-28
---

Traditional databases haven't fundamentally changed since the 1980s — compute and storage bound together, rigid provisioning, proprietary formats, constant specialist oversight.

Lakebases are the third generation:
- **Gen 1 (Monolith):** MySQL, Postgres, Oracle — compute and storage on one machine, proprietary formats
- **Gen 2 (Proprietary Loose Coupling):** Aurora, Oracle Exadata — physically separated storage but still proprietary formats and single-engine lock-in
- **Gen 3 (Lakebase):** Data lives in open formats on cloud object stores (S3). Compute is serverless Postgres that scales to zero. Instant branching, cloning, and recovery — even at petabyte scale.

This matters for AI because agent workloads are fundamentally different from traditional apps: they need to spin up many instances, experiment freely, branch databases like git branches, and pay only for what they use. Lakebases make the database match the agent's workflow instead of the other way around.

This is the infrastructure-level answer to [[rigid-schemas-exist-because-rigid-apps-demand-them]] — while that insight argues agents eliminate the need for rigid schemas, lakebases eliminate the operational rigidity of the database itself. Together, both the schema and the infrastructure become elastic.

The Postgres compatibility connects to [[boring-tech-wins-for-ai-native-startups]] — you get the familiar SQL interface but with cloud-native elasticity underneath. And the shift from proprietary lock-in to open formats echoes [[build-for-obsolescence-models-eat-scaffolding]]: vendor-specific database ops are scaffolding that open architecture sheds.
