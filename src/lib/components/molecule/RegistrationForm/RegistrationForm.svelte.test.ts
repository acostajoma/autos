import { mount, unmount } from 'svelte';
import { expect, test, describe } from 'vitest';
import RegistrationForm from './RegistrationForm.svelte';

describe('RegistrationForm', () => {
    test(' sign in renders correctly with sign in true', () => {
	const component = mount(RegistrationForm, {
		target: document.body, 
		props: { isSignIn: true }
	});

	expect(document.body.innerHTML).toMatchSnapshot();

	expect(document.body.innerHTML).toContain('/iniciar-sesion');
	expect(document.body.innerHTML).toContain('¿Olvidaste tu contraseña?');
	expect(document.body.innerHTML).toContain('Iniciar sesión');
	expect(document.body.innerHTML).toContain('¿Aún no tienes una cuenta?');

	unmount(component);
    });

    test(' sign in renders correctly with sign in false', () => {
        const component = mount(RegistrationForm, {
            target: document.body, 
            props: { isSignIn: false }
        });
        expect(document.body.innerHTML).toMatchSnapshot();

        expect(document.body.innerHTML).toContain('/registrarse');
        expect(document.body.innerHTML).toContain('Regístrate');
        expect(document.body.innerHTML).toContain('¿Ya tienes una cuenta?');
	    expect(document.body.innerHTML).not.toContain('¿Olvidaste tu contraseña?');
        expect(document.body.innerHTML).toContain('Confirmar contraseña');
    
        unmount(component);
    });
});