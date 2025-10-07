import type { Actions } from './$types';
import { registerUser } from './actions/registerUser.server';
export const actions = {
	default: registerUser
} satisfies Actions;