import type { FormData } from '$lib/state/form.svelte';
import { SvelteSet } from 'svelte/reactivity';
import { type ZodObject, type ZodRawShape, treeifyError } from 'zod';

/**
 * Data structure returned by the server actions when there are errors
 * Includes a 'success' flag to determine if the validation passed
 */
export type FailureActionData = Record<string, FormData & { success: boolean }>;

type BuildFormValidationResultProps = {
	formId: string;
	values: Record<string, string | number | undefined>;
	validationSchema: ZodObject<ZodRawShape>;
};
type BuildFormErrorResultProps = {
	formId: string;
	values: Record<string, string | number | undefined>;
	formError: string;
};

/**
 * Builder to build consistent error responses from the server
 *
 * This class helps to maintain a standard format for form errors
 * and ensures that sensitive data (passwords) is not returned to the client
 */
export class FormFailureActionBuilder {
	/**
	 * Security measure: passwords should never be returned to the browser
	 *
	 * @param values - Form values
	 * @returns Values without password fields
	 */
	static removePasswordData(
		values: Record<string, string | number | undefined>
	): Record<string, string | number | undefined> {
		if (values.passwordConfirmation) {
			delete values.passwordConfirmation;
		}
		if (values.password) {
			delete values.password;
		}
		return values;
	}

	/**
	 * Validates form values against a Zod schema
	 * and builds a structured error response
	 *
	 * @param formId - Unique form ID
	 * @param values - Values to validate
	 * @param validationSchema - Zod schema for validation
	 * @returns FailureActionData with success=true/false and errors (if any)
	 */
	static buildFormValidationResult({
		formId,
		values,
		validationSchema
	}: BuildFormValidationResultProps): FailureActionData {
		const validatedData = validationSchema.safeParse(values);
		if (!validatedData.success) {
			const treeError = treeifyError(validatedData.error);
			return {
				[formId]: {
					values: this.removePasswordData(values),
					disabled: true,
					taintedFields: new SvelteSet(),
					formError: undefined,
					fieldsErrors: treeError.properties || {},
					success: false
				}
			};
		}
		return {
			[formId]: {
				values: this.removePasswordData(values),
				disabled: true,
				taintedFields: new SvelteSet(),
				formError: undefined,
				fieldsErrors: {},
				success: true
			}
		};
	}

	/**
	 * Builds a general form error response
	 *
	 * Used when the validation passes but the business logic fails
	 * (e.g: user not found, network error, etc.)
	 *
	 * @param formId - Unique form ID
	 * @param values - Form values (without passwords)
	 * @param formError - Error message to display
	 * @returns FailureActionData with the general error
	 */
	static buildFormErrorResult({
		formId,
		values,
		formError
	}: BuildFormErrorResultProps): FailureActionData {
		return {
			[formId]: {
				values: this.removePasswordData(values),
				disabled: true,
				taintedFields: new SvelteSet(),
				formError: formError,
				fieldsErrors: {},
				success: false
			}
		};
	}
}
