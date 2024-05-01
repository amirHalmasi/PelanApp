import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ModalServiceService } from '../services/modal-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isCollapsed: boolean = true;
  isModalOpen: boolean = false;

  constructor(private modalServ: ModalServiceService) {}
  ngOnInit(): void {
    // this.modalServ.isOpenModal.emit(this.isModalOpen);
  }
  openModal() {
    this.modalServ.isOpenModal.subscribe((modalStatus: boolean) => {
      // this.isModalOpen = false;

      this.isModalOpen = modalStatus ? false : false;
      console.log('modalStatus', modalStatus);
    });

    this.modalServ.isOpenModal.next(!this.isModalOpen);
    // this.onSelectCity.emit(this.isModalOpen);
  }
}
