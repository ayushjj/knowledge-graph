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
