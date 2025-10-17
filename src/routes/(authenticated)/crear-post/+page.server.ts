import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { createCarPostWithoutImages } from '$lib/helpers/validation/carPost';
import { CAR_POST_FORM_ID } from '$lib/constants/forms';
import { FormFailureActionBuilder } from '$lib/server';


export const load: PageServerLoad = async () => {
	console.log('Loading page');
	return {
		
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		// Convert string values to appropriate types
		const parsedData = {
			...data,
			versionId: Number(data.versionId),
			year: Number(data.year),
			colorId: Number(data.colorId),
			fuelId: Number(data.fuelId),
			transmissionId: Number(data.transmissionId),
			tractionId: Number(data.tractionId),
			motorSize: Number(data.motorSize),
			horsePower: Number(data.horsePower),
			kilometers: Number(data.kilometers),
			doorsNumber: Number(data.doorsNumber),
			cityId: Number(data.cityId),
			price: Number(data.price),
			technicalRevisionUpToDate: data.technicalRevisionUpToDate === 'on',
			permissionUpToDate: data.permissionUpToDate === 'on',
			isPriceNegotiable: data.isPriceNegotiable === 'on'
		};

		console.log('Parsed data:', parsedData);

		const validationResult = FormFailureActionBuilder.buildFormValidationResult({
			formId: CAR_POST_FORM_ID,
			values: parsedData,
			validationSchema: createCarPostWithoutImages
		});

		if (!validationResult[CAR_POST_FORM_ID].success) {
			return fail(400, validationResult);
		}

		// TODO: Save the car post to the database
		console.log('Validated car post data:', parsedData);

		// For now, just return success
		return {
			[CAR_POST_FORM_ID]: {
				success: true,
				message: 'Publicación creada exitosamente'
			}
		};
	}
};

