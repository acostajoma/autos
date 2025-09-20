import { dev } from '$app/environment';
import { type Hyperdrive } from '@cloudflare/workers-types';

/**
 * Mock Hyperdrive configuration for local development.
 * 
 * When running locally, we need to mock the Hyperdrive connection as the actual
 * Cloudflare Hyperdrive values are not available in the development environment
 * and we're currently getting wrong/undefined values from the platform.
 * 
 * This function returns a mock Hyperdrive configuration that points to a local
 * PostgreSQL instance (typically running via Docker/Supabase local setup).
 */
export function mockHyperdrive() : Omit<Hyperdrive, 'connect'> | undefined {
    if (!dev) return;
    return {
        connectionString: "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
        port: 54322,
        host: '127.0.0.1',
        password: 'postgres',
        user: 'postgres',
        database: 'postgres'
    }
} 