---
title: "Who will set price / intelligence?"
author: "@JayaGup10 (Jaya Gupta)"
url: https://x.com/JayaGup10/status/2065965053334216718
date: 2026-06-15
type: tweet
---

Who will set price / intelligence?

AI is turning intelligence into a priced resource, and every layer of the market is now fighting over who controls that price. Labs want usage to run through them, while "applications" want to prove they can allocate intelligence better than the labs, while countries want intelligence cheap enough to become national infrastructure. The cost of intelligence is no longer an input to software, but rather is becoming the axis around which companies, markets, and geopolitics reorganize.

That is why AI investing feels so different from software investing. In software, while pattern-matching was hard, it could work. Distribution cost determined how efficiently a company acquired customers; switching cost determined whether it retained and expanded them. CAC payback, NDR, magic number, Rule of 40 were downstream of those forces.

AI breaks that for 3 distinct reasons. The system has more variables, the variables are coupled unevenly, and each variable decomposes into sub-variables moving on their own curves. Capability, cost, latency, deployment, regulation, talent: any one of them can move enough to change what the others mean. Solving one constraint changes which constraint matters next. You are effectively analyzing a system where the equation rewrites itself every hour.

What Each Variable Changes
The variables people already talk about are capability, cost, and latency. The harder ones are the unlocks coming out of research and product: their nature and depth are hard to model in advance, and the pace they arrive at keeps accelerating. Then there are constraints software could mostly treat as fixed, but AI turns into strategic choices: geopolitics, deployment, and talent.

Capability decomposes into reasoning, context, multimodality, tool use, planning, memory, and controllability, each on its own curve, each moving violently: context went from four thousand tokens to over a million in three years, and reasoning went from a prompting trick to a model class of its own. Along the way it swallowed infrastructure that looked like durable developer tooling: retrieval pipelines, output parsers, and prompt scaffolds were prosthetics for model weaknesses. A model that can hold a prompt is one product; a model that can hold a codebase or a customer history is another. And gains don't lift every application equally; they move the bottleneck.

Cost declines don't simply improve margins. They change who can compete. A workflow that once required a frontier API can move to a cheaper open-weight model, a fine-tuned specialist, or a routed stack, turning a premium product into a commodity feature. DeepSeek made the same point more violently: a change in cost expectations at the model layer can reroute the margin pool above it.

Latency became a variable because AI moved from async prompting into live workflows. A slow model is fine for a memo; it breaks in a sales call, support conversation, tutoring session, or security response. Once a human is waiting on the other side, latency stops being a performance detail and starts deciding whether the market can exist. Voice crossed that line when quality, interruption handling, and cents-per-minute pricing arrived together. Each latency drop doesn't just make the same product faster; it unlocks a new surface of usage.

Then the new curves, ones nobody could have put on a list two years ago: inference-time compute, task horizon, and AI as an input into its own production.

Inference-time compute is genuinely new: no prior software had a dial where spending ten times more compute bought a better answer. It makes cost per outcome a choice. A ten-second query and a ten-minute query on the same model are different products at different prices, so margin depends on the system's judgment, not just model pricing. This becomes the application-layer counterattack against the labs: as frontier models absorb more product logic, every company racing the model has to argue that it can allocate the customer's tokens better than the provider can. The lab is incentivized to expand usage; the application is incentivized to spend only where the outcome is worth it.

If inference-time compute is the depth dial, task horizon is the length dial: how long an AI works on its own before a human steps back in. The unit shifted from the call to the workflow. Agents run for hours, spawn sub-agents, and burn millions of tokens per decision path, so usage stops scaling with seats. Multiply length by depth and you get the token bill every Fortune 500 CFO now asks about.

AI has also become an input into its own production: generating synthetic data, writing code, producing evals, compressing experiment cycles. Each generation shortens the time to build the next, which makes the rate of change endogenous. This recursion is why the shift cycle dropped below the fundraising cycle, and why the half-life of any thesis is shrinking on a curve you can't extrapolate from history.

Geopolitics is where that war becomes explicit. China is structurally pushed toward efficiency and open-weight release; limited chip access and exclusion from parts of the frontier stack make that strategy rational. The U.S. can still compete with open-weight frontier models, but so far it has not produced the same structural answer. Software never required billion-dollar training runs. Frontier open weights need compute financing, patient capital, release governance, serving infrastructure, and a way to compete for talent when salaries and neo-lab acquisitions are pulling researchers into closed systems. Some American group has to make that training bill rational through federation or financial engineering as investors here want returns. Meanwhile, frontier labs argue for capability-based regulation because they believe the technology is dangerous, and they also benefit when frontier access stays controlled, audited, metered, and behind APIs. DeepSeek was more than a model release in that sense, it was a shot in the war over who gets to set the price of intelligence.

Deployment is still in flux because the value will not all accrue to the cloud. If cost matters, inference will move to wherever it can be done cheapest without breaking the product: cloud for frontier reasoning, edge for latency, on-device for privacy and personalization, hybrid for workflows that need all three. Privacy matters more in AI than it did in SaaS because the model is not just storing data; it is reasoning over the user's context, memory, documents, voice, code, behavior, and enterprise permissions. Where inference happens determines who captures the margin, who owns the context, and who the customer trusts.

And talent changed character. In SaaS, talent was an execution variable: better teams built faster, sold better, and operated with more discipline. In AI, talent is a raw input into production. A handful of researchers can change the architecture, data mixture, eval regime, or cost-capability curve itself. That means the team is not just executing against the market; it can change the shape of the market. Research taste, not just operating quality, becomes part of the asset.

The Threat Stops Being a Competitor
In SaaS, you were usually killed by another company: a better-funded competitor, a faster team, an incumbent expanding into your lane. There was one exception: a company built on top of someone else's platform could be wiped out by a pricing or terms change, no competitor involved. AI makes that exception the default. In AI, the threat is layer migration. Work moves when any variable changes enough: capability, cost, latency, deployment, regulation, trust. It can move into the model, an open-weight alternative, the customer's data platform, an agent runtime, or the device itself. The other variable is the demand: buyers move slowly, but they are not naive. They know what lock-in costs now, so the arbitrage in that lag is closing.

Company Building Has Inverted Too
A lot of the old assumptions are simply gone, and with them a lot of traditional VC advice. SaaS sold productivity and good vibes; AI is increasingly selling outcomes and services, and that is a less forgiving business. The product is only good if the outcome works, and the company only works if that outcome is produced efficiently enough.

That split shows up most clearly between consumer and enterprise. In consumer, breadth can be enough: the product is fast, cheap, broadly useful, and forgiven when it misses. In enterprise, the bar is different. The system has to work inside a specific workflow, with the customer's context, permissions, data, and risk tolerance built in. That is why the frontier model alone is not the enterprise product and why the value often sits in the application, orchestration, services, and proprietary data layers that make the model useful inside the company.

Distribution and talent look different. A company can reposition on a Tuesday because yesterday's model made a new product possible. Some companies have already changed the profile of who sells: when the product changes daily, you need someone who can sell a moving target. Top-down motions are working for some companies from the beginning.

The economics look different too. Services-as-software is changing pricing, and systems-integrator partnerships are happening years earlier than the old playbook suggested. This has split the market. Some investors, looking at portfolios where the product keeps rebuilding itself, have concluded that product barely matters and services are the real business. Others still recoil at anything that looks like consulting. The truth is probably more uncomfortable: in AI, product, services, deployment, and distribution are being recombined company by company.

Founders have innovated on company building because they had to. Narrow ICP, one wedge, build slowly, hire predictably, stay product-led: for some markets, none of it is sufficient when the variables won't sit still and customers don't want a point solution. What seems to win is fast feedback loops, small teams with authority, and comfort reorganizing around what changed rather than what was planned six months ago.

The Job Now for Founders and Countries
Value in AI is never captured once and defended. It's continuously repriced and relocated, and the variables are how you read the direction and speed of the relocation. Every AI company sits on a stack of assumptions, and the durable ones know what's in theirs: which assumptions they're long, and which they're short.

In that sense, investing in AI, and building in it, starts to look less like underwriting a software company and more like running a trading book. You are long some curves, short others, and exposed to correlations that can break exactly when they matter most. Choose which variables to bet on, know which ones can kill you, and build the company to recover faster than a wrong bet can compound.

The same is true politically. If the U.S. government can hold two variables in its head at once, we will be better off: control the dangerous frontier without making intelligence expensive enough that only the closed labs and rival states define the future. The country that wins is not the one that regulates the most or releases the most - it's going to be one that figures out how to make intelligence both safe enough to trust and cheap enough to spread.
