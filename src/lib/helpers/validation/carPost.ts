import { z } from 'zod';

// Schemas reutilizables
const positiveIntegerSchema = z.number({ message: 'Debe ser un número válido' })
	.int({ message: 'Debe ser un número entero' })
	.positive({ message: 'Debe ser mayor a 0' });

const nonNegativeIntegerSchema = z.number({ message: 'Debe ser un número válido' })
	.int({ message: 'Debe ser un número entero' })
	.nonnegative({ message: 'No puede ser negativo' });

const priceSchema = z.number({ message: 'El precio es requerido' })
	.positive({ message: 'El precio debe ser mayor a 0' })
	.max(9999999999.99, { message: 'El precio es demasiado alto' });

// Validación para información básica del vehículo
export const carBasicInfo = z.strictObject({
	versionId: positiveIntegerSchema.describe('ID de la versión del vehículo'),
	year: z.number({ message: 'El año es requerido' })
		.int({ message: 'El año debe ser un número entero' })
		.min(1900, { message: 'El año debe ser mayor o igual a 1900' })
		.max(new Date().getFullYear() + 1, { message: 'El año no puede ser mayor al año siguiente' }),
	colorId: positiveIntegerSchema.describe('ID del color'),
});

// Validación para especificaciones técnicas
export const carTechnicalSpecs = z.strictObject({
	fuelId: positiveIntegerSchema.describe('ID del tipo de combustible'),
	transmissionId: positiveIntegerSchema.describe('ID del tipo de transmisión'),
	tractionId: positiveIntegerSchema.describe('ID del tipo de tracción'),
	motorSize: positiveIntegerSchema.describe('Tamaño del motor en cc'),
	horsePower: nonNegativeIntegerSchema.describe('Caballos de fuerza'),
	kilometers: nonNegativeIntegerSchema.describe('Kilometraje'),
	doorsNumber: z.number({ message: 'El número de puertas es requerido' })
		.int({ message: 'Debe ser un número entero' })
		.min(2, { message: 'El vehículo debe tener al menos 2 puertas' })
		.max(6, { message: 'El vehículo no puede tener más de 6 puertas' }),
});

// Validación para estado y documentación
export const carConditionAndDocs = z.strictObject({
	condition: z.string({ message: 'La condición es requerida' })
		.min(1, { message: 'La condición es requerida' })
		.trim(),
	technicalRevisionUpToDate: z.boolean({ message: 'Debe indicar si la revisión técnica está al día' })
		.default(false),
	permissionUpToDate: z.boolean({ message: 'Debe indicar si los permisos están al día' })
		.default(false),
	plateNumber: z.string({ message: 'La placa es requerida' })
		.min(1, { message: 'La placa es requerida' })
		.max(20, { message: 'La placa no puede tener más de 20 caracteres' })
		.trim()
		.toUpperCase(),
});

// Validación para ubicación
export const carLocation = z.strictObject({
	cityId: positiveIntegerSchema.describe('ID de la ciudad'),
});

// Validación para información de la publicación
export const postInfo = z.strictObject({
	title: z.string({ message: 'El título es requerido' })
		.min(10, { message: 'El título debe tener al menos 10 caracteres' })
		.max(100, { message: 'El título no puede tener más de 100 caracteres' })
		.trim(),
	description: z.string({ message: 'La descripción es requerida' })
		.min(50, { message: 'La descripción debe tener al menos 50 caracteres' })
		.max(2000, { message: 'La descripción no puede tener más de 2000 caracteres' })
		.trim(),
	price: priceSchema,
	currency: z.string({ message: 'La moneda es requerida' })
		.min(3, { message: 'Código de moneda inválido' })
		.max(3, { message: 'Código de moneda inválido' })
		.trim()
		.toUpperCase(),
	isPriceNegotiable: z.boolean({ message: 'Debe indicar si el precio es negociable' })
		.default(false),
	state: z.string({ message: 'El estado de la publicación es requerido' })
		.min(1, { message: 'El estado de la publicación es requerido' })
		.trim(),
});

// Validación para imágenes del vehículo
export const carImageSchema = z.strictObject({
	imageUrl: z.string({ message: 'La URL de la imagen es requerida' })
		.url({ message: 'Debe ser una URL válida' })
		.trim(),
	imageAlt: z.string({ message: 'El texto alternativo es requerido' })
		.min(5, { message: 'El texto alternativo debe tener al menos 5 caracteres' })
		.max(200, { message: 'El texto alternativo no puede tener más de 200 caracteres' })
		.trim(),
	imageOrder: nonNegativeIntegerSchema.describe('Orden de la imagen'),
});

export const carImages = z.strictObject({
	images: z.array(carImageSchema)
		.min(1, { message: 'Debe agregar al menos 1 imagen' })
		.max(20, { message: 'No puede agregar más de 20 imágenes' }),
});

// Validación para equipamiento
export const carEquipment = z.strictObject({
	equipmentIds: z.array(positiveIntegerSchema)
		.optional()
		.default([]),
});

// Validación completa para crear una publicación de vehículo (todos los pasos combinados)
export const createCarPost = carBasicInfo
	.extend(carTechnicalSpecs.shape)
	.extend(carConditionAndDocs.shape)
	.extend(carLocation.shape)
	.extend(postInfo.shape)
	.extend(carImages.shape)
	.extend(carEquipment.shape);

// Tipos TypeScript inferidos de los schemas
export type CarBasicInfo = z.infer<typeof carBasicInfo>;
export type CarTechnicalSpecs = z.infer<typeof carTechnicalSpecs>;
export type CarConditionAndDocs = z.infer<typeof carConditionAndDocs>;
export type CarLocation = z.infer<typeof carLocation>;
export type PostInfo = z.infer<typeof postInfo>;
export type CarImageSchema = z.infer<typeof carImageSchema>;
export type CarImages = z.infer<typeof carImages>;
export type CarEquipment = z.infer<typeof carEquipment>;
export type CreateCarPost = z.infer<typeof createCarPost>;

