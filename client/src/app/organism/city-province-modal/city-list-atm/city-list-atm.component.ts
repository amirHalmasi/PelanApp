import { Component, Input, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  ModalServiceService,
  city,
} from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-city-list-atm',
  templateUrl: './city-list-atm.component.html',
  styleUrls: ['./city-list-atm.component.css'],
  // animations: [slideRightInOut],
})
export class CityListAtmComponent implements OnInit {
  @Input() province_id!: number;
  leftArrowIcon = faArrowLeft;
  cities!: city[];
  constructor(private modalServ: ModalServiceService) {}
  ngOnInit(): void {
    this.modalServ.getCities(this.province_id).subscribe((province_cities) => {
      console.log('cties', province_cities);
      this.cities = province_cities;
    });
  }
}
