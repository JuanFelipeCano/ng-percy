import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  OnInit,
  output,
  viewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTime as Luxon, Info as LuxonInfo } from 'luxon';
import { ELEVEN, INACTIVE_TAB_INDEX, ONE, SEVEN, SIX, TAB_INDEX, ZERO } from '../../../constants';
import { PickerShape } from '../types';
import { A11yCalendarDirective } from './a11y-calendar.directive';
import { A11yMonthsDirective } from './a11y-months.directive';
import { CalendarDay, DatePicker } from './models';

@Component({
  selector: 'percy-date-picker',
  standalone: true,
  imports: [ CommonModule, A11yCalendarDirective, A11yMonthsDirective ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  host: { 'class': 'date-picker' },
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true,
  }],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-5%)', opacity: ZERO }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-5%)', opacity: 0 }))
      ])
    ])
  ],
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {

  public displayMonthsBtn = viewChild('DisplayMonthsBtn', { read: ElementRef });
  public hideMonthsBtn = viewChild('HideMonthsBtn', { read: ElementRef });

  public readonly attributeDateFormat = 'yyyy-MM-dd';
  protected readonly today = new Date(Luxon.now().toISO());
  private readonly defaultFormat = 'yyyy-MM-dd';
  private readonly defaultLocale = 'en-US';

  public format = input<string>(this.defaultFormat);
  public locale = input<string>(this.defaultLocale);
  public value = model<Date>(this.today);
  public readonly shape = input<PickerShape>('circle');

  /**
   * A11y properties
   */
  public readonly a11yPrevMonthAriaLabel
    = input<string | null>(null, { alias: 'prev-month-aria-label' });
  public readonly a11yNextMonthAriaLabel
    = input<string | null>(null, { alias: 'next-month-aria-label' });
  public readonly a11yDisplayMonthsAriaLabel
    = input<string | null>(null, { alias: 'display-months-aria-label' });
  public readonly a11yPreYearAriaLabel
  = input<string | null>(null, { alias: 'prev-year-aria-label' });
  public readonly a11yNexYearAriaLabel
    = input<string | null>(null, { alias: 'next-year-aria-label' });
  public readonly a11yHideMonthsAriaLabel
    = input<string | null>(null, { alias: 'hide-months-aria-label' });

  public readonly onSelectedDate = output<DatePicker>();

  private readonly _detectorRef = inject(ChangeDetectorRef);

  public onChange = (_value: Date) => {};
  public onTouched = () => {};

  public currentMonth!: number;
  public currentYear!: number;
  public datePicker!: DatePicker;
  protected weekdays!: string[];
  protected months!: string[];
  protected currentDate!: Date;
  protected calendarDays!: CalendarDay[];
  protected areMonthsOpen!: boolean;

  constructor() {
    this.calendarDays = [];
    this.areMonthsOpen = false;
    this.datePicker = {
      formatedDate: '',
      date: new Date()
    };
  }

  public get calendarWeeks(): CalendarDay[][] {
    const weeks: CalendarDay[][] = [];

    for (let i = ZERO; i < this.calendarDays.length; i += SEVEN) {
      weeks.push(this.calendarDays.slice(i, i + SEVEN));
    }

    return weeks;
  }

  public ngOnInit(): void {
    this.initCurrentValues();
    this.setInitialDate();
    this.setWeekdaysAndMonths();
    this.updateCalendar();
  }

  public writeValue(value: Date): void {
    this.value.set(value);
    this.setDatePicker(value);
    this.onChange(value);
    this.initCurrentValues();
    this.updateCalendar();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public updateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, ONE);
    const lastDay = new Date(this.currentYear, this.currentMonth + ONE, ZERO);

    // Add days from previous month
    const prevMonthDays = (firstDay.getDay() + SIX) % SEVEN;
    const prevMonth = new Date(this.currentYear, this.currentMonth, ZERO);
    for (let i = prevMonthDays - ONE; i >= ZERO; i--) {
      this.calendarDays.unshift({
        date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate() - i),
        isFromAnotherMonth: true,
      });
    }

    // Add days of current month
    for (let i = ONE; i <= lastDay.getDate(); i++) {
      this.calendarDays.push({
        date: new Date(this.currentYear, this.currentMonth, i),
        isFromAnotherMonth: false,
      });
    }

    // Add days from next month
    const remainingDays = SEVEN - (this.calendarDays.length % SEVEN);
    if (remainingDays < SEVEN) {
      const nextMonth = new Date(this.currentYear, this.currentMonth + ONE, ONE);
      for (let i = ZERO; i < remainingDays; i++) {
        this.calendarDays.push({
          date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + ONE),
          isFromAnotherMonth: true
        });
      }
    }

    this.updateTabIndexes();
  }

  public isDaySelected(day: CalendarDay): boolean {
    return !day.isFromAnotherMonth
      && (this.datePicker.date
      && day.date.toLocaleDateString() === this.datePicker.date.toLocaleDateString());
  }

  public isMonthSelected(month: number): boolean {
    return month === this.currentMonth
      && this.currentYear === this.currentDate.getFullYear();
  }

  public selectDate(date: Date): void {
    this.value.set(date);
    this.setDatePicker(date);

    this.onChange(date);
    this.onTouched();

    this.onSelectedDate.emit(this.datePicker);
  }

  public selectMonth(month: number): void {
    this.currentMonth = month;
    this.updateCalendar();
    this.toggleMonths()
  }

  public previousMonth(): void {
    if (this.currentMonth === ZERO) {
      this.currentMonth = ELEVEN;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }

    this.updateCalendar();
  }

  public nextMonth(): void {
    if (this.currentMonth === ELEVEN) {
      this.currentMonth = ZERO;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.updateCalendar();
  }

  protected toggleMonths(): void {
    this.areMonthsOpen = !this.areMonthsOpen;

    if (this.areMonthsOpen) {
      this.updateCalendar();
    }

    this.setToggleMonthsBtnFocus();
  }

  protected previousYear(): void {
    this.currentYear--;
    this.updateCalendar();
  }

  protected nextYear(): void {
    this.currentYear++;
    this.updateCalendar();
  }

  private initCurrentValues(): void {
    this.currentDate = this.value();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
  }

  private setInitialDate(): void {
    this.setDatePicker(this.value());
  }

  private getFormatedDate(date: Date): string {
    return Luxon.fromJSDate(date).setLocale(this.locale()).toFormat(this.format());
  }

  private setWeekdaysAndMonths(): void {
    this.weekdays = LuxonInfo.weekdays('long', { locale: this.locale() });
    this.months = LuxonInfo.months('long', { locale: this.locale() });
  }

  private setDatePicker(value: Date): void {
    this.datePicker = {
      date: value,
      formatedDate: this.getFormatedDate(value),
    };
  }

  private updateTabIndexes(): void {
    const focusableElements = document.querySelector('.date-picker_body')?.querySelectorAll('td[tabindex="0"]');

    focusableElements?.forEach((element: Element) => {
      element.setAttribute(TAB_INDEX, INACTIVE_TAB_INDEX);
    });

    this._detectorRef.detectChanges();
  }

  private setToggleMonthsBtnFocus(): void {
    this._detectorRef.detectChanges();
    const focusableElement = this.areMonthsOpen ? this.hideMonthsBtn() : this.displayMonthsBtn();
    focusableElement!.nativeElement.focus();
  }
}
