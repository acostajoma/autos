import { carModelsQuery, carVersionsQuery } from '$lib/server/db/queries';
import type { RequestHandler } from '@sveltejs/kit';
import { positiveIntegerSchema } from '$lib/helpers/validation/carPost';
import { getCacheValue, setCacheValue } from '$lib/server/utils/cache';
import { CAR_DATA_CACHE_KEY } from '$lib/constants';
import { json, error } from '@sveltejs/kit';

const CACHE_MAX_AGE = 86400; // 24 hours in seconds

export const GET: RequestHandler = async ({ locals: { db }, url, platform }) => {
	const makeId = url.searchParams.get('makeId');
	const modelId = url.searchParams.get('modelId');

	// Initial parameters validation
	if (!makeId && !modelId) {
		return error(400, 'Se requiere al menos makeId o modelId');
	}

	// If we have modelId, get the versions
	if (modelId) {
		const parsedModelId = positiveIntegerSchema.safeParse(Number(modelId));

		if (!parsedModelId.success) {
            console.log('Model ID is not valid',parsedModelId.error);
			return error(400, 'El ID del modelo no es válido');
		}

		// Try to get from cache
		const cacheKey = `versions-${parsedModelId.data}`;
		const cacheUrl = new URL(url);
		cacheUrl.pathname = `${cacheUrl.pathname}/${cacheKey}`;

		const cachedVersions = await getCacheValue<Awaited<ReturnType<typeof carVersionsQuery>>>(
			platform,
			cacheUrl,
			CAR_DATA_CACHE_KEY
		);

		if (cachedVersions) {
			return json(cachedVersions);
		}

		// If not in cache, query the database
		const versions = await carVersionsQuery(db, parsedModelId.data);

		// Save in cache
		await setCacheValue(platform, cacheUrl, CAR_DATA_CACHE_KEY, versions, CACHE_MAX_AGE);

		return json(versions);
	}

	// If we have makeId, get the models
	if (makeId) {
		const parsedMakeId = positiveIntegerSchema.safeParse(Number(makeId));

		if (!parsedMakeId.success) {
			return error(400, 'El ID de la marca no es válido');
		}

		// Try to get from cache
		const cacheKey = `models-${parsedMakeId.data}`;
		const cacheUrl = new URL(url);
		cacheUrl.pathname = `${cacheUrl.pathname}/${cacheKey}`;

		const cachedModels = await getCacheValue<Awaited<ReturnType<typeof carModelsQuery>>>(
			platform,
			cacheUrl,
			CAR_DATA_CACHE_KEY
		);

		if (cachedModels) {
			return json(cachedModels);
		}

		// If not in cache, query the database
		const models = await carModelsQuery(db, parsedMakeId.data);

		// Save in cache
		await setCacheValue(platform, cacheUrl, CAR_DATA_CACHE_KEY, models, CACHE_MAX_AGE);

		return json(models);
	}

	return error(400, 'Parámetros inválidos');
};
