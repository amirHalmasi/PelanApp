import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ModalServiceService } from 'src/app/services/modal-service.service';
@Component({
  selector: 'app-action-btn-atom',
  templateUrl: './action-btn-atom.component.html',
  styleUrls: ['./action-btn-atom.component.css'],
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
        animate('1s', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1s', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ActionBtnAtomComponent implements OnInit {
  @Input('BtnType') btnType!: string;
  icon!: any;

  //this one will get the type of button as boolean :is it exit button

  isModalOpen!: boolean;
  exitIcon = faTimes;
  backIcon = faArrowRight;
  constructor(private modalServ: ModalServiceService) {}
  ngOnInit(): void {
    this.modalServ.isOpenModal.subscribe((modalStatus: boolean) => {
      this.isModalOpen = modalStatus;
    });
    this.icon = this.btnType.toLowerCase() == 'exit' ? faTimes : faArrowRight;
  }
  closeModal() {
    // this.isModalOpen = !this.isModalOpen;
    // this.modalServ.isOpenModal.next(false);
    this.modalServ.closeModal();
  }
  goBack() {
    this.modalServ.isSelectProvinces.next(true);
  }
}
