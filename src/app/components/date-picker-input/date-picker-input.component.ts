import { animate, style, transition, trigger } from '@angular/animations';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input, model, ViewChild } from '@angular/core';
import { DateTime as Luxon } from 'luxon';
import { DatePicker } from '../date-picker/models';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { ValueAccessor } from './value-accesor';

@Component({
  selector: 'app-date-picker-input',
  standalone: true,
  imports: [ DatePickerComponent ],
  templateUrl: './date-picker-input.component.html',
  styleUrl: './date-picker-input.component.scss',
  host: { 'class': 'date-picker-input' },
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
    ]),
  ],
})
export class DatePickerInputComponent extends ValueAccessor {

  @ViewChild(DatePickerComponent) public datePickerComponent!: DatePickerComponent;

  private readonly defaultFormat = 'yyyy-MM-dd';
  private readonly defaultLocale = 'en-US';
  protected readonly today = new Date(Luxon.now().toISO());

  public format = input<string>(this.defaultFormat);
  public locale = input<string>(this.defaultLocale);
  public override disabled = model<boolean>(false);
  public closeFromOutside = input<boolean>(true);
  public date = model<Date>(this.today, { alias: 'value' });

  protected isCalendarOpen!: boolean;
  protected datePicker!: DatePicker;

  constructor() {
    super();

    this.isCalendarOpen = false;
    this.datePicker = {
      formatedDate: '',
      date: new Date()
    };
  }

  protected toggleCalendar(): void {
    if (this.disabled()) return;

    this.isCalendarOpen = !this.isCalendarOpen;

    if (this.isCalendarOpen && this.datePickerComponent) {
      this.datePickerComponent.updateCalendar();
    }
  }

  // public selectDate(date: DatePicker): void {
    public selectDate(date: any): void {
    this.date.set(date.date);
    this.datePicker = date;
    this.toggleCalendar();
  }

  public closeFromBackground(): void {
    if (!this.closeFromOutside()) return;

    this.toggleCalendar();
  }
}
