import { REGISTRATION_FORM_ID, LOGIN_FORM_ID } from '$lib/constants';
import { signInUser, signUpNewUser } from '$lib/server';
import { userRegistration, userSignIn } from '$lib/helpers';
import type { FailureActionData } from '$lib/server';
import type { ActionFailure, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { FormFailureActionBuilder } from '$lib/server';

/**
 * Handles the user registration (signup) or login (signin)
 * 
 * @param event - SvelteKit request event with request, locals, etc.
 * @param isSignIn - true for login, false for registration
 * @returns ActionFailure if there are errors, or redirect if successful
 */
export async function registerUser(event: RequestEvent, isSignIn: boolean = false): Promise<ActionFailure<FailureActionData>> {
	const { request } = event;
	const formData = await request.formData();
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const passwordConfirmation = isSignIn ? undefined : formData.get('passwordConfirmation') as string;

	// Select the appropriate validation schema and form id
	const validationSchema = isSignIn ? userSignIn : userRegistration;
	const formId = isSignIn ? LOGIN_FORM_ID : REGISTRATION_FORM_ID;

	// Do not include password confirmation if it is a sign in
	const formValues : Record<string, string | number | undefined> = { email, password };
	
	// Include password confirmation if it is a registration
	if (!isSignIn) {
		formValues.passwordConfirmation = passwordConfirmation;
	}

	let validationResult  = FormFailureActionBuilder.buildFormValidationResult(
		{ formId, values: formValues, validationSchema },
	);

	if (!validationResult [formId]?.success) {
		console.error('error zod validation', validationResult );
		return fail<FailureActionData>(400, validationResult );
	}

	const emailRedirectTo = event.url.origin;
	const {
		session,
		user,
		error: signUpError
	} = isSignIn ? await signInUser(event.locals.supabase, email, password) : await signUpNewUser(event.locals.supabase, email, password, emailRedirectTo);

	if (session && user && !signUpError) {
		redirect(303, '/');
	}

	validationResult  = FormFailureActionBuilder.buildFormErrorResult(
		{ formId, values: { email }, formError: signUpError?.message || '' },
	);

	console.error('error validationResult ', validationResult );
	return fail<FailureActionData>(400, validationResult );
}
