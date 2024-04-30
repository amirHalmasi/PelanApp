import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Number pattern (allowing for positive and negative numbers, and decimals)
    const numberPattern = /^-?\d+(\.\d+)?$/;

    if (!numberPattern.test(control.value)) {
      return { invalidNumber: true };
    }

    // Optionally, you can modify the value to remove any non-numeric characters
    // control.setValue(control.value.replace(/[^\d.-]/g, ''));

    return null;
  };
}
