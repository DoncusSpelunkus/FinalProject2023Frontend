import { Component, HostBinding, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlNames } from "../../../../constants/input-field-constants";
import { getErrorMessage, valueRequired } from "../../../../util/form-control-validators";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { establishConnection } from 'src/app/states/crossStateAction';
import { Observable } from 'rxjs';
import { Login, getMe, getUserConnection } from 'src/app/states/auth/auth-action';
import { User } from 'src/entities/User';
import { AuthSelectors } from 'src/app/states/auth/auth-selector';
import { handleRoleBasedNavigation } from 'src/util/role-based-actions';
import {ActivityService} from "../../../../services/HelperSevices/activityService";



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

  @Select(AuthSelectors.getToken) token$!: Observable<string>;
  @Select(AuthSelectors.getMe) userObservable$!: Observable<User>;


  constructor(private formBuilder: FormBuilder,
    private route: Router,
    private matSnackbar: MatSnackBar,
    private store: Store,
    private activityService: ActivityService
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
      await this.store.dispatch(new Login(username, password)).toPromise();
      this.token$.subscribe(token => {
        if (token != null) {
          this.store.dispatch(new getUserConnection(token));
        }
      });
      try {
        this.store.dispatch(new establishConnection());
      }
      catch (e) {
        console.log(e)
      }
    }
    catch (e) {
      this.matSnackbar.open("Something went wrong", 'x', { duration: 1000 })
      return;
    }
    finally {
      this.isLoading = false;
      this.activityService.startMonitoring();
      this.userObservable$.subscribe(user => {
        handleRoleBasedNavigation(user.role, this.route)
      });
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
