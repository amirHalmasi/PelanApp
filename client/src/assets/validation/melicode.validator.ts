import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function melliCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const meliCode = control.value;

    if (!meliCode) {
      return null; // don't validate empty values to allow required validation to handle them
    }

    // Regular expression to match exactly 10 digits
    const regex = /^\d{10}$/;

    if (!regex.test(meliCode)) {
      //   return { invalidFormat: true };
      return { invalidMelliCode: true };
    }

    // Check if the code consists of the same digit repeated
    if (/^(.)\1{9}$/.test(meliCode)) {
      //   return { repetitiveDigits: true };
      return { invalidMelliCode: true };
    }

    const c = parseInt(meliCode.charAt(9));
    const n =
      parseInt(meliCode.charAt(0)) * 10 +
      parseInt(meliCode.charAt(1)) * 9 +
      parseInt(meliCode.charAt(2)) * 8 +
      parseInt(meliCode.charAt(3)) * 7 +
      parseInt(meliCode.charAt(4)) * 6 +
      parseInt(meliCode.charAt(5)) * 5 +
      parseInt(meliCode.charAt(6)) * 4 +
      parseInt(meliCode.charAt(7)) * 3 +
      parseInt(meliCode.charAt(8)) * 2;

    const r = n % 11;

    if (
      (r === 0 && r === c) ||
      (r === 1 && c === 1) ||
      (r > 1 && c === 11 - r)
    ) {
      return null; // valid Melli Code
    } else {
      return { invalidMelliCode: true };
    }
  };
}
