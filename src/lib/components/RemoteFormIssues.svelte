<script lang="ts">
    import type { RemoteFormIssue } from '@sveltejs/kit';
    import { fade } from 'svelte/transition';
    interface Props {
        issues: RemoteFormIssue[] | string | undefined;
    }
    let { issues }: Props = $props();
</script>

{#if typeof issues === 'string'}
    <p class="mt-2 text-error" transition:fade>{issues}</p>
{:else}
    {#each issues as issue (issue.message)}
		<p class="mt-2 text-error" transition:fade>{issue.message}</p>
	{/each}
{/if}