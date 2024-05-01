import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  // isOpenModal: EventEmitter<boolean> = false;
  isOpenModal = new Subject<boolean>();
  // ingredientsChanged = new Subject<boolean>();

  constructor() {}
}
