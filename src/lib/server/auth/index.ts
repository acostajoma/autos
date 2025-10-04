import type { SupabaseClient, Session, User } from '@supabase/supabase-js';

type SignUpNewUserResponse = {
	user: User | null;
	session: Session | null;
	error: App.Error | null;
};
    
function createErrorMessageInSpanish(status: number) : string {
    switch (status) {
        case 400:
            return 'Ha ocurrido un error';
        case 401:
            return 'Credenciales inválidas';
        case 403:
            return 'Acceso denegado. Esta función no está disponible para tu cuenta';
        case 409:
            return 'El correo electrónico ya está en uso';
        case 422:
            return 'La contraseña es demasiado débil';
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

export async function signUpNewUser(supabase: SupabaseClient, email: string, password: string, emailRedirectTo: string) : Promise<SignUpNewUserResponse> {
	try {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				emailRedirectTo
			}
		});
		return { 
            user: data.user, 
            session: data.session, 
            error: error  ? { message: createErrorMessageInSpanish(error?.status || 500), status: error?.status || 500 } : null
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
