import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { remarkWikilinks } from './src/lib/remark-wikilinks.ts';
import rehypeSanitize from 'rehype-sanitize';
import { sanitizeSchema } from './src/lib/sanitize-schema.ts';

export default defineConfig({
  site: 'https://ayushjj.github.io',
  base: '/knowledge-graph/',
  trailingSlash: 'ignore',
  // Insights merged 2026-10-24 (duplicates): old URLs forward to the insight that absorbed them.
  redirects: {
    '/insight/building-is-easier-but-generating-value-is-still-hard': '/knowledge-graph/insight/ai-compresses-execution-not-judgment',
    '/insight/dissolved-constraints-shift-bottleneck-to-judgment': '/knowledge-graph/insight/ai-compresses-execution-not-judgment',
    '/insight/error-memory-enables-learning-without-retraining': '/knowledge-graph/insight/cross-user-knowledge-transfer-needs-no-fine-tuning',
    '/insight/know-which-computation-belongs-in-latent-vs-deterministic-space': '/knowledge-graph/insight/intelligence-location-determines-system-fragility',
    '/insight/kv-cache-hit-rate-determines-agent-economics': '/knowledge-graph/insight/prompt-caching-makes-long-context-economically-viable',
    '/insight/memory-is-where-agent-lock-in-lives': '/knowledge-graph/insight/closed-harnesses-behind-apis-create-memory-lock-in',
    '/insight/model-compensations-become-liabilities-as-capabilities-advance': '/knowledge-graph/insight/scaffolding-is-tech-debt-against-the-next-model',
    '/insight/never-do-one-off-work-skillify-every-task': '/knowledge-graph/insight/compound-engineering-makes-future-work-easier',
    '/insight/reducing-your-unknowns-is-the-trainable-skill-of-agentic-coding': '/knowledge-graph/insight/map-is-not-the-territory-unknowns-are-the-real-bottleneck',
    '/insight/safety-enforcement-belongs-in-tool-design-not-prompts': '/knowledge-graph/insight/enforcement-must-run-independently-of-model-cooperation',
    '/insight/self-improving-agents-overfit-to-eval-metrics': '/knowledge-graph/insight/holdout-sets-gate-autonomous-harness-optimization',
    '/insight/sell-the-work-not-the-tool': '/knowledge-graph/insight/autopilots-capture-work-budget-not-tool-budget',
    '/insight/skill-folder-structure-is-context-engineering': '/knowledge-graph/insight/skill-graphs-enable-progressive-disclosure',
    '/insight/structure-plus-reasoning-beats-flat-similarity': '/knowledge-graph/insight/similarity-is-not-relevance-relevance-requires-reasoning',
    '/insight/system-prompt-guardrails-become-constraints-as-models-get-more-imaginative': '/knowledge-graph/insight/scaffolding-is-tech-debt-against-the-next-model',
    '/insight/the-learning-loop-is-the-firms-new-ip-and-it-compounds': '/knowledge-graph/insight/offload-the-task-but-never-the-learning',
    '/insight/traces-not-scores-enable-agent-improvement': '/knowledge-graph/insight/full-trace-filesystem-beats-compressed-summaries-for-harness-optimization',
    '/insight/two-tier-agent-memory-separates-org-from-user': '/knowledge-graph/insight/context-learning-spans-agent-tenant-and-org-levels',
  },
  integrations: [react()],
  markdown: {
    remarkPlugins: [remarkWikilinks],
    // Strip any HTML outside the allow-list from rendered insights (see sanitize-schema.ts).
    rehypePlugins: [[rehypeSanitize, sanitizeSchema]],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
