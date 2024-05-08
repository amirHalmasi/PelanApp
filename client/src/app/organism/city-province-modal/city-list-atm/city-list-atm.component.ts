import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  ModalServiceService,
  city,
} from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-city-list-atm',
  templateUrl: './city-list-atm.component.html',
  styleUrls: ['./city-list-atm.component.css'],
  // animations: [slideRightInOut],
})
export class CityListAtmComponent implements OnInit {
  @Input() province_id!: number;
  leftArrowIcon = faArrowLeft;
  cities!: city[];
  citiesConstant!: city[];
  isloading!: boolean;

  searchForm!: FormGroup;
  constructor(
    private modalServ: ModalServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchInput: [''], // You can set default value or validators here
    });
    // this.modalServ.isLoading.next(true);
    this.isloading = true;
    this.modalServ.getCities(this.province_id).subscribe((province_cities) => {
      console.log('cties', province_cities);
      this.cities = province_cities;
      this.citiesConstant = province_cities;
      // this.modalServ.isLoading.next(false);
      this.isloading = false;
    });
  }
  onSubmit() {
    // this.modalServ.isSearchEnable.next(true);
    const searchValue = this.searchForm.value.searchInput;
    // Do whatever you want with the search value, like sending it to an API
    console.log('Search Value:', searchValue);
    const res = this.citiesConstant.filter(
      ({ ['city_name']: name }) => name && name.includes(searchValue)
    );
    this.cities = res;
  }
}
