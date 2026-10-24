import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    topics: z.array(z.string()),
    source: z.string(),
    source_file: z.string().optional(),
    date: z.coerce.date(),
    domain: z.string().default('ai'),
    // Allowed values are defined in lib/kind.js; validate-graph.js Check 9 enforces the
    // bet <-> bet_date rule and that this frontmatter matches graph-index.yaml.
    kind: z.enum(['thinking-tool', 'principle', 'practice', 'bet']).optional(),
    bet_date: z.coerce.date().optional(),
  }),
});

export const collections = { insights };
