// import { Component } from '@angular/core';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

// import { Bank, BANKS } from '../demodata';
import { MatSelect } from '@angular/material/select';
import {
  ModalServiceService,
  city,
  province,
} from 'src/app/services/modal-service.service';
import { flipInOut, slideRightInOut } from 'src/app/services/animation';
import { Router } from '@angular/router';
import { CanDeactivateType } from './can-deactivate-gaurde';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { HttpClient } from '@angular/common/http';
import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';
import { mobileNumberValidator } from 'src/assets/validation/mobile.validator';
import { melliCodeValidator } from 'src/assets/validation/melicode.validator';
import { phoneNumberValidator } from 'src/assets/validation/telephone.validator';

export class Country {
  constructor(public name: string, public code: string) {}
}
type Gender = {
  name: string;
  value: string;
};
@Component({
  selector: 'app-signup-from',
  templateUrl: './signup-from.component.html',
  styleUrls: ['./signup-from.component.css'],
  animations: [slideRightInOut, flipInOut],
})
// https://stackblitz.com/edit/select-search?file=src%2Fapp%2Fapp.component.html
export class SignupFromComponent implements OnInit, AfterViewInit, OnDestroy {
  private addressValidator = [Validators.required, persianLetterValidator()];
  private telephoneValidator = [Validators.required, phoneNumberValidator()];
  genders: Gender[] = [
    { name: 'مرد', value: 'male' },
    { name: 'زن', value: 'female' },
  ];
  signupBtnOption: {
    iconName: string;

    btnType: string;
    btnText?: string;
  } = {
    iconName: '',
    btnType: 'submit',
    btnText: 'ثبت نام',
  };
  isSignin: boolean = false;
  jobOwner: boolean = false;
  signupform!: FormGroup;
  provinces!: province[];
  cities!: city[];
  sendReq: boolean = false;

  /** control for the selected bank */
  // hideRequiredControl = ;
  public provinceCtrl: FormControl = new FormControl('', [Validators.required]);
  public cityCtrl: FormControl = new FormControl('', [Validators.required]);
  // hideRequiredControl: FormControl = new FormControl(false);

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

  constructor(
    private modalServ: ModalServiceService,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  provinceValue(value: any) {
    console.log(value.value.province_id);
    this.modalServ.getCities(value.value.province_id).subscribe({
      next: (provinceCities: city[]) => {
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

  private transformFormValue(formValue: any, jobOwner: boolean): any {
    let transformedValue = {
      ...formValue,
      city: formValue.city.city_id.toString(),
      province: formValue.province.province_id.toString(),
      isJobOwner: +formValue.isJobOwner,
    };

    // If the user is a job owner, add `phone` and `address` from `jobOwners`
    if (jobOwner && formValue.jobOwners) {
      transformedValue = {
        ...transformedValue,
        ...formValue.jobOwners,
      };
      delete transformedValue.jobOwners;
    }

    return transformedValue;
  }
  submit() {
    const transformedValue = this.transformFormValue(
      this.signupform.value,
      this.jobOwner
    );
    console.log(this.signupform.value);
    console.log(transformedValue);

    let registerUrl = 'https://localhost:5001/api/account/register';
    this.sendReq = true;

    this.http.post(registerUrl, transformedValue).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        // console.error(err);
        this.sendReq = false;

        return new Promise<boolean>(() => {
          this.sweetAlertService.floatAlert('مشخصات فردی تکراری است ', 'error');
        });
      },
      complete: () => {
        this.sendReq = false;

        this.isSignin = true;
        if (this.isSignin) {
          // return confirm('Do you really want to leave?');
          //convert defalt confirm to sweetalert2 one👇
          return new Promise<boolean>((resolve) => {
            this.sweetAlertService
              .alert(
                'توجه',
                'نام کاربری کد ملی و کلمه عبور شماره موبایل است',
                'warning'
              )
              .then((result) => {
                // console.log('sweetalert result');
                // console.log(result);
                if (result.isConfirmed) {
                  this.router.navigate(['/login']);
                } // Resolve with the user's choice
              })
              .catch(() => {
                resolve(false); // In case of an error, consider it as not confirmed
              });
          });
        } else {
          return true;
        }
      },
    });
  }

  createForm() {}
  ngOnInit() {
    // console.log(this.hideRequiredControl.value);
    this.signupform = this.fb.group({
      province: this.provinceCtrl,
      city: this.cityCtrl,
      firstname: [null, [Validators.required, persianLetterValidator()]],
      lastname: [null, [Validators.required, persianLetterValidator()]],
      userId: [null, [Validators.required, melliCodeValidator()]],
      email: [null, [Validators.email]],
      mobile: [null, [Validators.required, mobileNumberValidator()]],
      isJobOwner: [false],
      gender: ['male', [Validators.required]],
      jobOwners: this.fb.group({
        address: [null],
        phone: [null],
      }),
    });
    this.signupform.get('isJobOwner')?.valueChanges.subscribe((value) => {
      console.log('value', value);
      this.jobOwner = value;
      console.log(this.signupform.get('email'));
      const jobOwnersGroup = this.signupform.get('jobOwners') as FormGroup;
      if (value) {
        jobOwnersGroup.get('address')?.setValidators(this.addressValidator);
        jobOwnersGroup.get('phone')?.setValidators(this.telephoneValidator);
      } else {
        jobOwnersGroup.get('address')?.clearValidators();
        jobOwnersGroup.get('phone')?.clearValidators();
      }
      jobOwnersGroup.get('address')?.updateValueAndValidity();
      jobOwnersGroup.get('phone')?.updateValueAndValidity();
    });

    this.modalServ.getProvinces().subscribe({
      next: (receivedProvinces: province[]) => {
        console.log('select input receivedProvinces', receivedProvinces);

        this.provinces = receivedProvinces;
        console.log('this.banks', this.provinces);
        this.filteredProvinces.next(this.provinces.slice());
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
  canDeactivateFn(): CanDeactivateType {
    // if (!this.allowEdit) {
    //   return true;
    // }

    if (!this.isSignin) {
      // return confirm('Do you really want to leave?');
      //convert defalt confirm to sweetalert2 one👇
      return new Promise<boolean>((resolve) => {
        this.sweetAlertService
          .confirm('ایا خارج میشوید؟', 'بدون کامل کردن ثبت نام')
          .then((result) => {
            console.log('sweetalert result');
            console.log(result);
            resolve(result.isConfirmed); // Resolve with the user's choice
          })
          .catch(() => {
            resolve(false); // In case of an error, consider it as not confirmed
          });
      });
    } else {
      return true;
    }
  }
}
