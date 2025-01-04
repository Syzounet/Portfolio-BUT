import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
	schema: z.object({
		inProgress: z.boolean(),
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		link: z.string().optional(), // Optional external link
		url: z.string().optional(), // URL for internal project pages
		img_alt: z.string().optional(),
	}),
});

export const collections = {
	projects: projectsCollection,
};
