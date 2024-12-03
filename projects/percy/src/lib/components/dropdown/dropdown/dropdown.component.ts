import { booleanAttribute, Component, input, output } from '@angular/core';
import { ShapeBase } from '../../../types';
import { animate, style, transition, trigger } from '@angular/animations';

type DropdownShape = ShapeBase;

@Component({
  selector: 'percy-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  host: {
    'class': 'percy-dropdown',
    '[class.percy-dropdown_round]': 'shape() === "round"',
    '[class.percy-dropdown_square]': 'shape() === "square"',
    '[class.percy-dropdown_circle]': 'shape() === "circle"',
  },
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-5%)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-5%)', opacity: 0 }))
      ]),
    ]),
  ],
})
export class PercyDropdownComponent {

  public readonly isOpen = input(false, { alias: 'is-open', transform: booleanAttribute });
  public readonly shape = input<DropdownShape>('round');

  /**
   * A11y properties
   */
  public readonly a11yRole = input<string | null>(null, { alias: 'a11y-role' });
  public readonly a11yAriaLabelledBy = input<string | null>(null, { alias: 'a11y-aria-labelledby' });
  public readonly a11yAriaControls = input<string | null>(null, { alias: 'a11y-aria-controls' });
  public readonly a11yAriaHasPopup = input<string | null>(null, { alias: 'a11y-aria-haspopup' });
  public readonly a11yAriaActiveDescendant = input<string | null>(null, { alias: 'a11y-aria-activedescendant' });
  public readonly a11yTabIndex = input<string>('0', { alias: 'a11y-tabindex' });
}
