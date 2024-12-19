import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  inject,
  input,
  OnInit,
  output,
  Signal
} from '@angular/core';
import { KeyboardKeys, ONE, TEN, ZERO } from '../../../../constants';
import { PercyDropdownListOption } from '../../../../models';
import { FocusService, KeyboardExecutorService } from '../../../../services';
import { ShapeBase } from '../../../../types';
import { randomId, sleep } from '../../../../utils';
import { PercyOptionItemComponent } from '../../../option-item/option-item.component';
import { PercyDropdownComponent } from '../../dropdown/dropdown.component';

type DropdownListShape = ShapeBase;

@Component({
  selector: 'percy-dropdown-list',
  standalone: true,
  imports: [ CommonModule, PercyDropdownComponent, PercyOptionItemComponent ],
  providers: [ FocusService, KeyboardExecutorService ],
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
  public readonly options = input<PercyDropdownListOption[]>([]);
  public readonly shape = input<DropdownListShape>('round');
  public readonly multiple = input(false, { transform: booleanAttribute });
  public readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * A11y properties
   */
  public readonly a11yBadgeAriaLabel = input<string | null>(null, { alias: 'a11y-badge-aria-label' });
  public readonly a11yClearButtonAriaLabel = input<string | null>(null, { alias: 'a11y-clear-button-aria-label' });
  public readonly a11ySelectedText = input<string | null>(null, { alias: 'a11y-selected-text' });
  public readonly a11yNotSelectedText = input<string | null>(null, { alias: 'a11y-not-selected-text' });
  public readonly a11yOfText = input<string | null>(null, { alias: 'a11y-of-text' });

  public readonly percyChange = output<PercyDropdownListOption | PercyDropdownListOption[]>();

  protected isOpen!: boolean;
  protected _options!: Signal<PercyDropdownListOption[]>;
  protected counter!: number;
  protected selectedOptions!: PercyDropdownListOption | PercyDropdownListOption[] | undefined;
  protected focusedOption!: PercyDropdownListOption | undefined;
  protected lastSelectedOption!: PercyDropdownListOption | undefined;

  private readonly _focusService = inject(FocusService);
  private readonly _keyboardExecutor = inject(KeyboardExecutorService);

  constructor() {
    this.isOpen = false;
    this.counter = 0;
    this._options = computed(() => this.options());
  }

  public get selectedOptionText(): string {
    return (this.selectedOptions as PercyDropdownListOption)?.text;
  }

  public get labelId(): string {
    return this.id() + '-label';
  }

  public get a11yFocusedOptionText(): string {
    if (!this.focusedOption) return '';

    const currentIndex = this._options().findIndex(option => option.value === this.focusedOption?.value);
    const counter = `${ currentIndex + ONE } ${ this.a11yOfText() ?? '/' } ${ this._options().length }`;
    const middleText = !this.focusedOption.selected
      ? this.a11yNotSelectedText() ?? ' '
      : this.a11ySelectedText() ?? ' ';

    return `${ this.focusedOption.text } ${ middleText } ${ counter }`;
  }

  public get a11ySelectedOptionText(): string {
    if (!this.lastSelectedOption || this.isOpen) return '';

    if (this.multiple()) {
      return `
        ${ this.a11ySelectedText() ?? '' }
        ${ this.counter } ${ this.a11yOfText() ?? '/' }
        ${ this._options().length }
      `;
    }

    return `${ this.lastSelectedOption.text } ${ this.a11ySelectedText() ?? '' }`;
  }

  public ngOnInit(): void {
    this.setSelectedOptions();
    this.upateCounter();
  }

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.focusedOption = undefined;

    if (this.isOpen) {
      this.lastSelectedOption = undefined;
      this._focusService.setLastFocusedElement();
      this.setFocusedOption();
    } else {
      this._focusService.setFocusToLastFocusedElement();
    }
  }

  public selectOption(option: PercyDropdownListOption | undefined): void {
    if (this.disabled() || !option || option.disabled) return;

    this.lastSelectedOption = option;

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
  }

  private setSelectedOption(option: PercyDropdownListOption): void {
    const newOptions = this._options().map(item => {
      if (item.value === option.value) {
        return { ...item, selected: true };
      }

      return { ...item, selected: false };
    });

    this._options = computed(() => newOptions);
    this.toggleDropdown();
  }

  private setSelectedMultipleOptions(option: PercyDropdownListOption): void {
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

  /**
   * A11y configuration
   */

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    const KeysMapper = {
      [KeyboardKeys.ESCAPE]: () => this.toggleDropdown(),
      [KeyboardKeys.ESC]: () => this.toggleDropdown(),
      [KeyboardKeys.DOWN]: () => this.setNextFocusedOption(),
      [KeyboardKeys.ARROW_DOWN]: () => this.setNextFocusedOption(),
      [KeyboardKeys.UP]: () => this.setPreviousFocusedOption(),
      [KeyboardKeys.ARROW_UP]: () => this.setPreviousFocusedOption(),
      [KeyboardKeys.ENTER]: () => this.toggleDropdownOrSelectOption(this.focusedOption),
      [KeyboardKeys.SPACE]: () => this.toggleDropdownOrSelectOption(this.focusedOption),
      [KeyboardKeys.HOME]: () => this.setFirstFocusedOption(),
      [KeyboardKeys.END]: () => this.setLastFocusedOption(),
    };

    this._keyboardExecutor.execute(KeysMapper, event);
  }

  private toggleDropdownOrSelectOption(option: PercyDropdownListOption | undefined): void {
    this.isOpen ? this.selectOption(option) : this.toggleDropdown();
  }

  private async setFocusedOption(): Promise<void> {
    this.focusedOption = this._options().find(option => option.selected);
    await sleep(TEN);
    this.scrollToFocusedOption();
  }

  private setNextFocusedOption(): void {
    this.toggleDropdownOrSelectOption(undefined);

    if (!this.focusedOption) {
      this.focusedOption = this._options().find(option => !option.disabled);
      return;
    }

    const currentIndex = this._options().findIndex(option => option.value === this.focusedOption?.value);

    if (currentIndex < this._options().length - ONE) {
      this.focusedOption = this._options().find((option, index) => !option.disabled && index > currentIndex);
    }

    this.scrollToFocusedOption();
  }

  private setPreviousFocusedOption(): void {
    this.toggleDropdownOrSelectOption(undefined);

    if (!this.focusedOption) return;

    const currentIndex = this._options().findIndex(option => option.value === this.focusedOption?.value);

    if (currentIndex > ZERO) {
      const option = this._options()
        .slice(0, currentIndex)
        .reverse()
        .find(option => !option.disabled);

      this.focusedOption = option || this.focusedOption;
    }

    this.scrollToFocusedOption();
  }

  private setFirstFocusedOption(): void {
    this.focusedOption = this._options().find(option => !option.disabled);

    this.scrollToFocusedOption();
  }

  private setLastFocusedOption(): void {
    this.focusedOption = [ ...this._options() ].reverse().find(option => !option.disabled);

    this.scrollToFocusedOption();
  }

  private scrollToFocusedOption(): void {
    const focusedElement = document.querySelector('.percy-dropdown-list_list')
      ?.querySelector(`[data-value="${this.focusedOption?.value}"]`);

    if (focusedElement) {
      focusedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }
}
