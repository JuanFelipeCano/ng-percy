import { Component, input, output } from '@angular/core';
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
  },
})
export class PercyOptionItemComponent {

  public readonly option = input.required<DropdownListOption>();
  public readonly selected = input<boolean>(false);
  public readonly disabled = input<boolean>(false);
  public readonly shape = input<OptionItemShape>('round');

  public readonly onSelected = output<DropdownListOption>();

  public selectOption(): void {
    const option = {
      ...this.option(),
      selected: !this.option().selected,
    };

    this.onSelected.emit(option);
  }
}
