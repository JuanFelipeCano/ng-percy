import { AfterViewChecked, Directive, ElementRef, Host, HostListener, inject, input } from '@angular/core';
import {
  ACTIVE_TAB_INDEX,
  EIGHT,
  ELEVEN,
  FIVE,
  FOUR,
  INACTIVE_TAB_INDEX,
  KeyboardKeys,
  NINE,
  ONE,
  SEVEN,
  SIX,
  TAB_INDEX,
  TEN,
  THREE,
  TWO,
  ZERO,
} from '../../../constants';
import { PercyKeyboardExecutorService } from '../../../services';
import { PercyDatePickerComponent } from './date-picker.component';

@Directive({
  selector: '[percyA11yMonths]',
  standalone: true,
  providers: [ PercyKeyboardExecutorService ],
})
export class PercyA11yMonthsDirective implements AfterViewChecked {

  /**
   * Month index
   */
  public readonly month = input.required<number>();

  @Host()
  private readonly _datePicker = inject(PercyDatePickerComponent);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _keyboardExecutor = inject(PercyKeyboardExecutorService);

  public ngAfterViewChecked(): void {
    this.setTabIndex();
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    const KeysMapper = {
      [KeyboardKeys.SPACE]: () => this._datePicker.selectMonth(this.month()),
      [KeyboardKeys.ENTER]: () => this._datePicker.selectMonth(this.month()),
      [KeyboardKeys.UP]: () => this.moveFocusByMonths(-THREE),
      [KeyboardKeys.ARROW_UP]: () => this.moveFocusByMonths(-THREE),
      [KeyboardKeys.LEFT]: () => this.moveFocusByMonths(-ONE),
      [KeyboardKeys.ARROW_LEFT]: () => this.moveFocusByMonths(-ONE),
      [KeyboardKeys.RIGHT]: () => this.moveFocusByMonths(ONE),
      [KeyboardKeys.ARROW_RIGHT]: () => this.moveFocusByMonths(ONE),
      [KeyboardKeys.DOWN]: () => this.moveFocusByMonths(THREE),
      [KeyboardKeys.ARROW_DOWN]: () => this.moveFocusByMonths(THREE),
      [KeyboardKeys.HOME]: () => this.moveFocusToFirstOrLastMonth(ZERO),
      [KeyboardKeys.END]: () => this.moveFocusToFirstOrLastMonth(TWO),
    };

    this._keyboardExecutor.execute(KeysMapper, event);
  }

  private moveFocusToFirstOrLastMonth(position: number): void {
    const months = [
      [ZERO, ONE, TWO],
      [THREE, FOUR, FIVE],
      [SIX, SEVEN, EIGHT],
      [NINE, TEN, ELEVEN],
    ];

    const currentMonth = this.month();
    const monthRow = months.find(row => row.includes(currentMonth));

    if (monthRow) {
      this.unFocusMonth();
      this.focusMonth(monthRow[position]);
    }
  }

  private moveFocusByMonths(month: number): void {
    const monthToFocus = this.month() + month;

    if (monthToFocus < ZERO || monthToFocus > ELEVEN) return;

    this.unFocusMonth();
    this.focusMonth(monthToFocus);
  }

  private focusMonth(moonth: number): void {
    const element = this.getElementFromDataMonthAttribute(moonth);
    element?.focus();

    element?.setAttribute(TAB_INDEX, ACTIVE_TAB_INDEX);
  }

  private unFocusMonth(): void {
    const element = this.getElementFromDataMonthAttribute(this.month());

    element?.setAttribute(TAB_INDEX, INACTIVE_TAB_INDEX);
  }

  private getElementFromDataMonthAttribute(month: number): HTMLElement | null {
    const year = this._datePicker.currentYear;

    return document.querySelector(
      `span[data-month="${ year }-${ month }"]`
    );
  }

  private setTabIndex(): void {
    this._elementRef.nativeElement.setAttribute(
      TAB_INDEX,
      this.month() === this._datePicker.currentMonth ? ACTIVE_TAB_INDEX : INACTIVE_TAB_INDEX
    );
  }
}
