# PercyToastController

A service for managing and displaying toast notifications in an Angular application.

## Usage

### Import

First, import the `PercyToastController` service into your component or service:

```typescript
import { PercyToastController } from 'percy';
```

### Example Usage

To show a toast, call the `show` method on the `PercyToastController` instance:

```typescript
constructor(private toastController: PercyToastController) {}

this.toastController.success({
  message: 'Operation successful!',
  description: 'The task has been completed successfully.',
});
```

You can also use other methods to show different types of toasts:

```typescript
this.toastController.info({
  message: 'Information message',
  description: 'Just some info to notify the user.',
});

this.toastController.warning({
  message: 'Warning message',
  description: 'There is a potential issue to be aware of.',
});

this.toastController.error({
  message: 'Error occurred',
  description: 'An error occurred during the operation.',
});
```

## Methods

| Name        | Description                                           | Parameters                                                   |
|-------------|-------------------------------------------------------|--------------------------------------------------------------|
| `show`      | Displays a toast notification of any type.            | `props: PercyToast`                                           |
| `success`   | Displays a success toast notification.                | `props: Omit<PercyToast, 'type'>`                             |
| `info`      | Displays an info toast notification.                  | `props: Omit<PercyToast, 'type'>`                             |
| `warning`   | Displays a warning toast notification.                | `props: Omit<PercyToast, 'type'>`                             |
| `error`     | Displays an error toast notification.                 | `props: Omit<PercyToast, 'type'>`                             |

## Properties

### Inputs for `PercyToast`

| Name                     | Type                           | Default            | Description                                                                 |
|--------------------------|--------------------------------|--------------------|-----------------------------------------------------------------------------|
| `message`                | `string`                       | **Required**       | The message displayed in the toast notification.                            |
| `position`               | `ToastPosition`                | `'bottom-right'`    | The position of the toast on the screen (`'top-left'`, `'top-right'`, etc.).|
| `type`                   | `ToastType`                    | `'default'`         | The type of toast (`'default'`, `'info'`, `'success'`, `'warning'`, `'error'`). |
| `description`            | `string`                       | `''`               | A description for the toast message (optional).                           |
| `icon`                   | `string`                       | `''`               | An optional icon for the toast.                                            |
| `shape`                  | `PercyToastShape`              | `'round'`          | The shape of the toast (`'round'`, `'square'`, etc.).                      |
| `duration`               | `number`                       | `3000`             | The duration the toast will be displayed, in milliseconds.                 |
| `a11yTypeDescription`    | `string`                       | `''`               | A description of the toast for accessibility (screen readers).              |

### Toast Position Types

- `'top-left'`
- `'top-right'`
- `'top-center'`
- `'bottom-left'`
- `'bottom-right'`
- `'bottom-center'`

### Toast Types

- `'default'`
- `'info'`
- `'success'`
- `'warning'`
- `'error'`

### Toast Shape

- `'round'`
- `'square'`

## Internal Behavior

- The toast notification is displayed for a specified duration (default: 3000ms).
- The `setComponentProperties` method updates the properties of the toast component, including its message, type, description, icon, shape, and position.
- The `destroy` method cleans up the toast component after it has been closed, removing it from the DOM.

### Example of Custom Toast

You can create a custom toast with a specific message and appearance:

```typescript
this.toastController.show({
  message: 'Custom toast message!',
  description: 'This is a custom toast with additional details.',
  icon: 'info-icon',
  shape: 'square',
  position: 'top-left',
  duration: 5000,
});
```

This example shows a toast at the top-left of the screen with a custom icon and longer display duration.

---

The `PercyToastController` provides an easy way to manage toast notifications in your Angular app, allowing you to show various types of notifications with customizable content and behavior.
