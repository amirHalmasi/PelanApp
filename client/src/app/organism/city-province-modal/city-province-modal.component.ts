import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalServiceService } from 'src/app/services/modal-service.service';
// to add font awesome run this command bellow:
// ng add @fortawesome/angular-fontawesome
//https://piped.video/watch?v=AFVgwCtYgVo
@Component({
  selector: 'app-city-province-modal',
  templateUrl: './city-province-modal.component.html',
  styleUrls: ['./city-province-modal.component.css'],
})
export class CityProvinceModalComponent implements OnInit {
  exitIcon = faTimes;
  isModalOpen!: boolean;

  // @Input('modal') isOpenModal: boolean = false;
  constructor(private modalServ: ModalServiceService) {}
  // ngOnDestroy(): void {
  //   this.modalServ.isOpenModal.emit(false);
  // }
  ngOnInit() {
    this.modalServ.isOpenModal.subscribe((modalStatus: boolean) => {
      this.isModalOpen = modalStatus;
    });
  }

  closeModal() {
    // this.isModalOpen = !this.isModalOpen;
    this.modalServ.isOpenModal.next(!this.isModalOpen);
  }
}
