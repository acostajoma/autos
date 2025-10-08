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

	let formState = getFormContext(formId);
	let disabled = $derived(formState.getDisabled());


</script>

<button {type} class="btn w-full btn-primary {additionalClasses}" {onclick} {disabled}>
	{@render children?.()}
</button>
 