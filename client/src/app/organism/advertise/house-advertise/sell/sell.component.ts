import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NumberToWordsService } from '../../numberToword.service';
import { slideRightInOut } from 'src/app/services/animation';
import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';
import { numberValidator } from 'src/assets/validation/password.validator';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  animations: [slideRightInOut],
})
export class SellComponent implements OnInit, OnChanges {
  states: any = [
    { value: 'Tejari_Maskuni', desc: 'تجاری مسکونی ' },
    { value: 'Maskuni', desc: 'مسکونی' },
  ];
  @Input() buildingType!: string;
  @Input() advertiseType!: string;
  form!: FormGroup;
  hintDescription!: string;
  constructor(
    private rootFormGroup: FormGroupDirective,
    private numberToLetter: NumberToWordsService
  ) {} // this.rootFormGroup is the instant of parent form group component
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes sell component', changes);

    if (changes['advertiseType'] && !changes['advertiseType'].firstChange) {
      this.determineAdvertiseType(changes['advertiseType'].currentValue);
      this.determineHouseTypeValidators(
        this.buildingType,
        changes['advertiseType'].currentValue
      );
      this.advertiseType = changes['advertiseType'].currentValue;
    }
    if (changes['buildingType'] && !changes['buildingType'].firstChange) {
      this.determineHouseTypeValidators(
        changes['buildingType'].currentValue,
        this.advertiseType
      );
      this.buildingType = changes['buildingType'].currentValue;
    }
  }
  ngOnInit(): void {
    console.log('buildingType', this.buildingType);
    this.form = this.rootFormGroup.control;
  }
  hint(input: HTMLInputElement) {
    const value = input.value;
    // console.log('hint', value);
    this.hintDescription = value + ' متر مربع';
  }
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
        // case 'rent':
        //   this.rentHint =
        //     this.numberToWordsService.convertToWords(tomanValue) + ' تومان';
        //   break;

        // case 'deposit':
        //   this.depositHint =
        //     this.numberToWordsService.convertToWords(tomanValue) + ' تومان';
        //   break;

        case 'price':
          this.priceHint =
            this.numberToLetter.convertToWords(tomanValue) + ' تومان';
          break;
      }
    } else {
      this.priceHint = null;
    }
  }
  determineHouseTypeValidators(
    houseTypeSelectValue: string,
    advertiseType: string
  ) {
    console.log(houseTypeSelectValue);
    console.log(advertiseType);
    switch (advertiseType) {
      case 'sell':
        if (houseTypeSelectValue === 'Villaie') {
          // this.buildingType = 'Villaie';
          // this.buildingTypeEvent.emit('Villaie');

          this.setMyValidators('Villaie');
        } else if (houseTypeSelectValue === 'Mojtama') {
          // this.buildingType = 'Mojtama';
          // this.buildingTypeEvent.emit('Mojtama');
          this.setMyValidators('Mojtama');
        } else {
          // this.buildingType = 'ShakhsiSaz';
          // this.buildingTypeEvent.emit('ShakhsiSaz');
          this.setMyValidators('ShakhsiSaz');
        }

        break;
      case 'rent':
        this.resetMyValidators();
    }
  }
  private setMyValidators(buildingName: string): void {
    const groundMeterControl = this.form.get('sellFields.groundMeter');
    // const buildingNameControl = this.form.get('commonFields.buildingName');
    // const parkingTypeControl = this.form.get('commonFields.parkingType');
    // const floorControl = this.form.get('commonFields.floor');
    const floorsControl = this.form.get('sellFields.floors');
    const statesControl = this.form.get('sellFields.state');
    // const orientationsControl = this.form.get('commonFields.orientations');
    const allUnitsControl = this.form.get('sellFields.allUnits');

    switch (buildingName) {
      case 'Villaie':
        groundMeterControl?.setValidators([
          Validators.required,
          numberValidator(),
        ]);
        // buildingNameControl?.setValidators(null);
        // this.advertiseType === 'sell'
        //   ? parkingTypeControl?.setValidators(null)
        //   : parkingTypeControl?.setValidators([Validators.required]);
        // floorControl?.setValidators(null);
        statesControl?.setValidators(Validators.required);
        // orientationsControl?.setValidators(Validators.required);
        floorsControl?.setValidators([Validators.required, numberValidator()]);
        allUnitsControl?.setValidators(null);

        break;

      case 'Mojtama':
        groundMeterControl?.setValidators(null);
        // buildingNameControl?.setValidators([
        //   Validators.required,
        //   persianLetterValidator(),
        // ]);
        // parkingTypeControl?.setValidators(Validators.required);
        // floorControl?.setValidators([Validators.required, numberValidator()]);
        floorsControl?.setValidators(null);
        statesControl?.setValidators(null);
        // orientationsControl?.setValidators(null);
        allUnitsControl?.setValidators(null);
        break;
      case 'ShakhsiSaz':
        groundMeterControl?.setValidators([
          Validators.required,
          numberValidator(),
        ]);
        // buildingNameControl?.setValidators(null);
        // buildingNameControl?.updateValueAndValidity();
        // buildingNameControl?.setValidators(persianLetterValidator());
        // parkingTypeControl?.setValidators(Validators.required);
        // floorControl?.setValidators([Validators.required, numberValidator()]);
        floorsControl?.setValidators([Validators.required, numberValidator()]);
        statesControl?.setValidators(null);
        // orientationsControl?.setValidators(Validators.required);
        allUnitsControl?.setValidators([
          Validators.required,
          numberValidator(),
        ]);
        break;
    }

    groundMeterControl?.updateValueAndValidity();
    // buildingNameControl?.updateValueAndValidity();
    // parkingTypeControl?.updateValueAndValidity();
    // floorControl?.updateValueAndValidity();
    floorsControl?.updateValueAndValidity();
    statesControl?.updateValueAndValidity();
    // orientationsControl?.updateValueAndValidity();
    allUnitsControl?.updateValueAndValidity();
  }
  private resetMyValidators(): void {
    const groundMeterControl = this.form.get('sellFields.groundMeter');
    const floorsControl = this.form.get('sellFields.floors');
    const statesControl = this.form.get('sellFields.state');
    const allUnitsControl = this.form.get('sellFields.allUnits');

    groundMeterControl?.setValidators(null);
    statesControl?.setValidators(null);
    floorsControl?.setValidators(null);
    allUnitsControl?.setValidators(null);

    groundMeterControl?.updateValueAndValidity();
    floorsControl?.updateValueAndValidity();
    statesControl?.updateValueAndValidity();
    allUnitsControl?.updateValueAndValidity();
  }
  determineAdvertiseType(advertiseTypeSelectValue: string) {
    const priceControl = this.form.get('sellFields.price');
    if (advertiseTypeSelectValue === 'sell') {
      priceControl?.setValidators([Validators.required, numberValidator()]);
    } else {
      priceControl?.setValidators(null);
    }
    priceControl?.updateValueAndValidity();
  }
}
