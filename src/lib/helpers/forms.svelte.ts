import { getContext, setContext } from "svelte";
import type { FormState } from "$lib/state/form.svelte";

export function setFormContext<T extends string>(key: T, formState: FormState) {
	setContext(key, formState);
}

export function getFormContext<T extends string>(key: T) {
	return getContext(key) as FormState;
}