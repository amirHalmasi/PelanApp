import { Component, OnInit } from '@angular/core';

import {
  ModalServiceService,
  province,
} from 'src/app/services/modal-service.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// to add font awesome run this command bellow:
// ng add @fortawesome/angular-fontawesome
//https://piped.video/watch?v=AFVgwCtYgVo
@Component({
  selector: 'app-city-province-modal',
  templateUrl: './city-province-modal.component.html',
  styleUrls: ['./city-province-modal.component.css'],
})
export class CityProvinceModalComponent implements OnInit {
  isModalOpen!: boolean;
  isSelectProvinces: boolean = true;
  leftArrowIcon = faArrowLeft;
  provinces!: province[];
  provinceCenter!: string;
  // provinces!: any;

  constructor(private modalServ: ModalServiceService) {}

  ngOnInit() {
    this.modalServ.isOpenModal.subscribe((modalStatus: boolean) => {
      this.isModalOpen = modalStatus;
    });
    this.modalServ.isSelectProvinces.subscribe((isSelectProvinces) => {
      this.isSelectProvinces = isSelectProvinces;
    });

    this.modalServ.getProvinces().subscribe((receivedProvinces) => {
      console.log(receivedProvinces);
      this.provinces = receivedProvinces;
    });
  }
  closeModal() {
    this.modalServ.closeModal();
  }
  selectCities(provinceId: any) {
    provinceId = +provinceId;

    this.isSelectProvinces = false;
    this.provinceCenter = 'زنجان';
  }
}
