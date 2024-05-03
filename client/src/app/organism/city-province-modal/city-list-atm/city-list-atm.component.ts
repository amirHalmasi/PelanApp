import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-city-list-atm',
  templateUrl: './city-list-atm.component.html',
  styleUrls: ['./city-list-atm.component.css'],
  animations: [
    trigger('slideRightInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class CityListAtmComponent {
  leftArrowIcon = faArrowLeft;
}
