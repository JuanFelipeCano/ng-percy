import {
  booleanAttribute,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  OnInit,
  output,
  Signal,
} from '@angular/core';
import { ShapeBase } from '../../../../types';
import { randomId } from '../../../../utils';
import { PercyOptionItemComponent } from '../../../option-item/option-item.component';
import { PercyDropdownComponent } from '../../dropdown/dropdown.component';

export interface DropdownListOption {
  value: string;
  text: string;
  disabled?: boolean;
  selected?: boolean;
}

type DropdownListShape = ShapeBase;

@Component({
  selector: 'percy-dropdown-list',
  standalone: true,
  imports: [ PercyDropdownComponent, PercyOptionItemComponent ],
  templateUrl: './dropdown-list.component.html',
  styleUrl: './dropdown-list.component.scss',
  host: {
    'class': 'percy-dropdown-list',
    '[class.percy-dropdown-list_round]': 'shape() === "round"',
    '[class.percy-dropdown-list_square]': 'shape() === "square"',
    '[class.percy-dropdown-list_circle]': 'shape() === "circle"',
    '[class.percy-dropdown-list_disabled]': 'disabled()',
  },
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PercyDropdownListComponent implements OnInit {

  public readonly label = input.required<string>();
  public readonly id = input<string>(randomId('percy-id'), { alias: 'percy-id' });
  public readonly options = input<DropdownListOption[]>([]);
  public readonly shape = input<DropdownListShape>('round');
  public readonly multiple = input(false, { transform: booleanAttribute });
  public readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * A11y properties
   */
  public readonly a11yBadgeAriaLabel = input<string | null>(null, { alias: 'badge-aria-label' });
  public readonly a11yClearButtonAriaLabel = input<string | null>(null, { alias: 'clear-button-aria-label' });

  public readonly percyChange = output<DropdownListOption | DropdownListOption[]>();

  public isOpen!: boolean;
  protected _options!: Signal<DropdownListOption[]>;
  protected counter!: number;
  protected selectedOptions!: DropdownListOption | DropdownListOption[] | undefined;

  constructor() {
    this.isOpen = false;
    this.counter = 0;
    this._options = computed(() => this.options());
  }

  public get selectedOptionText(): string {
    return (this.selectedOptions as DropdownListOption)?.text;
  }

  public ngOnInit(): void {
    this.setSelectedOptions();
    this.upateCounter();
  }

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  public selectOption(option: DropdownListOption): void {
    if (this.disabled()) return;

    this.multiple() ? this.setSelectedMultipleOptions(option) : this.setSelectedOption(option);

    this.setSelectedOptions();
    this.percyChange.emit(this.selectedOptions || []);
    this.upateCounter();
  }

  public clearAll(): void {
    const newOptions = this._options().map(item => ({ ...item, selected: false }));

    this._options = computed(() => newOptions);
    this.percyChange.emit([]);
    this.upateCounter();
    this.toggleDropdown();
  }

  private setSelectedOption(option: DropdownListOption): void {
    const newOptions = this._options().map(item => {
      if (item.value === option.value) {
        return { ...item, selected: true };
      }

      return { ...item, selected: false };
    });

    this._options = computed(() => newOptions);
    this.toggleDropdown();
  }

  private setSelectedMultipleOptions(option: DropdownListOption): void {
    const newOptions = this._options().map(item => {
      if (item.value === option.value) {
        return { ...item, selected: !item.selected };
      }

      return item;
    });

    this._options = computed(() => newOptions);
  }

  private upateCounter(): void {
    this.counter = this._options().filter(item => item.selected).length;
  }

  private setSelectedOptions(): void {
    if (this.multiple()) {
      this.selectedOptions = this._options().filter(item => item.selected);
    } else {
      this.selectedOptions = this._options().find(item => item.selected);
    }
  }
}
