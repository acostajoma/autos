import { redirect } from '@sveltejs/kit';
import { getRequestEvent, form } from '$app/server';
import { userResetPassword, userRegistration, userSignIn, userChangePassword } from '$lib/helpers';
import { signUpNewUser, signInUser, createErrorMessageInSpanish} from '$lib/server/auth';
import { updateUserPassword } from '../../routes/(authenticated)/cambiar-contrasena/actions/updateUserPassword.server';

export const signup = form(
	userRegistration,
	async ({ email, _password }) => {
        const event = getRequestEvent();
	    const emailRedirectTo = event.url.origin;
  
        const { error: signUpError } = await signUpNewUser(event.locals.supabase, email, _password, emailRedirectTo);

        if (!signUpError) {
            redirect(303, '/confirmar-usuario');
        } 
		
		
        return  {
            success: false,
            error: signUpError?.message || 'Error al registrar el usuario' 
        }
    }
);

export const login = form(
	userSignIn,
	async ({ email, _password }) => {
		const event = getRequestEvent();
		const { error: signInError } = await signInUser(event.locals.supabase, email, _password);
		if (!signInError) {
			redirect(303, '/');
		}
		return  {
			success: false,
			error: signInError?.message || 'Error al iniciar sesión' 
		}
	}
);

export const forgotPassword = form(userResetPassword, async ({ email }) => {
	const event = getRequestEvent();

	let resetPasswordErrorMessage: string | undefined;
	try {
		const redirectTo = `${event.url.origin}/cambiar-contrasena`;
		const { error : supabaseError } = await event.locals.supabase.auth.resetPasswordForEmail(email, {
			redirectTo
		});
		if (supabaseError) {
			resetPasswordErrorMessage = createErrorMessageInSpanish(supabaseError?.status || 400);
		} 

	} catch (error) {
		console.error('error', error);
		resetPasswordErrorMessage = createErrorMessageInSpanish(500);
	}
	if (resetPasswordErrorMessage) {
		return {
			success: false,
			error: resetPasswordErrorMessage
		}
	}

	redirect(303, '/recuperar-acceso/mensaje-confirmacion');

})

export const updatePassword = form(userChangePassword, async ({ _password }) => {
	const event = getRequestEvent();
	let updatePasswordErrorMessage: string | undefined;
	try {
		const { error: passwordResetError } = await event.locals.supabase.auth.updateUser({
            password: _password,
        })
		if (passwordResetError) {
			return {
				success: false,
				error: createErrorMessageInSpanish(passwordResetError?.status || 400)
			}
		}
	} catch (error) {
		console.error('error', error);
		updatePasswordErrorMessage = createErrorMessageInSpanish(500);
	}

	if (updatePasswordErrorMessage) {
		return {
			success: false,
			error: updatePasswordErrorMessage
		}
	}

	redirect(303, '/cambiar-contrasena/mensaje-confirmacion');

})