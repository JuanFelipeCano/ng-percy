import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, input, OnInit, Signal } from '@angular/core';
import { sleep } from '../../utils';
import { ToastPosition, ToastShape, ToastType } from './types';
import { TOAST_ANIMATION } from './toast.animations';

const IconMapper: Record<ToastType, string | null> = {
  'default' : null,
  'info'    : 'information-circle-outline',
  'success' : 'checkmark-circle-outline',
  'warning' : 'warning-outline',
  'error'   : 'alert-circle-outline',
};

const AnimationDirectionMapper: Record<ToastPosition, string> = {
  'top-left'      : 'fromTop',
  'top-right'     : 'fromTop',
  'top-center'    : 'fromTop',
  'bottom-left'   : 'fromBottom',
  'bottom-right'  : 'fromBottom',
  'bottom-center' : 'fromBottom',
};

const ANIMATION_TIME = 500;

@Component({
  selector: 'percy-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  host: {
    'class': 'percy-toast',
    '[class.percy-toast_top-left]'      : 'position === "top-left"',
    '[class.percy-toast_top-right]'     : 'position === "top-right"',
    '[class.percy-toast_top-center]'    : 'position === "top-center"',
    '[class.percy-toast_bottom-left]'   : 'position === "bottom-left"',
    '[class.percy-toast_bottom-right]'  : 'position === "bottom-right"',
    '[class.percy-toast_bottom-center]' : 'position === "bottom-center"',
    '[class.percy-toast_default]'       : 'type() === "default"',
    '[class.percy-toast_info]'          : 'type() === "info"',
    '[class.percy-toast_success]'       : 'type() === "success"',
    '[class.percy-toast_warning]'       : 'type() === "warning"',
    '[class.percy-toast_error]'         : 'type() === "error"',
    '[class.percy-toast_round]'         : 'shape() === "round"',
    '[class.percy-toast_square]'        : 'shape() === "square"',
    '[class.percy-toast_circle]'        : 'shape() === "circle"',
  },
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  animations: [ TOAST_ANIMATION ],
})
export class PercyToastComponent implements OnInit {

  public readonly message = input.required<string>();
  public readonly type = input<ToastType>('default');
  public readonly description = input<string>('');
  public readonly icon = input<string | null>(null);
  public readonly shape = input<ToastShape>('round');
  public readonly a11yTypeDescription = input<string>('', { alias: 'a11y-type-description' });

  protected _icon: Signal<string | null>;
  protected animationDirection!: string;
  protected isVisible!: boolean;
  protected position!: ToastPosition;

  constructor() {
    this._icon = computed(() => this.icon() || IconMapper[this.type()]);
  }

  public ngOnInit(): void {
    this.animationDirection = this.position ? AnimationDirectionMapper[this.position] : 'initial';
    this.isVisible = true;
  }

  public async close(): Promise<void> {
    this.isVisible = false;
    await sleep(ANIMATION_TIME);
  }
}
