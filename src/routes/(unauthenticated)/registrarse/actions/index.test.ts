import { describe, test, expect, beforeEach } from 'vitest';
import { registerUser } from './registerUser.server';
import { isRedirect, type RequestEvent } from '@sveltejs/kit';
import { getDbClient, getSupabaseClient } from '$lib/server';
import { DATABASE_URL } from '$env/static/private';
import { mockEvent } from '$lib/constants/testing';
import { getSupabaseAdminClient } from '$lib/server/utils/getSupabaseAdminClient';

describe('registerUser', () => {
	let supabase: App.Locals['supabase'];
	let db: App.Locals['db'];
	let testEmail: string;

	beforeEach(async () => {
		// Configurar cliente de Supabase para testing
		supabase = getSupabaseClient(mockEvent);
		// Configurar cliente de base de datos
		db = getDbClient(DATABASE_URL);
		// Generar email único para el test
		testEmail = `test-${Date.now()}@example.com`;
	});

	test('registra un usuario exitosamente con datos válidos', async () => {
		const mockRequest = new Request('http://localhost:5173/registrarse', {
			method: 'POST',
			body: new URLSearchParams({
				email: testEmail,
				password: 'password123',
				passwordConfirmation: 'password123'
			})
		});

		const mockEvent: RequestEvent = {
			request: mockRequest,
			url: new URL('http://localhost:5173/registrarse'),
			locals: {
				supabase,
				db
			}
		} as RequestEvent;

		// La función redirect() lanza una excepción, así que la capturamos
		try {
			await registerUser(mockEvent);
		} catch (error: unknown) {
			if (isRedirect(error)) {
				expect(error.status).toBe(303);
				expect(error.location).toBe('/');
			}
		}

		const session = await supabase.auth.getSession();

		expect(session.data.session).toBeDefined();
		expect(session.data.session?.user).toBeDefined();

        // @TODO: Eliminar el usuario de la base de datos
		// const userId = session.data.session?.user.id;
		// if (userId) {
		// 	try {
        //         const supabaseAdmin = getSupabaseAdminClient();
		// 		await supabaseAdmin.auth.admin.deleteUser(userId);
        //         console.log('Usuario eliminado');
		// 	} catch (error) {
		// 		console.error('error', error);
		// 	}
		// }
	});

	test('falla con contraseñas que no coinciden', async () => {
		const mockRequest = new Request('http://localhost:5173/registrarse', {
			method: 'POST',
			body: new URLSearchParams({
				email: testEmail,
				password: 'password123',
				passwordConfirmation: 'differentpassword'
			})
		});

		const mockEvent: RequestEvent = {
			request: mockRequest,
			locals: {
				supabase,
				db
			}
		} as RequestEvent;

		const result = await registerUser(mockEvent);

		expect(result.data.fieldsErrors?.passwordConfirmation?.errors[0]).toBe(
			'Las contraseñas no coinciden'
		);
		expect(result.status).toBe(400);
	});

	test('falla con email inválido', async () => {
		const mockRequest = new Request('http://localhost:5173/registrarse', {
			method: 'POST',
			body: new URLSearchParams({
				email: 'invalid-email',
				password: 'password123',
				passwordConfirmation: 'password123'
			})
		});

		const mockEvent: RequestEvent = {
			request: mockRequest,
			locals: {
				supabase,
				db
			}
		} as RequestEvent;

		const result = await registerUser(mockEvent);

		expect(result.data.fieldsErrors?.email?.errors[0]).toBe('El email no es válido');
		expect(result.status).toBe(400);
	});

	test('falla con contraseña muy corta', async () => {
		const mockRequest = new Request('http://localhost:5173/registrarse', {
			method: 'POST',
			body: new URLSearchParams({
				email: testEmail,
				password: '123',
				passwordConfirmation: '123'
			})
		});

		const mockEvent: RequestEvent = {
			request: mockRequest,
			locals: {
				supabase,
				db
			}
		} as RequestEvent;

		const result = await registerUser(mockEvent);

		expect(result.data.fieldsErrors?.passwordConfirmation?.errors[0]).toBe(
			'La contraseña debe tener al menos 8 caracteres'
		);
		expect(result.status).toBe(400);
	});
});
