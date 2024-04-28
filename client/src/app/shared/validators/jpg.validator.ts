import { AbstractControl, ValidatorFn } from '@angular/forms';

export function jpgValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    // console.log('validator jpg', value);
    if (!value) {
      return null; // If the value is empty, don't perform validation
    }

    const imageFormat = /\.(jpe?g|png|jpg)$/i;

    if (!imageFormat.test(value)) {
      return { invalidImageFormat: true };
    }

    return null;
  };
}
