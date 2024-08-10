import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { numberValidator } from 'src/assets/validation/password.validator';
import { NumberToWordsService } from '../../numberToword.service';
import { slideRightInOut } from 'src/app/services/animation';

@Component({
  selector: 'app-sell-store',
  templateUrl: './sell-store.component.html',
  styleUrls: ['./sell-store.component.css'],
  animations: [slideRightInOut],
})
export class SellStoreComponent implements OnInit, OnChanges {
  priceHint!: string | null;
  storeDocuments: any = [
    { value: 'has-document', desc: 'دارد ' },
    { value: 'has-document-diposite', desc: 'دارد در رهن' },
    { value: 'contract', desc: 'قولنامه' },

    { value: 'other', desc: 'سایر' },
  ];

  owneringTypes: any = [
    { value: 'melkiat', desc: 'ملکیت ' },
    { value: 'sarghofli', desc: 'سرقفلی ' },
  ];

  @Input() storeType!: string;
  @Input() advertiseType!: string;
  form!: FormGroup;

  hintStoreWidth!: string;
  hintGroundMeter!: string;
  constructor(
    private rootFormGroup: FormGroupDirective,
    private numberToLetter: NumberToWordsService
  ) {} // this.rootFormGroup is the instant of parent form group component
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes sell component', changes);

    if (changes['advertiseType'] && !changes['advertiseType'].firstChange) {
      this.determineAdvertiseType(changes['advertiseType'].currentValue);
      this.determineStoreTypeValidators(
        this.storeType,
        changes['advertiseType'].currentValue
      );
      this.advertiseType = changes['advertiseType'].currentValue;
      const storeDocumentControl = this.form.get('sellFields.storeDocument');
      const owneringTypeControl = this.form.get('sellFields.owneringType');
      const storeWidthControl = this.form.get('sellFields.storeWidth');
      if (changes['advertiseType'].currentValue === 'sell') {
        storeDocumentControl?.setValidators([Validators.required]);
        owneringTypeControl?.setValidators([Validators.required]);
        storeWidthControl?.setValidators([
          Validators.required,
          numberValidator(),
        ]);
      } else {
        storeDocumentControl?.setValidators(null);
        owneringTypeControl?.setValidators(null);
        storeWidthControl?.setValidators(null);
      }
      storeDocumentControl?.updateValueAndValidity();
      owneringTypeControl?.updateValueAndValidity();
      storeWidthControl?.updateValueAndValidity();
    }
    if (changes['storeType'] && !changes['storeType'].firstChange) {
      this.determineStoreTypeValidators(
        changes['storeType'].currentValue,
        this.advertiseType
      );
      // this.buildingType = changes['buildingType'].currentValue;
    }
  }
  ngOnInit(): void {
    // console.log('buildingType', this.buildingType);
    this.form = this.rootFormGroup.control;
  }
  hint(input: HTMLInputElement, type: string) {
    const value = input.value;

    if (type === 'storeWidth' && value.length > 0 && value !== '0') {
      this.hintStoreWidth = value + ' متر';
    } else if (type === 'groundMeter' && value.length > 0 && value !== '0') {
      this.hintGroundMeter = value + ' متر مربع';
    } else {
      this.hintStoreWidth = '';
    }
  }

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
        case 'price':
          this.priceHint =
            this.numberToLetter.convertToWords(tomanValue) + ' تومان';
          break;
        default:
          this.priceHint = '';
          break;
      }
    } else {
      this.priceHint = null;
    }
  }

  determineStoreTypeValidators(
    storeTypeSelectValue: string,
    advertiseType: string
  ) {
    // console.log(storeTypeSelectValue);
    // console.log(advertiseType);
    switch (advertiseType) {
      case 'sell':
        if (storeTypeSelectValue === 'bazar') {
          this.setMyValidators('bazar');
        } else if (storeTypeSelectValue === 'bazar-che') {
          this.setMyValidators('bazar-che');
        } else if (storeTypeSelectValue === 'pasajh') {
          this.setMyValidators('pasajh');
        } else if (storeTypeSelectValue === 'city-center') {
          this.setMyValidators('city-center');
        } else if (storeTypeSelectValue === 'other') {
          this.setMyValidators('other');
        }

        break;
      case 'rent':
        this.resetMyValidators();
    }
  }
  private setMyValidators(storeType: string): void {
    const groundMeterControl = this.form.get('sellFields.groundMeter');
    const storeDocumentControl = this.form.get('sellFields.storeDocument');
    const owneringTypeControl = this.form.get('sellFields.owneringType');

    switch (storeType) {
      case 'other':
      case 'city-center':
        groundMeterControl?.setValidators([
          Validators.required,
          numberValidator(),
        ]);

        storeDocumentControl?.setValidators(Validators.required);
        owneringTypeControl?.setValidators(Validators.required);

        break;

      case 'pasajh':
        groundMeterControl?.setValidators(null);

        storeDocumentControl?.setValidators(Validators.required);
        owneringTypeControl?.setValidators(Validators.required);

        break;
      case 'bazar-che':
        groundMeterControl?.setValidators(null);

        owneringTypeControl?.setValidators([
          Validators.required,
          numberValidator(),
        ]);
        storeDocumentControl?.setValidators(null);

        break;
      case 'bazar':
        groundMeterControl?.setValidators(null);

        owneringTypeControl?.setValidators([
          Validators.required,
          numberValidator(),
        ]);
        storeDocumentControl?.setValidators(null);

        break;
    }

    groundMeterControl?.updateValueAndValidity();
    owneringTypeControl?.updateValueAndValidity();
    storeDocumentControl?.updateValueAndValidity();
  }
  private resetMyValidators(): void {
    const groundMeterControl = this.form.get('sellFields.groundMeter');
    const storeDocumentControl = this.form.get('sellFields.storeDocument');
    const owneringTypeControl = this.form.get('sellFields.owneringType');

    groundMeterControl?.setValidators(null);
    storeDocumentControl?.setValidators(null);
    owneringTypeControl?.setValidators(null);

    groundMeterControl?.updateValueAndValidity();
    owneringTypeControl?.updateValueAndValidity();
    storeDocumentControl?.updateValueAndValidity();
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

// private setMyValidators(storeType: string): void {
//   const groundMeterControl = this.form.get('sellFields.groundMeter');
//   const storeDocumentControl = this.form.get('sellFields.storeDocument');
//   const owneringTypeControl = this.form.get('sellFields.owneringType');

//   switch (storeType) {
//     case 'other':
//     case 'city-center':
//       groundMeterControl?.setValidators([
//         Validators.required,
//         numberValidator(),
//       ]);

//       break;

//     case 'pasajh':
//     case 'bazar-che':
//     case 'bazar':
//       groundMeterControl?.setValidators(null);
//       break;

//       default:
//         storeDocumentControl?.setValidators(Validators.required);
//         owneringTypeControl?.setValidators(Validators.required);
//         break;

//   }

//   groundMeterControl?.updateValueAndValidity();
//   owneringTypeControl?.updateValueAndValidity();
//   storeDocumentControl?.updateValueAndValidity();
// }
