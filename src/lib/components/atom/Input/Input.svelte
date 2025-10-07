<script lang="ts">
    import { fade } from 'svelte/transition';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { page } from '$app/state';
	
    let {
        id,
        type,
        name,
        required,
        placeholder,
        autocomplete,
        ariaLabel,
        disabled,
        label,
    } : HTMLInputAttributes & { ariaLabel: string, label?:string } = $props();

    let error = $derived.by(() => {
        if(page.form?.fieldsErrors && name && page.form.fieldsErrors[name]) {
            return  page.form.fieldsErrors[name].errors.join(', ')
        }
        return null;
    });

    $effect(() => {
        if (error){
            setTimeout(() => {
                error = null;
            }, 3000);
        }
    });
    
</script>

{#if label}
    <label for={id} class="label mb-2">{label}</label>
{/if}

<input
	{id}
	{type}
	{name}
	{required}
	{placeholder}
	{autocomplete}
	{disabled}
	aria-label={ariaLabel}
    aria-describedby={error ? `${name}-error` : undefined}
    class="input user-invalid:input-error user-invalid:text-error user-invalid:placeholder:text-error" 
/>

{#if error}
    <p id="{name}-error" class="mt-2 text-error" transition:fade>{error}</p>
{/if}

