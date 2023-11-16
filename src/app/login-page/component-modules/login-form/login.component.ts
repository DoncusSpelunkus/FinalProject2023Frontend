import { Component, HostBinding, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlNames } from "../../../../constants/input-field-constants";
import { getErrorMessage, valueRequired } from "../../../../util/form-control-validators";
import { LoginServiceService } from "../../../../services/HttpRequestSevices/login.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {


  isLoading = false;
  FormControlNames = FormControlNames;

  hide = true;

  loginForm!: FormGroup;

  usernameFormControl!: FormControl;
  passwordFormControl!: FormControl;


  constructor(private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private route: Router,
    private matSnackbar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.initializeFormControls();
    this.initializeFormGroup();
  }

  //TODO implement service logic
  async onSubmit() {
    this.isLoading = true;
    const username = this.usernameInput;
    const password = this.passwordInput;
    try {
      await this.loginService.login(username, password)
    }
    catch (e) {
      this.matSnackbar.open("Something went wrong", 'x', { duration: 1000 })
      return;
    }
    finally {
      this.isLoading = false;
    }
    this.route.navigate(['/warehouse']);
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
