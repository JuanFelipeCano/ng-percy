# PercyDropdownComponent

A customizable dropdown component with support for various shapes and accessibility features.

## Usage

### Import

Import the component into your module or directly in a template if using standalone components:

```typescript
import { PercyDropdownComponent } from 'percy';
```

### Basic Example

```html
<percy-dropdown
  [is-open]="dropdownOpen"
  [shape]="'round'"
  [a11y-role]="'listbox'"
  [a11y-aria-labelledby]="'dropdown-label'"
  [a11y-aria-controls]="'dropdown-list'"
  [a11y-aria-haspopup]="'listbox'"
  [a11y-aria-activedescendant]="'item1'"
  [a11y-tabindex]="'0'"
>
  <div dropdown-header>
    <span>Dropdown</span>
  </div>
  <div dropdown-content>
    <ul>
      <li id="item1">Option 1</li>
      <li id="item2">Option 2</li>
    </ul>
  </div>
</percy-dropdown>
```

## API

### Inputs

| Name                        | Type                              | Default          | Description                                                                                       |
|-----------------------------|-----------------------------------|------------------|---------------------------------------------------------------------------------------------------|
| `is-open`                   | `boolean`                         | `false`          | Determines whether the dropdown is open.                                                         |
| `shape`                     | `'round'` \| `'square'` \| `'circle'` | `round`          | The shape of the dropdown.                                                                        |
| `a11y-role`                 | `string` | `null`                   | `null`           | A11y: Defines the role of the dropdown for accessibility purposes.                                |
| `a11y-aria-labelledby`      | `string` | `null`                   | `null`           | A11y: ID of the element that labels the dropdown.                                                  |
| `a11y-aria-controls`        | `string` | `null`                   | `null`           | A11y: ID of the element that controls the dropdown.                                                |
| `a11y-aria-haspopup`        | `string` | `null`                   | `null`           | A11y: Indicates that the dropdown has a popup.                                                     |
| `a11y-aria-activedescendant`| `string` | `null`                   | `null`           | A11y: Identifies the active descendant of the dropdown.                                            |
| `a11y-tabindex`             | `string`                          | `'0'`            | A11y: Sets the tab index of the dropdown for keyboard navigation.                                 |

### Outputs

| Name           | Type          | Description                                                      |
|----------------|---------------|------------------------------------------------------------------|
| `percyClick`   | `MouseEvent`  | Emits when the dropdown is clicked.                             |
| `percyFocus`   | `FocusEvent`  | Emits when the dropdown gains focus.                            |
| `percyBlur`    | `FocusEvent`  | Emits when the dropdown loses focus.                            |

### Host Bindings

The `host` property in the component defines dynamic CSS class bindings based on the `shape` input.

| Class                         | Condition                                  | Description                           |
|-------------------------------|--------------------------------------------|---------------------------------------|
| `percy-dropdown`              | Always applied                           | Base class for the dropdown.          |
| `percy-dropdown_round`        | `shape = "round"`                         | Applied when the dropdown is round.   |
| `percy-dropdown_square`       | `shape = "square"`                        | Applied when the dropdown is square.  |
| `percy-dropdown_circle`       | `shape = "circle"`                        | Applied when the dropdown is circular.|

### Keyboard Interaction

The dropdown supports keyboard navigation. You can interact with the dropdown and select items using keyboard shortcuts:
- Open the dropdown by pressing `Enter` or `Space` on the dropdown trigger (if interactive).
- Navigate through the dropdown options using the `Up` and `Down` arrow keys.
- Close the dropdown by pressing `Esc`.

### CSS Styles

The following CSS classes are available for customization:

| Class                         | Description                                  |
|-------------------------------|----------------------------------------------|
| `percy-dropdown_round`        | Applies the round shape to the dropdown.     |
| `percy-dropdown_square`       | Applies the square shape to the dropdown.    |
| `percy-dropdown_circle`       | Applies the circle shape to the dropdown.    |

### Accessibility

The component supports various accessibility (a11y) properties to ensure better usability:

- **`a11yRole`**: Set the role of the dropdown for better screen reader support (e.g., `listbox`, `menu`).
- **`a11yAriaLabelledBy`**: Link the dropdown to an element that labels it.
- **`a11yAriaControls`**: Link the dropdown to the element it controls.
- **`a11yAriaHasPopup`**: Indicate if the dropdown contains a popup.
- **`a11yAriaActiveDescendant`**: Set the active item in the dropdown for screen readers.
- **`a11yTabIndex`**: Specify the tab index for better keyboard navigation.

### Advanced Examples

#### Controlled Open/Close Dropdown

```html
<percy-dropdown 
  [is-open]="dropdownOpen" 
  [shape]="'circle'">
  <div dropdown-header>Click to toggle</div>
  <div dropdown-content>Content goes here</div>
</percy-dropdown>
```

In the component:

```typescript
dropdownOpen = false;

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}
```

#### Accessibility Example

```html
<percy-dropdown
  [a11y-role]="'menu'"
  [a11y-aria-labelledby]="'dropdown-label'"
  [a11y-aria-controls]="'dropdown-list'"
  [a11y-aria-haspopup]="'true'"
  [a11y-aria-activedescendant]="'item1'"
  [a11y-tabindex]="'0'"
>
  <div dropdown-header>
    <span id="dropdown-label">My Accessible Dropdown</span>
  </div>
  <div dropdown-content>
    <ul id="dropdown-list">
      <li id="item1" tabindex="0">Option 1</li>
      <li id="item2" tabindex="0">Option 2</li>
    </ul>
  </div>
</percy-dropdown>
```

## Notes

- The component is compatible with Angular Forms and implements the `ControlValueAccessor` interface for seamless integration.
- The `a11y-aria-*` inputs enable full accessibility support, including ARIA roles, attributes, and keyboard navigation.
