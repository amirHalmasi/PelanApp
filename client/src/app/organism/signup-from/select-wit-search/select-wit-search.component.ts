import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

// import { Bank, BANKS } from '../demodata';
import { MatSelect } from '@angular/material/select';
import {
  ModalServiceService,
  city,
  province,
} from 'src/app/services/modal-service.service';
import { fadeInOut, slideRightInOut } from 'src/app/services/animation';

@Component({
  selector: 'app-select-wit-search',
  templateUrl: './select-wit-search.component.html',
  styleUrls: ['./select-wit-search.component.css'],
  animations: [slideRightInOut],
})
export class SelectWitSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  provinces!: province[];
  cities!: city[];

  /** control for the selected bank */
  public provinceCtrl: FormControl = new FormControl();
  public cityCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public provinceFilterSearchCtrl: FormControl = new FormControl();
  public cityFilterSearchCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredProvinces: ReplaySubject<province[]> = new ReplaySubject<
    province[]
  >(1);
  public filteredCities: ReplaySubject<city[]> = new ReplaySubject<city[]>(1);

  @ViewChild('singleSelect') singleSelect!: MatSelect;
  @ViewChild('singleSelectCity') singleSelectCity!: MatSelect;
  // @Output() selectChange = new EventEmitter<string>();
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  isCityInitial: boolean = false;

  constructor(private modalServ: ModalServiceService) {}

  provinceValue(value: any) {
    console.log(value.value.province_id);
    this.modalServ.getCities(value.value.province_id).subscribe({
      next: (provinceCities) => {
        this.cities = provinceCities;

        console.log(this.cities);
        this.isCityInitial = true;
      },
      complete: () => {
        this.filteredCities.next(this.cities);
      },
    });

    // this.selectChange.emit(value);
  }
  ngOnInit() {
    // set initial selection
    // this.provinceCtrl.setValue('');
    this.modalServ.provinces.subscribe({
      next: (receivedProvinces) => {
        console.log('select input receivedProvinces', receivedProvinces);
        // this.modalServ.provinces.next(receivedProvinces);
        this.provinces = receivedProvinces;
        console.log('this.banks', this.provinces);
        this.filteredProvinces.next(this.provinces.slice());

        // this.modalServ.provinces.next(receivedProvinces);
      },
    });

    // load the initial bank list

    // this.filteredProvinces.next(this.banks.slice());

    // listen for search field value changes
    this.provinceFilterSearchCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCitiesOrProvince('provinces');
      });
    this.cityFilterSearchCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCitiesOrProvince('cities');
      });
  }

  ngAfterViewInit() {
    this.setInitialValue('province');
    this.setInitialValue('city');
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredProvinces are loaded initially
   */
  protected setInitialValue(initialDataType: string) {
    if (initialDataType == 'province') {
      this.filteredProvinces
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          // setting the compareWith property to a comparison function
          // triggers initializing the selection according to the initial value of
          // the form control (i.e. _initializeSelection())
          // this needs to be done after the filteredProvinces are loaded initially
          // and after the mat-option elements are available
          this.singleSelect.compareWith = (a: province, b: province) =>
            a && b && a.province_id === b.province_id;
        });
    } else if (initialDataType == 'city' && this.isCityInitial) {
      this.filteredCities
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          // setting the compareWith property to a comparison function
          // triggers initializing the selection according to the initial value of
          // the form control (i.e. _initializeSelection())
          // this needs to be done after the filteredProvinces are loaded initially
          // and after the mat-option elements are available
          this.singleSelectCity.compareWith = (a: city, b: city) =>
            a && b && a.city_id === b.city_id;
        });
    }
  }

  protected filterCitiesOrProvince(type: string) {
    // console.log(type, eval('this.' + type));
    let enterdTypeVariable = eval('this.' + type);
    if (!enterdTypeVariable) {
      // console.log('ohgd');
      return;
    }
    // get the search keyword
    let search =
      type == 'provinces'
        ? this.provinceFilterSearchCtrl.value
        : this.cityFilterSearchCtrl.value;
    if (!search) {
      type == 'provinces'
        ? this.filteredProvinces.next(enterdTypeVariable.slice())
        : this.filteredCities.next(enterdTypeVariable.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    if (type == 'provinces') {
      this.filteredProvinces.next(
        this.provinces.filter(
          (province: province) =>
            province.province_name.toLowerCase().indexOf(search) > -1
        )
      );
    } else if (type == 'cities' && this.isCityInitial) {
      this.filteredCities.next(
        this.cities.filter(
          (city: city) => city.city_name.toLowerCase().indexOf(search) > -1
        )
      );
    }
  }
}
