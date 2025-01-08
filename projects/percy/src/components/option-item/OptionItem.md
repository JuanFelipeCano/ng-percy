# PercyOptionItemComponent

A customizable component for displaying individual options in a dropdown list. Supports selection, disabled states, and keyboard interaction.

## Usage

### Import

Import the component into your module or directly in a template if using standalone components:

```typescript
import { PercyOptionItemComponent } from 'percy';
```

### Basic Example

```html
<percy-option-item 
  [option]="option" 
  [selected]="isSelected" 
  [disabled]="isDisabled" 
  [shape]="'round'" 
  (percySelected)="onOptionSelected($event)">
</percy-option-item>
```

## API

### Inputs

| Name                       | Type                            | Default            | Description                                                                 |
|----------------------------|---------------------------------|--------------------|-----------------------------------------------------------------------------|
| `option`                   | `PercyDropdownListOption`       | **Required**       | The option object representing a single item in the dropdown.               |
| `selected`                 | `boolean`                       | `false`            | Whether the option is selected.                                             |
| `disabled`                 | `boolean`                       | `false`            | Whether the option is disabled.                                             |
| `focused`                  | `boolean`                       | `false`            | Whether the option is currently focused.                                    |
| `shape`                    | `string`                        | `'round'`          | The shape of the option item (`'round'`, `'square'`, or `'circle'`).       |

### Outputs

| Name           | Type                             | Description                                           |
|----------------|----------------------------------|-------------------------------------------------------|
| `percySelected` | `PercyDropdownListOption`       | Emits the selected option when the option is clicked.  |

### Host Bindings

The `host` property in the component defines dynamic CSS class bindings based on the `shape` and state properties:

| Class                           | Condition                           | Description                                  |
|---------------------------------|-------------------------------------|----------------------------------------------|
| `percy-option-item`             | Always applied                      | Base class for the option item.              |
| `percy-option-item_round`       | `shape = 'round'`                   | Applied when the option item shape is round.  |
| `percy-option-item_square`      | `shape = 'square'`                  | Applied when the option item shape is square. |
| `percy-option-item_circle`      | `shape = 'circle'`                  | Applied when the option item shape is circular.|
| `percy-option-item_selected`    | `selected = true`                   | Applied when the option item is selected.     |
| `percy-option-item_disabled`    | `disabled = true`                   | Applied when the option item is disabled.     |
| `percy-option-item_focused`     | `focused = true`                    | Applied when the option item is focused.      |

### Methods

#### `selectOption()`

This method toggles the selection state of the option. If the option is disabled, the method does nothing. The selected state is updated, and the option is emitted via the `percySelected` output.

```typescript
public selectOption(): void {
  if (this.disabled()) return;

  const option = {
    ...this.option(),
    selected: !this.option().selected,
  };

  this.percySelected.emit(option);
}
```

### Notes

- The `option` input must contain the properties `value` and `text` for each option in the dropdown.
- The `selected`, `disabled`, and `focused` properties are used for visual and state management purposes, and can be used to manage the interaction with the options.
- The component is lightweight and optimized for use in a dropdown list, providing easy customization for styles and behavior.
