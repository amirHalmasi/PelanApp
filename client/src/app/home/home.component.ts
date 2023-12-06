import { Component, AfterContentInit } from '@angular/core';
import { ProvinceAndCitiesService } from './province-and-cities-service.service';
import { City } from '../shared/citiy.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterContentInit {
  title = 'پلان';
  isModalOpen: boolean = false;
  selectedCityInfo?: City;
  constructor(private provinceAndCityServ: ProvinceAndCitiesService) {}
  ngAfterContentInit(): void {
    //   this.provinceAndCityServ.selectedCity.subscribe({
    //     next: (city: City) => {
    //       console.log(city);
    //     },
    //   });
  }
}
