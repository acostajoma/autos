import { pgTable, serial, text, integer, decimal, primaryKey, uuid, timestamp, boolean, index, check, foreignKey, pgPolicy } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { authenticatedRole, authUsers } from "drizzle-orm/supabase";

// User
export const user = pgTable('user', {
	id: uuid('id').primaryKey(),
	firstName: text('first_name'),
	lastName: text('last_name'),
	email: text('email').notNull().unique(),
	phone: text('phone'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	isActive: boolean('is_active').notNull().default(true),
},
(table) => ([
	foreignKey({
		columns: [table.id],
		foreignColumns: [authUsers.id],
		name: 'user_id_fkey',
	}).onDelete('cascade'),
	pgPolicy('Authenticated can edit own user', {
		for: 'update',
		to: authenticatedRole,
		using: sql`id = (select auth.uid())`,
	}),
]));

export const userRelation = relations(user, ({ many }) => ({
	posts: many(post),
	cars: many(car),
	favorites: many(favorite),
}));

// Post (Publications)
export const post = pgTable('post', {
	id: uuid('id').primaryKey().references(() => car.id),
	userId: uuid('user_id').references(() => user.id).notNull(),
	price: decimal('price', { precision: 10, scale: 2 }).notNull(),
	currency: text('currency').notNull(),
	isPriceNegotiable: boolean('is_price_negotiable').notNull().default(false),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	expirationDate: timestamp('expiration_date').notNull().default(sql`CURRENT_TIMESTAMP + INTERVAL '90 days'`),
	deletedAt: timestamp('deleted_at'),
	views: integer('views').notNull().default(0),
	description: text('description').notNull(),
	state: text('state').notNull(),
	title: text('title').notNull(),
}, (table) => ([
	index('post_user_id_idx').on(table.userId),
	index('post_price_idx').on(table.price),
	index('post_state_idx').on(table.state),
	index('post_expiration_date_idx').on(table.expirationDate, table.deletedAt),
	index('post_price_currency_idx').on(table.price, table.currency),
	index('post_created_at_idx').on(table.createdAt),
	check('post_price_check', sql`price > 0`),
	pgPolicy('Authenticated can edit own post', {
		for: 'update',
		to: authenticatedRole,
		using: sql`user_id = (select auth.uid())`,
	}),
	pgPolicy('Anyone can read a post', {
		for: 'select',
		using: sql`true`,
	}),
	pgPolicy('Anyone authenticated can insert a post', {
		for: 'insert',
		to: authenticatedRole,
		withCheck: sql`true`,
	}),
]));

export const postRelation = relations(post, ({ one, many }) => ({
	user: one(user, {
		fields: [post.userId],
		references: [user.id],
	}),
	car: one(car, {
		fields: [post.id],
		references: [car.id],
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
}, () => ([
	pgPolicy('Anyone can read advertising type', {
		for: 'select',
		using: sql`true`,
	}),
]))

export const advertisingTypeRelation = relations(advertisingType, ({ many }) => ({
	advertising: many(advertising),
}));

// Advertising
export const advertising = pgTable('advertising', {
	id: serial('id').primaryKey(),
	advertisingTypeId: integer('advertising_type_id').references(() => advertisingType.id).notNull(),
	description: text('description').notNull(),
	name: text('name').notNull().unique(),
	price: decimal('price', { precision: 10, scale: 2 }	).notNull(),
	currency: text('currency').notNull(),
}, (table) => ([
	index('advertising_advertising_type_id_idx').on(table.advertisingTypeId),
	pgPolicy('Anyone can read advertising', {
		for: 'select',
		using: sql`true`,
	}),
]));

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
	advertisingId: integer('advertising_id').references(() => advertising.id).notNull(),
	featureId: integer('feature_id').references(() => feature.id).notNull(),
}, (table) => ([
	primaryKey({name: 'pk_advertising_feature', columns: [table.advertisingId, table.featureId] }),
	pgPolicy('Anyone can read advertising feature', {
		for: 'select',
		using: sql`true`,
	}),
]));

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
}, (table) => ([
	index('feature_name_idx').on(table.name),
	index('feature_text_value_idx').on(table.textValue),
	index('feature_number_value_idx').on(table.numberValue),
	pgPolicy('Anyone can read a feature', {
		for: 'select',
		using: sql`true`,
	}),
]))

export const featureRelation = relations(feature, ({ many }) => ({
	advertisingFeatures: many(advertisingFeature),
}));

// Post to Advertising (Join Table)
export const postToAdvertising = pgTable('post_to_advertising', {
	postId: uuid('post_id').references(() => post.id).notNull(),
	advertisingId: integer('advertising_id').references(() => advertising.id).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	expirationDate: timestamp('expiration_date'),
}, (table) => ([
	primaryKey({name: 'pk_post_to_advertising', columns: [table.postId, table.advertisingId] }),
	index('post_to_advertising_post_id_idx').on(table.postId),
	index('post_to_advertising_advertising_id_idx').on(table.advertisingId),
	index('post_to_advertising_expiration_date_idx').on(table.expirationDate),
	pgPolicy('Anyone can read a post to advertising', {
		for: 'select',
		using: sql`true`,
	}),
]))

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

// Favorite
export const favorite = pgTable('favorite', {
	userId: uuid('user_id').references(() => user.id).notNull(),
	postId: uuid('post_id').references(() => post.id).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ([
	primaryKey({name: 'pk_favorite', columns: [table.userId, table.postId] }),
	index('favorite_user_id_idx').on(table.userId),
	index('favorite_post_id_idx').on(table.postId),
	pgPolicy('Authenticated can favorite post', {
		for: 'all',
		to: authenticatedRole,
		using: sql`user_id = (select auth.uid())`,
		withCheck: sql`user_id = (select auth.uid())`,
	}),
]));

export const favoriteRelation = relations(favorite, ({ one }) => ({
	user: one(user, {
		fields: [favorite.userId],
		references: [user.id],
	}),
	post: one(post, {
		fields: [favorite.postId],
		references: [post.id],
	}),
}));

// Country
export const country = pgTable('country', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	currencySymbol: text('currency_symbol').notNull(),
	currency: text('currency').notNull(),
	phoneCode: text('phone_code').notNull(),
},
() => ([
	pgPolicy('Anyone can read a country', {
		for: 'select',
		using: sql`true`,
	}),
]))

export const countryRelation = relations(country, ({ many }) => ({
	regions: many(region),
}));

// Region
export const region = pgTable('region', {
	id: serial('id').primaryKey(),
	countryId: integer('country_id').references(() => country.id),
	name: text('name').notNull(),
},
	() => ([
		pgPolicy('Anyone can read a region', {
			for: 'select',
			using: sql`true`,
		}),
	]))

export const regionRelation = relations(region, ({ one, many }) => ({
	country: one(country, {
		fields: [region.countryId],
		references: [country.id],
	}),
	states: many(city),
}));

// City
export const city = pgTable('city', {
	id: serial('id').primaryKey(),
	regionId: integer('region_id').references(() => region.id),
	name: text('name').notNull(),
}, (table) => ([
	index('city_region_id_idx').on(table.regionId),
	pgPolicy('Anyone can read a city', {
		for: 'select',
		using: sql`true`,
	}),
]))

export const cityRelation = relations(city, ({ one, many }) => ({
	region: one(region, {
		fields: [city.regionId],
		references: [region.id],
	}),
	cars: many(car),
}));

// Make
export const make = pgTable('make', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	countryId: integer('country_id').references(() => country.id),
	approved: boolean('approved').notNull().default(false),
}, (table) => ([
	index('make_name_idx').on(table.name),
	index('make_approved_idx').on(table.approved),
	pgPolicy('Anyone can read a make', {
		for: 'select',
		using: sql`true`,
	}),
	pgPolicy('Anyone can insert a make if is authenticated and approved is false', {
		for: 'insert',
		to: authenticatedRole,
		withCheck: sql`approved = false`,
	}),
]))

export const makeRelation = relations(make, ({ one, many }) => ({
	country: one(country, {
		fields: [make.countryId],
		references: [country.id],
	}),
	models: many(model),
}));

// Type
export const type = pgTable('type', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	approved: boolean('approved').notNull().default(false),
},
() => ([
	pgPolicy('Anyone can read a type', {
		for: 'select',
		using: sql`true`,
	}),
]))

export const typeRelation = relations(type, ({ many }) => ({
	models: many(model),
}));

// Model
export const model = pgTable('model', {
	id: serial('id').primaryKey(),
	makeId: integer('make_id').references(() => make.id),
	name: text('name').notNull(),
	typeId: integer('type_id').references(() => type.id),
	approved: boolean('approved').notNull().default(false),
}, (table) => ([
	index('model_make_id_idx').on(table.makeId),
	index('model_type_id_idx').on(table.typeId),
	index('model_name_idx').on(table.name),
	pgPolicy('Anyone can read a model', {
		for: 'select',
		using: sql`true`,
	}),
	pgPolicy('Anyone can insert a model if is authenticated and approved is false', {
		for: 'insert',
		to: authenticatedRole,
		withCheck: sql`approved = false`,
	}),
]))


export const modelRelation = relations(model, ({ one, many }) => ({
	make: one(make, {
		fields: [model.makeId],
		references: [make.id],
	}),
	type: one(type, {
		fields: [model.typeId],
		references: [type.id],
	}),
	versions: many(version),
}));

// Version
export const version = pgTable('version', {
	id: serial('id').primaryKey(),
	modelId: integer('model_id').references(() => model.id),
	name: text('name').notNull(),
	approved: boolean('approved').notNull().default(false),
}, (table) => ([
	index('version_model_id_idx').on(table.modelId),
	index('version_approved_idx').on(table.approved),
	pgPolicy('Anyone can read a version', {
		for: 'select',
		using: sql`true`,
	}),
	pgPolicy('Anyone can insert a version if is authenticated and approved is false', {
		for: 'insert',
		to: authenticatedRole,
		withCheck: sql`approved = false`,
	}),
]))

export const versionRelation = relations(version, ({ one }) => ({
	model: one(model, {
		fields: [version.modelId],
		references: [model.id],
	}),
}));

// Fuel
export const fuel = pgTable('fuel', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
},
() => ([
	pgPolicy('Anyone can read a fuel', {
		for: 'select',
		using: sql`true`,
	}),
]))

export const fuelRelation = relations(fuel, ({ many }) => ({
	cars: many(car),
}));

// Transmission
export const transmission = pgTable('transmission', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
},
() => ([
	pgPolicy('Anyone can read a transmission', {
		for: 'select',
		using: sql`true`,
	}),
]))

export const transmissionRelation = relations(transmission, ({ many }) => ({
	cars: many(car),
}));

// Traction
export const traction = pgTable('traction', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
},
() => ([
	pgPolicy('Anyone can read a traction', {
		for: 'select',
		using: sql`true`,
	}),
]))

export const tractionRelation = relations(traction, ({ many }) => ({
	cars: many(car),
}));

// Color
export const color = pgTable('color', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	hex: text('hex').notNull(),
},
() => ([
	pgPolicy('Anyone can read a color', {
		for: 'select',
		using: sql`true`,
	}),
]))

export const colorRelation = relations(color, ({ many }) => ({
	cars: many(car),
}));

// Car Equipment
export const equipment = pgTable('equipment', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
},
() => ([
	pgPolicy('Anyone can read a equipment', {
		for: 'select',
		using: sql`true`,
	}),
]))

export const equipmentRelation = relations(equipment, ({ many }) => ({
	equipmentToCars: many(equipmentToCar),
}));

// Equipment to Car (Join Table)
export const equipmentToCar = pgTable('equipment_to_car', {
	equipmentId: integer('equipment_id').references(() => equipment.id).notNull(),
	carId: uuid('car_id').references(() => car.id).notNull(),
}, (table) => ([
	primaryKey({name: 'pk_equipment_to_car', columns: [table.equipmentId, table.carId] }),
	index('equipment_to_car_equipment_id_idx').on(table.equipmentId),
	index('equipment_to_car_car_id_idx').on(table.carId),
	pgPolicy('Authenticated can insert own equipment to car', {
		for: 'insert',
		to: authenticatedRole,
		withCheck: sql`car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid()))`,
	}),
	pgPolicy('Authenticated can update own equipment to car', {
		for: 'update',
		to: authenticatedRole,
		using: sql`car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid()))`,
	}),
	pgPolicy('Authenticated can delete own equipment to car', {
		for: 'delete',
		to: authenticatedRole,
		using: sql`car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid()))`,
	}),
	pgPolicy('Anyone can read a equipment to car', {
		for: 'select',
		using: sql`true`,
	}),
]));

export const equipmentToCarRelation = relations(equipmentToCar, ({ one }) => ({
	equipment: one(equipment, {
		fields: [equipmentToCar.equipmentId],
		references: [equipment.id],
	}),
	car: one(car, {
		fields: [equipmentToCar.carId],
		references: [car.id],
	}),
}));

// Car
export const car = pgTable('car', {
	id: uuid('id').primaryKey(),
	userId: uuid('user_id').references(() => user.id).notNull(),
	cityId: integer('city_id').references(() => city.id).notNull(),
	versionId: integer('version_id').references(() => version.id).notNull(),
	technicalRevisionUpToDate: boolean('technical_revision_up_to_date').notNull().default(false),
	fuelId: integer('fuel_id').references(() => fuel.id).notNull(),
	motorSize: integer('motor_size').notNull(),
	kilometers: integer('kilometers').notNull(),
	permissionUpToDate: boolean('permission_up_to_date').notNull().default(false),
	plateNumber: text('plate_number').notNull(), // As text bc there can be letters and numbers in some countries
	doorsNumber: integer('doors_number').notNull(),
	horsePower: integer('horse_power').notNull(),
	year: integer('year').notNull(),
	transmissionId: integer('transmission_id').references(() => transmission.id).notNull(),
	tractionId: integer('traction_id').references(() => traction.id).notNull(),
	condition: text('condition').notNull(),
	colorId: integer('color_id').references(() => color.id).notNull(),
}, (table) => ([
	check('car_year_check', sql`year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1`),
	check('car_kilometers_check', sql`kilometers >= 0`),
	check('car_horse_power_check', sql`horse_power >= 0`),
	check('car_doors_number_check', sql`doors_number BETWEEN 2 AND 6`),
	check('car_motor_size_check', sql`motor_size >= 0`),
	// Índices para claves foráneas más importantes
	index('car_city_id_idx').on(table.cityId),
	index('car_version_id_idx').on(table.versionId),
	index('car_fuel_id_idx').on(table.fuelId),
	index('car_transmission_id_idx').on(table.transmissionId),
	index('car_traction_id_idx').on(table.tractionId),
	index('car_year_idx').on(table.year),
	index('car_kilometers_year_idx').on(table.kilometers),
	// Índices compuestos útiles para consultas comunes
	pgPolicy('Authenticated can update own car', {
		for: 'update',
		to: authenticatedRole,
		using: sql`user_id = (select auth.uid())`,
	}),
	pgPolicy('Authenticated can insert own car', {
		for: 'insert',
		to: authenticatedRole,
		withCheck: sql`user_id = (select auth.uid())`,
	}),
	pgPolicy('Anyone can read a car', {
		for: 'select',
		using: sql`true`,
	}),
]));

export const carRelation = relations(car, ({ one, many }) => ({
	post: one(post, {
		fields: [car.id],
		references: [post.id],
	}),
	city: one(city, {
		fields: [car.cityId],
		references: [city.id],
	}),
	version: one(version, {
		fields: [car.versionId],
		references: [version.id],
	}),
	user: one(user, {
		fields: [car.userId],
		references: [user.id],
	}),
	fuel: one(fuel, {
		fields: [car.fuelId],
		references: [fuel.id],
	}),
	transmission: one(transmission, {
		fields: [car.transmissionId],
		references: [transmission.id],
	}),
	traction: one(traction, {
		fields: [car.tractionId],
		references: [traction.id],
	}),
	color: one(color, {
		fields: [car.colorId],
		references: [color.id],
	}),
	equipment: many(equipmentToCar),
	images: many(carImage),
}));

// Car Images
export const carImage = pgTable('car_image', {
	id: serial('id').primaryKey(),
	carId: uuid('car_id').references(() => car.id).notNull(),
	imageUrl: text('image_url').notNull(),
	imageAlt: text('image_alt').notNull(),
	imageOrder: integer('image_order').notNull(),
}, (table) => ([
	index('car_image_car_id_idx').on(table.carId),
	check('car_image_image_order_check', sql`image_order >= 0`),
	pgPolicy('Authenticated can insert own car image', {
		for: 'insert',
		to: authenticatedRole,
		withCheck: sql`car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid()))`,
	}),
	pgPolicy('Authenticated can update own car image', {
		for: 'update',
		to: authenticatedRole,
		using: sql`car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid()))`,
	}),
	pgPolicy('Authenticated can delete own car image', {
		for: 'delete',
		to: authenticatedRole,
		using: sql`car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid()))`,
	}),
	pgPolicy('Anyone can read a car image', {
		for: 'select',
		using: sql`true`,
	}),
]));

export const carImageRelation = relations(carImage, ({ one }) => ({
	car: one(car, {
		fields: [carImage.carId],
		references: [car.id],
	}),
}));

