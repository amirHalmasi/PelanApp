import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { fadeInOut } from 'src/app/services/animation';
import { ModalServiceService } from 'src/app/services/modal-service.service';
@Component({
  selector: 'app-action-btn-atom',
  templateUrl: './action-btn-atom.component.html',
  styleUrls: ['./action-btn-atom.component.css'],
  // animations: [fadeInOut],
})
export class ActionBtnAtomComponent implements OnInit {
  @Input('btnOptions') btnOption!: {
    iconName: string;

    btnType: string;
    btnText?: string;
  };
  @Input('ActionBtnClass') btnClass!: string;
  icon!: any;
  @Output() btnClicked = new EventEmitter<string>();

  //this one will get the type of button as boolean :is it exit button

  isModalOpen!: boolean;
  exitIcon = faTimes;
  backIcon = faArrowRight;
  constructor(private modalServ: ModalServiceService) {}
  ngOnInit(): void {
    this.modalServ.isOpenModal.subscribe((modalStatus: boolean) => {
      this.isModalOpen = modalStatus;
    });
    this.specifyIcon();
  }
  // chooseBtnFunctionality(btnType: string) {
  //   switch (btnType) {
  //     case 'exit':
  //       this.closeModal();
  //       break;
  //     case 'back':
  //       this.goBack();
  //       break;

  //     default:
  //       break;
  //   }
  // }
  btnClick(btnType: string) {
    this.btnClicked.emit(btnType);
  }
  specifyIcon(): any {
    let icon = this.btnOption.iconName.toLowerCase();

    if (icon == 'exit') {
      this.icon = faTimes;
    } else if (icon == 'back') {
      this.icon = faArrowRight;
    } else {
      this.icon = '';
    }
  }
  // closeModal() {
  //   this.exitBtnClicked.emit();

  // }
  // goBack() {
  //   this.exitBtnClicked.emit();
  //   this.modalServ.isSelectProvinces.next(true);
  // }
}
