import type { FormData } from '$lib/state/form.svelte';
import { SvelteSet } from 'svelte/reactivity';
import { type ZodObject, type ZodRawShape, treeifyError } from 'zod';

export type FailureActionData = Record<string, FormData & { success: boolean }>;
type BuildFormValidationResultProps = {
	formId: string;
	values: Record<string, string | number | undefined>;
	validationObject: ZodObject<ZodRawShape>;
}
type BuildFormErrorResultProps = {
	formId: string;
	values: Record<string, string | number | undefined>;
	formError: string;
}
export class FormFailureActionBuilder {
    // this method has been added to avoid sending password data back to the client for security reasons
    static removePasswordData(values: Record<string, string | number | undefined>): Record<string, string | number | undefined> {
        if (values.passwordConfirmation) {
            delete values.passwordConfirmation;
        }
        if (values.password) {
            delete values.password;
        }
        return values;
    }
	static buildFormValidationResult({ formId, values, validationObject }: BuildFormValidationResultProps): FailureActionData {
		const validatedData = validationObject.safeParse(values);
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

	static buildFormErrorResult({ formId, values, formError }: BuildFormErrorResultProps): FailureActionData {
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
