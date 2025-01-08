# PercyTrapFocusDirective

A directive that traps and manages focus within a specified container. This is particularly useful for modal dialogs, popups, or any element where the user should not be able to interact with other parts of the page until the container is closed. It ensures that focus remains within the interactive content of the container and cycles focus back to the first or last element when the user presses the `TAB` key.

## Usage

### Import

First, import the `PercyTrapFocusDirective` into your module and use it in your component's template:

```typescript
import { PercyTrapFocusDirective } from 'percy';

@NgModule({
  declarations: [PercyTrapFocusDirective],
  exports: [PercyTrapFocusDirective],
})
export class YourModule {}
```

### Example Usage

In your template, apply the `percyTrapFocus` directive to a container that should trap focus within it:

```html
<div percyTrapFocus>
  <!-- Focusable content goes here -->
  <input type="text" placeholder="Enter something" />
  <button>Submit</button>
</div>
```

In this example, focus will remain within the container until the user exits the modal or container.

### Example with Interactive Content

```html
<div percyTrapFocus>
  <div class="focusable-interactive-content">
    <input type="text" placeholder="Name" />
    <button>Submit</button>
  </div>
</div>
```

In this case, the `.focusable-interactive-content` element will contain all the focusable elements that need to be managed.

## Functionality

- **Focus Trapping:** This directive traps focus within the container, ensuring that when the user presses the `TAB` key, they will either loop from the first focusable element to the last, or vice versa if `SHIFT+TAB` is pressed.
  
- **First Focusable Element:** When the directive is initialized, it automatically focuses on the first interactive element within the container, if available.
  
- **Cycle Focus:** The `TAB` and `SHIFT+TAB` keys are used to navigate between focusable elements within the container. If the user presses `TAB` on the last focusable element, the focus moves to the first element. Similarly, pressing `SHIFT+TAB` on the first element will focus the last element.

- **Last Focused Element Restoration:** When the container is destroyed, the directive restores the focus to the last element that was focused before entering the container.

## Inputs

The directive does not have any specific inputs but relies on the structure of the DOM for its behavior. You need to ensure the following:
- The container element should contain focusable elements (e.g., `input`, `textarea`, `button`).
- An element with the class `focusable-interactive-content` should be used to define the interactive content inside the container.

## Error Handling

- If the `.focusable-interactive-content` class is not found within the container, an error is thrown with the message: `Interactive content not found`.
- The error includes additional details that the `.focusable-interactive-content` class must be applied to an element inside the component.

## Example of Focus Trap

```html
<div percyTrapFocus>
  <div class="focusable-interactive-content">
    <input type="text" placeholder="Username" />
    <input type="text" placeholder="Password" />
    <button>Login</button>
  </div>
</div>
```

In the above example, the focus is trapped within the `.focusable-interactive-content` container, and the user can tab between the input fields and the login button.

---

The directive listens for `TAB` and `SHIFT+TAB` to cycle focus within the container.
