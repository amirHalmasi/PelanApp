import { Component, OnInit } from '@angular/core';

import {
  ModalServiceService,
  province,
} from 'src/app/services/modal-service.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { animate, style, transition, trigger } from '@angular/animations';
// to add font awesome run this command bellow:
// ng add @fortawesome/angular-fontawesome
//https://piped.video/watch?v=AFVgwCtYgVo
@Component({
  selector: 'app-city-province-modal',
  templateUrl: './city-province-modal.component.html',
  styleUrls: ['./city-province-modal.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, 'z-index': 0 }),
        animate('300ms', style({ opacity: 1, 'z-index': 20 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, 'z-index': 10 })),
      ]),
    ]),
    trigger('flipInOut', [
      transition(':enter', [
        style({ transform: 'rotateY(-180deg)', opacity: 0 }),
        animate('300ms', style({ transform: 'rotateY(0deg)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'rotateY(180deg)', opacity: 0 })),
      ]),
    ]),
    trigger('slideRightInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
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
}
