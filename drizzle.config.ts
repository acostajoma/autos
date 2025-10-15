import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';

// Cargar variables de entorno desde .env.local
config({ path: '.env.local' });

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	out: './supabase/migrations',
	dbCredentials: { url: process.env.DATABASE_URL },
	verbose: true,
	strict: true,
	entities:{
		roles: {
			provider: 'supabase',
			
		},
	}
}) satisfies Config;
