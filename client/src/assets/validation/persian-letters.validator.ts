import { AbstractControl, ValidatorFn } from '@angular/forms';

export function persianLetterValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Persian letters pattern (including spaces)
    const persianLettersPattern = /^[\u0600-\u06FF\s]+$/;

    if (!persianLettersPattern.test(control.value)) {
      return { invalidPersianLetter: true };
    }

    // Optionally, you can modify the value to only contain Persian letters and spaces
    // control.setValue(control.value.replace(/[^\u0600-\u06FF\s]+/g, ''));

    return null;
  };
}
