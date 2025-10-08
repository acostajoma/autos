import { getContext, setContext } from "svelte";
import {page} from "$app/state";
import type { FailureActionData } from "$lib/server";
import type { FormId } from "./RegistrationForm.svelte";


export const getContent = (key : FormId) => {
    return page.form?.[key];
}

export function setFormContext(key: FormId, formState: FailureActionData) {
	setContext(key, formState);
}

export function getFormContext(key: FormId) {
	return getContext(key) as FailureActionData;
}