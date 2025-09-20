import { pgTable, serial, text } from 'drizzle-orm/pg-core';



export const publicityType = pgTable('publicity_type', {
	id: serial('id').primaryKey(),
	imageAlt: text('image_alt'),
	imageUrl: text('image_url'),
	description: text('description'),
	type: text('type'),
});
