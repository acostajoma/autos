import type { FailureActionData } from '$lib/server';
import type { ActionFailure, RequestEvent } from '@sveltejs/kit';
import { userResetPassword } from '$lib/helpers';
import { RESET_PASSWORD_FORM_ID } from '$lib/constants';
import { FormFailureActionBuilder } from '$lib/server';
import { fail, redirect } from '@sveltejs/kit';




/**
 * Handles the user registration (signup) or login (signin)
 * 
 * @param event - SvelteKit request event with request, locals, etc.
 * @param isSignIn - true for login, false for registration
 * @returns ActionFailure if there are errors, or redirect if successful
 */
export async function sendResetPasswordEmail(event: RequestEvent): Promise<ActionFailure<FailureActionData>> {
	const { request } = event;
	const formData = await request.formData();
	const email = formData.get('email') as string;
	const formId = RESET_PASSWORD_FORM_ID;

	let validationResult = FormFailureActionBuilder.buildFormValidationResult(
		{ formId, values: { email }, validationSchema: userResetPassword },
	);

	if (!validationResult[RESET_PASSWORD_FORM_ID]?.success) {
		console.error('error zod validation', validationResult );
		return fail<FailureActionData>(400, validationResult );
	}

	try {
		const redirectTo = `${event.url.origin}/cambiar-contrasena`;
		const { error } = await event.locals.supabase.auth.resetPasswordForEmail(email, {
			redirectTo
		  })

		if (error) {
			validationResult = FormFailureActionBuilder.buildFormErrorResult(
				{ formId, values: { email }, formError: error?.message || '' },
			);
		}
		
	} catch (error) {
		console.error('error', error);
		validationResult = FormFailureActionBuilder.buildFormErrorResult(
			{ formId, values: { email }, formError: 'Error al enviar el correo de recuperación de contraseña' },
		);
	}

	if (validationResult[formId]?.success) {
		redirect(303, '/recuperar-acceso/mensaje-confirmacion');
	}
	
	console.error('error validationResult ', validationResult );
	return fail<FailureActionData>(400, validationResult );
}
