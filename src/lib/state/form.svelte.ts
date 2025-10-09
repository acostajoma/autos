import { SvelteSet } from "svelte/reactivity";
import type { ZodObject, ZodRawShape } from "zod";
import { treeifyError } from 'zod';

export type FieldErrors = Record<string, {
				errors: string[];
		  } | undefined>;

type FormValues = Record<string, string | number | undefined>;

export interface FormData {
    disabled: boolean;
    taintedFields: SvelteSet<string>;
    formError: string | undefined;
    fieldsErrors: FieldErrors;
    values: FormValues;
};


const FORM_ERROR_DISMISSAL_TIMEOUT_MS = 4000;


/**
 * Manages the reactive state of a form with Zod validation
 * 
 * This class is responsible for:
 * - Storing field values
 * - Validating data against a Zod schema
 * - Managing per-field and general errors
 * - Controlling the disabled state of the submit button
 * - Synchronizing with server data
 */
export class FormState implements FormData {
    disabled : boolean = $state(false);
    taintedFields : SvelteSet<string> = new SvelteSet();
    formError : string | undefined = $state(undefined);
    fieldsErrors : FieldErrors = $state({});
    values : FormValues = $state({});
    
    // Timeout for the form error dismissal
    private formErrorDismissalTimeout: ReturnType<typeof setTimeout> | undefined = undefined

    constructor(private formId: string, private validationObject: ZodObject<ZodRawShape>) {
        this.formId = formId;
        this.validationObject = validationObject;
    }

    /**
	 * Updates the local state with data received from the server
	 * Usually called after a form submission that returns errors
	 * 
	 * @param formData - Form data returned by the server
	 */
    setPageFormData(formData: FormData){
        this.disabled = formData.disabled;
        this.taintedFields = new SvelteSet(formData.taintedFields);
        this.formError = formData.formError;
        this.fieldsErrors = formData.fieldsErrors;
        this.values = formData.values;

        // Cancels the previous timeout if it exists
        if (this.formErrorDismissalTimeout) {
            clearTimeout(this.formErrorDismissalTimeout);
        }
        // Set the timeout if the form error is not undefined
        if (this.formError) {
            this.formErrorDismissalTimeout = setTimeout(() => {
                this.formError = undefined;
                this.formErrorDismissalTimeout = undefined;
            }, FORM_ERROR_DISMISSAL_TIMEOUT_MS);
        }
    }

    getFormData() {
        return {
            disabled: this.disabled,
            taintedFields: this.taintedFields,
            formError: this.formError,
            fieldsErrors: this.fieldsErrors,
            values: this.values
        };
    }
    
    setTaintedFields(field: string) {
        this.taintedFields.add(field);
    }

    setDisabled() {
        // get values and keys from the values and fieldsErrors objects
        const valuesKeys = Object.keys(this.values);
        const valuesValues = Object.values(this.values);
        const fieldsErrorsKeys = Object.keys(this.fieldsErrors);
        if (
            this.taintedFields.size === 0 ||
            this.formError ||
            valuesKeys.length === 0 ||
            fieldsErrorsKeys.length > 0 ||
            valuesValues.length !== valuesKeys.length || valuesValues.some(value => (value === undefined || value === '' || value === null))
        ) {
            this.disabled = true;
        } 
        else {
            this.disabled = false;
        }
    }

    getDisabled() {
        return this.disabled;
    }
    
    setValue(name: string, value: string | number | undefined) {
        this.values[name] = value;
    }

    getValue(name: string) {
        return this.values?.[name] || '';
    }

    getFieldsErrors(name: string) {
        return this.fieldsErrors?.[name]?.errors.join(', ') || null;
    }

    getFormError() {
        return this.formError;
    }

    validateFields() {
        const validatedData = this.validationObject.safeParse(this.values);
        if (!validatedData.success) {   
            const treeError = treeifyError(validatedData.error);
            this.fieldsErrors = treeError.properties || {};
            this.disabled = true;
        }
        else {
            this.fieldsErrors = {};
            this.disabled = false;
        }
    }
}