import { AbstractControl, ValidatorFn } from '@angular/forms';

export function whitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && value.trim().length === 0) {
      return { whitespace: true };
    }
    return null;
  };
}
