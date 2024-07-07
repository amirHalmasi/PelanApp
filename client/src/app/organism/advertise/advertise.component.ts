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
    { value: 'mohavate', desc: 'محوطه' },
    { value: 'mossaghaf', desc: 'مسقف' },
  ];

  imageData: ImageDto[] = [];
  hasHouseWare: boolean = false;
  username!: string;
  advertiseCode!: string;
  icon!: any;
  advertiseForm!: FormGroup;
  hintDescription!: string;
  constructor(private http: HttpClient, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.icon = faTrash;
    // this.determineHouseType(this.houseTypeSelect.value);
    this.advertiseForm = this.fb.group({
      groundMeter:
        // this.buildingType === 'Villaie'
        //   ? // !this.buildingType
        //     [null]
        //   : [null, [Validators.required, numberValidator()]],
        [null],
      houseMeter: [null, [Validators.required, numberValidator()]],
      rooms: [null, [Validators.required, numberValidator()]],
      wareHouse: [null, [Validators.email]],
      price: [null, [Validators.required, numberValidator()]],
      floors: [null],
      floor: [null],
      hasElevator: [null, [Validators.required]],
      neighbourhood: [null, persianLetterValidator()],
      desc: [null, persianLetterValidator()],
      state: [null],
      orientations: [null],
      houseType: [null, Validators.required],
      hasHouseWare: [this.hasHouseWare],
      // ///////////////////
      buildingName: [null],
      // to do
      allUnits: [null],
      parkingType: [null],
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
        parkingTypeControl?.setValidators(null);
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
}
