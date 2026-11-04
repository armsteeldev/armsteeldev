import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    year: z.number().int().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).default([]),
    links: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })).default([]),
    githubUrl: z.string().url().optional(),
    technicalDetails: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).default([]),
  }),
});

export const collections = { projects };
