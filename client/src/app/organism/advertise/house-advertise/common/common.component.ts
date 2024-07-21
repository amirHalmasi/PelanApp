import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NumberToWordsService } from '../../numberToword.service';
import { numberValidator } from 'src/assets/validation/password.validator';
import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';
import { slideRightInOut } from 'src/app/services/animation';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css'],
  animations: [slideRightInOut],
})
export class CommonComponent implements OnInit, OnChanges {
  @Output() buildingTypeEvent = new EventEmitter<string>();
  @Input() advertiseTypeInput!: string;
  advertiseType!: string;
  buildingType!: string;
  hasHouseWare: boolean = false;
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
    { value: 'none', desc: 'ندارد' },
    { value: 'mohavate', desc: 'محوطه(حیاط)' },
    { value: 'mossaghaf', desc: 'مسقف' },
  ];
  priceHint!: string | null;
  constructor(private rootFormGroup: FormGroupDirective) {} // this.rootFormGroup is the instant of parent form group component
  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes sell component', changes);

    if (
      changes['advertiseTypeInput'] &&
      !changes['advertiseTypeInput'].firstChange
    ) {
      this.determineAdvertiseType(changes['advertiseTypeInput'].currentValue);
      // this.determineHouseTypeValidators(
      //   changes['advertiseTypeInput'].currentValue
      // );
      this.advertiseType = changes['advertiseTypeInput'].currentValue;
    }
  }
  determineHouseType(houseTypeSelectValue: any) {
    // console.log(houseTypeSelectValue);
    // console.log(this.form.get('commonFields.floor'));
    // console.log(this.form.value);
    if (houseTypeSelectValue.value === 'Villaie') {
      this.buildingType = 'Villaie';
      this.buildingTypeEvent.emit('Villaie');
      const buildingNameControl = this.form.get('commonFields.buildingName');
      buildingNameControl?.setValidators([]);
      buildingNameControl?.updateValueAndValidity();
      this.determineHouseTypeValidators('Villaie');

      // this.setValidators('Villaie');
    } else if (houseTypeSelectValue.value === 'Mojtama') {
      this.buildingType = 'Mojtama';
      this.buildingTypeEvent.emit('Mojtama');

      const buildingNameControl = this.form.get('commonFields.buildingName');
      buildingNameControl?.setValidators([
        Validators.required,
        persianLetterValidator(),
      ]);
      buildingNameControl?.updateValueAndValidity();
      this.determineHouseTypeValidators('Mojtama');
      // this.setValidators('Mojtama');
    } else {
      this.buildingType = 'ShakhsiSaz';
      this.buildingTypeEvent.emit('ShakhsiSaz');
      this.determineHouseTypeValidators('ShakhsiSaz');
      // this.setValidators('ShakhsiSaz');
    }
  }
  hint(input: HTMLInputElement) {
    const value = input.value;
    // console.log('hint', value);
    this.hintDescription = value + ' متر مربع';
  }

  onKeyPress_onlyNumber(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  determineAdvertiseType(advertiseTypeSelectValue: string) {
    const parkingTypeControl = this.form.get('commonFields.parkingType');

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
      this.buildingType = 'Villaie';
      // this.buildingTypeEvent.emit('Villaie');

      this.setMyValidators('Villaie');
    } else if (houseTypeSelectValue === 'Mojtama') {
      this.buildingType = 'Mojtama';
      // this.buildingTypeEvent.emit('Mojtama');
      this.setMyValidators('Mojtama');
    } else {
      this.buildingType = 'ShakhsiSaz';
      // this.buildingTypeEvent.emit('ShakhsiSaz');
      this.setMyValidators('ShakhsiSaz');
    }
  }
  private setMyValidators(buildingName: string): void {
    // const groundMeterControl = this.form.get('sellFields.groundMeter');
    const buildingNameControl = this.form.get('commonFields.buildingName');
    const parkingTypeControl = this.form.get('commonFields.parkingType');
    const floorControl = this.form.get('commonFields.floor');
    const orientationsControl = this.form.get('commonFields.orientations');
    switch (buildingName) {
      case 'Villaie':
        buildingNameControl?.setValidators(null);
        this.advertiseType === 'sell'
          ? parkingTypeControl?.setValidators(null)
          : parkingTypeControl?.setValidators([Validators.required]);
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
        parkingTypeControl?.setValidators(Validators.required);
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
        parkingTypeControl?.setValidators(Validators.required);
        floorControl?.setValidators([Validators.required, numberValidator()]);
        // floorsControl?.setValidators([Validators.required, numberValidator()]);
        // statesControl?.setValidators(null);
        orientationsControl?.setValidators(Validators.required);

        break;
      default:
        buildingNameControl?.setValidators(null);
        parkingTypeControl?.setValidators(null);
        floorControl?.setValidators(null);
        orientationsControl?.setValidators(null);
        break;
    }

    buildingNameControl?.updateValueAndValidity();
    parkingTypeControl?.updateValueAndValidity();
    floorControl?.updateValueAndValidity();
    orientationsControl?.updateValueAndValidity();
  }
}
