import { animate, style, transition, trigger } from '@angular/animations';

export const DROPDOWN_ANIMATION = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateY(-5%)', opacity: 0 }),
    animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ transform: 'translateY(-5%)', opacity: 0 }))
  ]),
]);
