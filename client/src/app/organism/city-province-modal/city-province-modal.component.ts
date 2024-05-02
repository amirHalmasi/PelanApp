import { Component, OnInit } from '@angular/core';

import { ModalServiceService } from 'src/app/services/modal-service.service';
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

  constructor(private modalServ: ModalServiceService) {}

  ngOnInit() {
    this.modalServ.isOpenModal.subscribe((modalStatus: boolean) => {
      this.isModalOpen = modalStatus;
    });
  }
  closeModal() {
    this.modalServ.closeModal();
  }
}
