<script lang="ts">
	import { page } from '$app/state';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	import { getFormContext } from '$lib/helpers';
	import { untrack } from 'svelte';

	let {
		id,
		name,
		required,
		placeholder,
		ariaLabel,
		disabled,
		label,
		formId,
		rows = 4,
		validateOnBlur = true
	}: HTMLTextareaAttributes & {
		ariaLabel?: string;
		label?: string;
		formId: string;
		name: string;
		validateOnBlur?: boolean;
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

	const handleInput : ( (e: Event) => void ) = (e) => {
		formState.setValue(name, (e.target as HTMLTextAreaElement).value);
		formState.setTaintedFields(name);
		if (!validateOnBlur) {
			validateFields();
		}
	} 
</script>

{#if label}
	<label for={id} class="label mb-2">{label}</label>
{/if}

<textarea
	{id}
	{name}
	{required}
	{placeholder}
	{disabled}
	{rows}
	oninput={handleInput}
	onblur={handleBlur}
	aria-label={ariaLabel}
	aria-describedby={fieldError ? `${name}-error` : undefined}
	class="textarea user-invalid:text-error user-invalid:textarea-error user-invalid:placeholder:text-error w-full"
></textarea>

{#if fieldError}
	<p id="{name}-error" class="mt-2 text-error" transition:fade>{fieldError}</p>
{/if}

