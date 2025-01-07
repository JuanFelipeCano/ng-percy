# PercyButtonComponent

A customizable and reusable button component with support for different styles, sizes, shapes, and events.

## Installation

Ensure your Angular project is configured to support standalone components.

```bash
npm install your-package-name
```

## Usage

### Import

Import the component into your module or directly in a template if using standalone components:

```typescript
import { PercyButtonComponent } from 'path-to-package';
```

### Basic Example

```html
<percy-button 
  label="Submit"
  type="submit"
  disabled
  icon="icon-name"
  icon-position="left"
  size="medium"
  shape="round"
  fill="filled"
  expand="block"
  (percyClick)="onButtonClick($event)">
</percy-button>
```

## API

### Inputs

| Name            | Type                               | Default       | Description                                                            |
|------------------|------------------------------------|---------------|------------------------------------------------------------------------|
| `label`         | `string`                          | **Required**  | The visible text on the button.                                        |
| `type`          | `'button' | 'submit' | 'reset'`  | `'button'`   | The button type, following the HTML specification.                    |
| `disabled`      | `boolean`                         | `false`       | Disables the button, making it non-interactive.                       |
| `icon`          | `string | null`                   | `null`        | The name of the icon to display inside the button.                    |
| `iconPosition`  | `'left' | 'right'`                | `'right'`     | The position of the icon relative to the text.                        |
| `onlyIcon`      | `boolean`                         | `false`       | Indicates if the button should display only the icon, without text.   |
| `size`          | `'small' | 'medium' | 'large'`   | `'medium'`    | The size of the button.                                               |
| `shape`         | `'round' | 'square' | 'circle'`  | `'round'`     | The shape of the button.                                              |
| `fill`          | `'filled' | 'ghosted' | 'cleaned' | 'linked'` | `'filled'`   | The visual style of the button.                                       |
| `expand`        | `'block' | 'full'`                | `'block'`     | The horizontal expansion of the button.                               |

### Outputs

| Name           | Type              | Description                                                           |
|-----------------|-------------------|-----------------------------------------------------------------------|
| `percyClick`   | `MouseEvent`      | Emits an event when the button is clicked.                           |
| `percyFocus`   | `FocusEvent`      | Emits an event when the button gains focus.                          |
| `percyBlur`    | `FocusEvent`      | Emits an event when the button loses focus.                          |

## CSS Styles

The following CSS classes are available for further customization:

| Class                    | Description                                                   |
|--------------------------|---------------------------------------------------------------|
| `percy-button_filled`    | Applies the "filled" style.                                    |
| `percy-button_ghosted`   | Applies the "ghosted" style.                                   |
| `percy-button_cleaned`   | Applies the "cleaned" style.                                   |
| `percy-button_linked`    | Applies the "linked" style.                                    |
| `percy-button_small`     | Sets the button size to small.                                 |
| `percy-button_medium`    | Sets the button size to medium.                                |
| `percy-button_large`     | Sets the button size to large.                                 |
| `percy-button_icon-left` | Positions the icon to the left of the text.                    |
| `percy-button_icon-right`| Positions the icon to the right of the text.                   |
| `percy-button_round`     | Sets the button shape to round.                                |
| `percy-button_square`    | Sets the button shape to square.                               |
| `percy-button_circle`    | Sets the button shape to circle.                               |
| `percy-button_block`     | Sets the button to occupy its container’s width (`block`).     |
| `percy-button_full`      | Sets the button to expand fully (`full`).                      |

## Advanced Examples

### Icon-only Button

```html
<percy-button 
  [icon]="'check-icon'" 
  [only-icon]="true" 
  [size]="'small'" 
  [shape]="'circle'" 
  [fill]="'ghosted'">
</percy-button>
```

### Full-width Button

```html
<percy-button 
  label="Full Width" 
  [expand]="'full'" 
  [fill]="'linked'">
</percy-button>
```

## Notes

- The component uses `ChangeDetectionStrategy.OnPush` for optimal performance.
- Custom events (`percyClick`, `percyFocus`, `percyBlur`) are emitted for more granular control in your application.
