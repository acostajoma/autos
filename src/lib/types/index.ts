export type Theme = 'light' | 'dark';
export type SignInOrSignUpAction = '/iniciar-sesion' | '/registrarse';
export type FailureActionData = {
    [key : string]: string | number | object | undefined;
    fieldsErrors?: {
        [key: string]: {
            errors: string[];
        } | undefined;
    }
    formError?: string;
};