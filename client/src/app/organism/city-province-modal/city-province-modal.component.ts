import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  ModalServiceService,
  province,
} from 'src/app/services/modal-service.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import {
  fadeInOut,
  flipInOut,
  slideRightInOut,
} from 'src/app/services/animation';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HouseAdvetisePageService } from '../house-page/house-advertise-page.service';
import { CityListAtmComponent } from './city-list-atm/city-list-atm.component';
import { ProvinceListAtmComponent } from './province-list-atm/province-list-atm.component';
import { ActionBtnAtomComponent } from './action-btn-atom/action-btn-atom.component';
import { NgIf } from '@angular/common';
// to add font awesome run this command bellow:
// ng add @fortawesome/angular-fontawesome
//https://piped.video/watch?v=AFVgwCtYgVo
@Component({
    selector: 'app-city-province-modal',
    templateUrl: './city-province-modal.component.html',
    styleUrls: ['./city-province-modal.component.css'],
    animations: [fadeInOut, flipInOut, slideRightInOut],
    standalone: true,
    imports: [
        NgIf,
        ActionBtnAtomComponent,
        FormsModule,
        ReactiveFormsModule,
        ProvinceListAtmComponent,
        CityListAtmComponent,
    ],
})
export class CityProvinceModalComponent implements OnInit, OnDestroy {
  isModalOpen!: boolean;
  isSelectProvincesOpen: boolean = true;
  leftArrowIcon = faArrowLeft;
  provinces!: province[];
  provincesConstant!: province[];
  provinceCenter!: string;
  provinceId!: number;

  // isLoading!: boolean;
  // provinces!: any;
  provinceSubscription!: Subscription;

  exitOption: {
    iconName: string;

    btnType: string;
  } = {
    iconName: 'exit',

    btnType: 'button',
  };
  backOption: {
    iconName: string;

    btnType: string;
  } = {
    iconName: 'back',

    btnType: 'button',
  };

  constructor(
    private modalServ: ModalServiceService,
    private fb: FormBuilder
  ) {}
  ngOnDestroy(): void {
    this.provinceSubscription.unsubscribe();
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchInput: [''], // You can set default value or validators here
    });
    this.modalServ.isOpenModal.subscribe((modalStatus: boolean) => {
      this.isModalOpen = modalStatus;
    });
    this.modalServ.isSelectProvinces.subscribe((isSelectProvincesOpen) => {
      this.isSelectProvincesOpen = isSelectProvincesOpen;
    });

    this.modalServ.getProvinces().subscribe({
      next: (receivedProvinces) => {
        console.log('main modal comp', receivedProvinces);
        this.modalServ.provinces.next(receivedProvinces);
        this.provinces = receivedProvinces;
        this.provincesConstant = receivedProvinces;
        // this.modalServ.provinces.next(receivedProvinces);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  onKeyPress_onlyPersianLettersAndSpace(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);

    const persianRegex = /^[\u0600-\u06FF\s]+$/;

    if (!persianRegex.test(charStr)) {
      event.preventDefault();
    }
  }
  closeModal() {
    // If you need to get only the route segments (excluding query parameters)
    // this.currentUrl = this.activatedRoute.snapshot.url.join('/');

    // console.log('Current URL:', this.currentUrl);
    this.modalServ.closeModal();
    this.provinces = this.provincesConstant;
    this.searchForm.reset();
  }
  backwardModal() {
    this.provinces = this.provincesConstant;
    this.modalServ.isSelectProvinces.next(true);
    this.searchForm.reset();
  }
  setProvinceId(province_id: number) {
    this.provinceId = province_id;
  }
  // /////////////////////////////
  ///            form           //
  ////////////////////////////////
  searchForm!: FormGroup;
  onSubmit() {
    // this.modalServ.isSearchEnable.next(true);
    const searchValue = this.searchForm.value.searchInput;
    // Do whatever you want with the search value, like sending it to an API
    console.log('Search Value:', searchValue);
    const res = this.provincesConstant.filter(
      ({ ['province_name']: name }) => name && name.includes(searchValue)
    );
    this.provinces = res;
  }
}
