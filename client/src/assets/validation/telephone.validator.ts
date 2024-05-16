import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneNumber = control.value;
    const regex = /^0\d{2,3}-\d{8}$/;

    if (!regex.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }

    return null; // valid phone number
  };
}
