import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

export const getDbClient = (connectionString: string) => {
    if (!connectionString) throw new Error('DATABASE_URL is not set');
    const client = postgres(connectionString,
        {
            max: 5,
            fetch_types: false,
        }
    );
    return drizzle(client, { schema });

}

export type DB = ReturnType<typeof getDbClient>;