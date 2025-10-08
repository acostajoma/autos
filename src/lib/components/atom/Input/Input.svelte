<script lang="ts">
	import { page } from '$app/state';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	import { getFormContext } from '$lib/helpers';
	import { untrack } from 'svelte';

	let {
		id,
		type,
		name,
		required,
		placeholder,
		autocomplete,
		ariaLabel,
		disabled,
		label,
		formId,
		validateOnBlur = true
	}: HTMLInputAttributes & {
		ariaLabel: string;
		label?: string;
		formId: string;
		name: string;
		validateOnBlur?: boolean;
	} = $props();

	let formState = getFormContext(formId);
	
	// Just needed for initial state if the server returns a value
	// As we are checking changes on the validateFields function
	let error = $state(
		untrack(() => formState.getFieldsErrors(name)));

	const validateFields = () => {
		formState.validateFields();
		error = formState.getFieldsErrors(name);
	}
	const onblur :  ( ()=> void ) | undefined = () => validateOnBlur ? 
		validateFields()
		: undefined;

	const oninput : ( (e: Event) => void ) = (e) => {
		formState.setValue(name, (e.target as HTMLInputElement).value);
		formState.setTaintedFields(name);
		if (!validateOnBlur) {
			validateFields();
		}
	} 
</script>

{#if label}
	<label for={id} class="label mb-2">{label}</label>
{/if}

<input
	{id}
	{type}
	{name}
	{required}
	{placeholder}
	{autocomplete}
	{disabled}
	{oninput}
	{onblur}
	aria-label={ariaLabel}
	aria-describedby={error ? `${name}-error` : undefined}
	class="input user-invalid:text-error user-invalid:input-error user-invalid:placeholder:text-error"
/>

{#if error}
	<p id="{name}-error" class="mt-2 text-error" transition:fade>{error}</p>
{/if}