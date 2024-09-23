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
import { slideRightInOut } from 'src/app/services/animation';
import { numberValidator } from 'src/assets/validation/password.validator';
import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css'],
  animations: [slideRightInOut],
})
export class CommonComponent implements OnChanges, OnInit {
  @Input() advertiseTypeInput!: string;
  @Output() storeStateEvent = new EventEmitter<string>();
  advertiseType!: string;
  storeType!: string;
  form!: FormGroup;
  hintStoreMeter!: string;
  hintBalconyeMeter!: string;
  hintStoreWidth!: string;
  hasBalconye: boolean = false;
  hasParking: boolean = false;

  parkingTypes: any = [
    { value: 'mosaghaf', desc: 'مسقف' },
    { value: 'mohavate', desc: 'محوطه' },
  ];

  advertiseTypes: any = [
    { value: 'sell', desc: 'فروش' },
    { value: 'rent', desc: 'اجاره' },
  ];
  storeTypes: any = [
    { value: 'bazar', desc: 'بازار' },
    { value: 'bazar-che', desc: 'بازارچه' },
    { value: 'pasajh', desc: 'پاساژ' },
    { value: 'city-center', desc: 'شخصی، مرکزشهر' },
    { value: 'other', desc: 'سایر' },
    { value: 'majmoeh', desc: 'مجموعه تجاری' },
  ];

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
      this.advertiseType = changes['advertiseTypeInput'].currentValue;
    }
  }

  determineStoreType(storeStateTypeSelectValue: any) {
    if (storeStateTypeSelectValue.value === 'bazar') {
      this.storeType = 'bazar';
      this.storeStateEvent.emit('bazar');
      this.determineStoreTypeValidators('bazar');
    } else if (storeStateTypeSelectValue.value === 'bazar-che') {
      this.storeType = 'bazar-che';
      this.storeStateEvent.emit('bazar-che');
      this.determineStoreTypeValidators('bazar-che');
    } else if (storeStateTypeSelectValue.value === 'pasajh') {
      this.storeType = 'pasajh';
      this.storeStateEvent.emit('pasajh');
      this.determineStoreTypeValidators('pasajh');
    } else if (storeStateTypeSelectValue.value === 'majmoeh') {
      this.storeType = 'majmoeh';
      this.storeStateEvent.emit('majmoeh');
      this.determineStoreTypeValidators('majmoeh');
    } else if (storeStateTypeSelectValue.value === 'city-center') {
      this.storeType = 'city-center';
      this.storeStateEvent.emit('city-center');
      this.determineStoreTypeValidators('city-center');
    } else if (storeStateTypeSelectValue.value === 'other') {
      this.storeType = 'other';
      this.storeStateEvent.emit('other');
      this.determineStoreTypeValidators('other');
    }
  }
  private determineStoreTypeValidators(storeTypeSelectValue: string) {
    console.log(storeTypeSelectValue);

    this.setMyValidators(storeTypeSelectValue);
  }
  private setMyValidators(buildingType: string): void {
    const floorControl = this.form.get('commonFields.floor');
    const pasajhNameControl = this.form.get('commonFields.pasajhName');
    const majmoehNameControl = this.form.get('commonFields.majmoehName');
    // const orientationsControl = this.form.get('commonFields.orientations');
    switch (buildingType) {
      case 'pasajh':
        floorControl?.setValidators([Validators.required, numberValidator()]);
        pasajhNameControl?.setValidators([
          Validators.required,
          persianLetterValidator(),
        ]);
        majmoehNameControl?.setValidators(null);
        break;

      case 'majmoeh':
        pasajhNameControl?.setValidators([
          Validators.required,
          persianLetterValidator(),
        ]);
        floorControl?.setValidators([Validators.required, numberValidator()]);
        majmoehNameControl?.setValidators([
          Validators.required,
          persianLetterValidator(),
        ]);

        break;

      default:
        floorControl?.setValidators(null);
        pasajhNameControl?.setValidators(null);
        majmoehNameControl?.setValidators(null);
        break;
    }

    floorControl?.updateValueAndValidity();
    pasajhNameControl?.updateValueAndValidity();
    majmoehNameControl?.updateValueAndValidity();
  }

  determineParkingMeterValidator(hasBalconyeMeter: boolean) {
    const parkingTypeControl = this.form.get('commonFields.parkingType');
    if (hasBalconyeMeter) {
      parkingTypeControl?.setValidators([Validators.required]);
    } else {
      parkingTypeControl?.setValidators(null);
    }
    parkingTypeControl?.updateValueAndValidity();
  }
  determineBalconyeMeterValidator(hasBalconyeMeter: boolean) {
    const balconyeMeterControl = this.form.get('commonFields.balconyeMeter');
    if (hasBalconyeMeter) {
      balconyeMeterControl?.setValidators([
        Validators.required,
        numberValidator(),
      ]);
    } else {
      balconyeMeterControl?.setValidators(null);
    }
    balconyeMeterControl?.updateValueAndValidity();
  }

  hint(input: HTMLInputElement, type: string) {
    const value = input.value;
    let desc;
    if (value.length > 0 && value !== '0') {
      // console.log('hint', value);
      desc = value + ' متر مربع';
    } else {
      desc = '';
    }
    if (type === 'storeMeter') {
      this.hintStoreMeter = desc;
      // this.hintBalconyeMeter = '';
    } else if (type === 'balconyeMeter') {
      // this.hintDescription = '';
      this.hintBalconyeMeter = desc;
    }
  }
  onKeyPress_onlyNumber(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  onKeyPress_onlyPersianLettersAndSpace(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);

    const persianRegex = /^[\u0600-\u06FF\s]+$/;

    if (!persianRegex.test(charStr)) {
      event.preventDefault();
    }
  }
}
