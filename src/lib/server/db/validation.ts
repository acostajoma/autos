import {z} from 'zod'

const emailSchema = z.email({
    error: 'El email no es válido'
}).trim().toLowerCase();
const passwordSchema = z.string().min(8, {
    error: 'La contraseña debe tener al menos 8 caracteres'
}).max(50, {
    error: 'La contraseña debe tener menos de 50 caracteres'
});

export const userRegistration = z.strictObject({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
}).refine(data => data.password === data.passwordConfirmation,{
    error: 'Las contraseñas no coinciden',
})