import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0, 'z-index': 0 }),
    animate('300ms', style({ opacity: 1, 'z-index': 20 })),
  ]),
  transition(':leave', [
    animate('300ms', style({ opacity: 0, 'z-index': 10 })),
  ]),
]);

export const flipInOut = trigger('flipInOut', [
  transition(':enter', [
    style({ transform: 'rotateY(-180deg)', opacity: 0 }),
    animate('300ms', style({ transform: 'rotateY(0deg)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms', style({ transform: 'rotateY(180deg)', opacity: 0 })),
  ]),
]);

export const slideRightInOut = trigger('slideRightInOut', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('1s', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('1s', style({ transform: 'translateX(100%)', opacity: 0 })),
  ]),
]);
