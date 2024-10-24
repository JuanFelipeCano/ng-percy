import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, forwardRef, input, model, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { randomId } from '../../utils';
import { CommonModule } from '@angular/common';

type LabelStyle = 'start' | 'floating' | 'hidden';
type InputType = 'text' | 'email' | 'password' | 'number';
type PasswordIcon = 'eye-outline' | 'eye-off-outline';

const boolValidation = (value: boolean | string) => (
  (typeof value === 'string' && !value) ? value === '' : value
);

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
  }],
  host: {
    'class': 'percy-input',
    '[class.percy-input_label-start]': 'labelStyle() === "start"',
    '[class.percy-input_label-floating]': 'labelStyle() === "floating" && !iconLeft()',
    '[class.percy-input_label-hidden]': 'labelStyle() === "hidden"',
    '[class.percy-input_icon]': 'iconLeft() || iconRight() || type() === "password"',
    '[class.percy-input_icon-left]': 'iconLeft()',
    '[class.percy-input_icon-right]': 'iconRight() || type() === "password"',
    '[class.percy-input_invalid]': 'invalid()',
  },
})
export class InputComponent implements ControlValueAccessor {

  public readonly label = input.required<string>();
  public readonly id = input<string>(randomId('percy-id'), { alias: 'inputId' });
  public readonly name = input<string>(this.id());
  public readonly placeholder = input<string>('');
  public readonly labelStyle = input<LabelStyle>('start', { alias: 'label-style' });
  public readonly type = input<InputType>('text');
  public readonly iconLeft = input<string | null | undefined>(undefined, { alias: 'left-icon' });
  public readonly iconRight = input<string | null  | undefined>(undefined, { alias: 'right-icon' });
  public readonly readonly = input(false, { transform: boolValidation });
  public readonly disabled = input(false, { transform: boolValidation });
  public readonly required = input(false, { transform: boolValidation });
  public readonly invalid = input(false, { transform: boolValidation });

  public value = model<string | number | null | undefined>('');

  public readonly percyClick = output<MouseEvent>();
  public readonly percyFocus = output<FocusEvent>();
  public readonly percyBlur = output<FocusEvent>();
  public readonly percyChange = output<Event>();
  public readonly percyInput = output<Event | InputEvent>();

  public onChange = (_value: any) => {};
  public onTouched = () => {};

  protected passwordIcon!: PasswordIcon;
  protected passwordVisible!: boolean;
  protected _type = computed(() => this.type());

  constructor() {
    this.passwordVisible = false;
    this.passwordIcon = 'eye-off-outline';
  }

  public writeValue(value: any): void {
    this.value.set(value);

    this.onChange(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  protected changeType(): void {
    this.passwordVisible = !this.passwordVisible;
    this.passwordIcon = (this.passwordVisible) ? 'eye-outline' : 'eye-off-outline';
    this._type = computed(() => (this.passwordVisible) ? 'text' : 'password');
  }
}
