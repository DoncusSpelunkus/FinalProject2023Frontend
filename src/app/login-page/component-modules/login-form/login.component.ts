import {Component, HostBinding} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormControlNames} from "../../../../constants/input-field-constants";
import {emailValidator, getErrorMessage, valueRequired} from "../../../../util/validators/form-control-validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  FormControlNames = FormControlNames;

  hide = true;

  loginForm = new FormGroup({
    [FormControlNames.EMAIL]: new FormControl('', [emailValidator,valueRequired('Email')]),
    [FormControlNames.PASSWORD]: new FormControl('', valueRequired('Password'))
  });


  //TODO implement service logic
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
    }
  }

  get isLoginInputValid() {
    return false;
  }

  get emailInput() { return this.loginForm.get(FormControlNames.EMAIL); }
  get passwordInput() {
    return this.loginForm.get(FormControlNames.PASSWORD); }

  getControlErrorMessage(controlName: string): string | null {
    // Explicitly telling TypeScript that we're dealing with an AbstractControl here
    const control = this.loginForm.get(controlName) as AbstractControl;
    return getErrorMessage(control);
  }
}
