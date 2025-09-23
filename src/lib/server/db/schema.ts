import { pgTable, serial, text, integer, decimal, primaryKey, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// User
export const user = pgTable('user', {
	id: uuid('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	phone: text('phone'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const userRelation = relations(user, ({ many }) => ({
	posts: many(post),
}));

// Post (Publications)
export const post = pgTable('post', {
	id: uuid('id').primaryKey(),
	userId: uuid('user_id').references(() => user.id),
	price: decimal('price', { precision: 10, scale: 2 }).notNull(),
	currency: text('currency').notNull(),
	isPriceNegotiable: boolean('is_price_negotiable').notNull().default(false),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	expirationDate: timestamp('expiration_date').notNull().default(sql`CURRENT_TIMESTAMP + INTERVAL '90 days'`),
	views: integer('views').notNull().default(0),
	description: text('description').notNull(),
	state: text('state').notNull(),
	title: text('title').notNull(),
});

export const postRelation = relations(post, ({ one, many }) => ({
	user: one(user, {
		fields: [post.userId],
		references: [user.id],
	}),
	advertising: many(advertising),
}));

// Advertising Types
export const advertisingType = pgTable('advertising_type', {
	id: serial('id').primaryKey(),
	imageAlt: text('image_alt'),
	imageUrl: text('image_url'),
	description: text('description').notNull(),
	type: text('type').unique().notNull(),
});

export const advertisingTypeRelation = relations(advertisingType, ({ many }) => ({
	advertising: many(advertising),
}));

// Advertising
export const advertising = pgTable('advertising', {
	id: serial('id').primaryKey(),
	advertisingTypeId: integer('advertising_type_id').references(() => advertisingType.id),
	description: text('description').notNull(),
	name: text('name').notNull().unique(),
	price: decimal('price', { precision: 10, scale: 2 }	).notNull(),
	currency: text('currency').notNull(),
});

export const advertisingRelation = relations(advertising, ({ one , many }) => ({
	advertisingType: one(advertisingType, {
		fields: [advertising.advertisingTypeId],
		references: [advertisingType.id],
	}),
	posts: many(postToAdvertising),
	features: many(advertisingFeature),
}));

// Advertising Features (Join Table)
export const advertisingFeature = pgTable('advertising_feature', {
	advertisingId: integer('advertising_id').references(() => advertising.id),
	featureId: integer('feature_id').references(() => feature.id),
}, (table) => ({
	pk: primaryKey({name: 'pk_advertising_feature', columns: [table.advertisingId, table.featureId] }),
}));

export const advertisingFeatureRelation = relations(advertisingFeature, ({ one }) => ({
	advertising: one(advertising, {
		fields: [advertisingFeature.advertisingId],
		references: [advertising.id],
	}),
	feature: one(feature, {
		fields: [advertisingFeature.featureId],
		references: [feature.id],
	}),
}));

// Features
export const feature = pgTable('feature', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	textValue: text('text_value'),
	numberValue: decimal('number_value', { precision: 10, scale: 2 }),
});

export const featureRelation = relations(feature, ({ many }) => ({
	advertisingFeatures: many(advertisingFeature),
}));

// Post to Advertising (Join Table)
export const postToAdvertising = pgTable('post_to_advertising', {
	postId: uuid('post_id').references(() => post.id),
	advertisingId: integer('advertising_id').references(() => advertising.id),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	expirationDate: timestamp('expiration_date'),
}, (table) => ({
	pk: primaryKey({name: 'pk_post_to_advertising', columns: [table.postId, table.advertisingId] }),
}));

export const postToAdvertisingRelation = relations(postToAdvertising, ({ one }) => ({
	post: one(post, {
		fields: [postToAdvertising.postId],
		references: [post.id],
	}),
	advertising: one(advertising, {
		fields: [postToAdvertising.advertisingId],
		references: [advertising.id],
	}),
}));