import { fail, redirect, type ActionFailure } from '@sveltejs/kit';
import type { Actions } from './$types';
import { signUpNewUser } from '$lib/server/auth';
import { userRegistration } from '$lib/server/db/validation';
import { treeifyError } from 'zod';
import type { FailureActionData } from '$lib/types';

export const actions = {
	default: async (event) : Promise<ActionFailure<FailureActionData>> => {
		const { request } = event;
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('passwordConfirmation') as string;

		const validatedData = userRegistration.safeParse({ email, password, passwordConfirmation });
		if(!validatedData.success){
			const treeError = treeifyError(validatedData.error);
			console.error('error tree', treeError.properties);
			return fail<FailureActionData>(400, { email, fieldsErrors: treeError.properties });
		}
		const { session, user, error : signUpError } = await signUpNewUser(event.locals.supabase, email, password, 'http://localhost:5173/');
		
		if (signUpError) {
			console.error('error signUpError', signUpError);
			return fail<FailureActionData>(400, { email, formError: signUpError.message });
		}

		if (session && user) {
			redirect(303, '/');
		}
	

		

		return fail<FailureActionData>(400, { email, formError: 'Error al registrar el usuario' });
	}
} satisfies Actions;