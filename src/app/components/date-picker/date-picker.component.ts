import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, model, OnInit, output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTime as Luxon, Info as LuxonInfo } from 'luxon';

interface CalendarDay {
  date: Date;
  isFromAnotherMonth: boolean;
}

/**
 * DatePickerConfig
 * @see https://moment.github.io/luxon/#/formatting?id=table-of-tokens for date format
 * @param format - Date format
 * @param date - Initial date
 * @param locale - Locale
 * @param minDate - Minimum date
 * @param maxDate - Maximum date
 * @param disabledDates - Disabled dates
 */
interface DatePickerConfig {
  format: string;
  date?: Date;
  locale?: string;
  disabled?: boolean;
  // out of scope
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
}

interface DatePicker {
  visualDate: string;
  date: Date;
}

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  host: { 'class': 'date-picker' },
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
export class DatePickerComponent implements OnInit {

  private readonly defaultFormat = 'yyyy-MM-dd';
  private readonly defaultLocale = 'en-US';
  protected readonly today = new Date(Luxon.now().toISO());

  public config = model<DatePickerConfig>({ format: this.defaultFormat });
  public onSelectedDate = output<DatePicker>();

  protected weekdays!: string[];
  protected months!: string[];
  protected datePicker!: DatePicker;
  protected currentDate!: Date;
  protected currentMonth!: number;
  protected currentYear!: number;
  protected calendarDays!: CalendarDay[];
  protected isCalendarOpen!: boolean;
  protected areMonthsOpen!: boolean;

  constructor() {
    this.isCalendarOpen = false;
    this.areMonthsOpen = false;
    this.datePicker = {
      visualDate: '',
      date: new Date()
    };
  }

  public ngOnInit(): void {
    this.initConfigValues();
    this.initCurrentValues();
    this.setInitialDate();
    this.setWeekdaysAndMonths();
    this.updateCalendar();
  }

  protected toggleCalendar() {
    if (this.config()?.disabled) return;

    this.isCalendarOpen = !this.isCalendarOpen;
    this.areMonthsOpen = false;
    if (this.isCalendarOpen) {
      this.updateCalendar();
    }
  }

  protected toggleMonths() {
    this.areMonthsOpen = !this.areMonthsOpen;
    if (this.areMonthsOpen) {
      this.updateCalendar();
    }
  }

  protected closeFromBackground(): void {
    this.isCalendarOpen = false;
  }

  protected selectDate(date: Date) {
    this.datePicker = {
      date,
      visualDate: this.getVisualDate(date),
    };

    this.onSelectedDate.emit(this.datePicker);

    this.isCalendarOpen = false;
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

  private updateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    // Add days from previous month
    const prevMonthDays = firstDay.getDay();
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

  private initConfigValues(): void {
    this.config.update((config) => ({ ...config, locale: (config.locale || this.defaultLocale) }));
  }

  private initCurrentValues(): void {
    this.currentDate = (this.config()?.date || this.today);
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
  }

  private setInitialDate(): void {
    const config = this.config();

    if (config?.date) {
      this.datePicker = {
        date: config.date,
        visualDate: this.getVisualDate(config.date),
      };
    }
  }

  private getVisualDate(date: Date): string {
    const config = this.config();

    return Luxon.fromJSDate(date).setLocale(config?.locale!).toFormat(config.format);
  }

  private setWeekdaysAndMonths(): void {
    this.weekdays = LuxonInfo.weekdays('long', { locale: this.config()?.locale });
    this.months = LuxonInfo.months('long', { locale: this.config()?.locale });
  }
}
