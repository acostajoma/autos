import type { Actions } from './$types';
import { registerUser } from '../registrarse/actions/registerUser.server';
import type { RequestEvent } from '@sveltejs/kit';

export const actions = {
	default: (event: RequestEvent) => registerUser(event, true)
} satisfies Actions;