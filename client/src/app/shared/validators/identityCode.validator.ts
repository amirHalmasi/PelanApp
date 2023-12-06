import { AbstractControl, ValidatorFn } from '@angular/forms';

export function identityCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) {
      return null; // If the value is empty, don't perform validation
    }

    const identityCodePattern = /^(?:(\d)(?!\1{9}))(\d{9})$/;

    if (!identityCodePattern.test(control.value)) {
      return { invalidIdentityCode: true };
    }

    return null;
  };
}
