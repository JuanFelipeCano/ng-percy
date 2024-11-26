import {
  AfterViewInit,
  booleanAttribute,
  Component,
  ElementRef,
  HostListener,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { KeyboardKeys } from '../../constants';
import { randomId } from '../../utils';

type CheckboxShape = 'round' | 'square' | 'circle';

@Component({
  selector: 'percy-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  host: {
    'class': 'percy-checkbox',
    '[class.percy-checkbox_round]': 'shape() === "round"',
    '[class.percy-checkbox_square]': 'shape() === "square"',
    '[class.percy-checkbox_circle]': 'shape() === "circle"',
  },
})
export class PercyCheckboxComponent implements AfterViewInit, ControlValueAccessor {

  public readonly checkbox = viewChild.required('checkbox', { read: ElementRef<HTMLElement> });

  public readonly label = input.required<string>();
  public readonly id = input<string>(randomId('percy-id'), { alias: 'checkbox-id' });
  public readonly name = input<string>(this.id());
  public readonly showLabel = input(true, { alias: 'show-label', transform: booleanAttribute });
  public readonly readonly = input(false, { transform: booleanAttribute });
  public readonly disabled = input(false, { transform: booleanAttribute });
  public readonly indeterminate = input(false, { transform: booleanAttribute });
  public readonly required = input(null, { transform: booleanAttribute });
  public readonly invalid = input(null, { transform: booleanAttribute });
  public readonly shape = input<CheckboxShape>('round');

  public readonly checked = model<boolean | string>(false);

  public readonly percyClick = output<MouseEvent>();
  public readonly percyFocus = output<FocusEvent>();
  public readonly percyBlur = output<FocusEvent>();
  public readonly percyChange = output<boolean>();

  public ngAfterViewInit(): void {
    this.checkbox().nativeElement.indeterminate = this.indeterminate();
  }

  public onChange = (_value: any) => {};
  public onTouched = () => {};

  public writeValue(value: any): void {
    this.checked.set(value);

    this.onChange(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public checkboxChange($event: Event): void {
    this.percyChange.emit(($event.target as HTMLInputElement).checked);
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === KeyboardKeys.SPACE) {
      if (this.disabled() || this.readonly()) return;

      this.setChecked();
      event.stopPropagation();
      event.preventDefault();
    }
  }

  private setChecked(): void {
    console.log(this.disabled());
    if (this.disabled() || this.readonly()) return;

    this.checked.set(!this.checked());
    this.percyChange.emit(this.checked() as boolean);
  }
}
