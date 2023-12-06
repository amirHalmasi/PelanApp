import { AbstractControl, ValidatorFn } from '@angular/forms';

export function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) {
      return null; // If the value is empty, don't perform validation
    }

    const mobileNumberPattern =
      /^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/;

    if (!mobileNumberPattern.test(control.value)) {
      return { invalidmobileNumber: true };
    }

    return null;
  };
}
