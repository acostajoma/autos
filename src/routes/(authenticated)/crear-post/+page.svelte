<script lang="ts">
    import { CarPostForm } from '$lib/components';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<CarPostForm carOptions={data.carOptions}/>