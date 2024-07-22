import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { Subscription } from 'rxjs';
import { CanDeactivateType } from '../../signup-from/can-deactivate-gaurde';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

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
  advertiseType!: string;
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
  fileUploadSubscription!: Subscription;
  imageData: ImageDto[] = [];
  hasHouseWare: boolean = false;
  hasElevator: boolean = false;
  username!: string;
  advertiseCode!: string;
  icon!: any;
  advertiseHouseForm!: FormGroup;
  hintDescription!: string;
  fileUploadData!: fileUploadData;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private fileUploadServ: FileUploadservice
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
    this.fileUploadSubscription =
      this.fileUploadServ.uploadedImageData.subscribe(
        (data: fileUploadData) => {
          console.log('upload image Data house', data);
          if (data.imageData.length > 0) {
            this.imageData = data.imageData;
          } else {
            this.imageData = [];
          }
          this.advertiseCode = data.advertiseCode;
          this.username = data.username;
        }
      );
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
        wareHouse: [null],
        parkingType: [null],
        buildingName: [null],
        floor: [null],
        orientations: [null],
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
      neighbourhood: [null, [persianLetterValidator(), Validators.required]],
      city: [null, Validators.required],
      province: [null, Validators.required],
      // }),

      desc: [null, persianLetterValidator()],
    });
  }
  submit() {
    // this.imageData = event.imageData;
    // this.username = event.username;
    // this.advertiseCode = event.advertiseCode;
    if (!this.imageData.length) {
      this.imageUploadMessage = 'عکس آگهی را آپلود کنید.';
      return;
    }
    // this.fileUploadServ.uploadedImageData.subscribe((data: fileUploadData) => {
    //   console.log('upload image Data house', data);
    //   if (data.imageData.length > 0) {
    //     this.imageData = data.imageData;
    //   }
    //   this.imageData = [];
    // });
    this.imageUploadMessage = '';
    console.log(this.advertiseCode, this.imageData, this.username);
    console.log(this.advertiseHouseForm.value);

    // console.log(transformedValue);

    // let registerUrl = 'https://localhost:5001/api/account/register';

    // this.http.post(registerUrl, transformedValue).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => {
    //     // console.error(err);
    //     return new Promise<boolean>(() => {
    //       this.sweetAlertService.floatAlert('مشخصات فردی تکراری است ', 'error');
    //     });
    //   },
    //   complete: () => {
    //     this.isSignin = true;
    //     if (this.isSignin) {
    //       // return confirm('Do you really want to leave?');
    //       //convert defalt confirm to sweetalert2 one👇
    //       return new Promise<boolean>((resolve) => {
    //         this.sweetAlertService
    //           .alert(
    //             'توجه',
    //             'نام کاربری کد ملی و کلمه عبور شماره موبایل است',
    //             'warning'
    //           )
    //           .then((result) => {
    //             // console.log('sweetalert result');
    //             // console.log(result);
    //             if (result.isConfirmed) {
    //               this.router.navigate(['/login']);
    //             } // Resolve with the user's choice
    //           })
    //           .catch(() => {
    //             resolve(false); // In case of an error, consider it as not confirmed
    //           });
    //       });
    //     } else {
    //       return true;
    //     }
    //   },
    // });
  }

  public uploadFinish = (event: UploadFinishedEvent) => {
    // this.imageData = event.imageData;
    // this.username = event.username;
    // this.advertiseCode = event.advertiseCode;
    this.fileUploadData = {
      imageData: event.imageData,
      username: event.username,
      advertiseCode: event.advertiseCode,
    };
    console.log('uploadFinish', event);
    console.log('FileUploadFinish', this.fileUploadData);
    console.log('event uploaded finish', event);
  };

  createImagePath(serverPath: string) {
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

          // Remove the deleted image from imageData array
          this.fileUploadData.imageData = this.fileUploadData.imageData.filter(
            (img) => img.dbPath !== image.dbPath
          );
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
        },
      });
  }

  private getUsername(): string {
    // Implement logic to get the username
    return this.fileUploadData.username;
  }

  private getAdvertiseCode(): string {
    // Implement logic to get the advertise code
    return this.fileUploadData.advertiseCode;
  }

  canDeactivateFn(): CanDeactivateType {
    // if (!this.allowEdit) {
    //   return true;
    // }

    if (!this.isSubmitAdvertise) {
      // return confirm('Do you really want to leave?');
      //convert defalt confirm to sweetalert2 one👇

      return new Promise<boolean>((resolve) => {
        this.sweetAlertService
          .confirm(
            'ایا خارج میشوید؟',
            'بدون کامل کردن اطلاعات آگهی برای درج آگهی منزل خارج میشوید.'
          )
          .then((result) => {
            console.log('sweetalert result');
            console.log(result);

            if (result.isConfirmed && this.imageData.length === 0) {
              resolve(true);
            } else if (result.isConfirmed && this.imageData.length !== 0) {
              this.deleteAllImages().subscribe({
                next: (res) => {
                  console.log('delete Image response', res);
                  // Remove the deleted image from imageData array
                  this.fileUploadData.imageData = [];
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
