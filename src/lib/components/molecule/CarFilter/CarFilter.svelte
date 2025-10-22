<script lang="ts">
	import type { CarOptions } from '$lib/server/db/queries';
	import {  Select, } from '$lib/components';
	import { CAR_POST_FORM_ID } from '$lib/constants/forms';
	import type { ClassValue } from 'svelte/elements';
    import {getContext} from 'svelte';
    import type { FormState } from '$lib/state/form.svelte';
	type FormId = typeof CAR_POST_FORM_ID | 'OTHER_FORM_ID';
	let { formId, makes, class: containerClass }: { formId: FormId; makes: CarOptions['makes']; class: ClassValue } = $props();
    
    const formState: FormState = getContext(formId);
    
	let models = $state([]);
    let versions = $state([]);
    let isLoadingModels = $state(false);
    let isLoadingVersions = $state(false);

	const onChangeMakeId = async () => {
        const value = formState.getValue('makeId');
		if (!value) {
			models = [];
			return;
		}
		isLoadingModels = true;
		try {
			const response = await fetch(`/crear-post/api/obtener-informacion-vehiculo?makeId=${value}`);
			const modelsData = await response.json();
			models = modelsData || [];
		} catch (error) {
			console.error(error);
			models = [];
		} finally {
			isLoadingModels = false;
		}
	};
    const onChangeModelId = async () => {
        const value = formState.getValue('modelId');
		if (!value) {
			versions = [];
			return;
		}
		isLoadingVersions = true;
		try {
			const response = await fetch(`/crear-post/api/obtener-informacion-vehiculo?modelId=${value}`);
			const versionsData = await response.json();
			versions = versionsData || [];
		} catch (error) {
			console.error(error);
			versions = [];
		} finally {
			isLoadingVersions = false;
		}
	};
</script>

<div class={containerClass}>
    <!-- Aux select to make the request to the API to get the makes -->
    <Select
        label="Marca"
        name="makeId"
        {formId}
        options={makes}
        auxSelect
        onChange={onChangeMakeId}
    />
</div>
{#if models.length > 0 && !isLoadingModels}
    <div class={containerClass}>
        <!-- Aux select to make the request to the API to get the makes -->
        <Select
            label="Marca"
            name="makeId"
            {formId}
            options={models}
            auxSelect
        />
    </div>
{:else if isLoadingModels}
    <div class={containerClass}>
        <p>Cargando modelos...</p>
    </div>
{:else if formState.getValue('makeId') && models.length === 0}
    <div class={containerClass}>
        <p>No hay modelos disponibles</p>
    </div>
{/if}