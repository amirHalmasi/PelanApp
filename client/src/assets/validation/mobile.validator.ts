import { AbstractControl, ValidatorFn } from '@angular/forms';

export function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Phone number pattern
    const phoneNumberPattern = /^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/;

    if (!phoneNumberPattern.test(control.value)) {
      return { invalidMobileNumber: true };
    }

    return null;
  };
}