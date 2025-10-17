<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { page } from '$app/state';
	import { getFormContext } from '$lib/helpers';

	let {
		children,
		type,
		class: additionalClasses,
		onclick,
		formId
	}: HTMLButtonAttributes & {
		formId: string
	} = $props();

	// Gets the shared form state from the context
	let formState = getFormContext(formId);
	let disabled = $derived(formState.getDisabled());


</script>

<button {type} class="btn {additionalClasses}" {onclick} {disabled}>
	{@render children?.()}
</button>
 