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

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value.length === 0) return null;
    // Check if the value is a valid number and greater than 0
    if (isNaN(value) || value <= 0) {
      return { positiveNumber: true };
    }

    return null; // Return null if the value is valid
  };
}
