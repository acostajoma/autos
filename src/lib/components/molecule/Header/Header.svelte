<script lang="ts">
	import { page } from '$app/state';

	let { session, supabase } = $derived(page.data);
	const isLoggedIn = $derived(session !== null);

    const logout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) {
			// @TODO: add logic to handle error
		console.error(error)
		}
  	}

    //test links
    const links = [
        { href: "/", label: "Inicio" },
        { href: "/productos", label: "Productos" },
        { href: "/nosotros", label: "Nosotros" },
        { href: "/contacto", label: "Contacto" },
    ]
</script>

{#snippet logo()}
    <a href="/" class="-m-1.5 p-1.5">
        <span class="sr-only">Buscamos.Auto</span>
        <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
            class="h-8 w-auto dark:hidden"
        />
        <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt=""
            class="h-8 w-auto not-dark:hidden"
        />
    </a>
{/snippet}

<header>
	<nav
		aria-label="Global"
		class="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
	>
		<div class="flex lg:flex-1">
			{@render logo()}
		</div>

		<div class="hidden lg:flex lg:gap-x-12">
			{#each links as link}
				<a href={link.href} class="link link-hover">{link.label}</a>
			{/each}
		</div>

		<div class="flex flex-1 items-center justify-end gap-x-6">
			{#if isLoggedIn}
                <button class="btn btn-ghost" onclick={logout}>Cerrar Sesión</button>
				<a href="/perfil" class="link link-hover">Perfil</a>
			{:else}
				<a href="/iniciar-sesion" class="hidden link link-hover lg:block">Iniciar sesión</a>
				<a href="/registrarse" class="btn btn-primary">Registrarse</a>
			{/if}
		</div>

		<div class="flex lg:hidden">
			<button
				type="button"
				command="show-modal"
				commandfor="mobile-menu"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					data-slot="icon"
					aria-hidden="true"
					class="size-6"
				>
					<path
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	</nav>
	<el-dialog>
		<dialog id="mobile-menu" class="backdrop:bg-transparent lg:hidden">
			<div class="fixed inset-0 focus:outline-none">
				<el-dialog-panel
					class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10"
				>
					<div class="flex items-center gap-x-6">
						{@render logo()}
                        <a href="/registrarse" class="ml-auto btn btn-primary">Registrarse</a>
					
						<button
							type="button"
							command="close"
							commandfor="mobile-menu"
							class="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
						>
							<span class="sr-only">Cerrar menu</span>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								data-slot="icon"
								aria-hidden="true"
								class="size-6"
							>
								<path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						</button>
					</div>
					<div class="mt-6 flow-root">
						<div class="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
							<div class="space-y-2 py-6">
                                {#each links as link}
                                    <a href={link.href} class="block px-3 py-2 link link-hover">{link.label}</a>
                                {/each}
							</div>
							<div class="py-6">
								<a
									href="/iniciar-sesion"
									class="link link-hover">Iniciar sesión</a
								>
							</div>
						</div>
					</div>
				</el-dialog-panel>
			</div>
		</dialog>
	</el-dialog>
</header>
