import {
  AfterViewChecked,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { KeyboardKeys, ONE, ZERO } from '../../constants';
import { sleep } from '../../utils';

const EDITABLE_ELEMENTS = 'input:not([disabled]), textarea:not([disabled])';
const NON_EDITABLE_ELEMENTS = 'button:not([disabled]), select:not([disabled]), [href]:not([disabled])';
const NON_FOCUSABLE_ELEMENTS = '[tabindex="0"]';
const FOCUSABLE_ELEMENTS_SELECTOR = `${ EDITABLE_ELEMENTS }, ${ NON_EDITABLE_ELEMENTS }, ${ NON_FOCUSABLE_ELEMENTS }`;
const VIEW_CHECKED_TIME = 100;

// TODO: add documentation about focusable-interactive-content class
@Directive({
  selector: '[percyTrapFocus]',
  standalone: true
})
export class TrapFocusDirective implements OnInit, AfterViewChecked, OnDestroy {

  private lastFocusedElement!: HTMLElement | null;
  private focusableElements!: HTMLElement[];
  private focusableInteractiveContentElements!: HTMLElement[];

  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _detectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.focusableElements = [];
    this.focusableInteractiveContentElements = [];
  }

  public ngOnInit(): void {
    this.setLastFocusedElement();
    this.focusFirstInteractiveElement();
  }

  public ngAfterViewChecked(): void {
    this.setFocusableElements();
  }

  public ngOnDestroy(): void {
    this.setFocusToLastFocusedElement();
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key !== KeyboardKeys.TAB) return;

    const [ _fe, _ie, firstFocusableElement, lastFocusableElement ] = this.getFocusableElements();

    if (event.shiftKey && document.activeElement === firstFocusableElement) {
      event.stopPropagation();
      event.preventDefault();
      lastFocusableElement.focus();
    }

    if (!event.shiftKey && document.activeElement === lastFocusableElement) {
      event.stopPropagation();
      event.preventDefault();
      firstFocusableElement.focus();
    }
  }

  private setFocusableElements(): void {
    const focusableElements = this._elementRef.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
    this.focusableElements = Array.from(focusableElements);

    const interactiveContent = this._elementRef.nativeElement.querySelector('.focusable-interactive-content');

    if (!interactiveContent) throw new Error(
      'Interactive content not found',
      { cause: 'focusable-interactive-content class must be added to an element inside the component.' }
    );

    const focusabeInteractiveContent = interactiveContent.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
    this.focusableInteractiveContentElements = Array.from(focusabeInteractiveContent);
  }

  private async focusFirstInteractiveElement(): Promise<void> {
    await sleep(VIEW_CHECKED_TIME);

    this._detectorRef.detectChanges();

    const [ focusableElements, firstInteractiveElement, firstFocusableElement ] = this.getFocusableElements();

    if (focusableElements.length === ZERO) return;

    firstInteractiveElement ? firstInteractiveElement.focus() : firstFocusableElement.focus();
  }

  private getFocusableElements(): Array<any> {
    const focusableElements = this.focusableElements.concat(this.focusableInteractiveContentElements);

    const firstInteractiveElement = this.focusableInteractiveContentElements[ZERO];
    const lastFocusableElement = focusableElements[focusableElements.length - ONE];
    const firstFocusableElement = this.focusableElements[ZERO] || firstInteractiveElement;

    return [ focusableElements, firstInteractiveElement, firstFocusableElement, lastFocusableElement ];
  }

  private setLastFocusedElement(): void {
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

  private setFocusToLastFocusedElement(): void {
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  }
}
