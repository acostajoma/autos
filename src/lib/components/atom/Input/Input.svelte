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

	// Gets the shared form state from the context
	let formState = getFormContext(formId);
	
	/** 
	 * Local error state for this specific field
	 * Initializes with untrack to avoid reactive dependencies on creation
	 * Note that fieldError changes onInput and onBlur so not necessary to track
	*/
	let fieldError = $state(
		untrack(() => formState.getFieldsErrors(name)));

	const validateFields = () => {
		formState.validateFields();
		fieldError = formState.getFieldsErrors(name);
	}

	/**
	 * If validateOnBlur is true, validate the fields, otherwise does nothing
	*/
	const handleBlur :  ( ()=> void ) | undefined = () => validateOnBlur ? 
		validateFields()
		: undefined;

	const handleInput : ( (e: Event) => void ) = (e) => {
		formState.setValue(name, (e.target as HTMLInputElement).value);
		formState.setTaintedFields(name);
		if (!validateOnBlur) {
			validateFields();
		}
	} 
	$inspect(formState.getDisabled());
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
	oninput={handleInput}
	onblur={handleBlur}
	aria-label={ariaLabel}
	aria-describedby={fieldError ? `${name}-error` : undefined}
	class="input user-invalid:text-error user-invalid:input-error user-invalid:placeholder:text-error"
/>

{#if fieldError}
	<p id="{name}-error" class="mt-2 text-error" transition:fade>{fieldError}</p>
{/if}