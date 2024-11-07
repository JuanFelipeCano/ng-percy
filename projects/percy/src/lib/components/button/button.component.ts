import { booleanAttribute, Component, CUSTOM_ELEMENTS_SCHEMA, input, output } from '@angular/core';

type ButtonType = 'button' | 'submit' | 'reset';
type IconPosition = 'left' | 'right';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonShape = 'round' | 'square' | 'circle';
type ButtonFill = 'filled' | 'ghosted' | 'cleaned' | 'linked';
type ButtonExpand = 'block' | 'full';

@Component({
  selector: 'percy-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  host: {
    'class': 'percy-button',
    '[class.percy-button_filled]': 'fill() === "filled"',
    '[class.percy-button_ghosted]': 'fill() === "ghosted"',
    '[class.percy-button_linked]': 'fill() === "linked"',
    '[class.percy-button_cleaned]': 'fill() === "cleaned"',
    '[class.percy-button_small]': 'size() === "small"',
    '[class.percy-button_medium]': 'size() === "medium"',
    '[class.percy-button_large]': 'size() === "large"',
    '[class.percy-button_icon-left]': 'iconPosition() === "left"',
    '[class.percy-button_icon-right]': 'iconPosition() === "right"',
    '[class.percy-button_round]': 'shape() === "round"',
    '[class.percy-button_square]': 'shape() === "square"',
    '[class.percy-button_circle]': 'shape() === "circle"',
    '[class.percy-button_full]': 'expand() === "full"',
    '[class.percy-button_block]': 'expand() === "block"',
  },
})
export class PercyButtonComponent {

  public readonly label = input.required<string>();
  public readonly type = input<ButtonType>('button');
  public readonly disabled = input(false, { transform: booleanAttribute });
  public readonly icon = input<string | null>(null);
  public readonly iconPosition = input<IconPosition>('right', { alias: 'icon-position' });
  public readonly onlyIcon = input(false, { transform: booleanAttribute, alias: 'only-icon' });
  public readonly size = input<ButtonSize>('medium');
  public readonly shape = input<ButtonShape>('round');
  public readonly fill = input<ButtonFill>('filled');
  public readonly expand = input<ButtonExpand>('block');

  public readonly percyClick = output<MouseEvent>();
  public readonly percyFocus = output<FocusEvent>();
  public readonly percyBlur = output<FocusEvent>();
}
