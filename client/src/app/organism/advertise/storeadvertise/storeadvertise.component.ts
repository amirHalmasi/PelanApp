import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { flipInOut, slideRightInOut } from 'src/app/services/animation';
import { numberValidator } from 'src/assets/validation/password.validator';
import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';
import {
  ImageDto,
  UploadFinishedEvent,
  UploadfileComponent,
} from '../uploadfile/uploadfile.component';
import { HttpClient } from '@angular/common/http';
import { NumberToWordsService } from '../numberToword.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {
  fileUploadData,
  FileUploadservice,
} from '../uploadfile/fileUpload.service';
import { Subscription } from 'rxjs';
import { CanDeactivateType } from '../../signup-from/can-deactivate-gaurde';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { AdvertisesService } from '../advertises.service';
import { ProvinceAndCityService } from '../../province-and-city-select-list/province-and-city.service';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { HouseAdvetiseProfileService } from '../../my-advertises/my-advertises-profile.service';
import { city, province } from 'src/app/services/modal-service.service';
import { ActionBtnAtomComponent } from '../../city-province-modal/action-btn-atom/action-btn-atom.component';
import { ProvinceAndCityComponent } from '../../province-and-city-select-list/province-and-city.component';
import { MatInputModule } from '@angular/material/input';
import { RentStoreComponent } from './rent-store/rent-store.component';
import { SellStoreComponent } from './sell-store/sell-store.component';
import { CommonComponent } from './common/common.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-storeadvertise',
  templateUrl: './storeadvertise.component.html',
  styleUrls: ['./storeadvertise.component.css'],
  animations: [slideRightInOut],
  standalone: true,
  imports: [
    UploadfileComponent,
    NgIf,
    NgFor,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    CommonComponent,
    SellStoreComponent,
    RentStoreComponent,
    MatInputModule,
    ProvinceAndCityComponent,
    NgClass,
    ActionBtnAtomComponent,
  ],
})
export class StoreadvertiseComponent implements OnInit, OnDestroy {
  // @ViewChild('houseTypeSelect') houseTypeSelect!: MatSelect;
  // storeState: string = 'Villaie';
  isSubmitAdvertise: boolean = false;
  advertiseTypeValue!: string;
  storeType!: string;
  imageUploadMessage!: string;
  @Input() uploadedImageData!: string;
  fileUploadData!: fileUploadData;

  advertiseTypes: any = [
    { value: 'sell', desc: 'فروش' },
    { value: 'rent', desc: 'اجاره' },
  ];

  signupBtnOption: {
    iconName: string;
    btnType: string;
    btnText?: string;
  } = {
    iconName: '',
    btnType: 'submit',
    btnText: 'درج آگهی',
  };
  updateBtnOption: {
    iconName: string;

    btnType: string;
    btnText?: string;
  } = {
    iconName: '',
    btnType: 'submit',
    btnText: 'اعمال تغییرات',
  };
  fileUploadSubscription!: Subscription;
  imageData!: {
    highQualityFiles: ImageDto[];
    lowQualityFiles: ImageDto[];
  };
  hasBalconye: boolean = false;
  hasElevator: boolean = false;
  username!: string;
  advertiseCode!: string;
  icon!: any;
  advertiseStoreForm!: FormGroup;
  // files: { highQualityFiles: any; lowQualityFiles: any; };
  files!: any;
  // fileUploadData!: fileUploadData;
  editData!: any;
  preUrl!: string;
  isEditPage_On: boolean = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    // private numberToWordsService: NumberToWordsService
    private fileUploadServ: FileUploadservice,
    private advertiseServ: AdvertisesService,
    // /////////////////////
    private provinceListServ: ProvinceAndCityService,

    private advertiseData: AdvetiseDataService,
    private houseAdvertiseServ: HouseAdvetiseProfileService
  ) {
    // console.log(
    //   'route states house',
    //   this.router.getCurrentNavigation()?.extras.state
    // );
  }
  ngOnDestroy(): void {
    // this.fileUploadSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.icon = faTrash;
    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    this.username = user.username;
    // this.advertiseCode = Math.floor(Math.random() * 1000000000).toString();

    this.fileUploadSubscription =
      this.fileUploadServ.uploadedImageData.subscribe(
        (data: fileUploadData) => {
          console.log('upload image Data house', data);
          if (data.imageData.highQualityFiles.length > 0) {
            this.imageData = data.imageData;
            this.imageUploadMessage = '';
            this.advertiseCode = data.advertiseCode;
            this.username = data.username;
          } else {
            this.imageData = {
              highQualityFiles: [],
              lowQualityFiles: [],
            };
          }
        }
      );

    //
    //
    //
    // this.determineHouseType(this.houseTypeSelect.value);
    this.advertiseStoreForm = this.fb.group({
      ////////////////////////////////////
      // common fields                  //
      ////////////////////////////////////
      type: this.fb.group({
        advertiseType: [null, Validators.required],
      }),
      commonFields: this.fb.group({
        storeMeter: [null, [Validators.required, numberValidator()]],

        storeType: [null, Validators.required],
        hasBalconey: [this.hasBalconye],
        hasElevator: [this.hasElevator],
        hasRestroom: [false],
        hasParking: [false],
        hasCeramic: [false],
        balconyeMeter: [null],
        parkingType: [null],
        floor: [null],
        pasajhName: [null],
        majmoehName: [null],
      }),

      // sell fields will add next time

      /////////////////////////////
      //for sell advertise fields//
      /////////////////////////////
      sellFields: this.fb.group({
        groundMeter: [null],
        price: [null],
        storeDocument: [null],
        owneringType: [null],
        storeWidth: [null],
      }),
      //////////////////////////////
      //for rent advertise fields //
      //////////////////////////////
      rentFields: this.fb.group({
        depositPrice: [null],
        rentPrice: [null],
        rentStoreType: [null],
        controlType: [null],
        flatStatusType: [null],
      }),
      // location: this.fb.group({
      neighbourhood: [null, [persianLetterValidator(), Validators.required]],
      cityAndProvince: this.fb.group({
        city: [null, Validators.required],
        province: [null, Validators.required],
      }),
      // }),

      desc: [null],
    });
    this.advertiseData.previousRouteURL.subscribe((preRoute) => {
      console.log('preRoute', preRoute);
      if (preRoute === 'edit/store') {
        this.preUrl = preRoute;
        this.isEditPage_On = true;
        console.log(
          'this.storeAdvertiseServ.advertiseItem',
          this.houseAdvertiseServ.advertiseItem
        );
        this.formValuePatch(this.houseAdvertiseServ.advertiseItem.advertise);
        // this.formValuePatch(this.houseAdvertiseServ.advertiseItem.advertise);
        const transformedFiles = {
          highQualityFiles: this.houseAdvertiseServ.advertiseItem.files.map(
            (file: any) => ({
              path: file.highQuality,
              fileName: file.lowQuality.split('/').pop() || file.lowQuality,
            })
          ),
          lowQualityFiles: this.houseAdvertiseServ.advertiseItem.files.map(
            (file: any) => ({
              path: file.lowQuality,
              fileName: file.lowQuality.split('/').pop() || file.lowQuality,
            })
          ),
        };
        this.files = transformedFiles;
        console.log('transformedFiles store', transformedFiles);
        // // this.fileUploadServ.uploadedImageData.next({
        // //   advertiseCode:
        // //     this.houseAdvertiseServ.advertiseItem.advertise.advertiseCode,
        // //   imageData: transformedFiles,
        // //   username: this.houseAdvertiseServ.advertiseItem.advertise.username,
        // // });
        this.editData = {
          ...this.houseAdvertiseServ.advertiseItem,
          files: transformedFiles,
        };

        // // Replace original files array with transformed object
        // data.files = transformedFiles;
        this.advertiseCode =
          this.houseAdvertiseServ.advertiseItem.advertise.advertiseCode;
      } else {
        this.advertiseCode = Math.floor(Math.random() * 1000000000).toString();
      }
    });
  }
  onKeyPress_onlyPersianLettersAndSpace(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);

    const persianRegex = /^[\u0600-\u06FF\s]+$/;

    if (!persianRegex.test(charStr)) {
      event.preventDefault();
    }
  }

  //
  //
  //
  //
  //
  //
  //

  markAllControlsAsTouchedAndDirty(control: AbstractControl) {
    if (control instanceof FormGroup) {
      Object.values(control.controls).forEach((ctrl) => {
        // console.log('ctrl', ctrl);
        this.markAllControlsAsTouchedAndDirty(ctrl);
      });
    } else {
      control.markAsTouched();
      control.markAsDirty();
    }
  }
  submitStoreAdvertise() {
    this.markAllControlsAsTouchedAndDirty(this.advertiseStoreForm);
    // const transformedValue = this.transformFormValue(
    //   this.advertiseStoreForm.value
    // );
    // console.log(transformedValue.advertiseType);
    // console.log(this.advertiseStoreForm.value);

    if (
      !this.imageData?.highQualityFiles?.length ||
      !this.imageData.highQualityFiles
    ) {
      this.imageUploadMessage = 'عکس آگهی را آپلود کنید.';
      return;
    } else {
      this.imageUploadMessage = '';
    }
    if (!this.advertiseStoreForm.valid) {
      this.sweetAlertService.floatAlert(
        'قبل از درج آگهی، اطلاعات را کامل کنید.',
        'error'
      );
      return;
    }

    let baseAddStoreAdvertiseUrl = 'https://localhost:5001/api/storeadvertise/';
    this.advertiseServ.addAdvertise(
      baseAddStoreAdvertiseUrl,
      this.advertiseStoreForm.value,
      this.username,
      this.advertiseCode,
      'store'
    );
    this.advertiseServ.isSubmitAdvertise.subscribe({
      next: (isSubmited) => {
        this.isSubmitAdvertise = isSubmited;
      },
    });
  }

  //
  //
  //
  //
  updateStoreAdvertise() {
    this.markAllControlsAsTouchedAndDirty(this.advertiseStoreForm);
    console.log(
      '  this.advertiseStoreForm.value',
      this.advertiseStoreForm.value
    );

    if (
      (!this.imageData?.highQualityFiles?.length &&
        this.preUrl !== 'edit/store') ||
      (!this.files?.highQualityFiles?.length && this.preUrl === 'edit/store')
    ) {
      this.imageUploadMessage = 'عکس آگهی را آپلود کنید.';
      return;
    } else {
      this.imageUploadMessage = '';
    }

    if (!this.advertiseStoreForm.valid) {
      this.sweetAlertService.floatAlert(
        'قبل از درج آگهی، اطلاعات را کامل کنید.',
        'error'
      );
      return;
    }
    let baseAddStoreAdvertiseUrl = 'https://localhost:5001/api/storeadvertise/';
    this.advertiseServ.updateAdvertise(
      baseAddStoreAdvertiseUrl,
      this.advertiseStoreForm.value,
      this.username,
      this.advertiseCode,
      'store'
    );
  }

  //
  //
  //
  formValuePatch(advertiseData: any) {
    const provinceValue = this.provinceListServ.provincesList.filter(
      (province: province) => province.province_id == advertiseData.provinceId
    );
    let cityValue;
    console.log('store form patch', cityValue, provinceValue);
    this.provinceListServ.citiesList.subscribe({
      next: (cities) =>
        (cityValue = cities.filter(
          (city: city) => city.city_id == advertiseData.cityId
        )[0]),
    });
    console.log('cityValue', cityValue);
    this.advertiseStoreForm.patchValue({
      // Set advertiseType
      type: {
        advertiseType: advertiseData.advertiseType,
      },

      // Set common fields
      commonFields: {
        storeMeter: advertiseData.storeMeter,
        storeType: advertiseData.storeType,
        hasBalconey: advertiseData.hasBalconey === 'true' ? true : false,
        hasElevator: advertiseData.hasElevator === 'true' ? true : false,
        hasRestroom: advertiseData.hasRestroom === 'true' ? true : false,
        hasParking: advertiseData.hasParking === 'true' ? true : false,
        hasCeramic: advertiseData.hasCeramic === 'true' ? true : false,
        balconyeMeter: advertiseData.balconyeMeter,
        parkingType: advertiseData.parkingType,
        floor: advertiseData.floor,
        pasajhName: advertiseData.pasajhName,
        majmoehName: advertiseData.majmoehName,
      },

      // Set rent-specific fields
      rentFields: {
        depositPrice: advertiseData.depositPrice,
        rentPrice: advertiseData.rentPrice,
        rentStoreType: advertiseData.storeRentType,
        controlType: advertiseData.branchesControlStatus,
        flatStatusType: advertiseData.flatStatusType,
      },
      sellFields: {
        groundMeter: advertiseData.groundMeter,
        price: advertiseData.price,
        storeDocument: advertiseData.storeDocument,
        owneringType: advertiseData.owneringType,
        storeWidth: advertiseData.storeWidth,
      },

      // Set location fields
      neighbourhood: advertiseData.neighborhood,
      cityAndProvince: {
        city: cityValue,
        province: provinceValue[0],
      },
      // Set description
      desc: advertiseData.description,
    });
    this.advertiseTypeValue = advertiseData.advertiseType;
    this.storeType = advertiseData.storeType;
  }
  public uploadFinish = (event: UploadFinishedEvent) => {
    // this.imageData = event.imageData;
    // this.username = event.username;
    // this.advertiseCode = event.advertiseCode;
    this.imageUploadMessage;
    this.fileUploadData = {
      imageData: event.imageData,
      username: event.username,
      advertiseCode: event.advertiseCode,
    };
    this.files = event.imageData;
    console.log('uploadFinish', event);
    console.log('FileUploadFinish', this.fileUploadData);
    console.log('event uploaded finish', event);
  };

  createImagePath(serverPath: string | undefined) {
    if (!serverPath) {
      return;
    }
    serverPath = serverPath.replace(/\\/g, '/');
    return `https://localhost:5001/${serverPath}`;
  }
  deleteAllImages() {
    const authUser = JSON.parse(
      localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    );
    // console.log(authUser.token);
    const headers = {
      Authorization: `Bearer ${authUser.token}`,
    };
    return this.http.delete(
      `https://localhost:5001/api/upload/deleteAllImages?username=${this.getUsername()}&advertiseCode=${this.getAdvertiseCode()}`,
      { headers: headers }
    );
  }
  deleteImage(image: ImageDto) {
    // const authUser = JSON.parse(
    //   localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    // );
    // console.log(authUser.token);
    // const headers = {
    //   Authorization: `Bearer ${authUser.token}`,
    // };
    console.log('image.fileName', image.fileName);
    const fileNameOnly = image.fileName?.split('/').pop() || image.fileName;
    this.http
      .delete(
        `https://localhost:5001/api/upload/delete?advertiseCode=${this.getAdvertiseCode()}&fileName=${fileNameOnly}`,
        { withCredentials: true }
      )
      .subscribe({
        next: (res) => {
          console.log('deleteImage response', res);
          this.files.highQualityFiles = this.files.highQualityFiles.filter(
            (imgData: ImageDto) => imgData.fileName !== image.fileName
          );
          this.files.lowQualityFiles = this.files.lowQualityFiles.filter(
            (imgData: ImageDto) => imgData.fileName !== image.fileName
          );

          console.log(
            'this.imageData delete function next',

            this.files
          );
        },
        error: (error) => {
          console.error('Error deleting image:', error);
        },
        complete: () => {
          console.log(
            'this.imageData delete function complete',
            // this.fileUploadData.imageData
            this.fileUploadData
          );

          this.fileUploadServ.uploadedImageData.next({
            username: this.username,
            advertiseCode: this.advertiseCode,
            // advertiseCode: '4271377953',
            // imageData: this.fileUploadData.imageData,
            imageData: this.files,
          });
        },
      });
  }

  private getUsername(): string {
    // Implement logic to get the username
    return this.preUrl === 'edit/store'
      ? this.houseAdvertiseServ.advertiseItem.advertise.username
      : this.fileUploadData.username;
  }

  private getAdvertiseCode(): string {
    // Implement logic to get the advertise code
    this.advertiseCode =
      this.preUrl === 'edit/store'
        ? this.houseAdvertiseServ.advertiseItem.advertise.advertiseCode
        : this.fileUploadData.advertiseCode;
    return this.advertiseCode;
  }

  canDeactivateFn(): CanDeactivateType {
    // if (!this.allowEdit) {
    //   return true;
    // }

    if (!this.isSubmitAdvertise) {
      // return confirm('Do you really want to leave?');
      //convert defalt confirm to sweetalert2 one👇
      if (
        !this.imageData?.highQualityFiles?.length ||
        !this.imageData.highQualityFiles ||
        this.preUrl === 'edit/store'
      ) {
        return true;
      }

      return new Promise<boolean>((resolve) => {
        this.sweetAlertService
          .confirm(
            'ایا خارج می شوید؟',
            'بدون کامل کردن اطلاعات آگهی برای درج آگهی مغازه خارج میشوید.'
          )
          .then((result) => {
            console.log('sweetalert result');
            console.log(result);
            if (
              result.isConfirmed &&
              (!this.imageData?.highQualityFiles?.length ||
                !this.imageData.highQualityFiles)
            ) {
              resolve(true);
            } else if (
              result.isConfirmed &&
              this.imageData?.highQualityFiles?.length !== 0
            ) {
              this.deleteAllImages().subscribe({
                next: (res) => {
                  console.log('delete Image response', res);
                  // Remove the deleted image from imageData array
                  this.fileUploadData.imageData.highQualityFiles = [];
                  this.fileUploadData.imageData.lowQualityFiles = [];
                  console.log(
                    'this.imageData delete function next',
                    this.fileUploadData.imageData
                  );
                },
                error: (error) => {
                  console.error('Error deleting image:', error);
                  // Handle error
                },
                complete: () => {
                  console.log(
                    'this.imageData delete function complete',
                    this.fileUploadData.imageData
                  );
                  this.fileUploadServ.uploadedImageData.next({
                    ...this.fileUploadData,
                    imageData: this.fileUploadData.imageData,
                  });
                  resolve(true);
                },
              });
            }
            // Resolve with the user's choice
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
