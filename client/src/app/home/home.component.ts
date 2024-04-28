import { Component, AfterContentInit, OnInit } from '@angular/core';
import { ProvinceAndCitiesService } from './province-and-cities-service.service';
import { City } from '../shared/citiy.model';
import { RouterOutlet } from '@angular/router';
import {
  // slider,
  // transformer,
  fader,
  // steper,
} from '../shared/Animations/route-animationsd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fader],
})
export class HomeComponent implements OnInit {
  title = 'پلان';
  isModalOpen: boolean = false;
  selectedCityInfo?: City;

  constructor(private provinceAndCityServ: ProvinceAndCitiesService) {}

  ngOnInit(): void {
    this.provinceAndCityServ.onCloseCityModal.subscribe({
      next: (isOpen) => (this.isModalOpen = isOpen),
    });
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
