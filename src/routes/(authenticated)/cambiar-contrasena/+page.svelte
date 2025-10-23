<script lang="ts">
	import { RemoteFormIssues, AuthFormHeader } from '$lib/components';
	import { RESET_PASSWORD_FORM_ID } from '$lib/constants/forms';
	import { updatePassword } from '$lib/remote-functions';
	import { userChangePassword } from '$lib/helpers';
</script>

<AuthFormHeader title="Recuperar contraseña">
	<form
		{...updatePassword.preflight(userChangePassword)}
		oninput={() => updatePassword.validate()}
		class="space-y-6"
		id={RESET_PASSWORD_FORM_ID}
	>
		<div>
			<label class="label mb-2" for="password">Contraseña</label>
			<input
				id="password"
				autocomplete="new-password"
				{...updatePassword.fields._password.as('password')}
				class="input"
			/>
			<RemoteFormIssues issues={updatePassword.fields._password.issues()} />
		</div>

		<RemoteFormIssues issues={updatePassword.result?.error} />

        <div>
            <label class="label mb-2" for="passwordConfirmation">Confirmar contraseña</label>
            <input
                id="passwordConfirmation"
                autocomplete="new-password"
                {...updatePassword.fields._passwordConfirmation.as('password')}
                class="input"
            />
            <RemoteFormIssues issues={updatePassword.fields._passwordConfirmation.issues()} />
        </div>
		<div>
			<button type="submit" class="btn w-full btn-primary">Recuperar contraseña</button>
		</div>
	</form>
</AuthFormHeader>
