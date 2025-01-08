# PercyFocusService

A service that helps track the last focused element in the document or within shadow DOMs, and allows setting focus back to that element. This service is useful for managing focus state, particularly when handling focus traps or modals in Angular applications.

## Usage

### Import

First, import the `PercyFocusService` into your module:

```typescript
import { PercyFocusService } from 'percy';

@NgModule({
  providers: [PercyFocusService],
})
export class YourModule {}
```

### Example Usage

Inject the `PercyFocusService` into your components or directives to track and restore focus.

```typescript
import { Component, OnInit } from '@angular/core';
import { PercyFocusService } from 'percy';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
})
export class YourComponent implements OnInit {
  constructor(private focusService: PercyFocusService) {}

  ngOnInit() {
    // Set the last focused element
    this.focusService.setLastFocusedElement();
  }

  ngOnDestroy() {
    // Restore focus to the last focused element
    this.focusService.setFocusToLastFocusedElement();
  }
}
```

In the example above, `setLastFocusedElement()` is called to store the currently focused element when the component initializes, and `setFocusToLastFocusedElement()` is called when the component is destroyed to restore focus.

## Error Handling

- This service does not throw errors, but if `setFocusToLastFocusedElement()` is called before any element was focused (i.e., `lastFocusedElement` is `null`), no action will be performed.

## Example

Here’s an example of how you can use the `PercyFocusService` in a modal component:

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PercyFocusService } from 'percy';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(private focusService: PercyFocusService) {}

  ngOnInit() {
    // Save the last focused element when the modal opens
    this.focusService.setLastFocusedElement();
  }

  ngOnDestroy() {
    // Restore focus to the last focused element when the modal closes
    this.focusService.setFocusToLastFocusedElement();
  }
}
```

In this example, when the modal component is initialized, it saves the currently focused element using `setLastFocusedElement()`. When the modal is destroyed (closed), it restores focus to the last element that was focused using `setFocusToLastFocusedElement()`.

## Summary

- `PercyFocusService` helps to track and restore focus in Angular applications.
- It handles focus across shadow DOMs, ensuring correct behavior when dealing with complex component hierarchies.
- It is useful for managing focus in modals, focus traps, and similar scenarios where focus needs to be controlled.
