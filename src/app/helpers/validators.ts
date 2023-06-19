import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function whitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && value.trim().length === 0) {
      return { whitespace: true };
    }
    return null;
  };
}

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    console.log(value);
    console.log(value instanceof Date);
    if (value instanceof Date) {
      return null;
    }

    return { date: true };
  };
}

export function formArrayEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;
    if (formArray.length === 0) {
      return { formArrayEmpty: true };
    }
    return null;
  };
}
