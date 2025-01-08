# PercyDropdownListComponent

A customizable dropdown list component with support for multiple selections, accessibility features, and keyboard navigation.

## Usage

### Import

Import the component into your module or directly in a template if using standalone components:

```typescript
import { PercyDropdownListComponent } from 'percy';
```

### Basic Example

```html
<percy-dropdown-list
  label="Select Options"
  [options]="dropdownOptions"
  [multiple]="true"
  [shape]="'round'"
  [disabled]="false"
  (percyChange)="onSelectionChange($event)">
</percy-dropdown-list>
```

## API

### Inputs

| Name                       | Type                            | Default            | Description                                                                 |
|----------------------------|---------------------------------|--------------------|-----------------------------------------------------------------------------|
| `label`                    | `string`                        | **Required**       | The label text for the dropdown list.                                       |
| `percy-id`                 | `string`                        | Auto-generated     | A unique identifier for the dropdown list.                                  |
| `options`                  | `PercyDropdownListOption[]`     | `[]`               | An array of options for the dropdown list.                                  |
| `shape`                    | `string`                        | `'round'`          | The shape of the dropdown list (`'round'`, `'square'`, or `'circle'`).      |
| `multiple`                 | `boolean`                       | `false`            | Whether multiple selections are allowed.                                    |
| `disabled`                 | `boolean`                       | `false`            | Whether the dropdown list is disabled.                                      |
| **A11y Properties**        |                                 |                    |                                                                             |
| `a11y-badge-aria-label`    | `string` \| `null`                 | `null`             | ARIA label for the badge element.                                           |
| `a11y-clear-button-aria-label` | `string` \| `null`             | `null`             | ARIA label for the clear button.                                            |
| `a11y-selected-text`       | `string` \| `null`                 | `null`             | ARIA label for the selected text.                                           |
| `a11y-not-selected-text`   | `string` \| `null`                 | `null`             | ARIA label for the not selected text.                                       |
| `a11y-of-text`             | `string` \| `null`                 | `null`             | ARIA label for the "of" text (e.g., "Item 1 of 5").                         |

### Outputs

| Name        | Type                               | Description                                               |
|-------------|------------------------------------|-----------------------------------------------------------|
| `percyChange` | `PercyDropdownListOption` \| `PercyDropdownListOption[]` | Emits the selected option(s) when the dropdown value changes. |

### Host Bindings

The `host` property in the component defines dynamic CSS class bindings based on the `shape` input:

| Class                           | Condition                           | Description                                  |
|---------------------------------|-------------------------------------|----------------------------------------------|
| `percy-dropdown-list`           | Always applied                     | Base class for the dropdown list.            |
| `percy-dropdown-list_round`     | `shape = 'round'`                  | Applied when the dropdown list shape is round.|
| `percy-dropdown-list_square`    | `shape = 'square'`                 | Applied when the dropdown list shape is square.|
| `percy-dropdown-list_circle`    | `shape = 'circle'`                 | Applied when the dropdown list shape is circular.|
| `percy-dropdown-list_disabled`  | `disabled = true`                  | Applied when the dropdown list is disabled.   |

### Keyboard Interaction

The dropdown supports keyboard navigation:

- **Arrow Down / Down**: Focuses the next option.
- **Arrow Up / Up**: Focuses the previous option.
- **Enter / Space**: Selects the focused option or toggles the dropdown.
- **Escape**: Closes the dropdown.
- **Home**: Focuses the first option.
- **End**: Focuses the last option.

### Advanced Examples

#### Multiple Selections

```html
<percy-dropdown-list 
  label="Select Multiple Options" 
  [multiple]="true" 
  [options]="dropdownOptions">
</percy-dropdown-list>
```

#### Disabled Dropdown

```html
<percy-dropdown-list 
  label="Disabled Dropdown" 
  [disabled]="true" 
  [options]="dropdownOptions">
</percy-dropdown-list>
```

### Using with Reactive Forms

To use the `PercyDropdownListComponent` with Reactive Forms, bind it to a `FormControl` or `FormGroup`:

1. **Import** the necessary modules in your Angular module:

```typescript
import { ReactiveFormsModule } from '@angular/forms';
import { PercyDropdownListComponent } from 'percy';
```

2. **Define a `FormGroup`** in your component and bind it to the dropdown:

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown-form',
  templateUrl: './dropdown-form.component.html'
})
export class DropdownFormComponent {
  dropdownForm = new FormGroup({
    selectedOption: new FormControl(null)
  });
}
```

3. **Bind the `FormControl`** to the dropdown in the template:

```html
<form [formGroup]="dropdownForm">
  <percy-dropdown-list 
    label="Choose Option"
    formControlName="selectedOption"
    [options]="dropdownOptions">
  </percy-dropdown-list>
  <button type="submit" [disabled]="dropdownForm.invalid">Submit</button>
</form>
```

## Notes

- The component is compatible with Angular Forms and implements the `ControlValueAccessor` interface for seamless integration.
- The `id` is auto-generated if not provided, but can be customized using the `percy-id` input.
