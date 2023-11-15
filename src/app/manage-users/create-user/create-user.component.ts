import {Component, HostBinding, OnInit} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {AbstractControl, EmailValidator, FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {
  emailValidator,
  getErrorMessage,
  matchingValuesValidator,
  valueRequired
} from "../../../util/form-control-validators";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent implements LoadableComponent,OnInit{
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  FormControlNames = FormControlNames;
  formGroup: FormGroup;

  hidePassword = true;

  hideConfirmPassword = true;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  setData(data: any): void {
  }

  getControlErrorMessage(controlName: string): string | null {
    const control = this.formGroup.get(controlName) as AbstractControl;
    return getErrorMessage(control);
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.NAME]: ['',valueRequired],
      [FormControlNames.USERNAME]: ['',valueRequired],
      [FormControlNames.EMAIL]: ['',valueRequired,emailValidator],
      [FormControlNames.ROLE]: ['',valueRequired],
      [FormControlNames.PASSWORD]: ['',valueRequired],
      [FormControlNames.PASSWORD_CONFIRMATION]: ['',valueRequired,emailValidator]
    }, {validators: matchingValuesValidator(FormControlNames.PASSWORD,FormControlNames.PASSWORD_CONFIRMATION)}
    )
  }
}
