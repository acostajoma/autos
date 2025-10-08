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
		validationObject
	}: HTMLFormAttributes & {
		id: string;
		validationObject: ZodObject<ZodRawShape>;
	} = $props();

	let formState = new FormState(id, validationObject);
	setFormContext(id, formState);

    // This will be only used for the initial state if the server returns a value so we use untrack
	let formError = $derived( 
		formState.getFormError()
    );

    /**
     * Set the form data from the server, only track page state changes
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
