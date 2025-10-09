import { mount, unmount, flushSync } from 'svelte';
import { expect, test, describe, beforeEach, vi } from 'vitest';
import { z } from 'zod';
import Input from './Input.svelte';
import { FormState } from '$lib/state/form.svelte';

// Global variable for the mock
let mockFormState: FormState;
const TEST_FORM_ID = 'test-form';
const VALIDATION_SCHEMA = z.object({
    'test-field': z.string().min(1, 'Required Field'),
    email: z.email('Invalid Email'),
    username: z.string().min(3, 'Minimum 3 characters')
});

vi.mock('$lib/helpers', () => ({
    getFormContext: () => mockFormState
}));

describe('Input Component', () => {
    beforeEach(() => {
        // Clean the DOM before each test
        document.body.innerHTML = '';
        
        // Create a new FormState for each test with a basic schema
        mockFormState = new FormState(TEST_FORM_ID, VALIDATION_SCHEMA);
    });

    test('renders a basic input with minimal properties', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                ariaLabel: 'Input field',
                formId: TEST_FORM_ID,
                name: 'test-field'
            }
        });

        const input = document.querySelector('input');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('aria-label')).toBe('Input field');
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
                placeholder: 'Enter your email',
                autocomplete: 'email',
                disabled: false,
                ariaLabel: 'Email field',
                formId: TEST_FORM_ID
            }
        });

        const input = document.querySelector('input');
        expect(input?.getAttribute('id')).toBe('test-input');
        expect(input?.getAttribute('type')).toBe('email');
        expect(input?.getAttribute('name')).toBe('email');
        expect(input?.hasAttribute('required')).toBe(true);
        expect(input?.getAttribute('placeholder')).toBe('Enter your email');
        expect(input?.getAttribute('autocomplete')).toBe('email');
        expect(input?.hasAttribute('disabled')).toBe(false);
        expect(input?.getAttribute('aria-label')).toBe('Email field');

        unmount(component);
    });

    test('renders the label when provided', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                id: 'labeled-input',
                label: 'Username',
                ariaLabel: 'Username field',
                formId: TEST_FORM_ID,
                name: 'username'
            }
        });

        const label = document.querySelector('label');
        
        expect(label).toBeTruthy();
        expect(label?.textContent).toBe('Username');
        expect(label?.getAttribute('for')).toBe('labeled-input');
        expect(label?.classList.contains('label')).toBe(true);
        expect(label?.classList.contains('mb-2')).toBe(true);

        unmount(component);
    });

    test('no renders label when not provided', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                ariaLabel: 'Field without label',
                formId: TEST_FORM_ID,
                name: 'test-field'
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
                ariaLabel: 'Disabled field',
                formId: TEST_FORM_ID,
                name: 'test-field'
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
                ariaLabel: 'Required Field',
                formId: TEST_FORM_ID,
                name: 'test-field'
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
                ariaLabel: 'Field with classes',
                formId: TEST_FORM_ID
            }
        });

        const input = document.querySelector('input');
        const expectedClasses = 'input user-invalid:text-error user-invalid:input-error user-invalid:placeholder:text-error';
        expect(input?.className).toBe(expectedClasses);

        unmount(component);
    });

    test('no configures aria-describedby when there is  no error', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                name: 'test-field',
                ariaLabel: 'Field without error',
                formId: TEST_FORM_ID
            }
        });

        const input = document.querySelector('input');
        expect(input?.getAttribute('aria-describedby')).toBeNull();

        unmount(component);
    });


    test('snapshot of the basic component', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                id: 'snapshot-input',
                type: 'text',
                name: 'username',
                placeholder: 'User',
                ariaLabel: 'Username field',
                label: 'User',
                formId: TEST_FORM_ID
            }
        });

        expect(document.body.innerHTML).toMatchSnapshot();

        unmount(component);
    });

    test('renders error message when there are validation errors', () => {
        // Configure the FormState with a validation error
        mockFormState.setValue('test-field', '');
        mockFormState.validateFields();

        const component = mount(Input, {
            target: document.body,
            props: {
                name: 'test-field',
                ariaLabel: 'Field with errors',
                formId: TEST_FORM_ID
            }
        });

        const errorMessage = document.querySelector('p');
        expect(errorMessage).toBeTruthy();
        expect(errorMessage?.textContent).toBe('Campo requerido');
        expect(errorMessage?.classList.contains('text-error')).toBe(true);

        unmount(component);
    });

    test('updates field value on input event', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                name: 'test-field',
                ariaLabel: 'Campo de prueba',
                formId: TEST_FORM_ID
            }
        });

        const input = document.querySelector('input') as HTMLInputElement;
        
        // Simula el evento input de forma que Svelte lo capture
        input.value = 'nuevo valor';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        flushSync();

        // Verifica que el valor se actualizó en el FormState
        expect(mockFormState.getValue('test-field')).toBe('nuevo valor');
        expect(mockFormState.taintedFields.has('test-field')).toBe(true);

        unmount(component);
    });

    test('validates on blur when validateOnBlur is true', () => {
        mockFormState.setValue('test-field', '');
        
        const component = mount(Input, {
            target: document.body,
            props: {
                name: 'test-field',
                ariaLabel: 'Test field',
                formId: TEST_FORM_ID,
                validateOnBlur: true
            }
        });

        const input = document.querySelector('input') as HTMLInputElement;
        
        // Simula blur sin valor (debería validar y mostrar error)
        input.dispatchEvent(new Event('blur', { bubbles: true }));
        flushSync();

        const errorMessage = document.querySelector('p');
        expect(errorMessage).toBeTruthy();
        expect(errorMessage?.textContent).toBe('Required Field');

        unmount(component);
    });

    test('validates on input when validateOnBlur is false', () => {
        const component = mount(Input, {
            target: document.body,
            props: {
                name: 'test-field',
                ariaLabel: 'Test field without errors',
                formId: TEST_FORM_ID,
                validateOnBlur: false
            }
        });

        const input = document.querySelector('input') as HTMLInputElement;
        
        // Simulate input with empty value
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        flushSync();

        // Should validate immediately and show error
        const errorMessage = document.querySelector('p');
        expect(errorMessage).toBeTruthy();
        expect(errorMessage?.textContent).toBe('Required Field');

        unmount(component);
    });

    test('configures aria-describedby when there is an error', () => {
        mockFormState.setValue('test-field', '');
        mockFormState.validateFields();

        const component = mount(Input, {
            target: document.body,
            props: {
                name: 'test-field',
                ariaLabel: 'Field with error',
                formId: TEST_FORM_ID
            }
        });

        const input = document.querySelector('input');
        expect(input?.getAttribute('aria-describedby')).toBe('test-field-error');

        const errorElement = document.getElementById('test-field-error');
        expect(errorElement).toBeTruthy();

        unmount(component);
    });
});