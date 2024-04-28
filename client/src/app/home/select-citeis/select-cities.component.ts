/*import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { ProvinceAndCitiesServiceService } from '../province-and-cities-service.service';
import { Province } from 'src/app/shared/province.model';
import { City } from 'src/app/shared/citiy.model';

@Component({
  selector: 'app-select-cities',
  templateUrl: './select-cities.component.html',
  styleUrls: ['./select-cities.component.css'],
})
export class SelectCitiesComponent implements OnInit {
  @Output() onCloseCityModal = new EventEmitter<boolean>();
  provinceOrCities!: Province[] | City[];

  constructor(
    private provinceServ: ProvinceAndCitiesServiceService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}
  isShowCities!: boolean;
  ngOnInit() {
    // this.provinceServ.getProvinces();
    this.isShowCities = this.provinceServ.isShowCities;
    this.provinceOrCities = this.provinceServ.isShowCities
      ? this.provinceServ.provineCitiesInfo
      : this.provinceServ.provinceNames;

    this.cdr.detectChanges();
  }

  closeCities() {
    this.onCloseCityModal.emit(false);
  }
  // onShowCities(isShowCity: boolean) {
  //   console.log(isShowCity);
  // }
  getProvinceCities(provinceId: number) {
    this.provinceServ.getCity(provinceId).subscribe({
      next: (response) => {
        this.provinceServ.provineCitiesInfo = response;

        this.provinceOrCities = this.provinceServ.provineCitiesInfo; // Update the data
        this.provinceServ.isShowCities = true;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  // getProvinceCities(provinceId: number) {
  //   this.provinceServ.getCity(provinceId).subscribe({
  //     next: (response) => {
  //       this.provinceServ.provineCitiesInfo = response;
  //       console.log(this.provinceServ.provineCitiesInfo);
  //       this.provinceServ.isShowCities = true;
  //       this.cdr.detectChanges();
  //       // this.onCloseCityModal.emit(false);
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     },
  //   });
  // }
}*/

// convert this code to new version
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { ProvinceAndCitiesService } from '../province-and-cities-service.service';
import { Province } from 'src/app/shared/province.model';
import { City } from 'src/app/shared/citiy.model';

@Component({
  selector: 'app-select-cities',
  templateUrl: './select-cities.component.html',
  styleUrls: ['./select-cities.component.css'],
})
export class SelectCitiesComponent implements OnInit {
  // @Output() onCloseCityModal = new EventEmitter<boolean>();
  provinceOrCities!: Province[] | City[];

  constructor(
    private provinceAndCityServ: ProvinceAndCitiesService,
    private cdr: ChangeDetectorRef // private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @ViewChild('outlet', { read: ViewContainerRef }) outletRef: ViewContainerRef;
  @ViewChild('content', { read: TemplateRef }) contentRef: TemplateRef<any>;

  ngOnInit() {
    this.isShowCities = this.provinceAndCityServ.isShowCities;
    this.provinceOrCities = this.provinceAndCityServ.isShowCities
      ? this.provinceAndCityServ.provineCitiesList
      : this.provinceAndCityServ.provinceNames;

    // this.cdr.detectChanges();
  }

  isShowCities: boolean = false;
  isLoading: boolean = false;
  backToSelectProvince() {
    this.isShowCities = false;
    this.provinceOrCities = this.provinceAndCityServ.provinceNames;
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
  }
  closeCities() {
    this.provinceAndCityServ.onCloseCityModal.emit(false);

    this.provinceAndCityServ.provineCitiesList = [];
    // console.log(this.provinceAndCityServ.provineCitiesList);
    this.isShowCities = false;
  }
  getProvinceCities(provinceId: number) {
    // console.log(provinceId);
    this.isLoading = true;
    this.provinceAndCityServ.getCity(provinceId).subscribe({
      next: (response) => {
        this.provinceAndCityServ.provineCitiesList = response;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
      complete: () => {
        // console.log('content ref', this.contentRef);

        this.isShowCities = true;
        this.provinceOrCities = this.provinceAndCityServ.provineCitiesList;
        this.outletRef.clear();
        this.outletRef.createEmbeddedView(this.contentRef);
        this.isLoading = false;
      },
    });
  }
  //   selectedCityData(city) {
  //     console.log('clicked city', city);
  //   }
}
