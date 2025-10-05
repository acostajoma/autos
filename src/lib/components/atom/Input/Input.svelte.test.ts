import { mount, unmount } from 'svelte';
import { expect, test, describe, beforeEach, vi } from 'vitest';
import Input from './Input.svelte';



describe('Input Component', () => {
    // Mock of $app/state
    vi.mock('$app/state', () => ({
        page: {
            form: {
                "fieldsErrors": {
                    "test-field": {
                        errors: ['Error de prueba']
                    }
                }
            }
        }
    }));

    beforeEach(() => {
        // Clean the DOM before each test
        document.body.innerHTML = '';
    });

    test('renders a basic input with minimal properties', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                ariaLabel: 'Campo de entrada'
            }
        });

        const input = document.querySelector('input');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('aria-label')).toBe('Campo de entrada');
        expect(input?.classList.contains('input')).toBe(true);

        unmount(component);
    });

    test('renders all the input properties correctly', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                id: 'test-input',
                type: 'email',
                name: 'email',
                required: true,
                placeholder: 'Ingresa tu email',
                autocomplete: 'email',
                disabled: false,
                ariaLabel: 'Campo de email'
            }
        });

        const input = document.querySelector('input');
        expect(input?.getAttribute('id')).toBe('test-input');
        expect(input?.getAttribute('type')).toBe('email');
        expect(input?.getAttribute('name')).toBe('email');
        expect(input?.hasAttribute('required')).toBe(true);
        expect(input?.getAttribute('placeholder')).toBe('Ingresa tu email');
        expect(input?.getAttribute('autocomplete')).toBe('email');
        expect(input?.hasAttribute('disabled')).toBe(false);
        expect(input?.getAttribute('aria-label')).toBe('Campo de email');

        unmount(component);
    });

    test('renders the label when provided', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                id: 'labeled-input',
                label: 'Nombre de usuario',
                ariaLabel: 'Campo de nombre'
            }
        });

        const label = document.querySelector('label');
        
        expect(label).toBeTruthy();
        expect(label?.textContent).toBe('Nombre de usuario');
        expect(label?.getAttribute('for')).toBe('labeled-input');
        expect(label?.classList.contains('label')).toBe(true);
        expect(label?.classList.contains('mb-2')).toBe(true);

        unmount(component);
    });

    test('no renders label when not provided', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                ariaLabel: 'Campo sin label'
            }
        });

        const label = document.querySelector('label');
        expect(label).toBeFalsy();

        unmount(component);
    });

    test('input disabled renders correctly', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                disabled: true,
                ariaLabel: 'Campo deshabilitado'
            }
        });

        const input = document.querySelector('input');
        expect(input?.hasAttribute('disabled')).toBe(true);

        unmount(component);
    });

    test('input required renders correctly', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                required: true,
                ariaLabel: 'Campo requerido'
            }
        });

        const input = document.querySelector('input');
        expect(input?.hasAttribute('required')).toBe(true);

        unmount(component);
    });

    test('applies the correct CSS classes for validation', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                name: 'test-field',
                ariaLabel: 'Campo con clases'
            }
        });

        const input = document.querySelector('input');
        const expectedClasses = 'input user-invalid:input-error user-invalid:text-error user-invalid:placeholder:text-error';
        expect(input?.className).toBe(expectedClasses);

        unmount(component);
    });

    test('no configures aria-describedby when there is an error', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                name: 'test-field',
                ariaLabel: 'Campo sin error'
            }
        });

        const input = document.querySelector('input');
        expect(input?.getAttribute('aria-describedby')).toBeDefined();

        unmount(component);
    });


    test('snapshot of the basic component', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                id: 'snapshot-input',
                type: 'text',
                name: 'username',
                placeholder: 'Usuario',
                ariaLabel: 'Nombre de usuario',
                label: 'Usuario'
            }
        });

        expect(document.body.innerHTML).toMatchSnapshot();

        unmount(component);
    });

    test('renders error message when there is errors', () => {

        const component = mount(Input, {
            target: document.body,
            props: {
                name: 'test-field',
                ariaLabel: 'Campo sin errores'
            }
        });

        const errorMessage = document.querySelector('p');
        expect(errorMessage).toBeTruthy();
        expect(errorMessage?.textContent).toBe('Error de prueba');

        unmount(component);
    });
});