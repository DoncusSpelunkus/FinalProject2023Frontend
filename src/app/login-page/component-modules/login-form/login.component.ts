import {Component, HostBinding, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormControlNames} from "../../../../constants/input-field-constants";
import {getErrorMessage, valueRequired} from "../../../../util/form-control-validators";
import {LoginService} from "../../../../services/login.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  FormControlNames = FormControlNames;

  hide = true;

  loginForm!: FormGroup;

  usernameFormControl!: FormControl;
  passwordFormControl!: FormControl;


  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: Router) {

  }

  ngOnInit(): void {
    this.initializeFormControls();
    this.initializeFormGroup();
  }

  //TODO implement service logic
  async onSubmit() {
    try {
      const username = this.usernameInput;
      const password = this.passwordInput;
      await this.loginService.login(username, password)
      this.route.navigate(['/warehouse']);
    }
    catch (e) {
      return;
    }
  }

  get isLoginInputValid() {
    return this.loginForm.valid;
  }

  get usernameInput() { return this.loginForm.get(FormControlNames.USERNAME)?.value; }
  get passwordInput() { return this.loginForm.get(FormControlNames.PASSWORD)?.value; }

  getControlErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName) as AbstractControl;
    return getErrorMessage(control);
  }

  private initializeFormGroup() {
    this.loginForm = this.formBuilder.group({
      [FormControlNames.USERNAME]: this.usernameFormControl,
      [FormControlNames.PASSWORD]: this.passwordFormControl,
    });
  }

  private initializeFormControls() {
    this.usernameFormControl = this.formBuilder.control('', valueRequired('Username'));
    this.passwordFormControl = this.formBuilder.control('', valueRequired('Password'));
  }
}
