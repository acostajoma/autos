/**
 * @see https://developers.cloudflare.com/workers/wrangler/api/#return-type-1
 * For the time being the cache is not working as expected on local development
 */
	

/**
 * Gets a value from a custom cache
 * @param platform - The platform object
 * @param url - The URL object
 * @param cacheKey - The cache key
 * @returns The value from the cache or null if not found
 */
export const getCacheValue = async <T>(platform: App.Platform | undefined, url: URL, cacheKey: string): Promise<T | null> => {
    const cache = await platform?.caches.open(cacheKey);
    if (cache) {
        const cachedData = await cache.match(url.pathname);
        if (cachedData) {
            console.log('Data found in cache');
            const data: T = await cachedData.json();
            return data;
        }
    }
    return null;
}
/**
 * Sets a value in a custom cache
 * @param platform - The platform object
 * @param url - The URL object
 * @param cacheKey - The cache key
 * @param value - The value to set in the cache
 * @param maxAge - The maximum age of the cache in seconds
 */
export const setCacheValue = async <T>(platform: App.Platform | undefined, url: URL, cacheKey: string, value: T, maxAge: number = 3600) => {
    const cache = await platform?.caches.open(cacheKey);
    if (cache) {
        const response = new Response(JSON.stringify(value), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': `public, max-age=${maxAge}`
            }
        });
        await cache.put(url.pathname, response);
    }
}