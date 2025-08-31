import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
// import { NumberToWordsService } from '../../numberToword.service';
import { numberValidator } from 'src/assets/validation/password.validator';
import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';
import { slideRightInOut } from 'src/app/services/animation';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { HouseAdvetiseProfileService } from 'src/app/organism/my-advertises/my-advertises-profile.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-common-house',
  templateUrl: './common-house.component.html',
  styleUrls: ['./common-house.component.css'],
  animations: [slideRightInOut],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatOptionModule,
    NgIf,
    MatInputModule,
    MatCheckboxModule,
  ],
})
export class CommonHouseComponent implements OnInit, OnChanges {
  @Output() buildingTypeEvent = new EventEmitter<string>();
  @Input() buildingTypeInput!: string;
  @Input() advertiseTypeInput!: string;
  @Input() formGroupName!: string;
  advertiseType!: string;
  buildingType: string = '';
  hasHouseWare: boolean = false;
  hasParking: boolean = false;
  houseMeterHintDesc: string = '';
  wareHouseMeterHintDesc: string = '';
  hintDescription!: string;
  form!: FormGroup;
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
    // { value: 'none', desc: 'ندارد' },
    { value: 'mohavate', desc: 'محوطه(حیاط)' },
    { value: 'mossaghaf', desc: 'مسقف' },
  ];
  priceHint!: string | null;
  constructor(
    private rootFormGroup: FormGroupDirective,
    private advertiseData: AdvetiseDataService,
    private houseAdvertiseServ: HouseAdvetiseProfileService
  ) {} // this.rootFormGroup is the instant of parent form group component
  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    console.log('common form', this.form);
    this.advertiseData.previousRouteURL.subscribe((preRoute) => {
      if (preRoute === 'edit/house') {
        this.hasParking =
          this.houseAdvertiseServ.advertiseItem.advertise.hasParking === 'true'
            ? true
            : false;
        this.hasHouseWare =
          this.houseAdvertiseServ.advertiseItem.advertise.hasWareHouse ===
          'true'
            ? true
            : false;
      }
    });
  }
  ngOnChanges(changes: any): void {
    this.advertiseData.previousRouteURL.subscribe((preRoute) => {
      console.log('preRoute', preRoute);

      if (
        preRoute === 'edit/house' &&
        changes['buildingTypeInput'] &&
        changes['advertiseTypeInput']
      ) {
        this.buildingType = changes['buildingTypeInput'].currentValue;
        this.advertiseType = changes['advertiseTypeInput'].currentValue;
      }
    });

    console.log('changes sell component', changes);
    if (
      changes['buildingTypeInput']
      //  &&
      // changes['buildingTypeInput'].firstChange
    ) {
      this.buildingType = changes['buildingTypeInput'].currentValue;
    }
    if (
      changes['advertiseTypeInput'] &&
      !changes['advertiseTypeInput'].firstChange
    ) {
      // this.determineAdvertiseType(changes['advertiseTypeInput'].currentValue);
      // this.determineHouseTypeValidators(
      //   changes['advertiseTypeInput'].currentValue
      // );
      this.advertiseType = changes['advertiseTypeInput'].currentValue;
      this.determineWareHouseValidator(
        this.hasHouseWare,
        changes['advertiseTypeInput'].currentValue
      );
      this.determineParkingValidator(
        this.hasParking,
        changes['advertiseTypeInput'].currentValue,
        this.buildingType
      );
    }
  }
  determineHouseType(houseTypeSelectValue: any) {
    // console.log(houseTypeSelectValue);
    // console.log(this.form.get('commonFields.floor'));
    // console.log(this.form.value);
    if (houseTypeSelectValue === 'Villaie') {
      this.buildingType = 'Villaie';
      this.buildingTypeEvent.emit('Villaie');
      // const buildingNameControl = this.form.get('commonFields.buildingName');
      // buildingNameControl?.setValidators([]);
      // buildingNameControl?.updateValueAndValidity();
      this.determineHouseTypeValidators('Villaie');

      // this.setValidators('Villaie');
    } else if (houseTypeSelectValue === 'Mojtama') {
      this.buildingType = 'Mojtama';
      this.buildingTypeEvent.emit('Mojtama');

      const buildingNameControl = this.form.get('buildingName');
      // buildingNameControl?.setValidators([
      //   Validators.required,
      //   persianLetterValidator(),
      // ]);
      // buildingNameControl?.updateValueAndValidity();
      this.determineHouseTypeValidators('Mojtama');
      // this.setValidators('Mojtama');
    } else {
      this.buildingType = 'ShakhsiSaz';
      this.buildingTypeEvent.emit('ShakhsiSaz');
      this.determineHouseTypeValidators('ShakhsiSaz');
      // this.setValidators('ShakhsiSaz');
    }
  }
  hint(input: HTMLInputElement, hintVariable: string) {
    const value = input.value;
    if (value.length > 0) {
      // console.log('hint', value);
      this.hintDescription = value + ' متر مربع';
    } else {
      this.hintDescription = '';
    }
    this.hintDescription;
    switch (hintVariable) {
      case 'houseMeter':
        this.houseMeterHintDesc = this.hintDescription;
        // this.wareHouseMeterHintDesc = this.hintDescription;
        break;
      case 'wareHouseMeter':
        this.wareHouseMeterHintDesc = this.hintDescription;
        break;

      default:
        break;
    }
  }

  onKeyPress_onlyNumber(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  determineAdvertiseType(advertiseTypeSelectValue: string) {
    const parkingTypeControl = this.form.get('parkingType');

    if (advertiseTypeSelectValue === 'rent') {
      this.advertiseType = 'rent';
      parkingTypeControl?.setValidators(Validators.required);
    } else if (advertiseTypeSelectValue === 'sell') {
      this.advertiseType = 'sell';
      // this.buildingType && this.buildingType === 'Villaie'
      //   ?
      parkingTypeControl?.setValidators(null);
      // : parkingTypeControl?.setValidators(Validators.required);
    }

    parkingTypeControl?.updateValueAndValidity();
  }
  determineHouseTypeValidators(houseTypeSelectValue: string) {
    console.log(houseTypeSelectValue);
    if (houseTypeSelectValue === 'Villaie') {
      // this.buildingType = 'Villaie';
      // this.buildingTypeEvent.emit('Villaie');

      this.setMyValidators('Villaie');
      this.determineParkingValidator(
        this.hasParking,
        this.advertiseType,
        'Villaie'
      );
    } else if (houseTypeSelectValue === 'Mojtama') {
      // this.buildingType = 'Mojtama';
      // this.buildingTypeEvent.emit('Mojtama');
      this.determineParkingValidator(
        this.hasParking,
        this.advertiseType,
        'Mojtama'
      );

      this.setMyValidators('Mojtama');
    } else {
      // this.buildingType = 'ShakhsiSaz';
      // this.buildingTypeEvent.emit('ShakhsiSaz');
      this.determineParkingValidator(
        this.hasParking,
        this.advertiseType,
        'ShakhsiSaz'
      );

      this.setMyValidators('ShakhsiSaz');
    }
  }
  determineParkingValidator(
    hasParking: boolean,
    advertiseType: string,
    buildingType: string
  ) {
    /*
    
    */

    const parkingControl = this.form.get('parkingType');
    if (
      hasParking &&
      advertiseType === 'sell' &&
      (buildingType === 'ShakhsiSaz' || buildingType === 'Mojtama')
    ) {
      parkingControl?.setValidators([Validators.required]);
    } else {
      parkingControl?.setValidators(null);
    }
    parkingControl?.updateValueAndValidity();
  }
  determineWareHouseValidator(hasWareHouse: boolean, advertiseType: string) {
    const wareHouseControl = this.form.get('wareHouseMeter');
    if (hasWareHouse && advertiseType === 'sell') {
      wareHouseControl?.setValidators([Validators.required, numberValidator()]);
    } else {
      wareHouseControl?.setValidators(null);
    }
    wareHouseControl?.updateValueAndValidity();
  }
  private setMyValidators(buildingType: string): void {
    // const groundMeterControl = this.form.get('sellFields.groundMeter');
    const buildingNameControl = this.form.get('buildingName');
    // const parkingTypeControl = this.form.get('parkingType');
    const floorControl = this.form.get('floor');
    const orientationsControl = this.form.get('orientations');
    switch (buildingType) {
      case 'Villaie':
        buildingNameControl?.setValidators(null);

        // parkingTypeControl?.setValidators(null);

        floorControl?.setValidators(null);
        // statesControl?.setValidators(Validators.required);
        orientationsControl?.setValidators(Validators.required);
        // floorsControl?.setValidators([Validators.required, numberValidator()]);
        // allUnitsControl?.setValidators(null);

        break;

      case 'Mojtama':
        // groundMeterControl?.setValidators(null);
        buildingNameControl?.setValidators([
          Validators.required,
          persianLetterValidator(),
        ]);
        // this.advertiseType === 'sell' && this.hasParking
        //   ? parkingTypeControl?.setValidators([Validators.required])
        //   : parkingTypeControl?.setValidators(null);
        floorControl?.setValidators([Validators.required, numberValidator()]);
        // floorsControl?.setValidators(null);
        // statesControl?.setValidators(null);
        orientationsControl?.setValidators(null);
        // allUnitsControl?.setValidators(null);
        break;
      case 'ShakhsiSaz':
        // groundMeterControl?.setValidators([
        //   Validators.required,
        //   numberValidator(),
        // ]);
        buildingNameControl?.setValidators(null);
        buildingNameControl?.updateValueAndValidity();
        buildingNameControl?.setValidators(persianLetterValidator());
        // this.advertiseType === 'sell' && this.hasParking
        //   ? parkingTypeControl?.setValidators([Validators.required])
        //   : parkingTypeControl?.setValidators(null);
        floorControl?.setValidators([Validators.required, numberValidator()]);
        // floorsControl?.setValidators([Validators.required, numberValidator()]);
        // statesControl?.setValidators(null);
        orientationsControl?.setValidators(Validators.required);

        break;
      default:
        buildingNameControl?.setValidators(null);
        // parkingTypeControl?.setValidators(null);
        floorControl?.setValidators(null);
        orientationsControl?.setValidators(null);
        break;
    }

    buildingNameControl?.updateValueAndValidity();
    // parkingTypeControl?.updateValueAndValidity();
    floorControl?.updateValueAndValidity();
    orientationsControl?.updateValueAndValidity();
  }
}
