import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  forwardRef,
  HostListener,
  input,
  model,
  OnInit,
  output,
  viewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTime as Luxon } from 'luxon';
import { KeyboardKeys } from '../../../constants';
import { TrapFocusDirective } from '../../../directives';
import { randomId } from '../../../utils';
import { PercyInputComponent } from '../../input/input.component';
import { PercyDatePickerComponent } from '../date-picker/date-picker.component';
import { PercyDatePicker } from '../models';
import { PickerShape } from '../types';

/**
 * DatePickerInputComponent
 * @see https://moment.github.io/luxon/#/formatting?id=table-of-tokens for date format
 * @description It is a wrapper for the DatePickerComponent.
 */
@Component({
  selector: 'percy-date-picker-input',
  standalone: true,
  imports: [ PercyDatePickerComponent, PercyInputComponent, TrapFocusDirective ],
  templateUrl: './date-picker-input.component.html',
  styleUrl: './date-picker-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PercyDatePickerInputComponent),
    multi: true,
  }],
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
export class PercyDatePickerInputComponent implements OnInit, ControlValueAccessor {

  public datePickerComponent = viewChild.required(PercyDatePickerComponent);

  private readonly defaultFormat = 'yyyy-MM-dd';
  private readonly defaultLocale = 'en-US';
  protected readonly today = new Date(Luxon.now().toISO());

  public readonly label = input.required<string>();
  public readonly id = input<string>(randomId('percy-id'), { alias: 'picker-id' });
  public readonly name = input<string>(this.id());
  public readonly placeholder = input<string>('');
  public readonly shape = input<PickerShape>('round');

  public format = input<string>(this.defaultFormat);
  public locale = input<string>(this.defaultLocale);
  public disabled = model<boolean>(false);
  public closeFromOutside = input<boolean>(true);
  public value = model<Date>(this.today);

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

  public readonly onSelectedDate = output<PercyDatePicker>();

  protected isCalendarOpen!: boolean;
  protected datePicker!: PercyDatePicker;

  public onChange = (_value: Date) => {};
  public onTouched = () => {};

  constructor() {
    this.isCalendarOpen = false;
    this.datePicker = {
      formatedDate: '',
      date: new Date()
    };
  }

  public ngOnInit(): void {
    this.setInitialDate(this.value());
  }

  public writeValue(value: Date): void {
    this.value.set(value);
    this.onChange(value);
    this.setInitialDate(this.value());
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if ([KeyboardKeys.ESCAPE, KeyboardKeys.ESC].includes(event.key as KeyboardKeys)) return;

    this.closeFromBackground();
  }

  protected selectDate(date: PercyDatePicker): void {
    this.value.set(date.date);
    this.datePicker = date;
    this.toggleCalendar();
  }

  protected closeFromBackground(): void {
    if (!this.closeFromOutside()) return;

    this.toggleCalendar();
  }

  protected toggleCalendar(): void {
    if (this.disabled()) return;

    this.isCalendarOpen = !this.isCalendarOpen;

    if (this.isCalendarOpen && this.datePickerComponent) {
      this.datePickerComponent().updateCalendar();
    }
  }

  private setInitialDate(value: Date): void {
    this.datePicker = {
      date: value,
      formatedDate: this.getFormatedDate(value),
    };
  }

  private getFormatedDate(date: Date): string {
    return Luxon.fromJSDate(date).setLocale(this.locale()).toFormat(this.format());
  }
}
