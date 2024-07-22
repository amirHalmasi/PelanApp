import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flipInOut } from 'src/app/services/animation';
import { numberValidator } from 'src/assets/validation/password.validator';
import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';
import { ImageDto } from '../uploadfile/uploadfile.component';
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
  // animations: [flipInOut],
})
export class StoreadvertiseComponent implements OnInit, OnDestroy {
  // @ViewChild('houseTypeSelect') houseTypeSelect!: MatSelect;
  // buildingType: string = 'Villaie';
  buildingType!: string;
  advertiseType!: string;
  imageUploadMessage!: string;
  @Input() uploadedImageData!: string;

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
  advertiseStoreForm!: FormGroup;
  hintDescription!: string;
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
    this.advertiseStoreForm = this.fb.group({
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
        wareHouse: [null, [Validators.required, numberValidator()]],
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
    if (!this.imageData.length) {
      this.imageUploadMessage = 'عکس آگهی را آپلود کنید.';
      return;
    }

    this.imageUploadMessage = '';
    console.log(this.advertiseCode, this.imageData, this.username);
    console.log(this.advertiseStoreForm.value);
  }
}
