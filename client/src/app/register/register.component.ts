import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvinceAndCitiesService } from '../home/province-and-cities-service.service';
import { Province } from '../shared/province.model';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { City } from '../shared/citiy.model';
import { CanDeactivateType } from '../shared/checkout.guard';
import { SweetAlertService } from '../shared/sweet-alert.service';
import { telephoneValidator } from '../shared/validators/telePhone.validator';
import { persianLetterValidator } from '../shared/validators/persianLetter.validator';
import { identityCodeValidator } from '../shared/validators/identityCode.validator';
import { mobileNumberValidator } from '../shared/validators/mobileNumber.validation';
import { SpecialUserRegister } from '../shared/register.model';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
    '../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css',
  ],
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  public province: FormControl = new FormControl(null, [
    Validators.required,
    // englishLetterValidator(),
  ]);
  public city: FormControl = new FormControl(null, [
    Validators.required,
    // englishLetterValidator(),
  ]);
  submitedData!: SpecialUserRegister;
  isProvinceSelected: boolean = false;
  changeSaved: boolean = false;
  isSpecialUser: boolean = false;
  isSignup: boolean = false;

  public provinceFilter: FormControl = new FormControl();
  public cityFilter: FormControl = new FormControl();
  public filteredProvinces: any = new ReplaySubject(1);
  public filteredCities: any = new ReplaySubject(1);

  signupForm!: FormGroup;
  genders: { value: string; name: string }[] = [
    { value: 'male', name: 'مرد' },
    { value: 'female', name: 'زن' },
  ];
  provinces!: Province[];
  cities!: City[];

  protected _onDestroy = new Subject();
  constructor(
    private activeRoute: ActivatedRoute,
    private provinceAndCityServ: ProvinceAndCitiesService,
    private sweetAlert: SweetAlertService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.isSpecialUser =
      this.activeRoute.snapshot.queryParams['user-type'] === 'special user'
        ? true
        : false;

    console.log(this.isSpecialUser);

    this.signupForm = this.formCreater();
    this.provinces = this.provinceAndCityServ.provinceNames;
    console.log(this.signupForm);

    // console.log(this.provinceAndCityServ.provinceNames);

    // this.provinceAndCityServ.getProvinces().subscribe({
    //   next: (response: Province[]) => {
    //     this.provinces = this.provinceAndCityServ.provinceNames = response;
    //     console.log(this.provinceAndCityServ.provinceNames);
    //     // this.province.setValue(this.provinces);
    //     this.filteredProvinces.next(this.provinces.slice());

    //     this.provinceFilter.valueChanges
    //       .pipe(takeUntil(this._onDestroy))
    //       .subscribe(() => {
    //         this.filterBanks('this.provinceFilter');
    //       });
    //   },
    //   error: (error: any) => console.error(error),
    //   complete: () => {
    //     // this.isLoading = false;
    //   },
    // });
    // this.province.setValue(this.provinces);
    this.filteredProvinces.next(this.provinces.slice());

    this.provinceFilter.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks('this.provinceFilter');
      });
    // this.provinces = this.provinceAndCityServ.provinceNames;
  }

  ngAfterViewInit() {
    // this.setInitialValueProvince();
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next(null);
    this._onDestroy.complete();
  }

  private formCreater() {
    return new FormGroup({
      userData: new FormGroup({
        firstname: new FormControl(null, [
          Validators.required,
          persianLetterValidator(),
          // englishLetterValidator(),
        ]),
        lastname: new FormControl(null, [
          Validators.required,
          persianLetterValidator(),
        ]),
        identityCode: new FormControl(null, [
          Validators.required,
          identityCodeValidator(),
        ]),
        mobile: new FormControl(null, [
          Validators.required,
          mobileNumberValidator(),
        ]),
        email: new FormControl(null, [
          Validators.email,
          // englishLetterValidator(),
        ]),
        gender: new FormControl(null, [Validators.required]),
        province: this.province,
        city: this.city,
      }),
      shopData: new FormGroup({
        shopAddress: new FormControl(
          null,
          this.isSpecialUser
            ? [
                // Validators.required,
                persianLetterValidator(),
              ]
            : []
        ),
        shopName: new FormControl(
          null,
          this.isSpecialUser
            ? [
                // Validators.required,
                persianLetterValidator(),
              ]
            : []
        ),
        telePhone: new FormArray([
          new FormControl(
            [],
            this.isSpecialUser
              ? [
                  // Validators.required,
                  telephoneValidator(),
                ]
              : []
          ),
        ]),
      }),
    });
  }

  protected filterBanks(enterdFilter: string) {
    // console.log('filter bank', enterdFilter);
    // const selectedFilterVariable = eval(enterdFilter);
    let mainData = eval(
      enterdFilter === 'this.provinceFilter' ? 'this.provinces' : 'this.cities'
    );
    // console.log('filter bank', String(mainData));
    let filteredMainData = eval(
      enterdFilter === 'this.provinceFilter'
        ? 'this.filteredProvinces'
        : 'this.filteredCities'
    );

    if (!this.provinces) {
      return;
    }

    let search = eval(enterdFilter).value;

    if (!search) {
      filteredMainData.next(mainData.slice());

      return;
    }

    const filtered =
      enterdFilter === 'this.provinceFilter'
        ? mainData.filter((province: Province) =>
            province.provinceName.includes(search)
          )
        : mainData.filter((city: City) => city.cities.includes(search));

    filteredMainData.next(filtered);
  }
  getControls() {
    // console.log((this.signupForm.get('telePhone') as FormArray).controls);
    return (this.signupForm.get('shopData.telePhone') as FormArray).controls;
  }
  onAddTel() {
    const control = new FormControl(null, [telephoneValidator()]);
    (this.signupForm.get('shopData.telePhone') as FormArray).push(control);
  }
  onDelete(i: number) {
    return (this.signupForm.get('shopData.telePhone') as FormArray).removeAt(i);
  }
  getLength() {
    return (<FormArray>this.signupForm.get('shopData.telePhone')).length;
  }
  onSubmit() {
    console.log(this.signupForm.value);
    if (this.isSpecialUser) {
      this.submitedData = {
        firstname: this.signupForm.value.userData.firstname,
        lastname: this.signupForm.value.userData.lastname,
        userid: this.signupForm.value.userData.identityCode,
        email: this.signupForm.value.userData.email,
        mobile: this.signupForm.value.userData.mobile,
        gender: this.signupForm.value.userData.gender,
        provinceid: this.signupForm.value.userData.province,
        cityid: this.signupForm.value.userData.city,
        shopname: this.signupForm.value.shopData.shopName,
        shopaddress: this.signupForm.value.shopData.shopAddress,
        tels: String(this.signupForm.value.shopData.telePhone),
        usertype: 'special',
      };
    } else {
      this.submitedData = {
        firstname: this.signupForm.value.userData.firstname,
        lastname: this.signupForm.value.userData.lastname,
        userid: this.signupForm.value.userData.identityCode,
        email: this.signupForm.value.userData.email,
        mobile: this.signupForm.value.userData.mobile,
        gender: this.signupForm.value.userData.gender,
        provinceid: this.signupForm.value.userData.province,
        cityid: this.signupForm.value.userData.city,
        usertype: 'regular',
      };
    }

    console.log(JSON.stringify(this.submitedData));

    this.submitMyFormDataHttp(
      'https://localhost:5001/api/account/register',
      this.submitedData
    );
  }

  submitMyFormDataHttp(targetUrl: string, sendedData: SpecialUserRegister) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };
    this.http
      .post(targetUrl, JSON.stringify(sendedData), httpOptions)
      // .post(targetUrl, sendedData)
      .subscribe({
        next: (data) => {
          this.isSignup = true;
          this.showAlert({
            title: 'فقط محظ اطلاعت',
            desc: 'کدملی نام کاربری و موبایلت کلمه عبورته.',
          });
        },
        error: (error) => {
          console.log(error.error);
        },
        complete: () => {
          this.changeSaved = true;
        },
      });
  }

  onSelectProvince(provinceId: number) {
    let codeString = 'console.log("this is eval result",provinceId);';
    eval(codeString);
    // console.log(provinceId);

    this.provinceAndCityServ.getCity(provinceId).subscribe({
      next: (response) => {
        console.log(response);
        this.cities = this.provinceAndCityServ.provineCitiesList = response;

        this.filteredCities.next(this.cities.slice());

        this.cityFilter.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBanks('this.cityFilter');
          });
      },
      error: (error) => {
        console.error(error);
        this.isProvinceSelected = false;
      },
      complete: () => {
        // console.log('content ref', this.contentRef);

        this.isProvinceSelected = true;
      },
    });
  }
  canDeactivateFn(): CanDeactivateType {
    if (
      !this.provinceAndCityServ.provinceNames ||
      this.changeSaved ||
      this.isSignup
    ) {
      return true;
    }

    if (
      // this.serverName !== this.server.name ||
      // (this.serverStatus !== this.server.status &&
      !this.changeSaved
    ) {
      // return confirm('Do you really want to leave?');
      //convert defalt confirm to sweetalert2 one👇
      return new Promise<boolean>((resolve) => {
        this.sweetAlert
          .confirm(
            'مطمئنی بدون ثبت نام میخوای بری؟',
            'خروج بدون ثبت نام',
            'question',
            'custome-font'
          )
          .then((result) => {
            // console.log('sweetalert result');
            // console.log(result);
            resolve(result.isConfirmed); // Resolve with the user's choice
          })
          .catch(() => {
            resolve(false); // In case of an error, consider it as not confirmed
          });
      });
    }
  }
  showAlert(errorMessage: { title: string; desc: string }) {
    return new Promise<boolean>((resolve) => {
      this.sweetAlert
        .alert(errorMessage.title, errorMessage.desc, 'info')
        .then((result) => {
          resolve(result.isConfirmed); // Resolve with the user's choice
          this.router.navigate(['/login'], { relativeTo: this.route });
        });
    });
  }

  // protected setInitialValueProvince() {
  //   this.filteredProvinces
  //     .pipe(take(0), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       this.singleSelect.compareWith = (a: Province, b: Province) =>
  //         a && b && a.id !== b.id;
  //     });
  // }

  // protected setInitialValue() {
  //   this.filteredCities
  //     .pipe(take(0), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       this.singleSelect.compareWith = (a: City, b: City) =>
  //         a && b && a.id !== b.id;
  //     });
  // }
}
