<script lang="ts">
	import { page } from '$app/state';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	import { getFormContext } from '$lib/helpers';
	import { untrack } from 'svelte';

	let {
		id,
		name,
		required,
		ariaLabel,
		disabled,
		label,
		formId,
		options = [],
		validateOnBlur = true,
		auxSelect = false
	}: HTMLSelectAttributes & {
		ariaLabel?: string;
		label?: string;
		formId: string;
		name: string;
		options?: { value: string | number; label: string }[];
		validateOnBlur?: boolean;
		/**
		 * if auxSelect is true it will work for validation purposes but is not sent to the server
		 */
		auxSelect?: boolean;
	} = $props();

	let formState = getFormContext(formId);
	
	let fieldError = $state(
		untrack(() => formState.getFieldsErrors(name)));

	const validateFields = () => {
		formState.validateFields();
		fieldError = formState.getFieldsErrors(name);
	}

	const handleBlur :  ( ()=> void ) | undefined = () => validateOnBlur ? 
		validateFields()
		: undefined;

	const handleChange : ( (e: Event) => void ) = (e) => {
		const target = e.target as HTMLSelectElement;
		const value = target.value;
		const numValue = Number(value);
		const finalValue = !isNaN(numValue) && value !== '' ? numValue : value;
		formState.setValue(name, finalValue);
		formState.setTaintedFields(name);
		if (!validateOnBlur) {
			validateFields();
		}
	} 
</script>

{#if label}
	<label for={id} class="label mb-2">{label}</label>
{/if}

<select
	{id}
	name={auxSelect ? undefined : name}
	{required}
	{disabled}
	onchange={handleChange}
	onblur={handleBlur}
	aria-label={ariaLabel}
	aria-describedby={fieldError ? `${name}-error` : undefined}
	class="select w-full user-invalid:text-error user-invalid:select-error"
>
	<option value="" disabled selected>Seleccionar...</option>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>

{#if fieldError}
	<p id="{name}-error" class="mt-2 text-error" transition:fade>{fieldError}</p>
{/if}

