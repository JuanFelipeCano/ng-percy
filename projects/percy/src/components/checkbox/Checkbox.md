# PercyCheckboxComponent

A reusable and customizable checkbox component with support for different shapes, labels, and accessibility options.

## Usage

### Import

Import the component into your module or directly in a template if using standalone components:

```typescript
import { PercyCheckboxComponent } from 'percy';
```

### Basic Example

```html
<percy-checkbox 
  label="Accept Terms" 
  [checked]="false" 
  [disabled]="false" 
  [shape]="'round'" 
  [show-label]="true" 
  (percyChange)="onCheckboxChange($event)">
</percy-checkbox>
```

## API

### Inputs

| Name           | Type                        | Default           | Description                                                             |
|-----------------|-----------------------------|-------------------|-------------------------------------------------------------------------|
| `label`        | `string`                   | **Required**      | The label text for the checkbox.                                       |
| `checkbox-id`           | `string`                   | Auto-generated    | The unique identifier for the checkbox.                                |
| `name`         | `string`                   | Matches `checkbox-id`      | The name attribute for the checkbox.                                   |
| `showLabel`    | `boolean`                  | `true`            | Whether to show the label text.                                        |
| `readonly`     | `boolean`                  | `false`           | Makes the checkbox read-only, preventing interaction.                  |
| `disabled`     | `boolean`                  | `false`           | Disables the checkbox, making it non-interactive.                      |
| `indeterminate`| `boolean`                  | `false`           | Sets the checkbox to an indeterminate state.                           |
| `required`     | `boolean` | `null`           | `null`            | Indicates whether the checkbox is required for form validation.        |
| `invalid`      | `boolean` | `null`           | `null`            | Indicates whether the checkbox is in an invalid state.                 |
| `shape`        | `square` \| `circle` \| `round` | `round` | The shape of the checkbox.                                             |

### Outputs

| Name           | Type              | Description                                                           |
|-----------------|-------------------|-----------------------------------------------------------------------|
| `percyClick`   | `MouseEvent`      | Emits an event when the checkbox is clicked.                         |
| `percyFocus`   | `FocusEvent`      | Emits an event when the checkbox gains focus.                        |
| `percyBlur`    | `FocusEvent`      | Emits an event when the checkbox loses focus.                        |
| `percyChange`  | `boolean`         | Emits the new checked state when the checkbox value changes.         |

### Host Bindings

The `host` property in the component defines dynamic CSS class bindings based on the `shape` input.  

| Class                    | Condition                         | Description                          |
|--------------------------|------------------------------------|--------------------------------------|
| `percy-checkbox`         | Always applied                   | Base class for the checkbox.         |
| `percy-checkbox_round`   | `shape = "round"`            | Applied when the checkbox is round.  |
| `percy-checkbox_square`  | `shape = "square"`           | Applied when the checkbox is square. |
| `percy-checkbox_circle`  | `shape = "circle"`           | Applied when the checkbox is circular.|

### Two-way Binding

Use Angular's two-way binding syntax to bind the `checked` state of the checkbox:

```html
<percy-checkbox 
  label="Subscribe to Newsletter" 
  [(checked)]="isChecked">
</percy-checkbox>
```

### Keyboard Interaction

The checkbox supports keyboard navigation:
- Press `Space` to toggle the checked state (if not `readonly` or `disabled`).

## CSS Styles

The following CSS classes are available for customization:

| Class                     | Description                                                   |
|---------------------------|---------------------------------------------------------------|
| `percy-checkbox_round`    | Applies the round shape to the checkbox.                      |
| `percy-checkbox_square`   | Applies the square shape to the checkbox.                     |
| `percy-checkbox_circle`   | Applies the circle shape to the checkbox.                     |

## Advanced Examples

### Indeterminate State

```html
<percy-checkbox 
  label="Select All" 
  [indeterminate]="true" 
  [shape]="'square'">
</percy-checkbox>
```

### Read-only Checkbox

```html
<percy-checkbox 
  label="Read-only Example" 
  [readonly]="true" 
  [checked]="true">
</percy-checkbox>
```

### Disabled Checkbox

```html
<percy-checkbox 
  label="Disabled Example" 
  [disabled]="true">
</percy-checkbox>
```

### Using with Reactive Forms

To use the `PercyCheckboxComponent` with Reactive Forms, bind it to a `FormControl` or `FormGroup`:

1. **Import** the necessary modules in your Angular module:

```typescript
import { ReactiveFormsModule } from '@angular/forms';
import { PercyCheckboxComponent } from 'percy';
```

2. **Define a `FormGroup`** in your component and use `FormControl` to bind the checkbox:

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox-form',
  templateUrl: './checkbox-form.component.html'
})
export class CheckboxFormComponent {
  checkboxForm = new FormGroup({
    acceptTerms: new FormControl(false)
  });
}
```

3. **Bind the `FormControl`** to the checkbox in the template:

```html
<form [formGroup]="checkboxForm">
  <percy-checkbox 
    label="Accept Terms"
    formControlName="acceptTerms"
    [shape]="'round'">
  </percy-checkbox>
  <button type="submit" [disabled]="checkboxForm.invalid">Submit</button>
</form>
```

In this example, the `acceptTerms` form control is bound to the `PercyCheckboxComponent`. When the form is submitted, the checkbox value is available in the `checkboxForm` object.

## Notes

- The component is compatible with Angular Forms and implements the `ControlValueAccessor` interface for seamless integration.
- The `id` is auto-generated if not provided but can be customized using the `checkbox-id` input.
