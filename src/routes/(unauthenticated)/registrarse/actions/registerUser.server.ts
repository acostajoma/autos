import { REGISTRATION_FORM_ID } from '$lib/constants';
import { signUpNewUser, userRegistration } from '$lib/server';
import type { FailureActionData } from '$lib/types';
import type { ActionFailure, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { treeifyError } from 'zod';

export async function registerUser(event: RequestEvent): Promise<ActionFailure<FailureActionData>> {
	const { request } = event;
	const formData = await request.formData();
	const email = formData.get(REGISTRATION_FORM_ID + '.email') as string;
	const password = formData.get(REGISTRATION_FORM_ID + '.password') as string;
	const passwordConfirmation = formData.get(
		REGISTRATION_FORM_ID + '.passwordConfirmation'
	) as string;

	const validatedData = userRegistration.safeParse({ email, password, passwordConfirmation });
	if (!validatedData.success) {
		const treeError = treeifyError(validatedData.error);
		const failuredata = {
			[REGISTRATION_FORM_ID]: {
				values: {
					email: email
				},
				fieldsErrors: treeError.properties
			}
		};
		console.log('Logging error', failuredata);
		return fail<FailureActionData>(400, failuredata);
	}

	const emailRedirectTo = event.url.origin;
	const {
		session,
		user,
		error: signUpError
	} = await signUpNewUser(event.locals.supabase, email, password, emailRedirectTo);

	if (signUpError) {
		console.error('error signUpError', signUpError);
		return fail<FailureActionData>(400, {
			[REGISTRATION_FORM_ID]: {
				values: {
					email: email
				},
				formError: signUpError.message
			}
		});
	}

	if (session && user) {
		redirect(303, '/');
	}
	return fail<FailureActionData>(400, {
		[REGISTRATION_FORM_ID]: {
			values: {
				email: email
			},
			formError: 'Error al registrar el usuario'
		}
	});
}
