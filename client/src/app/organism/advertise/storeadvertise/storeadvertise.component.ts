import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { flipInOut, slideRightInOut } from 'src/app/services/animation';
import { numberValidator } from 'src/assets/validation/password.validator';
import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';
import {
  ImageDto,
  UploadFinishedEvent,
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

@Component({
  selector: 'app-storeadvertise',
  templateUrl: './storeadvertise.component.html',
  styleUrls: ['./storeadvertise.component.css'],
  animations: [slideRightInOut],
})
export class StoreadvertiseComponent implements OnInit, OnDestroy {
  // @ViewChild('houseTypeSelect') houseTypeSelect!: MatSelect;
  // storeState: string = 'Villaie';
  isSubmitAdvertise: boolean = false;
  advertiseType!: string;
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
  fileUploadSubscription!: Subscription;
  imageData: ImageDto[] = [];
  hasBalconye: boolean = false;
  hasElevator: boolean = false;
  username!: string;
  advertiseCode!: string;
  icon!: any;
  advertiseStoreForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    // private numberToWordsService: NumberToWordsService
    private fileUploadServ: FileUploadservice,
    private advertiseServ: AdvertisesService
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
    this.advertiseCode = Math.floor(Math.random() * 1000000000).toString();
    this.fileUploadSubscription =
      this.fileUploadServ.uploadedImageData.subscribe(
        (data: fileUploadData) => {
          console.log('upload image Data house', data);
          if (data.imageData.length > 0) {
            this.imageData = data.imageData;
            this.imageUploadMessage = '';
          } else {
            this.imageData = [];
          }
          this.advertiseCode = data.advertiseCode;
          this.username = data.username;
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
      city: [null, Validators.required],
      province: [null, Validators.required],
      // }),

      desc: [null],
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
    console.log(this.advertiseStoreForm.value);

    if (!this.imageData.length) {
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
  //
  //
  //

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
      if (this.imageData.length === 0) {
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
