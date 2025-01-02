import { Injectable } from '@angular/core';

@Injectable()
export class PercyFocusService {

  private lastFocusedElement!: HTMLElement | null;

  public setLastFocusedElement(): void {
    let activeElement =
      typeof document !== 'undefined' && document
        ? (document.activeElement as HTMLElement | null)
        : null;

    while (activeElement?.shadowRoot) {
      const newActiveElement = activeElement.shadowRoot.activeElement as HTMLElement | null;
      if (newActiveElement === activeElement) {
        break;
      } else {
        activeElement = newActiveElement;
      }
    }

    this.lastFocusedElement = activeElement;
  }

  public setFocusToLastFocusedElement(): void {
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  }
}
