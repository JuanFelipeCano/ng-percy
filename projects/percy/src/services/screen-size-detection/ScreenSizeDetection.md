# ScreenSizeDetectionService

A service that detects the current screen size and provides a method to check if the screen size meets a specified breakpoint.

## Usage

### Import

First, import the `ScreenSizeDetectionService` into your module:

```typescript
import { ScreenSizeDetectionService } from 'percy';

@NgModule({
  providers: [ScreenSizeDetectionService],
})
export class YourModule {}
```

### Example Usage

Inject the `ScreenSizeDetectionService` into your components to monitor the screen size and validate if it meets a given breakpoint.

```typescript
import { Component, OnInit } from '@angular/core';
import { ScreenSizeDetectionService } from 'percy';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
})
export class YourComponent implements OnInit {
  constructor(private screenSizeService: ScreenSizeDetectionService) {}

  ngOnInit() {
    const isLargeScreen = this.screenSizeService.isGreaterOrEqualTo(1024);
    console.log('Is the screen large enough?', isLargeScreen);
  }
}
```

In the example above, the component checks if the screen width is greater than or equal to 1024 pixels by calling `isGreaterOrEqualTo()`.

## Behavior

- The service uses `ResizeObserver` to monitor changes in the screen size, ensuring that it updates the current screen size whenever the window is resized.
- The screen size is stored in a reactive signal and automatically updated when the body element's bounding rectangle changes.
  
## Example

Here’s an example of how you can use the `ScreenSizeDetectionService` to conditionally render content based on screen size:

```typescript
import { Component, effect } from '@angular/core';
import { ScreenSizeDetectionService } from 'your-service-path';

@Component({
  selector: 'app-responsive-component',
  templateUrl: './responsive-component.component.html',
})
export class ResponsiveComponent {
  public isLargeScreen!: boolean;

  constructor(private screenSizeService: ScreenSizeDetectionService) {
    effect(() => {
      this.isLargeScreen = this.screenSizeService.isGreaterOrEqualTo(1024);
    });
  }
}
```

### Template Example:

```html
<div *ngIf="isLargeScreen">This content is shown on large screens!</div>
```

In this example, the component checks if the screen width is greater than or equal to 1024 pixels. Based on the result, it conditionally renders content in the template.

## Summary

- `ScreenSizeDetectionService` provides a reactive approach to monitor the screen size.
- It includes the `isGreaterOrEqualTo()` method to compare the current screen width to a provided breakpoint.
- The service listens for changes in the screen size using `ResizeObserver`, updating the screen size state whenever the window is resized.
- This service is useful for implementing responsive designs or adapting UI elements based on screen size.
