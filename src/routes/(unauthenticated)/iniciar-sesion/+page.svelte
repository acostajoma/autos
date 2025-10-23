<script lang="ts">
	import { RemoteFormIssues, AuthFormHeader } from '$lib/components';
	import { LOGIN_FORM_ID } from '$lib/constants/forms';
	import { login } from '$lib/remote-functions';
	import { userSignIn } from '$lib/helpers';
</script>

<AuthFormHeader title="Inicia sesión en tu cuenta">
	<form
		{...login.preflight(userSignIn)}
		oninput={() => login.validate()}
		class="space-y-6"
		id={LOGIN_FORM_ID}
	>
		<div>
			<label class="label mb-2" for="email">Correo electrónico</label>
			<input id="email" autocomplete="email" {...login.fields.email.as('email')} class="input" />
			<RemoteFormIssues issues={login.fields.email.issues()} />
		</div>

		<div>
			<div class="flex items-center justify-between">
				<label for="_password" class="label mb-2">Contraseña</label>
				<a href="/recuperar-acceso" class="link link-primary">¿Olvidaste tu contraseña?</a>
			</div>
			<input
				id="_password"
				{...login.fields._password.as('password')}
				class="input"
				autocomplete="current-password"
			/>
			<RemoteFormIssues issues={login.fields._password.issues()} />
		</div>

		<RemoteFormIssues issues={login.result?.error} />

		<div>
			<button type="submit" class="btn w-full btn-primary">Iniciar sesión</button>
		</div>
	</form>

	<p class="mt-10 text-center text-sm/6">
		¿No tienes una cuenta?
		<a href="/registrarse" class="link link-primary">Regístrate</a>
	</p>
</AuthFormHeader>
