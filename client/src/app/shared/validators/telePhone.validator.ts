import { AbstractControl, ValidatorFn } from '@angular/forms';

export function telephoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) {
      return null; // If the value is empty, don't perform validation
    }

    const telePhonePatern = /^0\d{2,3}-\d{8}$/;

    if (!telePhonePatern.test(value)) {
      return { invalidTelephone: true };
    }

    return null;
  };
}
