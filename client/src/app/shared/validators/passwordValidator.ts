import { AbstractControl, ValidatorFn } from '@angular/forms';

export function customValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Allowed characters pattern: all english letters and numbers and only this characters @_$!?
    const allowedCharactersPattern = /^[a-zA-Z0-9@_$!?]+$/;

    if (!allowedCharactersPattern.test(control.value)) {
      return { invalidCharacters: true };
    }

    return null;
  };
}
