import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const capedDimension = z.enum([
  'output',
  'abstraction',
  'paradigm',
  'expression',
  'input',
]);

const annotationSchema = z.object({
  /** Text span to highlight within the subsection text */
  text: z.string(),
  /** Which CAPED dimension this annotation relates to */
  dimension: capedDimension,
  /** Tooltip or sidebar note explaining the connection */
  note: z.string(),
});

const subsectionSchema = z.object({
  /** Optional heading for this part of the example */
  title: z.string().optional(),
  /** Annotatable prose — phrases must match annotation `text` values */
  text: z.string(),
  annotations: z.array(annotationSchema).default([]),
  /** How the visualization is embedded in this subsection */
  embedType: z.enum(['live', 'iframe', 'image']),
  /** URL for iframe or image embeds */
  embedSrc: z.string().optional(),
  /** Caption shown below image embeds */
  embedCaption: z.string().optional(),
  /** Width of the embed as a percentage of the content area (1–100) */
  embedWidth: z.number().min(1).max(100).default(100),
  /** Optional live code snippet shown in a sandbox */
  embedCode: z.string().optional(),
});

const exampleSchema = z.object({
  title: z.string(),
  /** Display order on the page (lower = earlier) */
  order: z.number(),
  summary: z.string(),
  /** Narrative subsections, each with text and one embed */
  sections: z.array(subsectionSchema).min(1),
  /** Author or reviewer remarks about the example and its CAPED analysis */
  remarks: z.string().optional(),
  draft: z.boolean().default(false),
});

const siteSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  venue: z.string(),
  year: z.number(),
  authors: z.array(z.string()),
  paperUrl: z.string().url().optional(),
  abstract: z.string(),
});

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  examples: defineCollection({
    type: 'content',
    schema: exampleSchema,
  }),
  site: defineCollection({
    type: 'content',
    schema: siteSchema,
  }),
};

export type CapedDimension = z.infer<typeof capedDimension>;
export type Annotation = z.infer<typeof annotationSchema>;
export type ExampleSubsection = z.infer<typeof subsectionSchema>;
