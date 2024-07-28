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
  selector: 'app-rent-store',
  templateUrl: './rent-store.component.html',
  styleUrls: ['./rent-store.component.css'],
  animations: [slideRightInOut],
})
export class RentStoreComponent implements OnInit, OnChanges {
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
  rentStoreTypes: any = [
    { value: 'rahn_kamel', desc: 'رهن کامل' },
    { value: 'rahn_ejare', desc: 'رهن و اجاره' },
  ];

  @Input() storeType!: string;
  @Input() advertiseType!: string;
  form!: FormGroup;
  hintDescription!: string;
  depositHint!: string | null;
  rentHint!: string | null;
  priceHint!: string | null;
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
    const rentStoreTypeControl = this.form.get('rentFields.rentStoreType');
    const controlTypeControl = this.form.get('rentFields.controlType');

    // const parkingTypeControl = this.form.get('commonFields.parkingType');

    if (advertiseType === 'rent') {
      depositPriceControl?.setValidators([
        Validators.required,
        numberValidator(),
      ]);

      rentPriceControl?.setValidators([Validators.required, numberValidator()]);
      rentStoreTypeControl?.setValidators([Validators.required]);
      controlTypeControl?.setValidators([Validators.required]);
    } else {
      depositPriceControl?.setValidators(null);
      rentPriceControl?.setValidators(null);
      rentStoreTypeControl?.setValidators(null);
      controlTypeControl?.setValidators(null);
    }

    depositPriceControl?.updateValueAndValidity();
    rentPriceControl?.updateValueAndValidity();
    rentStoreTypeControl?.updateValueAndValidity();
    controlTypeControl?.updateValueAndValidity();
  }
}
