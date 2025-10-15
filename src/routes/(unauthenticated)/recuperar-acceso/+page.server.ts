import type { Actions } from './$types';
import { sendResetPasswordEmail } from './actions/sendResetPasswordEmail.server';
export const actions = {
	default: sendResetPasswordEmail
} satisfies Actions;