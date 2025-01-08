# PercyInputComponent

A customizable input component supporting various input types, shapes, icons, and accessibility features. It also implements the `ControlValueAccessor` interface for seamless integration with Angular forms.

## Usage

### Import

Import the component into your module or directly in a template if using standalone components:

```typescript
import { PercyInputComponent } from 'percy';
```

### Basic Example

```html
<percy-input
  [label]="'Username'"
  [id]="'username-input'"
  [placeholder]="'Enter your username'"
  [label-style]="'start'"
  [type]="'text'"
  [icon-left]="'person-outline'"
  [disabled]="false"
  [required]="true"
  [(ngModel)]="username"
>
</percy-input>
```

### Password Example

```html
<percy-input
  [label]="'Password'"
  [type]="'password'"
  [icon-left]="'lock-closed-outline'"
  [a11y-hidden-password-aria-label]="'Password hidden'"
  [a11y-displayed-password-aria-label]="'Password visible'"
  [(ngModel)]="password"
>
</percy-input>
```

## API

### Inputs

| Name                           | Type                                    | Default           | Description                                                                                       |
|--------------------------------|-----------------------------------------|-------------------|---------------------------------------------------------------------------------------------------|
| `label`                        | `string`                                | Required          | The label text to display for the input.                                                          |
| `id`                           | `string`                                | Randomly generated | Unique identifier for the input element.                                                          |
| `name`                         | `string`                                | `id` (default)    | The name attribute of the input element.                                                          |
| `placeholder`                  | `string`                                | `''`              | Placeholder text for the input.                                                                   |
| `label-style`                  | `'start'` \| `'floating'` \| `'hidden'`       | `start`           | Defines the style of the label (start, floating, or hidden).                                       |
| `type`                         | `'text'` \| `'email'` \| `'password'` \| `'number'` | `text`           | The type of the input. This controls the behavior and appearance (e.g., password, text, etc.).      |
| `icon-left`                    | `string` \| `null`                         | `null`            | Icon to display on the left side of the input.                                                     |
| `icon-right`                   | `string` \| `null`                         | `null`            | Icon to display on the right side of the input (e.g., for password visibility toggles).            |
| `readonly`                     | `boolean`                               | `false`           | If true, the input field will be readonly.                                                        |
| `disabled`                     | `boolean`                               | `false`           | If true, the input field will be disabled.                                                        |
| `required`                     | `boolean`                               | `false`           | If true, the input field is marked as required.                                                    |
| `invalid`                      | `boolean`                               | `false`           | If true, the input will be marked as invalid.                                                     |
| `shape`                        | `'round'` \| `'square'` \| `'circle'`         | `round`           | Defines the shape of the input (round, square, or circle).                                         |

### A11y (Accessibility) Inputs

| Name                           | Type                                    | Default           | Description                                                                                       |
|--------------------------------|-----------------------------------------|-------------------|---------------------------------------------------------------------------------------------------|
| `a11y-hidden-password-aria-label` | `string` \| `null`                        | `null`            | A11y: ARIA label for the hidden password state.                                                   |
| `a11y-displayed-password-aria-label` | `string` \| `null`                     | `null`            | A11y: ARIA label for the displayed password state.                                                |

### Outputs

| Name           | Type          | Description                                                      |
|----------------|---------------|------------------------------------------------------------------|
| `percyClick`   | `MouseEvent`  | Emits when the input is clicked.                                  |
| `percyFocus`   | `FocusEvent`  | Emits when the input gains focus.                                |
| `percyBlur`    | `FocusEvent`  | Emits when the input loses focus.                                |
| `percyChange`  | `Event`       | Emits when the value of the input changes.                       |
| `percyInput`   | `InputEvent`  | Emits when an input event occurs (e.g., user typing).            |

### Host Bindings

The `host` property in the component defines dynamic CSS class bindings based on various inputs, such as label style, icon visibility, invalid state, and shape.

| Class                           | Condition                                                   | Description                                    |
|----------------------------------|-------------------------------------------------------------|------------------------------------------------|
| `percy-input`                   | Always applied                                              | Base class for the input component.            |
| `percy-input_label-start`       | `labelStyle = "start"`                                       | Applied when the label is placed at the start.  |
| `percy-input_label-floating`    | `labelStyle = "floating" && !iconLeft`                       | Applied when the label is floating.            |
| `percy-input_label-hidden`      | `labelStyle = "hidden"`                                      | Applied when the label is hidden.              |
| `percy-input_icon`              | `iconLeft \|\| iconRight \|\| type = "password"`                 | Applied when there's an icon or password input.|
| `percy-input_icon-left`         | `iconLeft`                                                  | Applied when there's a left icon.              |
| `percy-input_icon-right`        | `iconRight \|\| type = "password"`                             | Applied when there's a right icon or password. |
| `percy-input_invalid`           | `invalid = true`                                             | Applied when the input is invalid.             |
| `percy-input_round`             | `shape = "round"`                                            | Applied when the input has a round shape.      |
| `percy-input_square`            | `shape = "square"`                                           | Applied when the input has a square shape.     |
| `percy-input_circle`            | `shape = "circle"`                                           | Applied when the input has a circular shape.   |

### Password Visibility Toggle

For password inputs, the visibility can be toggled by clicking the eye icon:

- When the password is hidden, the `eye-off-outline` icon is displayed.
- When the password is visible, the `eye-outline` icon is displayed.

The toggle action updates the `type` property from `password` to `text` and vice versa, ensuring that the input field reflects the current visibility state.

### CSS Styles

The following CSS classes are available for customization:

| Class                           | Description                                             |
|----------------------------------|---------------------------------------------------------|
| `percy-input_label-start`       | Applies when the label is placed at the start.          |
| `percy-input_label-floating`    | Applies when the label is floating.                     |
| `percy-input_label-hidden`      | Applies when the label is hidden.                       |
| `percy-input_icon`              | Applies when there is an icon in the input.             |
| `percy-input_icon-left`         | Applies when there is a left icon in the input.         |
| `percy-input_icon-right`        | Applies when there is a right icon or password toggle.  |
| `percy-input_invalid`           | Applies when the input is in an invalid state.          |
| `percy-input_round`             | Applies when the input has a round shape.               |
| `percy-input_square`            | Applies when the input has a square shape.              |
| `percy-input_circle`            | Applies when the input has a circular shape.            |

### Advanced Example: Custom Icons

```html
<percy-input
  [label]="'Custom Icon Input'"
  [icon-left]="'custom-icon-outline'"
  [icon-right]="'custom-icon-filled'"
  [(ngModel)]="customValue"
>
</percy-input>
```

### Notes

- The component is compatible with Angular Forms and implements the `ControlValueAccessor` interface for seamless integration.
- The `a11y-*` inputs enable full accessibility support, including ARIA roles, attributes, and keyboard navigation.
