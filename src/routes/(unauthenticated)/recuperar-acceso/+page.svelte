<script lang="ts">
	import { RemoteFormIssues, AuthFormHeader } from '$lib/components';
	import { RESET_PASSWORD_FORM_ID } from '$lib/constants/forms';
	import { forgotPassword } from '$lib/remote-functions';
	import { userResetPassword } from '$lib/helpers';
</script>

<AuthFormHeader title="Recuperar contraseña">
	<form
		{...forgotPassword.preflight(userResetPassword)}
		oninput={() => forgotPassword.validate()}
		class="space-y-6"
		id={RESET_PASSWORD_FORM_ID}
	>
		<div>
			<label class="label mb-2" for="email">Correo electrónico</label>
			<input
				id="email"
				autocomplete="email"
				{...forgotPassword.fields.email.as('email')}
				class="input"
			/>
			<RemoteFormIssues issues={forgotPassword.fields.email.issues()} />
		</div>

		<RemoteFormIssues issues={forgotPassword.result?.error} />

		<div>
			<button type="submit" class="btn w-full btn-primary">Recuperar contraseña</button>
		</div>
	</form>
</AuthFormHeader>
