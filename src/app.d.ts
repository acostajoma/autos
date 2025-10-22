import { Hyperdrive, KVNamespace } from '@cloudflare/workers-types';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
import type { Database } from './database.types.ts' // import generated types

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			status?: number;
		}
		interface Locals {
			db: import('$lib/server').DB;
			supabase: SupabaseClient<Database>
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
			session: Session | null
			user: User | null
		}
		interface PageData {
			session: Session | null
		}
		// interface PageState {}
		interface Platform {
			env: {
				HYPERDRIVE: Hyperdrive;
				CAR_DATA_CACHE: KVNamespace;
			};
			context: {
				waitUntil(promise: Promise<unknown>): void;
			};
			caches: CacheStorage & { default: Cache }
		}
	}
}

export {};
