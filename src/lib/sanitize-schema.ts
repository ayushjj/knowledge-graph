// Allow-list for HTML in rendered insights. Raw HTML in markdown is passed through by Astro,
// so a planted <img onerror=…> or a javascript: link would run for every visitor (review
// 2026-10-24). rehype-sanitize keeps only these tags, attributes and link schemes — anything
// else, however it is split across lines or encoded, is removed at build time.
// Base: GitHub's schema. Added: class/style on code blocks (syntax highlighting) and wikilinks.
import { defaultSchema } from 'rehype-sanitize';
import type { Options } from 'rehype-sanitize';

const base = defaultSchema.attributes ?? {};

export const sanitizeSchema: Options = {
  ...defaultSchema,
  // GitHub's schema prefixes ids with "user-content-"; keep heading anchors as Astro writes them.
  clobberPrefix: '',
  attributes: {
    ...base,
    a: [...(base.a ?? []), 'className'],
    code: [...(base.code ?? []), 'className', 'style'],
    pre: [...(base.pre ?? []), 'className', 'style', 'tabIndex', ['dataLanguage', /^[\w-]+$/]],
    span: [...(base.span ?? []), 'className', 'style'],
  },
  protocols: { href: ['http', 'https', 'mailto'], src: ['http', 'https'] },
};
