import { animate, state, style, transition, trigger } from '@angular/animations';

export const DIALOG_SCREEN_ANIMATION = trigger('dialog-screen-animation', [
  state('void', style({ opacity: 0 })),
  state('desktop', style({ opacity: 1 })),
  state('mobile', style({ transform: 'translateY(0)' })),
  transition('void => desktop', [
    animate('200ms ease-out', style({ opacity: 1 })),
  ]),
  transition('desktop => void', [
    animate('200ms ease-in', style({ opacity: 0 }))
  ]),
  transition('void => mobile', [
    style({ transform: 'translateY(100%)', opacity: 1 }),
    animate('300ms ease-in-out', style({ transform: 'translateY(0)' }))
  ]),
  transition('mobile => void', [
    animate('500ms ease-out', style({ transform: 'translateY(100%)' }))
  ])
]);
