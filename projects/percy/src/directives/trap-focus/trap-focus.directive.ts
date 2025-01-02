import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
} from '@angular/core';
import { KeyboardKeys, ONE, ZERO } from '../../constants';
import { PercyFocusService } from '../../services';
import { sleep } from '../../utils';

const EDITABLE_ELEMENTS = 'input:not([disabled]), textarea:not([disabled])';
const NON_EDITABLE_ELEMENTS = 'button:not([disabled]), select:not([disabled]), [href]:not([disabled])';
const FOCUSABLE_ELEMENTS = '[tabindex="0"]';
const FOCUSABLE_ELEMENTS_SELECTOR = `${ EDITABLE_ELEMENTS }, ${ NON_EDITABLE_ELEMENTS }, ${ FOCUSABLE_ELEMENTS }`;
const VIEW_CHECKED_TIME = 100;

// TODO: add documentation about focusable-interactive-content class
@Directive({
  selector: '[percyTrapFocus]',
  standalone: true,
  providers: [ PercyFocusService ],
})
export class PercyTrapFocusDirective implements AfterViewInit, AfterViewChecked, OnDestroy {

  private focusableElements!: HTMLElement[];
  private focusableInteractiveContentElements!: HTMLElement[];

  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _detectorRef = inject(ChangeDetectorRef);
  private readonly _focusService = inject(PercyFocusService);

  constructor() {
    this.focusableElements = [];
    this.focusableInteractiveContentElements = [];
  }

  public ngAfterViewInit(): void {
    this._focusService.setLastFocusedElement();
    this.focusFirstInteractiveElement();
  }

  public ngAfterViewChecked(): void {
    this.setFocusableElements();
  }

  public ngOnDestroy(): void {
    this._focusService.setFocusToLastFocusedElement();
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
}
