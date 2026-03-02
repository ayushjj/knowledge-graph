import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { remarkWikilinks } from './src/lib/remark-wikilinks.ts';

export default defineConfig({
  site: 'https://ayushjj.github.io',
  base: '/knowledge-graph/',
  trailingSlash: 'ignore',
  integrations: [react()],
  markdown: {
    remarkPlugins: [remarkWikilinks],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
