import { Component } from '@angular/core';

import { ModalServiceService } from '../services/modal-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  isCollapsed: boolean = true;
  isModalOpen: boolean = false;

  constructor(private modalServ: ModalServiceService) {}

  openModal() {
    // this.modalServ.isOpenModal.subscribe((modalStatus: boolean) => {
    //   // this.isModalOpen = false;

    //   this.isModalOpen = modalStatus ? false : false;
    //   console.log('modalStatus', modalStatus);
    // });

    // this.modalServ.isOpenModal.next(true);
    this.modalServ.openModal();
  }
}
