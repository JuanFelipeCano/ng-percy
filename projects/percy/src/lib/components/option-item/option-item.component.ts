import { booleanAttribute, Component, input, output } from '@angular/core';
import { DropdownListOption } from '../../../public-api';
import { ShapeBase } from '../../types';

type OptionItemShape = ShapeBase;

@Component({
  selector: 'percy-option-item',
  standalone: true,
  imports: [],
  templateUrl: './option-item.component.html',
  styleUrl: './option-item.component.scss',
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

  public readonly option = input.required<DropdownListOption>();
  public readonly selected = input(false, { transform: booleanAttribute });
  public readonly disabled = input(false, { transform: booleanAttribute });
  public readonly focused = input(false, { transform: booleanAttribute });
  public readonly shape = input<OptionItemShape>('round');

  public readonly onSelected = output<DropdownListOption>();

  public selectOption(): void {
    if (this.disabled()) return;

    const option = {
      ...this.option(),
      selected: !this.option().selected,
    };

    this.onSelected.emit(option);
  }
}
