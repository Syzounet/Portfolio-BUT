// @ts-ignore
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
	schema: z.object({
		inProgress: z.boolean(),
		disabled: z.boolean().optional(),
		title: z.string(),
		description: z.string(),
		slug: z.string().optional(),
		tags: z.array(z.string()),
		link: z.string().optional(),
		url: z.string().optional(),
		img_alt: z.string().optional(),
	}),
});

export const collections = {
	projects: projectsCollection,
};
