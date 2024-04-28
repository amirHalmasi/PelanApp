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
import { ReplaySubject, Subject, catchError, map, of, takeUntil } from 'rxjs';
import { ProvinceAndCitiesService } from 'src/app/home/province-and-cities-service.service';
import { CanDeactivateType } from 'src/app/shared/checkout.guard';
import { City } from 'src/app/shared/citiy.model';
import { Province } from 'src/app/shared/province.model';
import { SpecialUserRegister } from 'src/app/shared/register.model';
import { SweetAlertService } from 'src/app/shared/sweet-alert.service';
import { UploadandremoveadvService } from 'src/app/shared/uploadandremoveadv.service';
import { identityCodeValidator } from 'src/app/shared/validators/identityCode.validator';
// import { jpgSizeValidator } from 'src/app/shared/validators/imageMaxSize.validator';
import { jpgValidator } from 'src/app/shared/validators/jpg.validator';
import { mobileNumberValidator } from 'src/app/shared/validators/mobileNumber.validation';
import { persianLetterValidator } from 'src/app/shared/validators/persianLetter.validator';
import { telephoneValidator } from 'src/app/shared/validators/telePhone.validator';
interface removeimage {
  keycode: string;
  result: string;
  remainFiles: string[];
  parentDirectory: string;
}
interface directions {
  value: string;
  viewValue: string;
}
interface SuitableFor {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-create-rent-or-sell',

  templateUrl: './create-rent-or-sell.component.html',
  styleUrl: './create-rent-or-sell.component.css',
})
export class CreateRentOrSellComponent implements OnInit, OnDestroy {
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild('neighborhood', { static: true }) neighborhood;
  @ViewChild('fileuploader', { static: true }) fileuploader;

  neighborhoodHint!: string;
  files: any;
  advertiseImages: string[] = [];
  advertiseCode!: string;
  loggedUserData!: {
    username: string;
    token: string;
    expire: any;
    usertype: string;
  };
  houseDirections: directions[] = [
    { value: 'shomaly', viewValue: 'شمالی' },
    { value: 'jonoby', viewValue: 'جنوبی' },
    { value: 'nabshJonoby', viewValue: 'نبش جنوبی' },
    { value: 'nabshShomaly', viewValue: 'نبش شمالی' },
  ];
  rentIsSuitableFor: SuitableFor[] = [
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

  provinces!: Province[];
  cities!: City[];
  isLoadingImage!: boolean;
  createdAdvertiseType: string;
  protected _onDestroy = new Subject();
  EditProductCode!: string;
  progressvalue: number;
  // filesName!: string[];
  filesName: { [key: number]: string } = {};
  constructor(
    private activeRoute: ActivatedRoute,
    private provinceAndCityServ: ProvinceAndCitiesService,
    private sweetAlert: SweetAlertService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private uploadAndRemoveServ: UploadandremoveadvService
  ) {
    this.navigateTo('rent');
    // const rndNumber = Math.floor(100000 + Math.random() * 900000);
    //  this.EditProductCode = toString(rndNumber);
  }
  navigateTo(advertiseType: string) {
    this.router.navigate(['../createAdvertise'], {
      relativeTo: this.route,
      queryParams: { 'advertise-type': advertiseType },
    });
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe({
      next: (res) => {
        console.log(res);
        this.createdAdvertiseType = res['advertise-type'];
      },
    });

    this.isSpecialUser = true;
    this.advertiseCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(this.advertiseCode);
    console.log(this.isSpecialUser);
    this.loggedUserData = JSON.parse(localStorage.getItem('userData'));
    console.log('dataStored', this.loggedUserData);
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
    this._onDestroy.next(null);
    this._onDestroy.complete();
  }
  neighborhoodChange() {
    // console.log(this.neighborhood.nativeElement.value.split(' ')[0]);
    const splitedNeighborhood =
      this.neighborhood.nativeElement.value.split(' ');
    console.log();
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
  private formCreater() {
    return new FormGroup({
      houseData: new FormGroup({
        houseDirection: new FormControl(null, [
          Validators.required,
          // persianLetterValidator(),
        ]),

        neighborhood: new FormControl(null, [
          Validators.required,
          // mobileNumberValidator(),
          persianLetterValidator(),
        ]),

        province: this.province,
        city: this.city,
      }),
      rentHouseDetails: new FormGroup({
        roomCount: new FormControl(
          null,
          this.createdAdvertiseType == 'rent'
            ? [
                Validators.required, //persianLetterValidator()
              ]
            : []
        ),
        floor: new FormControl(
          null,
          this.createdAdvertiseType == 'rent'
            ? [
                Validators.required, //persianLetterValidator()
              ]
            : []
        ),
        meterage: new FormControl(
          null,
          this.createdAdvertiseType == 'rent'
            ? [
                Validators.required, //persianLetterValidator()
              ]
            : []
        ),
        mortgage: new FormControl(
          null,
          this.createdAdvertiseType == 'rent'
            ? [
                Validators.required,
                // persianLetterValidator(),
              ]
            : []
        ),
        rentPrice: new FormControl(
          null,
          this.createdAdvertiseType == 'rent'
            ? [
                Validators.required,
                // persianLetterValidator(),
              ]
            : []
        ),
        suitable: new FormControl(
          null,
          this.createdAdvertiseType == 'rent'
            ? [
                Validators.required, //persianLetterValidator()
              ]
            : []
        ),
        description: new FormControl(
          null,
          this.createdAdvertiseType == 'rent'
            ? [
                // Validators.required,
                persianLetterValidator(),
              ]
            : []
        ),
      }),
      advertise: new FormControl(null, [jpgValidator()]),
    });
  }

  removeFile(index: number) {
    const userName = this.loggedUserData.username;
    const advertiseCode = this.advertiseCode;
    const fileName = this.filesName[index].split('.')[0];
    console.log(fileName);
    this.uploadAndRemoveServ
      // .RemoveImage(index.toString(), userName, advertiseCode)

      .RemoveImage(fileName, userName, advertiseCode)
      .subscribe({
        next: (removeFileResponse: any) => {
          console.log('Remaining files:', removeFileResponse);
          const filesPathList = removeFileResponse.remainFiles;
          this.advertiseImages = filesPathList;
          this.filesName = removeFileResponse['remainFilesName'];
          console.log('removeFileResponse', removeFileResponse);
        },
        error: (error) => {
          console.error('Error during file removal:', error);
        },
        complete: () => {
          this.filesName ? this.getImages() : {};
        },
      });
  }

  onchange(event: any) {
    console.log(event.target.files);
    this.advertiseImages = [];
    this.files = event.target.files;
    console.log(this.files, this.files[0].name);
    for (let i = 0; i < this.files.length; i++) {
      let itemfilename = this.files[i].name;
      console.log('itemfilename', itemfilename);
      let key = itemfilename.split('.')[0]; // Extracting filename without extension
      this.filesName[i] = key;
    }

    for (let index = 0; index < this.files.length; index++) {
      if (this.files[index].name.slice(-4) !== '.jpg') {
        console.log('Invalid image file:', this.files[index].name);
        return false;
      }

      let reader = new FileReader();
      reader.readAsDataURL(this.files[index]);

      reader.onload = () => {
        this.advertiseImages.push(reader.result as string);
      };
    }
    console.log(this.advertiseImages, 'advertise image');
  }

  ProceedUpload() {
    if (this.files.length === 0) {
      console.log('No files selected for upload.');
      return;
    }
    // const loggedUserData = this.loggedUserData;
    // Assuming you have username and advertiseCode available in your component
    // const username = loggedUserData ? loggedUserData.username : 'noUserLogged'; // Replace with actual username
    // const advertiseCode = Math.floor(
    //   100000 + Math.random() * 900000
    // ).toString(); //'exampleAdvertiseCode'; // Replace with actual advertiseCode

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
    //   this.submitedData = {
    //     firstname: this.signupForm.value.userData.firstname,
    //     lastname: this.signupForm.value.userData.lastname,
    //     userid: this.signupForm.value.userData.identityCode,
    //     email: this.signupForm.value.userData.email,
    //     mobile: this.signupForm.value.userData.mobile,
    //     gender: this.signupForm.value.userData.gender,
    //     provinceid: this.signupForm.value.userData.province,
    //     cityid: this.signupForm.value.userData.city,
    //     shopname: this.signupForm.value.shopData.shopName,
    //     shopaddress: this.signupForm.value.shopData.shopAddress,
    //     tels: String(this.signupForm.value.shopData.telePhone),
    //     usertype: 'special',
    //   };
    // } else {
    //   this.submitedData = {
    //     firstname: this.signupForm.value.userData.firstname,
    //     lastname: this.signupForm.value.userData.lastname,
    //     userid: this.signupForm.value.userData.identityCode,
    //     email: this.signupForm.value.userData.email,
    //     mobile: this.signupForm.value.userData.mobile,
    //     gender: this.signupForm.value.userData.gender,
    //     provinceid: this.signupForm.value.userData.province,
    //     cityid: this.signupForm.value.userData.city,
    //     usertype: 'regular',
    //   };
    // }

    // console.log(JSON.stringify(this.submitedData));

    // this.submitMyFormDataHttp(
    //   'https://localhost:5001/api/account/register',
    //   this.submitedData
    // );
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
  // canDeactivateFn(): CanDeactivateType {
  //   if (
  //     !this.provinceAndCityServ.provinceNames ||
  //     this.changeSaved ||
  //     this.isSignup
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
    this.uploadAndRemoveServ
      .GetImages(this.loggedUserData.username, this.advertiseCode)
      .subscribe({
        next: (imageBase64List: string[]) => {
          console.log('Remaining images:', imageBase64List);
          if (imageBase64List.length > 0) {
            this.advertiseImages = imageBase64List.map((imageBase64) => {
              return 'data:image/png;base64, ' + imageBase64;
            });
          }
        },
        error: (error) => {
          console.error('Error getting remaining images:', error);
        },
        complete: () => {
          this.isLoadingImage = false;
        },
      });
  }
}
