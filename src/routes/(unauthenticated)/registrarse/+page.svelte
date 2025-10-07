<script lang="ts">
    import { RegistrationForm } from '$lib/components';
    import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	let { form }: PageProps = $props();

    $inspect(form);
</script>

<RegistrationForm isSignIn={false} />