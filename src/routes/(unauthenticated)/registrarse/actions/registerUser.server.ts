import { REGISTRATION_FORM_ID, LOGIN_FORM_ID } from '$lib/constants';
import { signInUser, signUpNewUser } from '$lib/server';
import { userRegistration, userSignIn } from '$lib/helpers';
import type { FailureActionData } from '$lib/server';
import type { ActionFailure, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { FormFailureActionBuilder } from '$lib/server';

export async function registerUser(event: RequestEvent, isSignIn: boolean = false): Promise<ActionFailure<FailureActionData>> {
	const { request } = event;
	const formData = await request.formData();
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const passwordConfirmation = isSignIn ? undefined : formData.get('passwordConfirmation') as string;
	const validationObject = isSignIn ? userSignIn : userRegistration;

	const formId = isSignIn ? LOGIN_FORM_ID : REGISTRATION_FORM_ID;
	const formValues : Record<string, string | number | undefined> = { email, password };
	if (!isSignIn) {
		formValues.passwordConfirmation = passwordConfirmation;
	}

	let failureActionData = FormFailureActionBuilder.buildFormValidationResult(
		{ formId, values: formValues, validationObject },
	);

	if (!failureActionData[formId]?.success) {
		console.error('error zod validation', failureActionData);
		return fail<FailureActionData>(400, failureActionData);
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

	failureActionData = FormFailureActionBuilder.buildFormErrorResult(
		{ formId, values: { email }, formError: signUpError?.message || '' },
	);

	console.error('error failureActionData', failureActionData);
	return fail<FailureActionData>(400, failureActionData);
}
