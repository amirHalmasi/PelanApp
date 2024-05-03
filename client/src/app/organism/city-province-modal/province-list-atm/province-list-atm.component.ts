import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  ModalServiceService,
  province,
} from 'src/app/services/modal-service.service';
@Component({
  selector: 'app-province-list-atm',
  templateUrl: './province-list-atm.component.html',
  styleUrls: ['./province-list-atm.component.css'],
})
export class ProvinceListAtmComponent implements OnInit {
  isSelectProvinces!: boolean;
  provinces!: province[];
  leftArrowIcon = faArrowLeft;

  // provinces!: any;

  constructor(private modalServ: ModalServiceService) {}
  ngOnInit() {
    this.modalServ.getProvinces().subscribe((receivedProvinces) => {
      console.log(receivedProvinces);
      this.provinces = receivedProvinces;
    });
  }
  selectCities(provinceId: any) {
    provinceId = +provinceId;
    this.modalServ.isSelectProvinces.next(false);
  }
}
