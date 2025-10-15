# Form System

This directory contains a complete and robust form management system for SvelteKit, featuring both client-side and server-side validation using Zod.

## 📋 Table of Contents

- [Architecture](#architecture)
- [Components](#components)
- [Basic Usage](#basic-usage)
- [Data Flow](#data-flow)
- [Validation](#validation)
- [Error Handling](#error-handling)
- [Advanced Examples](#advanced-examples)
- [API Reference](#api-reference)

## 🏗️ Architecture

The system is made up of several layers that work together:

```
┌─────────────────────────────────────────────────┐
│  Page (+page.svelte)                            │
│  ┌───────────────────────────────────────────┐  │
│  │  High-Level Form                          │  │
│  │  (e.g., AuthForm.svelte)          │  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │  Form Component                     │  │  │
│  │  │  - Creates FormState                │  │  │
│  │  │  - Sets Context                     │  │  │
│  │  │  - Syncs with server (page.form)    │  │  │
│  │  │  ┌───────────────────────────────┐  │  │  │
│  │  │  │  Input Components             │  │  │  │
│  │  │  │  - Reads FormState from context│ │  │  │
│  │  │  │  - Updates values              │ │  │  │
│  │  │  │  - Shows errors                │ │  │  │
│  │  │  └───────────────────────────────┘  │  │  │
│  │  │  ┌───────────────────────────────┐  │  │  │
│  │  │  │  Button Component             │  │  │  │
│  │  │  │  - Reads "disabled" state     │  │  │  │
│  │  │  └───────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
           ↕️ (form submission)
┌─────────────────────────────────────────────────┐
│  Server Action (+page.server.ts)                │
│  - Validates data with Zod                      │
│  - Returns FailureActionData on error           │
│  - Redirects on success                        │
└─────────────────────────────────────────────────┘
```

## 🧩 Components

### 1. **Form.svelte**
A wrapper component that manages the state of the entire form.

**Responsibilities:**
- Create an instance of `FormState`
- Set Svelte context so that children access the state
- Sync server data (`page.form`) to local state
- Display global/form-level errors

### 2. **Input.svelte**
Input field component that automatically connects to form state.

**Responsibilities:**
- Connect to `FormState` via context
- Update values in real time
- Validate on blur or onChange depending on configuration
- Show field-specific errors

### 3. **Button.svelte**
Button that automatically disables itself according to form state.

**Responsibilities:**
- Connect to `FormState` via context
- Automatically disable if there are errors or empty fields

### 4. **FormState (state/form.svelte.ts)**
Class that manages all the reactive state of the form.

**Responsibilities:**
- Store field values
- Manage validation errors
- Control the `disabled` state of the form
- Track "tainted" (user-modified) fields
- Validate data against Zod schemas

## 🚀 Basic Usage

### Step 1: Define the Validation Schema

```typescript
// src/lib/helpers/validation/myForm.ts
import { z } from 'zod';

export const myFormSchema = z.strictObject({
  email: z.email({ error: 'Invalid email' }).trim().toLowerCase(),
  password: z.string().min(8, { error: 'Minimum 8 characters' })
});
```

### Step 2: Create a Form ID Constant

```typescript
// src/lib/constants/forms.ts
export const MY_FORM_ID = 'my-form';
```

### Step 3: Create the Form in Your Page

```svelte
<script lang="ts">
  import { Form, Input, Button } from '$lib/components';
  import { myFormSchema } from '$lib/helpers/validation/myForm';
  import { MY_FORM_ID } from '$lib/constants/forms';
</script>

<Form 
  id={MY_FORM_ID} 
  action="/my-route" 
  method="POST" 
  validationSchema={myFormSchema}
>
  <Input
    name="email"
    type="email"
    id="email"
    formId={MY_FORM_ID}
    ariaLabel="Email"
    label="Email"
  />

  <Input
    name="password"
    type="password"
    id="password"
    formId={MY_FORM_ID}
    ariaLabel="Password"
    label="Password"
  />

  <Button type="submit" formId={MY_FORM_ID}>
    Submit
  </Button>
</Form>
```

### Step 4: Handle the Action on the Server

```typescript
// src/routes/my-route/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { FormFailureActionBuilder } from '$lib/server';
import { myFormSchema } from '$lib/helpers/validation/myForm';
import { MY_FORM_ID } from '$lib/constants/forms';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Server-side validation
    const failureData = FormFailureActionBuilder.buildFormValidationResult({
      formId: MY_FORM_ID,
      values: { email, password },
      validationSchema: myFormSchema
    });

    if (!failureData[MY_FORM_ID]?.success) {
      return fail(400, failureData);
    }

    // Business logic (save to DB, authenticate, etc.)
    try {
      // ... your logic here
      redirect(303, '/success');
    } catch (error) {
      const errorData = FormFailureActionBuilder.buildFormErrorResult({
        formId: MY_FORM_ID,
        values: { email },
        formError: 'Error processing form'
      });
      return fail(400, errorData);
    }
  }
};
```

## 🔄 Data Flow

### 1. Initialization
```
User loads page
    ↓
Form.svelte creates FormState
    ↓
FormState saved in Svelte context
    ↓
Input/Button get FormState from context
```

### 2. User Interaction
```
User types in Input
    ↓
Input.oninput → formState.setValue()
    ↓
Input.oninput → formState.setTaintedFields()
    ↓
(If validateOnBlur=false) → formState.validateFields()
    ↓
Input reads formState.getFieldsErrors() to display error
    ↓
Button reads formState.getDisabled() to enable/disable itself
```

### 3. Form Submission
```
User clicks Button
    ↓
SvelteKit sends formData to server
    ↓
Server validates with Zod
    ↓
┌─────────────────────┬─────────────────────┐
│     Validation OK   │    Validation Fail  │
├─────────────────────┼─────────────────────┤
│  Run business logic │   Return fail()     │
│  ↓                  │   with errors       │
│  Redirect or success│   ↓                 │
│                     │   page.form updates │
│                     │   ↓                 │
│                     │   Form.$effect runs │
│                     │   ↓                 │
│                     │   formState.setPageFormData()│
│                     │   ↓                 │
│                     │   Inputs show errors│
└─────────────────────┴─────────────────────┘
```

## ✅ Validation

### Client-Side Validation

There are two validation modes:

#### 1. **Blur Validation (default)**
```svelte
<Input
  name="email"
  formId={MY_FORM_ID}
  validateOnBlur={true}  <!-- Default -->
/>
```
- The field is validated when the user leaves the input (blur)
- Better UX: does not distract user while typing

#### 2. **Real-Time Validation**
```svelte
<Input
  name="email"
  formId={MY_FORM_ID}
  validateOnBlur={false}
/>
```
- The field is validated on every keypress
- Useful for complex validation that users need to see instantly

### Server-Side Validation

Always validate on the server for security:

```typescript
const failureData = FormFailureActionBuilder.buildFormValidationResult({
  formId: MY_FORM_ID,
  values: { email, password },
  validationSchema: myFormSchema
});

if (!failureData[MY_FORM_ID]?.success) {
  return fail(400, failureData);
}
```

## ❌ Error Handling

### Types of Errors

#### 1. **Field Errors**
Specific errors for an individual input:

```typescript
// On the server
FormFailureActionBuilder.buildFormValidationResult({
  formId: MY_FORM_ID,
  values: { email: 'invalid-email' },
  validationSchema: myFormSchema
});

// This generates:
{
  [MY_FORM_ID]: {
    fieldsErrors: {
      email: { errors: ['Invalid email'] } // Note must errors will be in Spanish as the platform is intended to attend Spanish speaker users
    }
  }
}
```

These are shown automatically under the relevant input.

#### 2. **Form Errors**
General errors not attached to a specific field:

```typescript
// On the server
FormFailureActionBuilder.buildFormErrorResult({
  formId: MY_FORM_ID,
  values: { email },
  formError: 'User not found'
});

// This generates:
{
  [MY_FORM_ID]: {
    formError: 'User not found'
  }
}
```

Form errors are shown at the bottom of the form and automatically disappear after 4 seconds.

### Security: Removing Passwords

For security, passwords are **never** returned to the client:

```typescript
// In FormFailureActionBuilder
static removePasswordData(values) {
  if (values.passwordConfirmation) delete values.passwordConfirmation;
  if (values.password) delete values.password;
  return values;
}
```

## 🎯 Advanced Examples

### Cross-Field Validation

```typescript
export const registrationSchema = z.strictObject({
  password: z.string().min(8),
  passwordConfirmation: z.string()
}).refine(data => data.password === data.passwordConfirmation, {
  error: 'Passwords do not match',
  path: ['passwordConfirmation']  // Error shown on this field
});
```

### Multiple Forms in a Page

Each form needs a unique ID:

```svelte
<Form id="login-form" validationSchema={loginSchema}>
  <!-- login fields -->
</Form>

<Form id="signup-form" validationSchema={signupSchema}>
  <!-- signup fields -->
</Form>
```

### Conditionally Disabling the Button

The button is automatically disabled when:
- No fields are "tainted" (user hasn't interacted)
- There are validation errors
- There are empty fields
- There is a general form error

This is managed automatically in `FormState.setDisabled()`.

## 📚 API Reference

### Form Component

**Props:**
- `id: string` - Unique form ID (required)
- `action: string` - Path to server action
- `method: 'POST' | 'GET'` - HTTP method (default: 'POST')
- `validationSchema: ZodObject` - Zod validation schema (required)
- All HTML attributes accepted by `<form>`

### Input Component

**Props:**
- `formId: string` - Parent form ID (required)
- `name: string` - Field name (required)
- `ariaLabel: string` - Accessibility label (required)
- `label?: string` - Visible label (optional)
- `validateOnBlur?: boolean` - Validation mode (default: true)
- All HTML attributes accepted by `<input>`

### Button Component

**Props:**
- `formId: string` - Parent form ID (required)
- All HTML attributes accepted by `<button>`

### FormState Class

**Properties:**
- `disabled: boolean` - Form state
- `taintedFields: SvelteSet<string>` - Modified (user-touched) fields
- `formError: string | undefined` - General error
- `fieldsErrors: FieldErrors` - Per-field errors
- `values: FormValues` - Field values

**Methods:**
- `setValue(name, value)` - Update a field's value
- `getValue(name)` - Get a field's value
- `setTaintedFields(field)` - Mark a field as modified
- `validateFields()` - Validate all fields
- `getFieldsErrors(name)` - Get errors for a field
- `getFormError()` - Get general error
- `getDisabled()` - Get disabled state
- `setPageFormData(formData)` - Sync with server-side result

### FormFailureActionBuilder

**Static Methods:**

```typescript
// Validate and build validation error response
static buildFormValidationResult({
  formId: string,
  values: Record<string, string | number | undefined>,
  validationSchema: ZodObject
}): FailureActionData

// Build general form error response
static buildFormErrorResult({
  formId: string,
  values: Record<string, string | number | undefined>,
  formError: string
}): FailureActionData

// Remove sensitive data (passwords)
static removePasswordData(
  values: Record<string, string | number | undefined>
): Record<string, string | number | undefined>
```

---

## 🔍 Technical Notes

1. **Reactivity**: Uses Svelte 5 runes (`$state`, `$derived`, `$effect`)
2. **Context API**: Uses Svelte context for sharing state
3. **Untrack**: Uses `untrack()` to avoid unnecessary reactive loops
4. **SvelteSet**: Uses `SvelteSet` for reactively tracking modified fields
5. **Zod Integration**: Deep Zod integration for consistent client/server validation

## 🐛 Troubleshooting

### Button does not enable
- Check that all fields have values
- Check there are no validation errors
- Check at least one field is "tainted" (user-modified)

### Errors do not show up
- Check that `formId` matches across Form, Input, and Button
- Check your Zod schema has error messages
- Check your server returns `fail()` with the correct structure

### Form does not sync with server
- Ensure the form ID matches on client and server
- Make sure you're using `FormFailureActionBuilder` on the server
- Check your browser console for errors

