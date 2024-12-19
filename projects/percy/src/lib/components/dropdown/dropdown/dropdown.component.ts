import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ShapeBase } from '../../../types';
import { DROPDOWN_ANIMATION } from './dropdown.animation';

type DropdownShape = ShapeBase;

@Component({
  selector: 'percy-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'percy-dropdown',
    '[class.percy-dropdown_round]': 'shape() === "round"',
    '[class.percy-dropdown_square]': 'shape() === "square"',
    '[class.percy-dropdown_circle]': 'shape() === "circle"',
  },
  animations: [ DROPDOWN_ANIMATION ],
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
