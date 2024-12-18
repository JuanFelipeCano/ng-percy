import { booleanAttribute, Component, forwardRef, HostListener, input, model, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KeyboardKeys } from '../../constants';
import { PercyShapeBase } from '../../types';
import { randomId } from '../../utils';

type ToggleShape = PercyShapeBase;

@Component({
  selector: 'percy-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PercyToggleComponent),
    multi: true,
  }],
  host: {
    'class': 'percy-toggle',
    '[class.percy-toggle_round]': 'shape() === "round"',
    '[class.percy-toggle_square]': 'shape() === "square"',
    '[class.percy-toggle_circle]': 'shape() === "circle"',
  },
})
export class PercyToggleComponent implements ControlValueAccessor {

  public readonly label = input.required<string>();
  public readonly id = input<string>(randomId('percy-id'), { alias: 'toggle-id' });
  public readonly name = input<string>(this.id());
  public readonly showLabel = input(false, { alias: 'show-label', transform: booleanAttribute });
  public readonly readonly = input(false, { transform: booleanAttribute });
  public readonly disabled = input(false, { transform: booleanAttribute });
  public readonly required = input(null, { transform: booleanAttribute });
  public readonly invalid = input(null, { transform: booleanAttribute });
  public readonly shape = input<ToggleShape>('circle');

  public readonly checked = model<boolean | string>(false);

  public readonly percyClick = output<MouseEvent>();
  public readonly percyFocus = output<FocusEvent>();
  public readonly percyBlur = output<FocusEvent>();
  public readonly percyChange = output<boolean>();

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

  public toggleChange($event: Event): void {
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
    this.checked.set(!this.checked());
    this.percyChange.emit(this.checked() as boolean);
  }
}
