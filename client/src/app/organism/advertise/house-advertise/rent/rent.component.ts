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
import { numberValidator } from 'src/assets/validation/password.validator';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
  animations: [slideRightInOut],
})
export class RentComponent implements OnInit, OnChanges {
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
  @Input() buildingType!: string;
  @Input() advertiseType!: string;
  form!: FormGroup;
  hintDescription!: string;
  constructor(
    private rootFormGroup: FormGroupDirective,
    private numberToLetter: NumberToWordsService
  ) {} // this.rootFormGroup is the instant of parent form group component
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);

    if (changes['advertiseType'] && !changes['advertiseType'].firstChange) {
      this.determineRentAdvertiseValidators(
        changes['advertiseType'].currentValue
      );
    }
  }
  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
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
            this.numberToLetter.convertToWords(tomanValue) + ' تومان';
          break;

        case 'deposit':
          this.depositHint =
            this.numberToLetter.convertToWords(tomanValue) + ' تومان';
          break;
      }
    } else {
      this.depositHint = null;
      this.rentHint = null;
    }
  }

  determineRentAdvertiseValidators(advertiseType: string) {
    const depositPriceControl = this.form.get('rentFields.depositPrice');
    const rentPriceControl = this.form.get('rentFields.rentPrice');
    const entryTypeControl = this.form.get('rentFields.entryType');
    const rentFlatTypeControl = this.form.get('rentFields.rentFlatType');
    const controlTypeControl = this.form.get('rentFields.controlType');
    const flatStatusTypeControl = this.form.get('rentFields.flatStatusType');
    // const parkingTypeControl = this.form.get('commonFields.parkingType');

    if (advertiseType === 'rent') {
      // this.advertiseType = 'rent';
      // priceControl?.setValidators(null);
      depositPriceControl?.setValidators([
        Validators.required,
        numberValidator(),
      ]);
      // parkingTypeControl?.setValidators(Validators.required);

      rentPriceControl?.setValidators([Validators.required, numberValidator()]);
      entryTypeControl?.setValidators([Validators.required]);
      rentFlatTypeControl?.setValidators([Validators.required]);
      controlTypeControl?.setValidators([Validators.required]);
      flatStatusTypeControl?.setValidators([Validators.required]);
      // this.setValidators('Villaie');
    } else {
      // this.advertiseType = 'sell';
      // priceControl?.setValidators([Validators.required, numberValidator()]);
      depositPriceControl?.setValidators(null);
      rentPriceControl?.setValidators(null);
      // this.buildingType === 'Villaie'
      //   ? parkingTypeControl?.setValidators(null)
      //   : parkingTypeControl?.setValidators(Validators.required);
      entryTypeControl?.setValidators(null);
      rentFlatTypeControl?.setValidators(null);
      controlTypeControl?.setValidators(null);
      flatStatusTypeControl?.setValidators(null);
    }

    // priceControl?.updateValueAndValidity();
    depositPriceControl?.updateValueAndValidity();
    rentPriceControl?.updateValueAndValidity();
    entryTypeControl?.updateValueAndValidity();
    rentFlatTypeControl?.updateValueAndValidity();
    controlTypeControl?.updateValueAndValidity();
    flatStatusTypeControl?.updateValueAndValidity();
    // parkingTypeControl?.updateValueAndValidity();
  }
}
