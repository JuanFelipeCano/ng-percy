import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PercyShapeBase } from '../../types';
import { PercyDropdownListOption } from '../dropdown';

type OptionItemShape = PercyShapeBase;

@Component({
  selector: 'percy-option-item',
  standalone: true,
  imports: [],
  templateUrl: './option-item.component.html',
  styleUrl: './option-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'percy-option-item',
    '[class.percy-option-item_round]': 'shape() === "round"',
    '[class.percy-option-item_square]': 'shape() === "square"',
    '[class.percy-option-item_circle]': 'shape() === "circle"',
    '[class.percy-option-item_selected]': 'selected()',
    '[class.percy-option-item_disabled]': 'disabled()',
    '[class.percy-option-item_focused]': 'focused()',
    '[attr.data-value]': 'option().value',
    '[attr.data-text]': 'option().text',
  },
})
export class PercyOptionItemComponent {

  public readonly option = input.required<PercyDropdownListOption>();
  public readonly selected = input(false, { transform: booleanAttribute });
  public readonly disabled = input(false, { transform: booleanAttribute });
  public readonly focused = input(false, { transform: booleanAttribute });
  public readonly shape = input<OptionItemShape>('round');

  public readonly percySelected = output<PercyDropdownListOption>();

  public selectOption(): void {
    if (this.disabled()) return;

    const option = {
      ...this.option(),
      selected: !this.option().selected,
    };

    this.percySelected.emit(option);
  }
}
