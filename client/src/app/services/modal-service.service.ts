import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  isOpenModal = new Subject<boolean>();

  closeModal() {
    this.isOpenModal.next(false);
  }
  openModal() {
    this.isOpenModal.next(true);
  }
  constructor() {}
}
