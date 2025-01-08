import { AfterViewChecked, Directive, ElementRef, Host, HostListener, inject, input } from '@angular/core';
import { DateTime as Luxon } from 'luxon';
import { ACTIVE_TAB_INDEX, INACTIVE_TAB_INDEX, KeyboardKeys, ONE, SEVEN, SIX, TAB_INDEX, ZERO } from '../../../constants';
import { PercyKeyboardExecutorService } from '../../../services';
import { PercyCalendarDay } from '../models';
import { PercyDatePickerComponent } from './date-picker.component';

const ONE_DAY = ONE;
const ONE_WEEK = SEVEN;

@Directive({
  selector: '[percyA11yCalendar]',
  standalone: true,
  providers: [ PercyKeyboardExecutorService ],
})
export class PercyA11yCalendarDirective implements AfterViewChecked {

  public readonly calendarDay = input.required<PercyCalendarDay>();

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
      [KeyboardKeys.SPACE]: () => this._datePicker.selectDate(this.calendarDay().date),
      [KeyboardKeys.ENTER]: () => this._datePicker.selectDate(this.calendarDay().date),
      [KeyboardKeys.UP]: () => this.moveFocusByDays(-ONE_WEEK),
      [KeyboardKeys.ARROW_UP]: () => this.moveFocusByDays(-ONE_WEEK),
      [KeyboardKeys.LEFT]: () => this.moveFocusByDays(-ONE_DAY),
      [KeyboardKeys.ARROW_LEFT]: () => this.moveFocusByDays(-ONE_DAY),
      [KeyboardKeys.RIGHT]: () => this.moveFocusByDays(ONE_DAY),
      [KeyboardKeys.ARROW_RIGHT]: () => this.moveFocusByDays(ONE_DAY),
      [KeyboardKeys.DOWN]: () => this.moveFocusByDays(ONE_WEEK),
      [KeyboardKeys.ARROW_DOWN]: () => this.moveFocusByDays(ONE_WEEK),
      [KeyboardKeys.HOME]: () => this.moveFocusToFirstDayOfWeek(),
      [KeyboardKeys.END]: () => this.moveFocusToLastDayOfWeek(),
      [KeyboardKeys.PAGE_UP]: () => this._datePicker.previousMonth(),
      [KeyboardKeys.PAGE_DOWN]: () => this._datePicker.nextMonth(),
    };

    this._keyboardExecutor.execute(KeysMapper, event);
  }

  private moveFocusToFirstDayOfWeek(): void {
    const currentDay = this.calendarDay().date.getDay();
    const daysToSubtract = currentDay === ZERO ? SIX : currentDay - ONE;
    this.moveFocusByDays(-daysToSubtract);
  }

  private moveFocusToLastDayOfWeek(): void {
    const currentDay = this.calendarDay().date.getDay();
    const daysToAdd = currentDay === ZERO ? ZERO : SEVEN - currentDay;
    this.moveFocusByDays(daysToAdd);
  }

  private moveFocusByDays(days: number): void {
    const dateToFocus = new Date(this.calendarDay().date);
    dateToFocus.setDate(dateToFocus.getDate() + days);

    this.unFocusDay();
    this.validateMonthAndYear(dateToFocus);
    this.focusDay(dateToFocus);
  }

  private validateMonthAndYear(date: Date): void {
    const month = date.getMonth();
    const year = date.getFullYear();

    if (month !== this._datePicker.currentMonth || year !== this._datePicker.currentYear) {
      this._datePicker.currentMonth = month;
      this._datePicker.currentYear = year;

      this._datePicker.updateCalendar();
    }
  }

  private focusDay(date: Date): void {
    const element = this.getElementFromDataDateAttribute(date);
    element?.focus();

    element?.setAttribute(TAB_INDEX, ACTIVE_TAB_INDEX);
  }

  private unFocusDay(): void {
    const element = this.getElementFromDataDateAttribute(this.calendarDay().date);

    element?.setAttribute(TAB_INDEX, INACTIVE_TAB_INDEX);
  }

  private getElementFromDataDateAttribute(date: Date): HTMLElement | null {
    const formattedDate = Luxon.fromJSDate(date).toFormat(this._datePicker.attributeDateFormat);

    return document.querySelector(
      `td[data-date="${ formattedDate }"]`
    );
  }

  private setTabIndex(): void {
    this._elementRef.nativeElement.setAttribute(
      TAB_INDEX,
      this.calendarDay().date.getDate() === this._datePicker.datePicker.date.getDate() ? ACTIVE_TAB_INDEX : INACTIVE_TAB_INDEX
    );
  }
}
