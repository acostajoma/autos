import { vi } from 'vitest';
import type { RequestEvent } from '@sveltejs/kit';

export const mockEvent = {
    cookies: {
        getAll: vi.fn().mockReturnValue([]),
        set: vi.fn(),
        get: vi.fn(),
        delete: vi.fn()
    },
    fetch: vi.fn(),
    getClientAddress: vi.fn(),
    setHeaders: vi.fn(),
    tracing: vi.fn(),
    isRemoteRequest: false,
    locals: {},
    params: {},
    route: { id: '/registrarse' },
    url: new URL('http://localhost:5173/registrarse'),
    request: new Request('http://localhost:5173/registrarse'),
    isDataRequest: false,
    isSubRequest: false,
    platform: undefined
} as unknown as RequestEvent;