import { Component, OnInit } from '@angular/core';

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
import { FormBuilder, FormGroup } from '@angular/forms';
// to add font awesome run this command bellow:
// ng add @fortawesome/angular-fontawesome
//https://piped.video/watch?v=AFVgwCtYgVo
@Component({
  selector: 'app-city-province-modal',
  templateUrl: './city-province-modal.component.html',
  styleUrls: ['./city-province-modal.component.css'],
  animations: [fadeInOut, flipInOut, slideRightInOut],
})
export class CityProvinceModalComponent implements OnInit {
  isModalOpen!: boolean;
  isSelectProvincesOpen: boolean = true;
  leftArrowIcon = faArrowLeft;
  provinces!: province[];
  provincesConstant!: province[];
  provinceCenter!: string;
  provinceId!: number;
  // isLoading!: boolean;
  // provinces!: any;

  constructor(
    private modalServ: ModalServiceService,
    private fb: FormBuilder
  ) {}

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
        this.provinces = receivedProvinces;
        this.provincesConstant = receivedProvinces;

        // this.modalServ.provinces.next(receivedProvinces);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  closeModal() {
    this.modalServ.closeModal();
    this.provinces = this.provincesConstant;
    this.searchForm.reset();
  }
  bachwardModal() {
    this.provinces = this.provincesConstant;
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
  // selectCities(provinceId: any) {
  //   provinceId = +provinceId;
  //   this.modalServ.isSelectProvinces.next(false);
  // }
}
