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
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const group = formGroup as FormGroup;
    const control1 = group.get(controlName1);
    const control2 = group.get(controlName2);

    if (!control1 || !control2) {
      // One of the controls is not present in the FormGroup
      return null;
    }

    if (control1.value !== control2.value) {
      // Values don't match, so set an error on the second control
      control2.setErrors({ matchingValues: { message: 'Value doesn\'t match' } });
      return { matchingValues: { message: 'Confirmation values don\'t match' } }; // This line is optional
    }

    // If values match and there's an existing error, clear it
    if (control2.errors && control2.errors['matchingValues']) {
      control2.setErrors({ ...control2.errors, matchingValues: null });
      control2.updateValueAndValidity({ emitEvent: false });
    }

    return null; // Values match, no error
  };
}

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      // If no value, don't return error (let required validator handle this)
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLengthValid = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isLengthValid;

    if (!passwordValid) {
      // Return an object if the password does not meet criteria
      return {
        passwordStrength: {
          message: 'Password must be at least 8 characters long, include a number, an uppercase letter, and a symbol.'
        }
      };
    }

    return null; // Return null if the password meets all criteria
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
  return control.errors[firstErrorKey]?.message;
}

export const getControlErrorMessage = (controlName: string,formGroup: FormGroup): string | null  => {
  const control = formGroup.get(controlName) as AbstractControl;
  return getErrorMessage(control);
}


