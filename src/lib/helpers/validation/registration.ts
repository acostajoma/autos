import { z } from 'zod';

const emailSchema = z
	.email({
		error: 'El email no es válido'
	})
	.nonempty({ message: 'El email es requerido' })
	.trim()
	.toLowerCase();
const passwordSchema = z
	.string({ message: 'La contraseña es requerida' })
	.min(8, {
		error: 'La contraseña debe tener al menos 8 caracteres'
	})
	.max(50, {
		error: 'La contraseña debe tener menos de 50 caracteres'
	});

export const userRegistration = z
	.strictObject({
		email: emailSchema,
		_password: passwordSchema,
		_passwordConfirmation: passwordSchema
	})
	.refine((data) => data._password === data._passwordConfirmation, {
		error: 'Las contraseñas no coinciden',
		path: ['_passwordConfirmation']
	});

export const userSignIn = z.strictObject({
	email: emailSchema,
	_password: passwordSchema
});

export const userResetPassword = z.strictObject({
	email: emailSchema
});

export const userChangePassword = z
	.strictObject({
		_password: passwordSchema,
		_passwordConfirmation: passwordSchema
	})
	.refine((data) => data._password === data._passwordConfirmation, {
		error: 'Las contraseñas no coinciden',
		path: ['_passwordConfirmation']
	});
