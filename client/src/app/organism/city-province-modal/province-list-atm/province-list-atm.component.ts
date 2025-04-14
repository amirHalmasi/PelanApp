import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  ModalServiceService,
  province,
} from 'src/app/services/modal-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgFor, NgClass } from '@angular/common';
@Component({
    selector: 'app-province-list-atm',
    templateUrl: './province-list-atm.component.html',
    styleUrls: ['./province-list-atm.component.css'],
    standalone: true,
    imports: [
        NgFor,
        NgClass,
        FontAwesomeModule,
    ],
})
export class ProvinceListAtmComponent implements OnInit {
  // isSelectProvinces!: boolean;
  @Input() provinces!: province[];
  @Output() provinceId = new EventEmitter<number>();
  leftArrowIcon = faArrowLeft;
  // const getFruit = fruits.find(fruit => fruit.name === 'apples');
  // https://stackoverflow.com/questions/64470454/javascript-find-objects-in-array-with-property-containing-a-specific-string
  // provinces!: any;

  constructor(private modalServ: ModalServiceService) {}

  ngOnInit() {
    // const res = this.provinces.filter(
    //   ({ ['province_name']: name }) => name && name.includes('آذر')
    // );
    // console.log(res);
    // this.modalServ.provinces.subscribe((receivedProvinces: province[]) => {
    //   console.log('Modal sevice province value ', receivedProvinces);
    //   this.provinces = receivedProvinces;
    // });
    // const res = this.provinces.filter(
    //   ({ ['province_name']: name }) => name && name.includes('آذر')
    // );
    // console.log(res);
  }

  selectCities(provinceId: any) {
    provinceId = +provinceId;
    console.log('provinceId', provinceId);
    this.provinceId.emit(provinceId);
    this.modalServ.isSelectProvinces.next(false);
  }
}
