<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { page } from '$app/state';

	let { children, type, class: additionalClasses, onclick }: HTMLButtonAttributes = $props();

    let disabled = $derived(page.form?.fieldsErrors);
</script>

<button {type} class="btn w-full btn-primary {additionalClasses}" {onclick}>
	{@render children?.()}
</button>
