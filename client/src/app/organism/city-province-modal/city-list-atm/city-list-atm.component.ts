import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  ModalServiceService,
  city,
} from 'src/app/services/modal-service.service';
import { HouseAdvetisePageService } from '../../house-page/house-advertise-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-list-atm',
  templateUrl: './city-list-atm.component.html',
  styleUrls: ['./city-list-atm.component.css'],
  // animations: [slideRightInOut],
})
export class CityListAtmComponent implements OnInit {
  @Input() province_id!: number;
  @Output() citySelected = new EventEmitter();
  leftArrowIcon = faArrowLeft;
  cities!: city[];
  citiesConstant!: city[];
  isloading!: boolean;
  currentUrl!: string;

  searchForm!: FormGroup;
  constructor(
    private modalServ: ModalServiceService,
    private fb: FormBuilder,
    private router: Router,
    private houseAdvertiseServ: HouseAdvetisePageService
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
  getData(cityIndex: number) {
    console.log('selected ct data', this.cities[cityIndex]);
    localStorage.setItem('cityData', JSON.stringify(this.cities[cityIndex]));
    this.modalServ.selectedCity.next(this.cities[cityIndex]);
    this.citySelected.emit();
    // this.modalServ.
    const cityDataString = localStorage.getItem('cityData');

    let cityData = null;

    if (cityDataString) {
      try {
        cityData = JSON.parse(cityDataString);
      } catch (e) {
        console.error('Error parsing cityData from localStorage:', e);
      }
    }

    // Get the full URL path including query parameters
    this.currentUrl = this.router.url;

    if (this.currentUrl === '/houseAdvertise' && cityData) {
      this.getAllAdvertises(cityData.city_id);
    }
  }

  getAllAdvertises(city_id: string) {
    this.houseAdvertiseServ.getHouseAdvertises(city_id).subscribe({
      next: (data) => {
        console.log('advertises select city', data);
        this.houseAdvertiseServ.houseAdvertises.next(data);
      },
      error: (err) => {
        console.error('Error fetching advertises', err);
      },
    });
  }
}
