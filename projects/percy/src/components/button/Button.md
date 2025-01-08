# PercyButtonComponent

A reusable and customizable button component that supports various sizes, shapes, icon placements, and fill styles.

## Usage

### Import

Import the component into your module or directly in a template if using standalone components:

```typescript
import { PercyButtonComponent } from 'percy';
```

### Basic Example

```html
<percy-button 
  label="Submit" 
  [disabled]="false" 
  [size]="'medium'" 
  [icon]="'save'" 
  [icon-position]="'left'" 
  (percyClick)="onButtonClick()">
</percy-button>
```

## API

### Inputs

| Name            | Type                             | Default           | Description                                                             |
|-----------------|----------------------------------|-------------------|-------------------------------------------------------------------------|
| `label`         | `string`                         | **Required**      | The label text for the button.                                          |
| `type`          | `'button'` \| `'submit'` \| `'reset'` | `'button'`      | Specifies the button's behavior (e.g., form submission or reset).       |
| `disabled`      | `boolean`                        | `false`           | Disables the button, making it non-interactive.                         |
| `icon`          | `string \| null`                 | `null`            | The icon to be displayed on the button.                                 |
| `icon-position`  | `'left'` \| `'right'`            | `'right'`         | Specifies the position of the icon (left or right).                    |
| `only-icon`      | `boolean`                        | `false`           | If true, the button will only display the icon and no text.             |
| `size`          | `'small'` \| `'medium'` \| `'large'` | `'medium'`      | The size of the button.                                                 |
| `shape`         | `'round'` \| `'square'` \| `'circle'` | `'round'`      | The shape of the button.                                                |
| `fill`          | `'filled'` \| `'ghosted'` \| `'cleaned'` \| `'linked'` | `'filled'` | The fill style of the button.                                           |
| `expand`        | `'block'` \| `'full'`            | `'block'`         | Specifies the expansion style of the button (block or full width).      |

### Outputs

| Name            | Type             | Description                                                             |
|-----------------|------------------|-------------------------------------------------------------------------|
| `percyClick`    | `MouseEvent`     | Emits an event when the button is clicked.                              |
| `percyFocus`    | `FocusEvent`     | Emits an event when the button gains focus.                             |
| `percyBlur`     | `FocusEvent`     | Emits an event when the button loses focus.                             |

### Host Bindings

The `host` property in the component defines dynamic CSS class bindings based on the `shape`, `size`, `icon-position`, `fill`, and `expand` inputs.

| Class                     | Condition                                    | Description                                    |
|---------------------------|---------------------------------------------|------------------------------------------------|
| `percy-button`            | Always applied                             | Base class for the button.                     |
| `percy-button_filled`     | `fill = "filled"`                           | Applied when the button has a filled style.    |
| `percy-button_ghosted`    | `fill = "ghosted"`                          | Applied when the button has a ghosted style.   |
| `percy-button_linked`     | `fill = "linked"`                           | Applied when the button has a linked style.    |
| `percy-button_cleaned`    | `fill = "cleaned"`                          | Applied when the button has a cleaned style.   |
| `percy-button_small`      | `size = "small"`                            | Applied when the button is small.              |
| `percy-button_medium`     | `size = "medium"`                           | Applied when the button is medium.             |
| `percy-button_large`      | `size = "large"`                            | Applied when the button is large.              |
| `percy-button_icon-left`  | `icon-position = "left"`                     | Applied when the icon is positioned left.      |
| `percy-button_icon-right` | `icon-position = "right"`                    | Applied when the icon is positioned right.     |
| `percy-button_round`      | `shape = "round"`                           | Applied when the button is round.              |
| `percy-button_square`     | `shape = "square"`                          | Applied when the button is square.             |
| `percy-button_circle`     | `shape = "circle"`                          | Applied when the button is circular.           |
| `percy-button_full`       | `expand = "full"`                           | Applied when the button expands fully.         |
| `percy-button_block`      | `expand = "block"`                          | Applied when the button expands in block style. |

### Example with Icon and Position

```html
<percy-button 
  label="Save" 
  [icon]="'save'" 
  [icon-position]="'left'" 
  [size]="'large'" 
  [fill]="'filled'" 
  (percyClick)="onSaveClick()">
</percy-button>
```

### Example with Only Icon

```html
<percy-button 
  [icon]="'edit'" 
  [only-icon]="true" 
  [size]="'medium'" 
  (percyClick)="onEditClick()">
</percy-button>
```

### Example with Full-width Button

```html
<percy-button 
  label="Submit" 
  [expand]="'full'" 
  (percyClick)="onSubmitClick()">
</percy-button>
```

## Notes

- The component supports different fill styles (`filled`, `ghosted`, `cleaned`, `linked`) for a variety of button appearances.
- The `expand` property allows for full-width or block-level buttons, providing flexibility in layout.
- The component is designed with accessibility in mind, allowing for easy icon placement and button shape customization.
