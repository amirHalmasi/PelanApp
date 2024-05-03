import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-city-list-atm',
  templateUrl: './city-list-atm.component.html',
  styleUrls: ['./city-list-atm.component.css'],
  // animations: [slideRightInOut],
})
export class CityListAtmComponent {
  leftArrowIcon = faArrowLeft;
}
