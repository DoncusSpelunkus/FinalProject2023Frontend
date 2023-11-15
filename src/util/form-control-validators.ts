import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
  if (!isValidEmail) {
    // Returning the error code and message instead of just the code
    return { invalidEmail: { message: 'Email is not valid' } };
  }
  return null;
}

export function valueRequired(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || (typeof control.value === 'string' && control.value.trim() === '')) {
      // Control is empty, so return error code and custom message
      return { required: { message: `${controlName} is required` } };
    }
    return null; // No error
  };
}

export function matchingValuesValidator(controlName1: string, controlName2: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const formGroup = control as FormGroup; // Cast the AbstractControl to FormGroup

    const control1 = formGroup.get(controlName1);
    const control2 = formGroup.get(controlName2);

    // Check if either control is not present, to avoid errors
    if (!control1 || !control2) {
      return null;
    }

    // Return an error object if values do not match, otherwise return null
    return control1.value === control2.value ? null : { 'valuesNotMatching': true };
  };
}

// Utility function to get the first error message of a control
export function getErrorMessage(control: AbstractControl): string | null {
  if (!control.errors) {
    return null; // No errors, return null
  }

  // Get all error keys (error codes) from the control
  const firstErrorKey = Object.keys(control.errors)[0];

  // Return the message of the first error (we assume here every error has a 'message' field)
  return control.errors[firstErrorKey].message;
}


