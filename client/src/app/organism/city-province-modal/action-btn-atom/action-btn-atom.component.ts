import { Component, Input, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ModalServiceService } from 'src/app/services/modal-service.service';
@Component({
  selector: 'app-action-btn-atom',
  templateUrl: './action-btn-atom.component.html',
  styleUrls: ['./action-btn-atom.component.css'],
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
  goBack() {}
}
