import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-storeadvertise',
  templateUrl: './storeadvertise.component.html',
  styleUrls: ['./storeadvertise.component.css'],
  animations: [slideRightInOut],
})
export class StoreadvertiseComponent implements OnInit, OnDestroy {
  // @ViewChild('houseTypeSelect') houseTypeSelect!: MatSelect;
  // storeState: string = 'Villaie';

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
    // private numberToWordsService: NumberToWordsService
    private fileUploadServ: FileUploadservice
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
        storeWidth: [null, [Validators.required, numberValidator()]],
        storeType: [null, Validators.required],
        hasBalconye: [this.hasBalconye],
        hasElevator: [this.hasElevator],
        hasRestroom: [false],
        hasCeramic: [false],
        balconyeMeter: [null],
        // orientations: [null],
        floor: [null],
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

      desc: [null, persianLetterValidator()],
    });
  }

  submit() {
    if (!this.imageData.length) {
      this.imageUploadMessage = 'عکس آگهی را آپلود کنید.';
      return;
    }

    this.imageUploadMessage = '';
    console.log(this.advertiseCode, this.imageData, this.username);
    console.log(this.advertiseStoreForm.value);
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
}
