// Allow-list for rendered insights. Content is partly written by an agent that reads strangers'
// pages, so a planted <img onerror=…> or a javascript: link must never reach visitors
// (review 2026-10-24). In Astro's pipeline this step runs BEFORE raw HTML is parsed, so raw
// HTML in markdown is removed outright; the allow-list governs what markdown itself produces.
// tests/sanitize-schema.test.ts renders through Astro's real processor to keep that true.
// Base: GitHub's schema. Added: inline colours on highlighted code blocks.
import { defaultSchema } from 'rehype-sanitize';
import type { Options } from 'rehype-sanitize';

const base = defaultSchema.attributes ?? {};

export const sanitizeSchema: Options = {
  ...defaultSchema,
  // GitHub's schema prefixes ids with "user-content-". Footnotes already carry that prefix,
  // so the default would double it on the target and break footnote links. Keep it ''.
  clobberPrefix: '',
  attributes: {
    ...base,
    pre: [...(base.pre ?? []), 'style', ['dataLanguage', /^[\w-]+$/]],
    span: [...(base.span ?? []), 'style'],
  },
  // only links and images; every other URL attribute keeps GitHub's defaults
  protocols: { ...defaultSchema.protocols, href: ['http', 'https', 'mailto'], src: ['http', 'https'] },
};
