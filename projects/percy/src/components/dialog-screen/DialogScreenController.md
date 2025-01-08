# PercyDialogScreenController

A service to create and control a dialog screen in the application. It allows displaying a customizable dialog and provides an observable to listen for the result of the dialog interaction.

## Usage

### Import

Import the `PercyDialogScreenController` into your component or service:

```typescript
import { PercyDialogScreenController } from 'percy';
```

### Basic Example

You can inject the `PercyDialogScreenController` into a component and use it to show and close dialog screens.

```typescript
import { Component } from '@angular/core';
import { PercyDialogScreenController } from 'percy';
import { PercyDialogScreenOptions } from './dialog-screen/models';

@Component({
  selector: 'app-example',
  template: `<button (click)="openDialog()">Open Dialog</button>`
})
export class ExampleComponent {

  constructor(private dialogController: PercyDialogScreenController) {}

  openDialog() {
    const options: PercyDialogScreenOptions<any> = {
      title: 'Dialog Title',
      component: YourDialogComponent,
      componentProps: { someData: 'value' },
      closeFromBackground: true,
      hideCloseButton: false,
    };

    this.dialogController.create(options).subscribe(result => {
      console.log('Dialog result:', result);
    });
  }
}
```

### API

#### Methods

| Method Name           | Description                                                                                   |
|-----------------------|-----------------------------------------------------------------------------------------------|
| `create(options)`      | Creates and displays a dialog screen with the specified options. It returns an observable that emits the result of the dialog interaction. |
| `close(result)`        | Closes the currently open dialog screen and emits the result.                                 |
| `setComponentProperties(options)` | Sets the properties of the dialog screen based on the options provided. This is done internally by the controller. |

#### `create(options: PercyDialogScreenOptions)`

Creates a dialog screen and appends it to the body. The dialog screen will be destroyed when the observable completes, and the result will be emitted through the observable.

##### Parameters
- `options`: The options used to configure the dialog screen, including the title, component, and other settings.

##### Returns
- `Observable<unknown>`: An observable that emits the result of the dialog interaction.

#### `close(result?: T)`

Closes the dialog screen and emits the result.

##### Parameters
- `result`: The result of the dialog interaction.

#### `setComponentProperties(options: PercyDialogScreenOptions)`

Sets the input properties of the dialog component based on the provided options. This method is invoked internally by the `create` method.

---

# PercyDialogScreenOptions

An interface that defines the options for the dialog screen. It includes settings like the dialog title, component to be displayed, and accessibility options.

## Interface

```typescript
export interface PercyDialogScreenOptions<T> {
  title: string;
  component: Type<any>;
  componentProps?: T | { [key: string]: any };
  closeFromBackground?: boolean;
  hideCloseButton?: boolean;
  hideTitle?: boolean;
  a11yAriaDescribedBy?: string;
  a11yCloseButtonAriaLabel?: string;
}
```

### Properties

| Name                       | Type                                    | Default               | Description                                                                 |
|----------------------------|-----------------------------------------|-----------------------|-----------------------------------------------------------------------------|
| `title`                    | `string`                                | **Required**          | The title of the dialog.                                                     |
| `component`                | `Type<any>`                             | **Required**          | The component to be displayed inside the dialog.                             |
| `componentProps`           | `T \| { [key: string]: any }`           | `undefined`           | The props to be passed to the component displayed in the dialog.             |
| `closeFromBackground`      | `boolean`                               | `true`                | Whether the dialog can be closed by clicking outside of it.                 |
| `hideCloseButton`          | `boolean`                               | `false`               | Whether to hide the close button.                                           |
| `hideTitle`                | `boolean`                               | `false`               | Whether to hide the title in the dialog.                                     |
| `a11yAriaDescribedBy`      | `string`                                | `""`                  | A11y - Id of the element that describes the dialog.                          |
| `a11yCloseButtonAriaLabel` | `string`                                | `""`                  | A11y - Label of the close button.                                           |

### Example

```typescript
const dialogOptions: PercyDialogScreenOptions<any> = {
  title: 'Custom Dialog',
  component: YourCustomDialogComponent,
  componentProps: { data: 'some data' },
  closeFromBackground: true,
  hideCloseButton: false,
  hideTitle: false,
  a11yAriaDescribedBy: 'dialog-description',
  a11yCloseButtonAriaLabel: 'Close dialog',
};

this.dialogController.create(dialogOptions).subscribe(result => {
  console.log('Dialog result:', result);
});
```

## Notes

- The `create` method handles setting up the dialog and showing it on the screen.
- The `close` method closes the dialog and can emit a result if needed.
- The dialog options provide flexibility for customizing the dialog's behavior, appearance, and accessibility features.
- 
