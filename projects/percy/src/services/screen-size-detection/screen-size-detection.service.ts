import { Injectable, signal } from '@angular/core';

@Injectable()
export class ScreenSizeDetectionService {
  private readonly size = signal<DOMRect>(document.body.getBoundingClientRect());

  constructor() {
    new ResizeObserver(() => {
      this.size.set(document.body.getBoundingClientRect());
    }).observe(document.body);
  }

  /**
   * Validate if the size of the screen is greater or equal to the given breakpoint
   * @param breakpoint number - the min breakpoint to validate
   * @returns boolean
   */
  public isGreaterOrEqualTo(breakpoint: number): boolean {
    return this.size().width >= breakpoint;
  }
}
