<script lang="ts">
	import { page } from '$app/state';
	import type { HTMLInputAttributes } from 'svelte/elements';
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
		validateOnBlur = true
	}: HTMLInputAttributes & {
		ariaLabel?: string;
		label?: string;
		formId: string;
		name: string;
		validateOnBlur?: boolean;
	} = $props();

	let formState = getFormContext(formId);
	
	// Initialize checkbox value as false by default if not set
	if (formState.getValue(name) === '') {
		formState.setValue(name, false);
	}
	
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
		const checked = (e.target as HTMLInputElement).checked;
		formState.setValue(name, checked);
		formState.setTaintedFields(name);
		if (!validateOnBlur) {
			validateFields();
		}
	} 
</script>

<label class="flex items-center gap-2 cursor-pointer">
	<input
		{id}
		type="checkbox"
		{name}
		{required}
		{disabled}
		onchange={handleChange}
		onblur={handleBlur}
		aria-label={ariaLabel}
		aria-describedby={fieldError ? `${name}-error` : undefined}
		class="checkbox user-invalid:checkbox-error"
	/>
	{#if label}
		<span class="label">{label}</span>
	{/if}
</label>

{#if fieldError}
	<p id="{name}-error" class="mt-2 text-error" transition:fade>{fieldError}</p>
{/if}

