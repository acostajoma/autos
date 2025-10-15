import type { Actions } from './$types';
import { updateUserPassword } from './actions/updateUserPassword.server';

export const actions = {
	default: updateUserPassword
} satisfies Actions;