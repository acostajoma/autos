<script lang="ts">
	import { Input, Form, Button } from '$lib/components';
	import { LOGIN_FORM_ID, REGISTRATION_FORM_ID } from '$lib/constants/forms';
	import { userRegistration, userSignIn } from '$lib/helpers';

	let {
		isSignIn
	}: {
		isSignIn: boolean;
	} = $props();

	export type FormId = typeof LOGIN_FORM_ID | typeof REGISTRATION_FORM_ID;
	type SignInOrSignUpAction = '/iniciar-sesion' | '/registrarse';

	const validateOnBlur = false;

	let action: SignInOrSignUpAction = $derived(isSignIn ? '/iniciar-sesion' : '/registrarse');
	let formId: FormId = $derived(isSignIn ? LOGIN_FORM_ID : REGISTRATION_FORM_ID);
	let validationObject = $derived(isSignIn ? userSignIn : userRegistration);
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
		<Form {action} method="POST" class="space-y-6" id={formId} {validationObject}>
			<div>
				<Input
					name="email"
					type="email"
					id="email"
					required
					autocomplete="email"
					ariaLabel="Email"
					label="Correo electrónico"
					{validateOnBlur}
					{formId}
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
						name="password"
						type="password"
						id="password"
						required
						autocomplete="current-password"
						ariaLabel="Password"
						{validateOnBlur}
						{formId}
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
							name="passwordConfirmation"
							type="password"
							id="passwordConfirmation"
							required
							autocomplete="current-password"
							ariaLabel="Password Confirmation"
							{validateOnBlur}
							{formId}
						/>
					</div>
				</div>
			{/if}
			<div>
				<Button type="submit" class="btn w-full btn-primary" {formId}>
					{#if isSignIn}
						Iniciar sesión
					{:else}
						Registrarse
					{/if}
				</Button>
			</div>
		</Form>

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
