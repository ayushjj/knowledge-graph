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
  }),
});

export const collections = { insights };
