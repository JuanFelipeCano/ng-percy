import { booleanAttribute, Component, HostListener, input, model, output } from '@angular/core';
import { KeyboardKeys } from '../../constants';
import { randomId } from '../../utils';

@Component({
  selector: 'percy-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  host: { 'class': 'percy-toggle' },
})
export class ToggleComponent {

  public readonly label = input.required<string>();
  public readonly id = input<string>(randomId('percy-id'), { alias: 'toggle-id' });
  public readonly name = input<string>(this.id());
  public readonly showLabel = input(false, { alias: 'show-label', transform: booleanAttribute });
  public readonly readonly = input(false, { transform: booleanAttribute });
  public readonly disabled = input(false, { transform: booleanAttribute });
  public readonly required = input(false, { transform: booleanAttribute });
  public readonly invalid = input(false, { transform: booleanAttribute });

  public readonly checked = model<boolean | string>(false);

  public readonly percyClick = output<MouseEvent>();
  public readonly percyFocus = output<FocusEvent>();
  public readonly percyBlur = output<FocusEvent>();
  public readonly percyChange = output<boolean>();

  public toggleChange($event: Event): void {
    this.percyChange.emit(($event.target as HTMLInputElement).checked);
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if ([KeyboardKeys.SPACE, KeyboardKeys.ENTER].includes(event.key as KeyboardKeys)) {
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
