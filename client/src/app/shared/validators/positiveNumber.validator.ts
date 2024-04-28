import { AbstractControl, ValidatorFn } from '@angular/forms';

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Positive number pattern (allowing for decimals)
    const positiveNumberPattern = /^\d+(\.\d+)?$/;

    if (!positiveNumberPattern.test(control.value)) {
      return { invalidPositiveNumber: true };
    }

    // Optionally, you can modify the value to remove any non-numeric characters
    // control.setValue(control.value.replace(/[^\d.]/g, ''));

    return null;
  };
}
