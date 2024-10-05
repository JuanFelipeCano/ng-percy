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
export interface DatePickerConfig {
  format: string;
  date?: Date;
  locale?: string;
  disabled?: boolean;
  // out of scope
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
}
