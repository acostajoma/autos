import { sequence } from '@sveltejs/kit/hooks';
import { error, type Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { DATABASE_URL } from '$env/static/private';
import { getDb } from '$lib/server/db';

const setupdDb : Handle = async ({ event, resolve }) => {
    if (!event.platform) error(500, 'Platform not found');
    if (dev) {
        event.locals.db = getDb(DATABASE_URL)
    } else {
        event.locals.db = getDb(event.platform.env.HYPERDRIVE.connectionString)
    }
	return await resolve(event);
}

export const handle = sequence(setupdDb);
