<script lang="ts">
	import { untrack } from 'svelte';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import { page } from '$app/state';
	import type { ZodObject, ZodRawShape } from 'zod';
	import { FormState } from '$lib/state/form.svelte';
	import { setFormContext } from '$lib/helpers';

	let {
		children,
		action,
		id,
		method = 'POST',
		validationSchema
	}: HTMLFormAttributes & {
		id: string;
		validationSchema: ZodObject<ZodRawShape>;
	} = $props();

	// Initialize the state and exposes to child components through the context
	let formState = new FormState(id, validationSchema);
	setFormContext(id, formState);

	let formError = $derived( 
		formState.getFormError()
    );

    /**
     * Sync the server state with the client state
	 * Only execute when the page form data changes
	 * Untrack is used to avoid unnecessary re-renders 
    */
	$effect(() => {
		if (page.form?.[id]) {
			untrack(() => formState.setPageFormData(page.form[id]));
		}
	});

</script>

<form {action} {id} {method} class="space-y-6" use:enhance>
	{@render children?.()}
	{#if formError}
		<p id="{id}-error" class="mt-2 text-error" transition:fade>{formError}</p>
	{/if}
</form>
