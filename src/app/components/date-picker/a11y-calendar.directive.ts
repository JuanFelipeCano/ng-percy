import { AfterViewChecked, Directive, ElementRef, Host, HostListener, inject, input } from '@angular/core';
import { DateTime as Luxon } from 'luxon';
import { ACTIVE_TAB_INDEX, INACTIVE_TAB_INDEX, KeyboardKeys, ONE, SEVEN, SIX, ZERO } from '../../constants';
import { DatePickerComponent } from './date-picker.component';
import { CalendarDay } from './models';

const ONE_DAY = ONE;
const ONE_WEEK = SEVEN;

@Directive({
  selector: '[percyA11yCalendar]',
  standalone: true
})
export class A11yCalendarDirective implements AfterViewChecked {

  public readonly calendarDay = input.required<CalendarDay>();

  @Host()
  private readonly _datePicker = inject(DatePickerComponent);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

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

    const callback = KeysMapper[event.code as keyof typeof KeysMapper];

    if (!callback) return;

    callback();
    event.stopPropagation();
    event.preventDefault();
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

    element?.setAttribute('tabindex', ACTIVE_TAB_INDEX);
  }

  private unFocusDay(): void {
    const element = this.getElementFromDataDateAttribute(this.calendarDay().date);

    element?.setAttribute('tabindex', INACTIVE_TAB_INDEX);
  }

  private getElementFromDataDateAttribute(date: Date): HTMLElement | null {
    const formattedDate = Luxon.fromJSDate(date).toFormat(this._datePicker.attributeDateFormat);

    return document.querySelector(
      `td[data-date="${ formattedDate }"]`
    );
  }

  private setTabIndex(): void {
    this._elementRef.nativeElement.setAttribute(
      'tabindex',
      this.calendarDay().date.getDate() === this._datePicker.datePicker.date.getDate() ? ACTIVE_TAB_INDEX : INACTIVE_TAB_INDEX
    );
  }
}
