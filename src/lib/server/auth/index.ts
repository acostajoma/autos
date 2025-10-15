import type { SupabaseClient, Session, User } from '@supabase/supabase-js';

type SignUpNewUserResponse = {
	user: User | null;
	session: Session | null;
	error: App.Error | null;
};
    
function createErrorMessageInSpanish(status: number) : string {
    switch (status) {
        case 400:
            return 'No se pudo completar su solicitud. Por favor, intenta más tarde';
        case 401:
            return 'Credenciales inválidas';
        case 403:
            return 'Acceso denegado. Esta función no está disponible para tu cuenta';
        case 409:
            return 'No se pudo completar el registro. Por favor, intenta con otro correo electrónico.';
        case 422:
            return 'No se pudo procesar la solicitud. Por favor, intenta más tarde';
        case 429:
            return 'Demasiados intentos. Por favor, espera un momento antes de intentar nuevamente';
        case 500:
            return 'Error interno del servidor. Por favor, intenta más tarde';
        case 501:
            return 'Esta función no está habilitada en el servidor';
        default:
            return 'Ha ocurrido un error';
    }
}

type AuthAction = 'signUp' | 'signIn';

async function handleAuthAction(
	supabase: SupabaseClient,
	action: AuthAction,
	email: string,
	password: string,
	emailRedirectTo?: string
): Promise<SignUpNewUserResponse> {
	try {
		let data, error;
		if (action === 'signUp') {
			({ data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo,
				}
			}));
		} else {
			({ data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			}));
		}
		return {
			user: data.user,
			session: data.session,
			error: error
				? { message: createErrorMessageInSpanish(error?.status || 500), status: error?.status || 500 }
				: null
		};
	} catch (error) {
		console.error(error);
		return {
			user: null,
			session: null,
			error: { message: createErrorMessageInSpanish(500), status: 500 }
		};
	}
}

export async function signUpNewUser(
	supabase: SupabaseClient,
	email: string,
	password: string,
	emailRedirectTo: string
): Promise<SignUpNewUserResponse> {
	return handleAuthAction(supabase, 'signUp', email, password, emailRedirectTo);
}

export async function signInUser(
	supabase: SupabaseClient,
	email: string,
	password: string
): Promise<SignUpNewUserResponse> {
	return handleAuthAction(supabase, 'signIn', email, password);
}