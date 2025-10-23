<script lang="ts">
	import { RemoteFormIssues, AuthFormHeader } from '$lib/components';
	import { REGISTRATION_FORM_ID } from '$lib/constants/forms';
	import { signup } from '$lib/remote-functions';
	import { userRegistration } from '$lib/helpers';
</script>

<AuthFormHeader title="Regístrate en nuestra plataforma">
	<form
		{...signup.preflight(userRegistration)}
		oninput={() => signup.validate()}
		class="space-y-6"
		id={REGISTRATION_FORM_ID}
	>
		<div>
			<label class="label mb-2" for="email">Correo electrónico</label>
			<input id="email" {...signup.fields.email.as('email')} class="input" autocomplete="email" />
			<RemoteFormIssues issues={signup.fields.email.issues()} />
		</div>

		<div>
			<label for="password" class="label mb-2">Contraseña</label>
			<input
				id="password"
				{...signup.fields._password.as('password')}
				class="input"
				autocomplete="new-password"
			/>
			<RemoteFormIssues issues={signup.fields._password.issues()} />
		</div>

		<div>
			<label for="passwordConfirmation" class="label mb-2">Confirmar contraseña</label>
			<input
				id="passwordConfirmation"
				{...signup.fields._passwordConfirmation.as('password')}
				class="input"
				autocomplete="new-password"
			/>
			<RemoteFormIssues issues={signup.fields._passwordConfirmation.issues()} />
		</div>

		<RemoteFormIssues issues={signup.result?.error} />

		<div>
			<button type="submit" class="btn w-full btn-primary">Registrarse</button>
		</div>
	</form>

	<p class="mt-10 text-center text-sm/6">
		¿Ya tienes una cuenta?
		<a href="/iniciar-sesion" class="link link-primary">Inicia sesión</a>
	</p>
</AuthFormHeader>
