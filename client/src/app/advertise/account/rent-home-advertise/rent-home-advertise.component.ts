import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  ReplaySubject,
  Subject,
  catchError,
  map,
  of,
  takeUntil,
} from 'rxjs';
import { ProvinceAndCitiesService } from 'src/app/home/province-and-cities-service.service';
import { CanDeactivateType } from 'src/app/shared/checkout.guard';
import { City } from 'src/app/shared/citiy.model';
import { Province } from 'src/app/shared/province.model';

import { SweetAlertService } from 'src/app/shared/sweet-alert.service';
import { UploadandremoveadvService } from 'src/app/shared/uploadandremoveadv.service';
import { identityCodeValidator } from 'src/app/shared/validators/identityCode.validator';
// import { jpgSizeValidator } from 'src/app/shared/validators/imageMaxSize.validator';
import { jpgValidator } from 'src/app/shared/validators/jpg.validator';
import { mobileNumberValidator } from 'src/app/shared/validators/mobileNumber.validation';
import { persianLetterValidator } from 'src/app/shared/validators/persianLetter.validator';
import { telephoneValidator } from 'src/app/shared/validators/telePhone.validator';
import { AdvertiseService } from '../advertise.service';
import { houseDirections } from 'src/app/shared/interface/houseDirection.interface';
import { SuitableRentFor } from 'src/app/shared/interface/suitableRentFor.interface';
import { positiveNumberValidator } from 'src/app/shared/validators/positiveNumber.validator';
import { HomeAdvertise } from 'src/app/shared/HomeAdvertise.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
interface removeimage {
  keycode: string;
  result: string;
  remainFiles: string[];
  parentDirectory: string;
}

@Component({
  selector: 'app-rent-home-advertise',
  templateUrl: './rent-home-advertise.component.html',
  styleUrl: './rent-home-advertise.component.css',
  animations: [
    trigger('HomeOrApartment', [
      // state(
      //   'false',
      //   style({
      //     transform: 'translateX(0)',
      //   })
      // ),
      // state('true', style({ transform: 'translateX(-150%)', opacity: 0 })),
      transition(':leave', [
        animate(
          '1s',
          style({
            // transform: 'scale(0)',
            opacity: 0,
          })
        ),
      ]),
      transition(':enter', [
        style({
          // transform: 'scale(0)',
          opacity: 0,
        }),
        animate(
          '1s',
          style({
            // transform: 'scale(1)',
            opacity: 1,
          })
        ),
      ]),
      // transition('false <=> true', [animate('1s')]),
    ]),
  ],
})
export class RentHomeAdvertiseComponent implements OnInit, OnDestroy {
  @ViewChild('provinceSelect', { static: true }) provinceSelect: MatSelect;
  @ViewChild('neighborhood', { static: true }) neighborhood;
  @ViewChild('fileuploader', { static: true }) fileuploader;

  neighborhoodHint!: string;
  files: any;
  mortgagePriceHint$: Observable<string>;
  rentPriceHint$: Observable<string>;
  mortgagePriceHint: string = 'مبلغ رهن را وارد کنید.';
  rentPriceHint: string = 'مبلغ اجاره را وارد کنید.';
  advertiseImages: string[] = [];
  advertiseImagesObservable$: Observable<string[]>;
  advertiseCode!: string;
  loggedUserData!: {
    username: string;
    token: string;
    expire: any;
    usertype: string;
  };
  houseDirections: houseDirections[] = [
    { value: 'shomaly', viewValue: 'شمالی' },
    { value: 'jonoby', viewValue: 'جنوبی' },
    { value: 'nabshJonoby', viewValue: 'نبش جنوبی' },
    { value: 'nabshShomaly', viewValue: 'نبش شمالی' },
  ];
  rentIsSuitableFor: SuitableRentFor[] = [
    {
      value: 'single',
      viewValue: 'مجرد',
    },
    {
      value: 'married',
      viewValue: 'متاهل',
    },
    {
      value: 'both',
      viewValue: 'مجرد و متاهل',
    },
  ];
  public province: FormControl = new FormControl(null, [
    Validators.required,
    // englishLetterValidator(),
  ]);
  public city: FormControl = new FormControl(null, [
    Validators.required,
    // englishLetterValidator(),
  ]);
  submitedData!: HomeAdvertise;
  isProvinceSelected: boolean = false;
  changeSaved: boolean = false;
  isSpecialUser: boolean = false;
  isAdvertiseSave: boolean = false;
  isApartment: boolean = false;

  public provinceFilter: FormControl = new FormControl();
  public cityFilter: FormControl = new FormControl();
  public filteredProvinces: any = new ReplaySubject(1);
  public filteredCities: any = new ReplaySubject(1);

  signupForm!: FormGroup;

  provinces!: Province[];
  cities!: City[];
  isLoadingImage!: boolean;
  createdAdvertiseType: string;
  protected _onDestroy = new Subject();
  EditProductCode!: string;
  progressvalue: number;
  // filesName!: string[];
  filesName: { [key: number]: string } = {};
  filesNameObservable$: Observable<string[]>;

  // isLastFile!: boolean;
  constructor(
    private activeRoute: ActivatedRoute,
    private provinceAndCityServ: ProvinceAndCitiesService,
    private sweetAlert: SweetAlertService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private uploadAndRemoveServ: UploadandremoveadvService,
    private advertiseServ: AdvertiseService
  ) {
    // this.navigateTo('rent');
    // const rndNumber = Math.floor(100000 + Math.random() * 900000);
    //  this.EditProductCode = toString(rndNumber);
  }
  // navigateTo(advertiseType: string) {
  //   this.router.navigate(['../createAdvertise'], {
  //     relativeTo: this.route,
  //     queryParams: { 'advertise-type': advertiseType },
  //   });
  // }
  ngOnInit(): void {
    // this.activeRoute.queryParams.subscribe({
    //   next: (res) => {
    //     console.log(res);
    this.createdAdvertiseType = this.advertiseServ.createdAdvertiseType;
    //   },
    // });
    // console.log(this.createdAdvertiseType);

    this.isSpecialUser = true;
    // this.advertiseCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.advertiseCode = new Date().getTime().toString();
    console.log(this.advertiseCode);
    // console.log(this.isSpecialUser);
    this.loggedUserData = JSON.parse(localStorage.getItem('userData'));
    console.log('///////// dataStored ///////////', this.loggedUserData);
    this.signupForm = this.formCreater();
    this.provinces = this.provinceAndCityServ.provinceNames;
    // console.log(this.signupForm);
    // this.uploadAndRemoveServ.GetImages('4280483851', '373021').subscribe({
    //   next: (imageBase64List) => {
    //     console.log('image recall', imageBase64List);
    //     this.advertiseImages = imageBase64List;
    //   },
    //   error: (error) => {
    //     console.error('Error getting remaining images:', error);
    //   },
    // });

    this.filteredProvinces.next(this.provinces.slice());
    this.provinceFilter.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks('this.provinceFilter');
      });
    // this.provinces = this.provinceAndCityServ.provinceNames;
  }

  ngOnDestroy() {
    // this.advertiseImagesObservable$.unsubscribe();
    // this.filesNameObservable$.unsubscribe();
    this._onDestroy.next(null);
    this._onDestroy.complete();
  }
  neighborhoodChange() {
    //نام محله رو
    // console.log(this.neighborhood.nativeElement.value.split(' ')[0]);
    const splitedNeighborhood =
      this.neighborhood.nativeElement.value.split(' ');
    // console.log();
    if (splitedNeighborhood.length > 1) {
      this.neighborhoodHint = splitedNeighborhood[0].concat(
        ' ',
        splitedNeighborhood[1]
      );
    } else {
      this.neighborhoodHint = splitedNeighborhood[0];
    }
    this.neighborhoodHint = this.returnNeighborhoodName(this.neighborhoodHint);
  }
  returnNeighborhoodName(neighborhood: string) {
    return 'نام محله: ' + neighborhood;
  }
  public formCreater() {
    return new FormGroup({
      houseData:
        // !this.isApartment
        //   ? new FormGroup({
        //       isApartment: new FormControl(false, []),
        //       houseDirection: new FormControl(null, [
        //         Validators.required,
        //         // persianLetterValidator(),
        //       ]),

        //       neighborhood: new FormControl(null, [
        //         Validators.required,
        //         // mobileNumberValidator(),
        //         persianLetterValidator(),
        //       ]),
        //     }) :
        new FormGroup({
          isApartment: new FormControl(this.isApartment, []),
          complexname: new FormControl(
            null,
            this.isApartment
              ? [
                  Validators.required,
                  persianLetterValidator(),
                  // persianLetterValidator(),
                ]
              : []
          ),
          houseDirection: new FormControl(null, [
            Validators.required,
            // persianLetterValidator(),
          ]),
          neighborhood: new FormControl(
            null,
            !this.isApartment
              ? [
                  Validators.required,
                  persianLetterValidator(),
                  // persianLetterValidator(),
                ]
              : []
          ),
        }),
      rentHouseDetails: new FormGroup({
        province: this.province,
        city: this.city,
        roomCount: new FormControl(
          null,
          [Validators.required, positiveNumberValidator()]

          // this.createdAdvertiseType == 'rent'
          //   ? [
          //       Validators.required, //persianLetterValidator()
          //     ]
          //   : []
        ),
        floor: new FormControl(
          null,
          [Validators.required, positiveNumberValidator()]

          // this.createdAdvertiseType == 'rent'
          //   ? [
          //       Validators.required, //persianLetterValidator()
          //     ]
          //   : []
        ),
        meterage: new FormControl(null, [
          Validators.required,
          positiveNumberValidator(),
        ]),
        mortgage: new FormControl(null, [
          Validators.required,
          positiveNumberValidator(),
        ]),
        rentPrice: new FormControl(null, [
          Validators.required,
          positiveNumberValidator(),
        ]),
        suitable: new FormControl(null, [
          Validators.required, //persianLetterValidator()
        ]),
        description: new FormControl(null, [
          // Validators.required,
          persianLetterValidator(),
        ]),
      }),
      advertise: new FormControl(null, [jpgValidator()]),
    });
  }

  removeFile(index: number) {
    const userName = this.loggedUserData.username;
    const advertiseCode = this.advertiseCode;
    const fileName = this.filesName[index].split('.')[0];
    delete this.filesName[index];
    // delete this.advertiseImages[index];
    // this.remainImagesAfterDelete();
    console.log('****remove file name:', fileName);
    console.log('****files before remove:', this.filesName);
    this.uploadAndRemoveServ
      // .RemoveImage(index.toString(), userName, advertiseCode)

      .RemoveImage(fileName, userName, advertiseCode)
      .subscribe({
        next: (removeFileResponse: any) => {
          const filesPathList = removeFileResponse.remainFiles;
          this.advertiseImages = filesPathList;

          // console.log('****advertise Images:', this.advertiseImages);
          // this.filesName = removeFileResponse['remainFilesName'];
          console.log(
            '_____remain images response:_____',
            removeFileResponse['remainFilesName']
          );
          this.filesNameObservable$ = of(removeFileResponse['remainFilesName']);
          console.log('****ramain files after remove:', this.filesName);
          this.filesNameObservable$.subscribe((imageNameValues) => {
            for (let i = 0; i < imageNameValues.length; i++) {
              this.filesName[i] = imageNameValues[i];
            }
          });
          if (removeFileResponse.result === 'DirectoryDeleted') {
            this.advertiseCode = new Date().getTime().toString();
            this.filesName = {};
          }
        },
        error: (error) => {
          console.error('Error during file removal:', error);
        },
        complete: () => {
          console.log(Object.keys(this.filesName));
          console.log(
            '****advertise images on complete:',
            this.advertiseImages
          );
          // Object.keys(this.filesName).length !== 2 ? this.getImages() : false;
          // if (Object.keys(this.filesName).length) {
          if (Object.keys(this.filesName).length) {
            this.getImages();
          }
          // if (this.advertiseImages.length) {
          //   this.getImages();
          // }

          console.log('files array remove image', this.files);
        },
      });
  }

  remainImagesAfterDelete(indexOfDeltingItem: number) {
    const deletingItem = this.advertiseImages[indexOfDeltingItem];
    let filtered = this.advertiseImages.filter((item) => {
      deletingItem !== item;
    });
    this.advertiseImages = filtered;
  }
  onchange(event: any) {
    console.log(event.target.files);
    // this.advertiseImages = [];
    this.files = event.target.files;
    console.log(this.files, this.files[0].name);

    // // for (let i = 0; i < this.files.length; i++) {
    // //   let itemfilename = this.files[i].name;
    // //   console.log('itemfilename', itemfilename);
    // //   let key = itemfilename.split('.')[0]; // Extracting filename without extension
    // //   console.log(this.filesName);
    // //   console.log(key);
    // //   // console.log(this.filesName[i]);
    // //   this.filesName[i] = key;
    // // }
    // console.log(this.filesName);
    // console.log(this.filesName[0]);

    // for (let index = 0; index < this.files.length; index++) {
    //   if (this.files[index].name.slice(-4) !== '.jpg') {
    //     console.log('Invalid image file:', this.files[index].name);
    //     return false;
    //   }

    //   let reader = new FileReader();
    //   reader.readAsDataURL(this.files[index]);

    //   reader.onload = () => {
    //     this.advertiseImages.push(reader.result as string);
    //   };
    // }
    // console.log(this.advertiseImages, 'advertise image');
  }

  determinPerice(enterdPrice, rentOrMortgage) {
    let price = +enterdPrice;

    // eval('console.log("eval enterdPrice", rentOrprice)');
    let hint = '';
    //how to assign value to eval eval('this.' + rentOrprice)='hint'?

    //
    if (price) {
      if (999 > price / 10 && price / 10 > 0) {
        hint = Math.floor(price / 10) + ' تومان';
      } else if (999 > price / 10000 && price / 10000 > 0) {
        hint =
          Math.floor(price / 10000) +
          ' هزار ' +
          Math.floor((price % 10000) / 10) +
          ' تومان';
      } else if (999 > price / 10000000 && price / 10000 > 0) {
        hint =
          Math.floor(price / 10000000) +
          ' میلیون ' +
          (Math.floor((price % 10000000) / 10000) > 0
            ? Math.floor((price % 10000000) / 10000) + ' هزار '
            : '') +
          (Math.floor((price % 10000) / 10) > 0
            ? Math.floor((price % 10000) / 10)
            : '') +
          ' تومان';
      } else if (999 > price / 10000000000 && price / 10000 > 0) {
        hint =
          Math.floor(price / 10000000000) +
          ' میلیارد ' +
          (Math.floor((price % 10000000000) / 10000000) > 0
            ? Math.floor((price % 10000000000) / 10000000) + ' میلیون '
            : '') +
          (Math.floor((price % 10000000) / 10000) > 0
            ? Math.floor((price % 10000000) / 10000) + ' هزار '
            : '') +
          (Math.floor((price % 10000) / 10) > 0
            ? Math.floor((price % 10000) / 10)
            : '') +
          ' تومان';
      }

      if (rentOrMortgage === 'mortagePriceHint') {
        this.mortgagePriceHint$ = of(hint);
        this.mortgagePriceHint$.subscribe((hint) => {
          this.mortgagePriceHint = hint;
        });
      } else if (rentOrMortgage === 'rentPriceHint') {
        this.rentPriceHint$ = of(hint);
        this.rentPriceHint$.subscribe((hint) => {
          this.rentPriceHint = hint;
        });
      }
    }
  }
  ProceedUpload() {
    if (this.files.length === 0) {
      console.log('No files selected for upload.');
      return;
    }

    let formData = new FormData();
    for (let index = 0; index < this.files.length; index++) {
      // formData.append('files', this.files[index], `image_${index}`);
      formData.append(
        'files',
        this.files[index],
        this.files[index].name.split('.')[0]
      );
    }

    // Append username and advertiseCode to the FormData
    // formData.append('username', username);
    formData.append('username', this.loggedUserData.username);
    formData.append('advertiseCode', this.advertiseCode);

    // Call your service to upload multiple files
    this.uploadAndRemoveServ.UploadImages(formData).subscribe({
      next: (events) => {
        if (events.type === HttpEventType.UploadProgress) {
          this.progressvalue = Math.round(
            (events.loaded / events.total!) * 100
          );
        } else if (events.type === HttpEventType.Response) {
          console.log('Upload completed');
          console.log(events.body['fileNames']);
          this.filesName = events.body['fileNames'];
          setTimeout(() => {
            this.progressvalue = 0;
          }, 100);
        }
      },
      error: (error) => {
        console.error('Error during file upload:', error);
      },
      complete: () => {
        this.getImages();
      },
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

  onSubmit() {
    console.log(this.signupForm.value);

    // if (this.isSpecialUser) {
    this.submitedData = {
      Username: this.loggedUserData.username,
      AdvertiseCode: this.advertiseCode,
      AdvertiseType: this.createdAdvertiseType,
      ProvinceId: this.signupForm.value.rentHouseDetails.province,
      CityId: this.signupForm.value.rentHouseDetails.city,
      Neighborhood: this.signupForm.value.houseData.neighborhood,
      HouseDirection: !this.isApartment
        ? this.signupForm.value.houseData.houseDirection
        : '',
      Floor: this.signupForm.value.rentHouseDetails.floor,
      Meterage: this.signupForm.value.rentHouseDetails.meterage,
      RentPrice: this.signupForm.value.rentHouseDetails.rentPrice,
      Mortgage: this.signupForm.value.rentHouseDetails.mortgage,
      RoomCount: this.signupForm.value.rentHouseDetails.roomCount,
      SuitableFor: this.signupForm.value.rentHouseDetails.suitable,
      IsItApartment: this.signupForm.value.houseData.isApartment.toString(),
      Description: this.signupForm.value.rentHouseDetails.description,
      ComplexName: this.isApartment
        ? this.signupForm.value.houseData.complexname
        : '',
    };
    console.log('my submited data', this.submitedData);
    this.submitMyFormDataHttp(
      'https://localhost:5001/api/Advertise/HomeAdvertise',
      this.submitedData
    );
  }

  submitMyFormDataHttp(targetUrl: string, sendedData: HomeAdvertise) {
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
          this.isAdvertiseSave = true;
          console.log(data);
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
  // canDeactivateFn(): CanDeactivateType {
  //   if (
  //     !this.provinceAndCityServ.provinceNames ||
  //     this.changeSaved ||
  //     this.isAdvertiseSave
  //   ) {
  //     return true;
  //   }

  //   if (
  //     // this.serverName !== this.server.name ||
  //     // (this.serverStatus !== this.server.status &&
  //     !this.changeSaved
  //   ) {
  //     // return confirm('Do you really want to leave?');
  //     //convert defalt confirm to sweetalert2 one👇
  //     return new Promise<boolean>((resolve) => {
  //       this.sweetAlert
  //         .confirm(
  //           'مطمئنی بدون ثبت نام میخوای بری؟',
  //           'خروج بدون ثبت نام',
  //           'question',
  //           'custome-font'
  //         )
  //         .then((result) => {
  //           // console.log('sweetalert result');
  //           // console.log(result);
  //           resolve(result.isConfirmed); // Resolve with the user's choice
  //         })
  //         .catch(() => {
  //           resolve(false); // In case of an error, consider it as not confirmed
  //         });
  //     });
  //   }
  // }
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
  getImages() {
    this.isLoadingImage = true;
    let imagesResponse!: string[];
    this.uploadAndRemoveServ
      .GetImages(this.loggedUserData.username, this.advertiseCode)
      .subscribe({
        next: (imageBase64List: string[]) => {
          console.log('Remaining images:', imageBase64List);
          if (imageBase64List.length > 0) {
            // this.advertiseImages = imageBase64List.map((imageBase64) => {
            imagesResponse = imageBase64List.map((imageBase64) => {
              return 'data:image/png;base64, ' + imageBase64;
            });
          }
          console.log('imagesResponse', imagesResponse);
          this.advertiseImagesObservable$ = of(imagesResponse);
        },
        error: (error) => {
          console.error('Error getting remaining images:', error);
        },
        complete: () => {
          this.isLoadingImage = false;
          this.advertiseImagesObservable$.subscribe((values) => {
            console.log('get images advertise Images complete part:', values);
            this.advertiseImages = values;
          });
        },
      });
  }
  isApartmentChecked(event: any) {
    console.log('checkbox evnt', event);
  }
  // getImages() {
  //   this.isLoadingImage = true;
  //   this.uploadAndRemoveServ
  //     .GetImages(this.loggedUserData.username, this.advertiseCode)
  //     .subscribe({
  //       next: (imageBase64List: string[]) => {
  //         console.log('Remaining images:', imageBase64List);
  //         if (imageBase64List.length > 0) {
  //           this.advertiseImages = imageBase64List.map((imageBase64) => {
  //             return 'data:image/png;base64, ' + imageBase64;
  //           });
  //         }
  //       },
  //       error: (error) => {
  //         console.error('Error getting remaining images:', error);
  //       },
  //       complete: () => {
  //         this.isLoadingImage = false;
  //         console.log(
  //           'get images advertise Images complete part:',
  //           this.advertiseImages
  //         );
  //       },
  //     });
  // }
}
