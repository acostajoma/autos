<script lang="ts">
	import type { ZodObject, ZodRawShape } from 'zod';

	import { Input, Form, Button } from '$lib/components';
	import {
		LOGIN_FORM_ID,
		REGISTRATION_FORM_ID,
		RESET_PASSWORD_FORM_ID,
		CHANGE_PASSWORD_FORM_ID
	} from '$lib/constants';
	import {
		userRegistration,
		userSignIn,
		userResetPassword,
		userChangePassword
	} from '$lib/helpers';

	export type FormId =
		| typeof LOGIN_FORM_ID
		| typeof REGISTRATION_FORM_ID
		| typeof RESET_PASSWORD_FORM_ID
		| typeof CHANGE_PASSWORD_FORM_ID;
	type AuthFormActionPath =
		| '/iniciar-sesion'
		| '/registrarse'
		| '/recuperar-acceso'
		| '/cambiar-contrasena';
	type AuthFormSchemaMap = {
		actionName: AuthFormActionPath;
		schema: ZodObject<ZodRawShape>;
		formId: FormId;
		// these are derived from the formMode and are helpers for the template
		isResetPassword: boolean;
		isSignIn: boolean;
		isSignUp: boolean;
		isChangePassword: boolean;
	};

	const SHOULD_VALIDATE_ON_BLUR = false;

	let {
		formMode
	}: {
		formMode: 'signIn' | 'signUp' | 'resetPassword' | 'changePassword';
	} = $props();

	let {
		actionName,
		schema,
		formId,
		isResetPassword,
		isSignIn,
		isSignUp,
		isChangePassword
	}: AuthFormSchemaMap = $derived.by(() => {
		if (formMode === 'signIn') {
			return {
				actionName: '/iniciar-sesion',
				schema: userSignIn,
				formId: LOGIN_FORM_ID,
				isResetPassword: false,
				isSignIn: true,
				isSignUp: false,
				isChangePassword: false
			};
		}
		if (formMode === 'signUp') {
			return {
				actionName: '/registrarse',
				schema: userRegistration,
				formId: REGISTRATION_FORM_ID,
				isResetPassword: false,
				isSignIn: false,
				isSignUp: true,
				isChangePassword: false
			};
		}
		if (formMode === 'changePassword') {
			return {
				actionName: '/cambiar-contrasena',
				schema: userChangePassword,
				formId: CHANGE_PASSWORD_FORM_ID,
				isResetPassword: false,
				isSignIn: false,
				isSignUp: false,
				isChangePassword: true
			};
		}
		return {
			actionName: '/recuperar-acceso',
			schema: userResetPassword,
			formId: RESET_PASSWORD_FORM_ID,
			isResetPassword: true,
			isSignIn: false,
			isSignUp: false,
			isChangePassword: false
		};
	});
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
		<h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight">
			{#if isSignIn}
				Inicia sesión en tu cuenta
			{:else if isSignUp}
				Regístrate en nuestra plataforma
			{:else if isChangePassword}
				Cambia tu contraseña
			{:else}
				Recupera tu contraseña
			{/if}
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<Form action={actionName} method="POST" class="space-y-6" id={formId} validationSchema={schema}>
			{#if !isChangePassword}
				<div>
					<Input
						name="email"
						type="email"
						id="email"
						required
						autocomplete="email"
						ariaLabel="Email"
						label="Correo electrónico"
						validateOnBlur={SHOULD_VALIDATE_ON_BLUR}
						{formId}
					/>
				</div>
			{/if}

			{#if !isResetPassword}
				<div>
					<div class="flex items-center justify-between">
						<label for="password" class="label">Contraseña</label>
						{#if isSignIn}
							<a href="/recuperar-acceso" class="link link-primary">¿Olvidaste tu contraseña?</a>
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
							validateOnBlur={SHOULD_VALIDATE_ON_BLUR}
							{formId}
						/>
					</div>
				</div>
			{/if}
			{#if isSignUp || isChangePassword}
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
							validateOnBlur={SHOULD_VALIDATE_ON_BLUR}
							{formId}
						/>
					</div>
				</div>
			{/if}
			<div>
				<Button type="submit" class="btn w-full btn-primary" {formId}>
					{#if isSignIn}
						Iniciar sesión
					{:else if isSignUp}
						Registrarse
					{:else if isChangePassword}
						Cambiar contraseña
					{:else}
						Recuperar contraseña
					{/if}
				</Button>
			</div>
		</Form>

		{#if !isResetPassword && !isChangePassword}
			<p class="mt-10 text-center text-sm/6">
				{#if isSignIn}
					¿Aún no tienes una cuenta?
					<a href="/registrarse" class="link link-primary">Regístrate ahora</a>
				{:else if isSignUp}
					¿Ya tienes una cuenta?
					<a href="/iniciar-sesion" class="link link-primary">Inicia sesión</a>
				{/if}
			</p>
		{/if}
	</div>
</div>
