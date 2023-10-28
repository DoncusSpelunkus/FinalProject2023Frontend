import {Component, HostBinding} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {FormControlNames} from "../../../../constants/input-field-constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  FormControlNames = FormControlNames;

  hide = true;

  loginForm = new FormGroup({
    [FormControlNames.EMAIL]: new FormControl('', [Validators.required]),
    [FormControlNames.PASSWORD]: new FormControl('', [Validators.required])
  });


  //TODO implement service logic
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
    }
  }

  get emailInput() { return this.loginForm.get(FormControlNames.EMAIL); }
  get passwordInput() {
    console.log(this.loginForm.get([FormControlNames.PASSWORD]))
    return this.loginForm.get(FormControlNames.PASSWORD); }

}
