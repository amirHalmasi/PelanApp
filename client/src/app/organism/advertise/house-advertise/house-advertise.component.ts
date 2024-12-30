import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { numberValidator } from 'src/assets/validation/password.validator';
import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';
import {
  ImageDto,
  UploadFinishedEvent,
} from '../uploadfile/uploadfile.component';
import { HttpClient } from '@angular/common/http';
import { NumberToWordsService } from '../numberToword.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { flipInOut } from 'src/app/services/animation';
import { Router } from '@angular/router';
import {
  fileUploadData,
  FileUploadservice,
} from '../uploadfile/fileUpload.service';
import { map, Subscription } from 'rxjs';
import { CanDeactivateType } from '../../signup-from/can-deactivate-gaurde';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { advertiseSuccesDto } from '../advertises.service';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { HouseAdvetiseProfileService } from '../../my-advertises/house-advertise-profile.service';
import { city, province } from 'src/app/services/modal-service.service';
import { ProvinceAndCityService } from '../../province-and-city-select-list/province-and-city.service';

@Component({
  selector: 'app-house-advertise',
  templateUrl: './house-advertise.component.html',
  styleUrls: ['./house-advertise.component.css'],
  // animations: [flipInOut],
})
export class HouseAdvertiseComponent implements OnInit, OnDestroy {
  // @ViewChild('houseTypeSelect') houseTypeSelect!: MatSelect;
  // buildingType: string = 'Villaie';
  buildingType!: string;
  advertiseTypeValue!: string;
  imageUploadMessage!: string;
  @Input() uploadedImageData!: string;
  isSubmitAdvertise: boolean = false;

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
  hasHouseWare: boolean = false;
  hasElevator: boolean = false;
  username!: string;
  userId!: number;
  advertiseCode!: string;
  icon!: any;
  advertiseHouseForm!: FormGroup;
  hintDescription!: string;
  files!: any;
  fileUploadData!: fileUploadData;
  editData!: any;
  preUrl!: string;
  isEditPage_On: boolean = false;
  constructor(
    private provinceListServ: ProvinceAndCityService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private fileUploadServ: FileUploadservice,
    private advertiseDataServ: AdvetiseDataService,
    private houseAdvertiseServ: HouseAdvetiseProfileService
  ) {
    // console.log(
    //   'route states house',
    //   this.router.getCurrentNavigation()?.extras.state
    // );
  }
  ngOnDestroy(): void {
    this.fileUploadSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.icon = faTrash;
    const user = JSON.parse(
      localStorage.getItem('authUser') ||
        '{isJobOwner:"",token:"",userId:0,username:""}'
    );

    this.username = user.username;
    this.userId = user.userId;

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
    // /////////////////////
    //
    // this.determineHouseType(this.houseTypeSelect.value);
    this.advertiseHouseForm = this.fb.group({
      ////////////////////////////////////
      // common fields                  //
      ////////////////////////////////////
      type: this.fb.group({
        advertiseType: [null, Validators.required],
      }),
      commonFields: this.fb.group({
        houseType: [null, Validators.required],
        houseMeter: [null, [Validators.required, numberValidator()]],
        rooms: [null, [Validators.required, numberValidator()]],
        hasElevator: [this.hasElevator],
        hasHouseWare: [this.hasHouseWare],
        wareHouseMeter: [null],
        parkingType: [null],
        buildingName: [null],
        floor: [null],
        orientations: [null],
        hasParking: [null],
      }),

      /////////////////////////////
      //for sell advertise fields//
      /////////////////////////////
      sellFields: this.fb.group({
        allUnits: [null],
        groundMeter: [null],
        state: [null],
        price: [null],
        floors: [null],
        tejariMeter: [null],
        houseDocument: [null],
      }),
      //////////////////////////////
      //for rent advertise fields //
      //////////////////////////////
      rentFields: this.fb.group({
        entryType: [null],
        depositPrice: [null],
        rentPrice: [null],
        rentFlatType: [null],
        controlType: [null],
        flatStatusType: [null],
      }),
      // location: this.fb.group({
      neighborhood: [null, [persianLetterValidator(), Validators.required]],
      cityAndProvince: this.fb.group({
        city: [null, Validators.required],
        province: [null, Validators.required],
      }),
      // }),

      desc: [
        null,
        // persianLetterValidator()
      ],
    });
    this.advertiseDataServ.previousRouteURL.subscribe((preRoute) => {
      console.log('preRoute', preRoute);
      if (preRoute === 'edit/house') {
        this.preUrl = preRoute;
        this.isEditPage_On = true;
        console.log(
          'this.houseAdvertiseServ.advertiseItem',
          this.houseAdvertiseServ.advertiseItem
        );

        this.formValuePatch(this.houseAdvertiseServ.advertiseItem.advertise);
        const transformedFiles = {
          highQualityFiles: this.houseAdvertiseServ.advertiseItem.files.map(
            (file: any) => ({
              path: file.highQuality,
              fileName: file.highQuality.split('\\').pop(),
            })
          ),
          lowQualityFiles: this.houseAdvertiseServ.advertiseItem.files.map(
            (file: any) => ({
              path: file.lowQuality,
              fileName: file.lowQuality.split('\\').pop(),
            })
          ),
        };
        this.files = transformedFiles;
        console.log('transformedFiles', transformedFiles);
        // this.fileUploadServ.uploadedImageData.next({
        //   advertiseCode:
        //     this.houseAdvertiseServ.advertiseItem.advertise.advertiseCode,
        //   imageData: transformedFiles,
        //   username: this.houseAdvertiseServ.advertiseItem.advertise.username,
        // });
        this.editData = {
          ...this.houseAdvertiseServ.advertiseItem,
          files: transformedFiles,
        };

        // Replace original files array with transformed object
        // data.files = transformedFiles;
        this.advertiseCode =
          this.houseAdvertiseServ.advertiseItem.advertise.advertiseCode;
        // console.log(this.advertiseCode);
      } else {
        this.advertiseCode = Math.floor(Math.random() * 1000000000).toString();
      }
    });
  }
  // submit() {
  //   // this.imageData = event.imageData;
  //   // this.username = event.username;
  //   // this.advertiseCode = event.advertiseCode;
  //   // this.fileUploadServ.uploadedImageData.subscribe((data: fileUploadData) => {
  //   //   console.log('upload image Data house', data);
  //   //   if (data.imageData.length > 0) {
  //   //     this.imageData = data.imageData;
  //   //   }
  //   //   this.imageData = [];
  //   // });
  //   if (!this.imageData.length) {
  //     this.imageUploadMessage = 'عکس آگهی را آپلود کنید.';
  //     return;
  //   }
  //   this.imageUploadMessage = '';
  //   console.log(this.advertiseCode, this.imageData, this.username);
  //   console.log(this.advertiseHouseForm.value);

  //   // console.log(transformedValue);

  //   // let registerUrl = 'https://localhost:5001/api/account/register';

  //   // this.http.post(registerUrl, transformedValue).subscribe({
  //   //   next: (res) => {
  //   //     console.log(res);
  //   //   },
  //   //   error: (err) => {
  //   //     // console.error(err);
  //   //     return new Promise<boolean>(() => {
  //   //       this.sweetAlertService.floatAlert('مشخصات فردی تکراری است ', 'error');
  //   //     });
  //   //   },
  //   //   complete: () => {
  //   //     this.isSignin = true;
  //   //     if (this.isSignin) {
  //   //       // return confirm('Do you really want to leave?');
  //   //       //convert defalt confirm to sweetalert2 one👇
  //   //       return new Promise<boolean>((resolve) => {
  //   //         this.sweetAlertService
  //   //           .alert(
  //   //             'توجه',
  //   //             'نام کاربری کد ملی و کلمه عبور شماره موبایل است',
  //   //             'warning'
  //   //           )
  //   //           .then((result) => {
  //   //             // console.log('sweetalert result');
  //   //             // console.log(result);
  //   //             if (result.isConfirmed) {
  //   //               this.router.navigate(['/login']);
  //   //             } // Resolve with the user's choice
  //   //           })
  //   //           .catch(() => {
  //   //             resolve(false); // In case of an error, consider it as not confirmed
  //   //           });
  //   //       });
  //   //     } else {
  //   //       return true;
  //   //     }
  //   //   },
  //   // });
  // }

  formValuePatch(advertiseData: any) {
    const provinceValue = this.provinceListServ.provincesList.filter(
      (province: province) => province.province_id == advertiseData.provinceId
    );
    let cityValue;
    this.provinceListServ.citiesList.subscribe({
      next: (cities) =>
        (cityValue = cities.filter(
          (city: city) => city.city_id == advertiseData.cityId
        )[0]),
    });
    console.log('cityValue', cityValue);
    this.advertiseHouseForm.patchValue({
      // Set advertiseType
      type: {
        advertiseType: advertiseData.advertiseType,
      },

      // Set common fields
      commonFields: {
        houseType: advertiseData.houseType,
        houseMeter: advertiseData.houseMeter,
        rooms: advertiseData.rooms,
        hasElevator: advertiseData.hasElevator === 'true' ? true : false,
        hasHouseWare: advertiseData.hasWareHouse === 'true' ? true : false,
        wareHouseMeter: advertiseData.wareHouseMeter,
        parkingType: advertiseData.parkingType,
        buildingName: advertiseData.buildingName,
        floor: advertiseData.floor,
        orientations: advertiseData.orientation,
        hasParking: advertiseData.hasParking === 'true' ? true : false,
      },

      // Set rent-specific fields
      rentFields: {
        entryType: advertiseData.entryType,
        depositPrice: advertiseData.depositPrice,
        rentPrice: advertiseData.rentPrice,
        rentFlatType: advertiseData.rentFlatType,
        flatStatusType: advertiseData.flatStatusType,
        controlType: advertiseData.branchStatus,
      },
      sellFields: {
        allUnits: advertiseData.allUnits,
        groundMeter: advertiseData.groundMeter,
        state: advertiseData.state,
        price: advertiseData.price,
        floors: advertiseData.floors,
        tejariMeter: advertiseData.tejariMeter,
        houseDocument: advertiseData.houseDocument,
      },

      // Set location fields
      neighborhood: advertiseData.neighborhood,
      cityAndProvince: {
        city: cityValue,
        province: provinceValue[0],
      },
      // Set description
      desc: advertiseData.description,
    });
    this.advertiseTypeValue = advertiseData.advertiseType;
    this.buildingType = advertiseData.houseType;
  }
  public uploadFinish = (event: UploadFinishedEvent) => {
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
    const authUser = JSON.parse(
      localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    );
    // console.log(authUser.token);
    const headers = {
      Authorization: `Bearer ${authUser.token}`,
    };
    this.http
      .delete(
        `https://localhost:5001/api/upload/delete?username=${this.getUsername()}&advertiseCode=${this.getAdvertiseCode()}&fileName=${
          image.fileName
        }`,
        { headers: headers }
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

          // Remove the deleted image from imageData array
          // this.fileUploadData.imageData.highQualityFiles =
          //   this.fileUploadData.imageData.highQualityFiles.filter(
          //     (img) => img.path !== image.path
          //   );
          // this.fileUploadData.imageData.lowQualityFiles =
          //   this.fileUploadData.imageData.lowQualityFiles.filter(
          //     (img) => img.path !== image.path
          //   );
          console.log(
            'this.imageData delete function next',
            // this.fileUploadData.imageData
            this.files
          );
        },
        error: (error) => {
          console.error('Error deleting image:', error);
          // Handle error
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
            // imageData: this.fileUploadData.imageData,
            imageData: this.files,
          });
          // if (this.files.length === 0) {
          //   this.fileUploadServ.uploadedImageData.next({
          //     ...this.fileUploadData,
          //     // imageData: this.fileUploadData.imageData,
          //     imageData: {
          //       highQualityFiles: [{ path: '', fileName: '' }],
          //       lowQualityFiles: [{ path: '', fileName: '' }],
          //     },
          //   });
          // }
          // this.preUrl===''
        },
      });
  }

  private getUsername(): string {
    // Implement logic to get the username
    return this.preUrl === 'edit/house'
      ? this.houseAdvertiseServ.advertiseItem.advertise.username
      : this.fileUploadData.username;
    // return this.username;
  }

  private getAdvertiseCode(): string {
    // Implement logic to get the advertise code

    // return this.advertiseCode;
    this.advertiseCode =
      this.preUrl === 'edit/house'
        ? this.houseAdvertiseServ.advertiseItem.advertise.advertiseCode
        : this.fileUploadData.advertiseCode;
    return this.advertiseCode;
  }

  //
  //
  //
  //
  //
  //
  //
  //submit house advertise

  private transformFormValue(formValue: any): any {
    let transformedValue = {
      ...formValue.commonFields,
      ...formValue.rentFields,
      ...formValue.sellFields,
      ...formValue.type,
      ...formValue,
      city: formValue?.cityAndProvince?.city?.city_id.toString(),
      province: formValue?.cityAndProvince?.province?.province_id.toString(),
      username: this.username,
      advertiserUserId: this.userId,
      advertiseCode: this.advertiseCode,
      hasElevator: formValue.commonFields.hasElevator.toString(),
      hasParking: formValue.commonFields.hasParking.toString(),
      hasHouseWare: formValue.commonFields.hasHouseWare.toString(),
    };
    delete transformedValue.commonFields;
    delete transformedValue.sellFields;
    delete transformedValue.rentFields;
    delete transformedValue.type;

    // If the user is a job owner, add `phone` and `address` from `jobOwners`
    // if (jobOwner && formValue.jobOwners) {
    //   transformedValue = {
    //     ...transformedValue,
    //     ...formValue.jobOwners,
    //   };
    //   delete transformedValue.jobOwners;

    // }

    return transformedValue;
  }

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
  updateHouseAdvertise() {
    this.markAllControlsAsTouchedAndDirty(this.advertiseHouseForm);
    console.log(
      '  this.advertiseHouseForm.value',
      this.advertiseHouseForm.value
    );
    const transformedValue = this.transformFormValue(
      this.advertiseHouseForm.value
    );
    if (
      (!this.imageData?.highQualityFiles?.length &&
        this.preUrl !== 'edit/house') ||
      (!this.files?.highQualityFiles?.length && this.preUrl === 'edit/house')
    ) {
      this.imageUploadMessage = 'عکس آگهی را آپلود کنید.';
      return;
    } else {
      this.imageUploadMessage = '';
    }

    if (!this.advertiseHouseForm.valid) {
      this.sweetAlertService.floatAlert(
        'قبل از درج آگهی، اطلاعات را کامل کنید.',
        'error'
      );
      return;
    }
    // const advertiseCode = this.advertiseHouseForm.value.advertiseCode;
    const advertiseCode = this.advertiseCode;
    const authUser = JSON.parse(
      localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    );

    const headers = {
      Authorization: `Bearer ${authUser.token}`,
    };
    this.http
      .patch(
        `https://localhost:5001/api/houseadvertise/${transformedValue.advertiseType}/${advertiseCode}`,
        transformedValue,
        {
          headers: headers,
        }
      )
      .subscribe({
        next: (response) => {
          console.log('Advertise updated successfully', response);
        },
        error: (error) => {
          console.error('Error updating the advertise', error);
        },
        complete: () => {
          this.houseAdvertiseServ.advertiseItem = '';
          this.router.navigate(['/myAdvertises', 'userHouseAdvertises']);
          this.advertiseDataServ.previousRouteURL.next('');
        },
      });
  }
  submitHouseAdvertise() {
    this.markAllControlsAsTouchedAndDirty(this.advertiseHouseForm);
    console.log(
      '  this.advertiseHouseForm.value',
      this.advertiseHouseForm.value
    );
    const transformedValue = this.transformFormValue(
      this.advertiseHouseForm.value
    );
    console.log(transformedValue);

    if (
      !this.imageData?.highQualityFiles?.length ||
      !this.imageData.highQualityFiles
    ) {
      this.imageUploadMessage = 'عکس آگهی را آپلود کنید.';
      return;
    } else {
      this.imageUploadMessage = '';
    }

    if (!this.advertiseHouseForm.valid) {
      this.sweetAlertService.floatAlert(
        'قبل از درج آگهی، اطلاعات را کامل کنید.',
        'error'
      );
      return;
    }

    let advertiseUrl =
      'https://localhost:5001/api/houseadvertise/' +
      transformedValue.advertiseType;
    const authUser = JSON.parse(
      localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    );

    const headers = {
      Authorization: `Bearer ${authUser.token}`,
    };

    this.http
      .post<advertiseSuccesDto>(advertiseUrl, transformedValue, {
        headers: headers,
      })
      .subscribe({
        next: (res: advertiseSuccesDto) => {
          console.log(res);
          if (res) {
            console.log(res);
          }
        },
        error: (err) => {
          console.error(err.error);
          // let errorMessage = '';

          // return new Promise<boolean>(() => {
          this.sweetAlertService.floatAlert('خطا در ثبت آگهی', 'error');
          // });
        },
        complete: () => {
          this.isSubmitAdvertise = true;
          this.router.navigate(['/home']);
          // this.navbarServ.isTokenExist.next(true);
        },
      });
  }

  //
  //
  //
  //
  //
  //
  onKeyPress_onlyPersianLettersAndSpace(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);

    const persianRegex = /^[\u0600-\u06FF\s]+$/;

    if (!persianRegex.test(charStr)) {
      event.preventDefault();
    }
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
        this.preUrl === 'edit/house'
      ) {
        return true;
      }

      return new Promise<boolean>((resolve) => {
        this.sweetAlertService
          .confirm(
            'ایا خارج میشوید؟',
            'بدون کامل کردن اطلاعات آگهی برای درج آگهی منزل خارج میشوید.'
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

// uploadFinish = (event: UploadFinishedEvent) => {
//   this.imageData = event.imageData;
//   this.username = event.username;
//   this.advertiseCode = event.advertiseCode;
//   console.log('event uploaded finish', event);
// };

// createImagePath(serverPath: string) {
//   serverPath = serverPath.replace(/\\/g, '/');
//   return `https://localhost:5001/${serverPath}`;
// }

// deleteImage(image: ImageDto) {
//   const authUser = JSON.parse(
//     localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
//   );
//   // console.log(authUser.token);
//   const headers = {
//     Authorization: `Bearer ${authUser.token}`,
//   };
//   this.http
//     .delete(
//       `https://localhost:5001/api/upload/delete?username=${this.getUsername()}&advertiseCode=${this.getAdvertiseCode()}&fileName=${
//         image.fileName
//       }`,
//       { headers: headers }
//     )
//     .subscribe({
//       next: (res) => {
//         console.log('deleteImage response', res);
//         // Remove the deleted image from imageData array
//         this.imageData = this.imageData.filter(
//           (img) => img.dbPath !== image.dbPath
//         );
//         console.log('this.imageData next', this.imageData);
//       },
//       error: (error) => {
//         console.error('Error deleting image:', error);
//         // Handle error
//       },
//       complete: () => {
//         console.log('this.imageData', this.imageData);
//       },
//     });
// }

// private getUsername(): string {
//   // Implement logic to get the username
//   return this.username;
// }

// private getAdvertiseCode(): string {
//   // Implement logic to get the advertise code
//   return this.advertiseCode;
// }

// ///////////////////////////////////////////
// ///////////////////////////////////////////
// ///////////////////////////////////////////
// ///////////////////////////////////////////
// ///////////////////////////////////////////
// determineHouseType(houseTypeSelectValue: any) {
//   console.log(houseTypeSelectValue);
//   if (houseTypeSelectValue.value === 'Villaie') {
//     this.buildingType = 'Villaie';
//     // this.buildingTypeEvent.emit('Villaie');

//     this.setValidators('Villaie');
//   } else if (houseTypeSelectValue.value === 'Mojtama') {
//     this.buildingType = 'Mojtama';
//     // this.buildingTypeEvent.emit('Mojtama');
//     this.setValidators('Mojtama');
//   } else {
//     this.buildingType = 'ShakhsiSaz';
//     // this.buildingTypeEvent.emit('ShakhsiSaz');
//     this.setValidators('ShakhsiSaz');
//   }
// }
// private setValidators(buildingName: string): void {
//   const groundMeterControl = this.advertiseHouseForm.get('sellFields.groundMeter');
//   const buildingNameControl = this.advertiseHouseForm.get(
//     'commonFields.buildingName'
//   );
//   const parkingTypeControl = this.advertiseHouseForm.get(
//     'commonFields.parkingType'
//   );
//   const floorControl = this.advertiseHouseForm.get('commonFields.floor');
//   const floorsControl = this.advertiseHouseForm.get('sellFields.floors');
//   const statesControl = this.advertiseHouseForm.get('sellFields.state');
//   const orientationsControl = this.advertiseHouseForm.get(
//     'commonFields.orientations'
//   );
//   const allUnitsControl = this.advertiseHouseForm.get('sellFields.allUnits');

//   switch (buildingName) {
//     case 'Villaie':
//       groundMeterControl?.setValidators([
//         Validators.required,
//         numberValidator(),
//       ]);
//       buildingNameControl?.setValidators(null);
//       this.advertiseType === 'sell'
//         ? parkingTypeControl?.setValidators(null)
//         : parkingTypeControl?.setValidators([Validators.required]);
//       floorControl?.setValidators(null);
//       statesControl?.setValidators(Validators.required);
//       orientationsControl?.setValidators(Validators.required);
//       floorsControl?.setValidators([Validators.required, numberValidator()]);
//       allUnitsControl?.setValidators(null);

//       break;

//     case 'Mojtama':
//       groundMeterControl?.setValidators(null);
//       buildingNameControl?.setValidators([
//         Validators.required,
//         persianLetterValidator(),
//       ]);
//       parkingTypeControl?.setValidators(Validators.required);
//       floorControl?.setValidators([Validators.required, numberValidator()]);
//       floorsControl?.setValidators(null);
//       statesControl?.setValidators(null);
//       orientationsControl?.setValidators(null);
//       allUnitsControl?.setValidators(null);
//       break;
//     case 'ShakhsiSaz':
//       groundMeterControl?.setValidators([
//         Validators.required,
//         numberValidator(),
//       ]);
//       buildingNameControl?.setValidators(null);
//       buildingNameControl?.updateValueAndValidity();
//       buildingNameControl?.setValidators(persianLetterValidator());
//       parkingTypeControl?.setValidators(Validators.required);
//       floorControl?.setValidators([Validators.required, numberValidator()]);
//       floorsControl?.setValidators([Validators.required, numberValidator()]);
//       statesControl?.setValidators(null);
//       orientationsControl?.setValidators(Validators.required);
//       allUnitsControl?.setValidators([
//         Validators.required,
//         numberValidator(),
//       ]);
//       break;
//   }

//   groundMeterControl?.updateValueAndValidity();
//   buildingNameControl?.updateValueAndValidity();
//   parkingTypeControl?.updateValueAndValidity();
//   floorControl?.updateValueAndValidity();
//   floorsControl?.updateValueAndValidity();
//   statesControl?.updateValueAndValidity();
//   orientationsControl?.updateValueAndValidity();
//   allUnitsControl?.updateValueAndValidity();
// }
// //////////////////////////////
// //////////////////////////////
// //////////////////////////////
// //////////////////////////////
// determineAdvertiseType(advertiseTypeSelectValue: any) {
//   const priceControl = this.advertiseHouseForm.get('sellFields.price');
//   const depositPriceControl = this.advertiseHouseForm.get(
//     'rentFields.depositPrice'
//   );
//   const rentPriceControl = this.advertiseHouseForm.get('rentFields.rentPrice');
//   const entryTypeControl = this.advertiseHouseForm.get('rentFields.entryType');
//   const rentFlatTypeControl = this.advertiseHouseForm.get(
//     'rentFields.rentFlatType'
//   );
//   const controlTypeControl = this.advertiseHouseForm.get('rentFields.controlType');
//   const flatStatusTypeControl = this.advertiseHouseForm.get(
//     'rentFields.flatStatusType'
//   );
//   const parkingTypeControl = this.advertiseHouseForm.get(
//     'commonFields.parkingType'
//   );

//   if (advertiseTypeSelectValue.value === 'rent') {
//     this.advertiseType = 'rent';
//     priceControl?.setValidators(null);
//     depositPriceControl?.setValidators([
//       Validators.required,
//       numberValidator(),
//     ]);
//     parkingTypeControl?.setValidators(Validators.required);

//     rentPriceControl?.setValidators([Validators.required, numberValidator()]);
//     entryTypeControl?.setValidators([Validators.required]);
//     rentFlatTypeControl?.setValidators([Validators.required]);
//     controlTypeControl?.setValidators([Validators.required]);
//     flatStatusTypeControl?.setValidators([Validators.required]);
//     // this.setValidators('Villaie');
//   } else {
//     this.advertiseType = 'sell';
//     priceControl?.setValidators([Validators.required, numberValidator()]);
//     depositPriceControl?.setValidators(null);
//     rentPriceControl?.setValidators(null);
//     this.buildingType === 'Villaie'
//       ? parkingTypeControl?.setValidators(null)
//       : parkingTypeControl?.setValidators(Validators.required);
//     entryTypeControl?.setValidators([Validators.required]);
//     rentFlatTypeControl?.setValidators([Validators.required]);
//     controlTypeControl?.setValidators([Validators.required]);
//     flatStatusTypeControl?.setValidators([Validators.required]);
//   }

//   priceControl?.updateValueAndValidity();
//   depositPriceControl?.updateValueAndValidity();
//   rentPriceControl?.updateValueAndValidity();
//   entryTypeControl?.updateValueAndValidity();
//   rentFlatTypeControl?.updateValueAndValidity();
//   controlTypeControl?.updateValueAndValidity();
//   flatStatusTypeControl?.updateValueAndValidity();
//   parkingTypeControl?.updateValueAndValidity();

//   // this.setValidators('ShakhsiSaz');
// }
