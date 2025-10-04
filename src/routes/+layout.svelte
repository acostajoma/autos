<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount, type Snippet } from 'svelte';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let { session, supabase } = $derived(data);

	const logout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) {
			// @TODO: add logic to handle error
		console.error(error)
		}
  	}

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if session}
<button class="btn btn-primary" onclick={logout}>Cerrar Sesión</button>
{/if}
{@render children?.()}
