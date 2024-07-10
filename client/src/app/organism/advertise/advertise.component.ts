import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  ImageDto,
  UploadFinishedEvent,
} from './uploadfile/uploadfile.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';
import { numberValidator } from 'src/assets/validation/password.validator';
import { slideRightInOut } from 'src/app/services/animation';
import { MatSelect } from '@angular/material/select';
import { NumberToWordsService } from './numberToword.service';
interface deleteResponse {
  folderName: string;
  deletedFile: string;
  message: string;
}
@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css'],
  animations: [slideRightInOut],
})
export class AdvertiseComponent implements OnInit {
  // @ViewChild('houseTypeSelect') houseTypeSelect!: MatSelect;
  // buildingType: string = 'Villaie';
  buildingType!: string;
  advertiseType!: string;
  states: any = [
    { value: 'Tejari_Maskuni', desc: 'تجاری مسکونی ' },
    { value: 'Maskuni', desc: 'مسکونی' },
  ];
  orientations: any = [
    { value: 'shomali', desc: 'شمالی' },
    { value: 'Jonobi', desc: 'جنوبی' },
    { value: 'Nabsh_Shomali', desc: 'نبش شمالی' },
    { value: 'Nabsh_Junobi', desc: 'نبش جنوبی' },
    { value: 'Do_Bahr', desc: 'دوکله' },
    { value: 'Do_Bahr_Do_Nabsh', desc: 'دوکله دونبش' },
  ];

  houseTypes: any = [
    // { value: 'zamin', desc: 'زمین' },
    { value: 'Villaie', desc: 'ویلایی' },
    { value: 'Mojtama', desc: 'مجتمع آپارتمانی' },
    { value: 'ShakhsiSaz', desc: 'واحد شخصی ساز' },
  ];
  parkingTypes: any = [
    { value: 'none', desc: 'ندارد' },
    { value: 'mohavate', desc: 'محوطه(حیاط)' },
    { value: 'mossaghaf', desc: 'مسقف' },
  ];
  advertiseTypes: any = [
    { value: 'sell', desc: 'فروش' },
    { value: 'rent', desc: 'اجاره' },
  ];

  controlTypes: any = [
    { value: 'ABG_joda', desc: 'آب برق گاز مستقل' },
    { value: 'AB_joda', desc: 'آب برق مستقل | گاز مشترک' },
    { value: 'AG_joda', desc: 'آب گاز مستقل | برق مشترک' },
    { value: 'BG_joda', desc: 'برق گاز مستقل | آب مشترک' },
    { value: 'A_joda', desc: 'آب مستقل | برق گاز مشترک' },
    { value: 'B_joda', desc: 'برق مستقل | آب گاز مشترک' },
    { value: 'G_joda', desc: 'گاز مستقل | آب برق مشترک' },
    { value: 'moshtarak', desc: 'آب برق گاز مشترک' },
  ];
  rentFlatTypes: any = [
    { value: 'rahn_kamel', desc: 'رهن کامل' },
    { value: 'rahn_ejare', desc: 'رهن و اجاره' },
    { value: 'rahne_kamel_darbast', desc: 'رهن کامل واحد دربست' },
    { value: 'rahne_ejare_darbast', desc: 'رهن و اجاره واحد دربست' },
  ];
  entryTypes: any = [
    { value: 'independent_entry', desc: 'ورودی مستقل' },
    { value: 'common_entry', desc: 'ورودی مشترک' },
  ];
  flatStatusTypes: any = [
    { value: 'new', desc: 'نو ساخت' },
    { value: 'repair', desc: 'تعمیر شده' },
    // { value: 'luxury', desc: 'لوکس' },
    { value: 'regular', desc: 'تمیز' },
  ];

  imageData: ImageDto[] = [];
  hasHouseWare: boolean = false;
  username!: string;
  advertiseCode!: string;
  icon!: any;
  advertiseForm!: FormGroup;
  hintDescription!: string;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private numberToWordsService: NumberToWordsService
  ) {}
  ngOnInit(): void {
    this.icon = faTrash;
    // this.determineHouseType(this.houseTypeSelect.value);
    this.advertiseForm = this.fb.group({
      ////////////////////////////////////
      // common fields                  //
      ////////////////////////////////////

      advertiseType: [null, Validators.required],
      houseMeter: [null, [Validators.required, numberValidator()]],
      rooms: [null, [Validators.required, numberValidator()]],
      wareHouse: [null, [Validators.email]],
      floor: [null],
      hasElevator: [null, [Validators.required]],
      neighbourhood: [null, persianLetterValidator(), Validators.required],
      desc: [null, persianLetterValidator()],
      orientations: [null],
      houseType: [null, Validators.required],
      hasHouseWare: [this.hasHouseWare],
      buildingName: [null],
      parkingType: [null],

      /////////////////////////////
      //for sell advertise fields//
      /////////////////////////////

      allUnits: [null],
      groundMeter: [null],
      state: [null],
      price: [null],
      floors: [null],

      //////////////////////////////
      //for rent advertise fields //
      //////////////////////////////
      entryType: [null],
      depositPrice: [null],
      rentPrice: [null],
      rentFlatType: [null],
      controlType: [null],
      flatStatusType: [null],
    });
  }
  public uploadFinish = (event: UploadFinishedEvent) => {
    this.imageData = event.imageData;
    this.username = event.username;
    this.advertiseCode = event.advertiseCode;
    console.log('event uploaded finish', event);
  };

  createImagePath(serverPath: string) {
    serverPath = serverPath.replace(/\\/g, '/');
    return `https://localhost:5001/${serverPath}`;
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
          this.imageData = this.imageData.filter(
            (img) => img.dbPath !== image.dbPath
          );
          console.log('this.imageData next', this.imageData);
        },
        error: (error) => {
          console.error('Error deleting image:', error);
          // Handle error
        },
        complete: () => {
          console.log('this.imageData', this.imageData);
        },
      });
  }

  private getUsername(): string {
    // Implement logic to get the username
    return this.username;
  }

  private getAdvertiseCode(): string {
    // Implement logic to get the advertise code
    return this.advertiseCode;
  }
  hint(event: any, inputField: string) {
    const value = this.advertiseForm.get(inputField)?.value;
    console.log('hint', value);
    this.hintDescription = value + 'متر مربع';
  }

  determineHouseType(houseTypeSelectValue: any) {
    console.log(houseTypeSelectValue);
    if (houseTypeSelectValue.value === 'Villaie') {
      this.buildingType = 'Villaie';
      this.setValidators('Villaie');
    } else if (houseTypeSelectValue.value === 'Mojtama') {
      this.buildingType = 'Mojtama';
      this.setValidators('Mojtama');
    } else {
      this.buildingType = 'ShakhsiSaz';
      this.setValidators('ShakhsiSaz');
    }
  }
  determineAdvertiveType(advertiseTypeSelectValue: any) {
    const priceControl = this.advertiseForm.get('price');
    const depositPriceControl = this.advertiseForm.get('depositPrice');
    const rentPriceControl = this.advertiseForm.get('rentPrice');
    const entryTypeControl = this.advertiseForm.get('entryType');
    const rentFlatTypeControl = this.advertiseForm.get('rentFlatType');
    const controlTypeControl = this.advertiseForm.get('controlType');
    const flatStatusTypeControl = this.advertiseForm.get('flatStatusType');
    const parkingTypeControl = this.advertiseForm.get('parkingType');

    if (advertiseTypeSelectValue.value === 'rent') {
      this.advertiseType = 'rent';
      priceControl?.setValidators(null);
      depositPriceControl?.setValidators([
        Validators.required,
        numberValidator(),
      ]);
      parkingTypeControl?.setValidators(Validators.required);

      rentPriceControl?.setValidators([Validators.required, numberValidator()]);
      entryTypeControl?.setValidators([Validators.required]);
      rentFlatTypeControl?.setValidators([Validators.required]);
      controlTypeControl?.setValidators([Validators.required]);
      flatStatusTypeControl?.setValidators([Validators.required]);
      // this.setValidators('Villaie');
    } else {
      this.advertiseType = 'sell';
      priceControl?.setValidators([Validators.required, numberValidator()]);
      depositPriceControl?.setValidators(null);
      rentPriceControl?.setValidators(null);
      this.buildingType === 'Villaie'
        ? parkingTypeControl?.setValidators(null)
        : parkingTypeControl?.setValidators(Validators.required);
      entryTypeControl?.setValidators([Validators.required]);
      rentFlatTypeControl?.setValidators([Validators.required]);
      controlTypeControl?.setValidators([Validators.required]);
      flatStatusTypeControl?.setValidators([Validators.required]);
    }

    priceControl?.updateValueAndValidity();
    depositPriceControl?.updateValueAndValidity();
    rentPriceControl?.updateValueAndValidity();
    entryTypeControl?.updateValueAndValidity();
    rentFlatTypeControl?.updateValueAndValidity();
    controlTypeControl?.updateValueAndValidity();
    flatStatusTypeControl?.updateValueAndValidity();
    parkingTypeControl?.updateValueAndValidity();

    // this.setValidators('ShakhsiSaz');
  }
  private setValidators(buildingName: string): void {
    const groundMeterControl = this.advertiseForm.get('groundMeter');
    const buildingNameControl = this.advertiseForm.get('buildingName');
    const parkingTypeControl = this.advertiseForm.get('parkingType');
    const floorControl = this.advertiseForm.get('floor');
    const floorsControl = this.advertiseForm.get('floors');
    const statesControl = this.advertiseForm.get('state');
    const orientationsControl = this.advertiseForm.get('orientations');
    const allUnitsControl = this.advertiseForm.get('allUnits');

    switch (buildingName) {
      case 'Villaie':
        groundMeterControl?.setValidators([
          Validators.required,
          numberValidator(),
        ]);
        buildingNameControl?.setValidators(null);
        this.advertiseType === 'sell'
          ? parkingTypeControl?.setValidators(null)
          : parkingTypeControl?.setValidators([Validators.required]);
        floorControl?.setValidators(null);
        statesControl?.setValidators(Validators.required);
        orientationsControl?.setValidators(Validators.required);
        floorsControl?.setValidators([Validators.required, numberValidator()]);
        allUnitsControl?.setValidators(null);

        break;

      case 'Mojtama':
        groundMeterControl?.setValidators(null);
        buildingNameControl?.setValidators([
          Validators.required,
          persianLetterValidator(),
        ]);
        parkingTypeControl?.setValidators(Validators.required);
        floorControl?.setValidators([Validators.required, numberValidator()]);
        floorsControl?.setValidators(null);
        statesControl?.setValidators(null);
        orientationsControl?.setValidators(null);
        allUnitsControl?.setValidators(null);
        break;
      case 'ShakhsiSaz':
        groundMeterControl?.setValidators([
          Validators.required,
          numberValidator(),
        ]);
        buildingNameControl?.setValidators(null);
        buildingNameControl?.updateValueAndValidity();
        buildingNameControl?.setValidators(persianLetterValidator());
        parkingTypeControl?.setValidators(Validators.required);
        floorControl?.setValidators([Validators.required, numberValidator()]);
        floorsControl?.setValidators([Validators.required, numberValidator()]);
        statesControl?.setValidators(null);
        orientationsControl?.setValidators(Validators.required);
        allUnitsControl?.setValidators([
          Validators.required,
          numberValidator(),
        ]);
        break;
    }

    groundMeterControl?.updateValueAndValidity();
    buildingNameControl?.updateValueAndValidity();
    parkingTypeControl?.updateValueAndValidity();
    floorControl?.updateValueAndValidity();
    floorsControl?.updateValueAndValidity();
    statesControl?.updateValueAndValidity();
    orientationsControl?.updateValueAndValidity();
    allUnitsControl?.updateValueAndValidity();
  }
  depositHint!: string | null;
  rentHint!: string | null;
  priceHint!: string | null;
  onKeyPress_onlyNumber(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onInputChange(input: HTMLInputElement, priceVariableType: string): void {
    const rialValue = parseInt(input.value.replace(/\D/g, ''), 10);
    if (!isNaN(rialValue)) {
      const tomanValue = Math.floor(rialValue / 10);

      switch (priceVariableType) {
        case 'rent':
          this.rentHint =
            this.numberToWordsService.convertToWords(tomanValue) + ' تومان';
          break;

        case 'deposit':
          this.depositHint =
            this.numberToWordsService.convertToWords(tomanValue) + ' تومان';
          break;

        case 'price':
          this.priceHint =
            this.numberToWordsService.convertToWords(tomanValue) + ' تومان';
          break;
      }
    } else {
      this.depositHint = null;
    }
  }
}
