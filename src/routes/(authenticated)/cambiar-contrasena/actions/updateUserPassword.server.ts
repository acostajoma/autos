import { CHANGE_PASSWORD_FORM_ID } from '$lib/constants';
import { userChangePassword } from '$lib/helpers';
import type { FailureActionData } from '$lib/server';
import type { ActionFailure, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { FormFailureActionBuilder } from '$lib/server';

/**
 * Handles the user registration (signup) or login (signin)
 * 
 * @param event - SvelteKit request event with request, locals, etc.
 * @returns ActionFailure if there are errors, or redirect if successful
 */
export async function updateUserPassword(event: RequestEvent): Promise<ActionFailure<FailureActionData>> {
	const { request } = event;
	const formData = await request.formData();

	const password = formData.get('password') as string;
	const passwordConfirmation = formData.get('passwordConfirmation') as string;

	const formValues : Record<string, string | number | undefined> = { password, passwordConfirmation };
	

	let validationResult  = FormFailureActionBuilder.buildFormValidationResult(
		{ formId: CHANGE_PASSWORD_FORM_ID, values: formValues, validationSchema: userChangePassword },
	);

	if (!validationResult[CHANGE_PASSWORD_FORM_ID]?.success) {
		console.error('error zod validation', validationResult );
		return fail<FailureActionData>(400, validationResult );
	}

    
    try {
        const { error: passwordResetError } = await event.locals.supabase.auth.updateUser({
            password,
        })
        if (passwordResetError) {
            validationResult  = FormFailureActionBuilder.buildFormErrorResult(
                { formId: CHANGE_PASSWORD_FORM_ID, values: formValues, formError: passwordResetError?.message || '' },
            );
        }
    } catch (error) {
        console.error('error updating password', error);
        validationResult  = FormFailureActionBuilder.buildFormErrorResult(
            { formId: CHANGE_PASSWORD_FORM_ID, values: formValues, formError:  'Error al actualizar la contraseña' },
        );
    }

	if (validationResult[CHANGE_PASSWORD_FORM_ID]?.success) {
		redirect(303, '/cambiar-contrasena/mensaje-confirmacion');
	}

	
	console.error('error validationResult ', validationResult );
	return fail<FailureActionData>(400, validationResult );
}
