<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
	import type { SignInOrSignUpAction } from '$lib/types';
	import { page } from '$app/state';
	let {
		isSignIn
	}: {
		isSignIn: boolean;
	} = $props();

	let action: SignInOrSignUpAction = $derived(isSignIn ? '/iniciar-sesion' : '/registrarse');

</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img
			src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
			alt="Your Company"
			class="mx-auto h-10 w-auto dark:hidden"
		/>
		<img
			src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
			alt="Your Company"
			class="mx-auto h-10 w-auto not-dark:hidden"
		/>
		<h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
			{#if isSignIn}
				Inicia sesión en tu cuenta
			{:else}
				Regístrate en nuestra plataforma
			{/if}
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form {action} method="POST" class="space-y-6" use:enhance>
			<div>
				<Input
					id="email"
					type="email"
					name="email"
					required
					autocomplete="email"
					ariaLabel="Email"
					label="Correo electrónico"
				/>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label for="password" class="label">Contraseña</label>
					{#if isSignIn}
						<a href="/todo" class="link link-primary">¿Olvidaste tu contraseña?</a>
					{/if}
				</div>
				<div class="mt-2">
					<Input
						id="password"
						type="password"
						name="password"
						required
						autocomplete="current-password"
						ariaLabel="Password"
					/>
				</div>
			</div>

			{#if !isSignIn}
				<div>
					<div class="flex items-center justify-between">
						<label for="passwordConfirmation" class="label">Confirmar contraseña</label>
				
					</div>
					<div class="mt-2">
						<Input
							id="passwordConfirmation"
							type="password"
							name="passwordConfirmation"
							required
							autocomplete="current-password"
							ariaLabel="Password Confirmation"
						/>
					</div>
				</div>
			{/if}
			<div>
				<button type="submit" class="btn w-full btn-primary">
					{#if isSignIn}
						Iniciar sesión
					{:else}
						Registrarse
					{/if}
				</button>
			</div>
		</form>

		<p class="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
			{#if isSignIn}
				¿Aún no tienes una cuenta?
				<a href="/registrarse" class="link link-primary">Regístrate ahora</a>
			{:else}
				¿Ya tienes una cuenta?
				<a href="/iniciar-sesion" class="link link-primary">Inicia sesión</a>
			{/if}
		</p>
	</div>
</div>
