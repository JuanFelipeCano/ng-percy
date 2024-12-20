import { animate, state, style, transition, trigger } from '@angular/animations';

export const TOAST_ANIMATION = trigger('toast-animation', [
  state('void', style({ opacity: 0 })),
  state('initial', style({ opacity: 1 })),
  state('fromTop', style({ transform: 'translateY(0)' })),
  state('fromBottom', style({ transform: 'translateY(0)' })),
  transition('void => initial', [
    animate('1ms', style({ opacity: 1 })),
  ]),
  transition('initial => void', [
    animate('1ms', style({ opacity: 0 }))
  ]),
  transition('void => fromTop', [
    style({ transform: 'translateY(-100%)', opacity: 1 }),
    animate('200ms ease-in-out', style({ transform: 'translateY(0)' }))
  ]),
  transition('fromTop => void', [
    animate('200ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
  ]),
  transition('void => fromBottom', [
    style({ transform: 'translateY(100%)', opacity: 1 }),
    animate('200ms ease-in-out', style({ transform: 'translateY(0)' }))
  ]),
  transition('fromBottom => void', [
    animate('200ms ease-out', style({ transform: 'translateY(100%)', opacity: 0 }))
  ])
]);
