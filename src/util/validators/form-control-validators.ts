import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

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


