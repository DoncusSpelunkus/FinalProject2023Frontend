import { Component, HostBinding, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlNames } from "../../../../constants/input-field-constants";
import { emailValidator, getErrorMessage, valueRequired } from "../../../../util/validators/form-control-validators";
import { LoginServiceService } from "../../../../services/login-service.service";
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  FormControlNames = FormControlNames;

  hide = true;

  loginForm!: FormGroup;

  emailFormControl!: FormControl;
  passwordFormControl!: FormControl;


  constructor(private formBuilder: FormBuilder,
    private loginService: LoginServiceService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.initializeFormControls();
    this.initializeFormGroup();
  }

  //TODO implement service logic
  async onSubmit() {
    try {
      const email = this.emailInput;
      const password = this.passwordInput;
      await this.loginService.login(email, password);
    }
    catch (e) {
      return;
    }
    await this.userService.getCurrentUser();
  }

  get isLoginInputValid() {
    return this.loginForm.valid;
  }

  get emailInput() { return this.loginForm.get(FormControlNames.EMAIL)?.value; }
  get passwordInput() { return this.loginForm.get(FormControlNames.PASSWORD)?.value; }

  getControlErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName) as AbstractControl;
    return getErrorMessage(control);
  }

  private initializeFormGroup() {
    this.loginForm = this.formBuilder.group({
      [FormControlNames.EMAIL]: this.emailFormControl,
      [FormControlNames.PASSWORD]: this.passwordFormControl,
    });
  }

  private initializeFormControls() {
    this.emailFormControl = this.formBuilder.control('', [emailValidator, valueRequired('Email')]);
    this.passwordFormControl = this.formBuilder.control('', valueRequired('Password'));
  }
}
