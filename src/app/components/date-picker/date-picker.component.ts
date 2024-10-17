import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef, input, model, OnInit, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTime as Luxon, Info as LuxonInfo } from 'luxon';
import { CalendarDay, DatePicker } from './models';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [ CommonModule ],
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
        style({ transform: 'translateY(-5%)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-5%)', opacity: 0 }))
      ])
    ])
  ],
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {

  private readonly defaultFormat = 'yyyy-MM-dd';
  private readonly defaultLocale = 'en-US';
  protected readonly today = new Date(Luxon.now().toISO());

  public format = input<string>(this.defaultFormat);
  public locale = input<string>(this.defaultLocale);
  public date = model<Date>(this.today, { alias: 'value' });

  public readonly onSelectedDate = output<DatePicker>();

  public onChange = (_value: Date) => {};
  public onTouched = () => {};

  protected weekdays!: string[];
  protected months!: string[];
  protected datePicker!: DatePicker;
  protected currentDate!: Date;
  protected currentMonth!: number;
  protected currentYear!: number;
  protected calendarDays!: CalendarDay[];
  protected areMonthsOpen!: boolean;

  constructor() {
    this.areMonthsOpen = false;
    this.datePicker = {
      formatedDate: '',
      date: new Date()
    };
  }

  public ngOnInit(): void {
    this.initCurrentValues();
    this.setInitialDate();
    this.setWeekdaysAndMonths();
    this.updateCalendar();
  }

  public writeValue(value: Date): void {
    this.date.set(value);

    this.datePicker = {
      date: value,
      formatedDate: this.getFormatedDate(value),
    };
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
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    // Add days from previous month
    const prevMonthDays = (firstDay.getDay() + 6) % 7;
    const prevMonth = new Date(this.currentYear, this.currentMonth, 0);
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      this.calendarDays.unshift({
        date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate() - i),
        isFromAnotherMonth: true,
      });
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.calendarDays.push({
        date: new Date(this.currentYear, this.currentMonth, i),
        isFromAnotherMonth: false,
      });
    }

    // Add days from next month
    const remainingDays = 7 - (this.calendarDays.length % 7);
    if (remainingDays < 7) {
      const nextMonth = new Date(this.currentYear, this.currentMonth + 1, 1);
      for (let i = 0; i < remainingDays; i++) {
        this.calendarDays.push({
          date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1),
          isFromAnotherMonth: true
        });
      }
    }
  }

  protected toggleMonths() {
    this.areMonthsOpen = !this.areMonthsOpen;
    if (this.areMonthsOpen) {
      this.updateCalendar();
    }
  }

  protected selectDate(date: Date) {
    this.date.set(date);
    this.datePicker = {
      date,
      formatedDate: this.getFormatedDate(date),
    };

    this.onChange(date);
    this.onTouched();

    this.onSelectedDate.emit(this.datePicker);
  }

  protected selectMonth(month: number) {
    this.currentMonth = month;
    this.updateCalendar();
    this.toggleMonths()
  }

  protected previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }

    this.updateCalendar();
  }

  protected nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.updateCalendar();
  }

  protected previousYear() {
    this.currentYear--;
    this.updateCalendar();
  }

  protected nextYear() {
    this.currentYear++;
    this.updateCalendar();
  }

  protected isDaySelected(day: CalendarDay): boolean {
    return !day.isFromAnotherMonth
      && (this.datePicker.date
      && day.date.toLocaleDateString() === this.datePicker.date.toLocaleDateString());
  }

  protected isMonthSelected(month: number): boolean {
    return month === this.currentMonth
      && this.currentYear === this.currentDate.getFullYear();
  }

  private initCurrentValues(): void {
    this.currentDate = (this.date());
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
  }

  private setInitialDate(): void {
    this.datePicker = {
      date: this.date(),
      formatedDate: this.getFormatedDate(this.date()),
    };
  }

  private getFormatedDate(date: Date): string {
    return Luxon.fromJSDate(date).setLocale(this.locale()).toFormat(this.format());
  }

  private setWeekdaysAndMonths(): void {
    this.weekdays = LuxonInfo.weekdays('long', { locale: this.locale() });
    this.months = LuxonInfo.months('long', { locale: this.locale() });
  }
}
