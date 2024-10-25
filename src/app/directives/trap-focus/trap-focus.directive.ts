import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { KeyboardKeys } from '../../constants';
import { sleep } from '../../utils';

const EDITABLE_ELEMENTS = 'input:not([disabled]), textarea:not([disabled])';
const NON_EDITABLE_ELEMENTS = 'button:not([disabled]), select:not([disabled]), [href]:not([disabled])';
const NON_FOCUSABLE_ELEMENTS = '[tabindex="-1"]';
const FOCUSABLE_ELEMENTS_SELECTOR = `${EDITABLE_ELEMENTS}, ${NON_EDITABLE_ELEMENTS}, ${NON_FOCUSABLE_ELEMENTS}`;
const VIEW_CHECKED_TIME = 100;

@Directive({
  selector: '[percyTrapFocus]',
  standalone: true
})
export class TrapFocusDirective implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  private lastFocusedElement!: HTMLElement | null;
  private focusableElements!: HTMLElement[];
  private focusableInteractiveContentElements!: HTMLElement[];
  private lastQuantityFocusableElements = 0;

  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  constructor() {
    this.focusableElements = [];
    this.focusableInteractiveContentElements = [];
  }

  public ngOnInit(): void {
    this.setLastFocusableElement();
  }

  public ngAfterViewInit(): void {
    this.setFocusableElements();
  }

  public ngAfterViewChecked(): void {
    if (this.lastQuantityFocusableElements !== this.focusableInteractiveContentElements.length) {
      this.setFocusableElements();
    }

    this.lastQuantityFocusableElements = this.focusableInteractiveContentElements.length;
  }

  public ngOnDestroy(): void {
    this.setFocusToLastFocusableElement();
  }

  private async setFocusableElements(): Promise<void> {
    const focusableElements = this._elementRef.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
    this.focusableElements = Array.from(focusableElements);

    await sleep(VIEW_CHECKED_TIME);

    const interactiveContent = this._elementRef.nativeElement.querySelector('.focusable-interactive-content');
    const focusabeInteractiveContent = interactiveContent.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
    this.focusableInteractiveContentElements = Array.from(focusabeInteractiveContent);

    this.trapFocus();
  }

  private async trapFocus() {
    const focusableElements = this.focusableElements.concat(this.focusableInteractiveContentElements);

    if (focusableElements.length === 0) return;

    const firstInteractiveElement = this.focusableInteractiveContentElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    const firstFocusableElement = this.focusableElements[0] || firstInteractiveElement;

    firstInteractiveElement ? firstInteractiveElement.focus() : firstFocusableElement.focus();

    this._elementRef.nativeElement.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === KeyboardKeys.TAB) {
        if (e.shiftKey && document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    });
  }

  private setLastFocusableElement(): void {
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

  private setFocusToLastFocusableElement(): void {
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  }
}
