import {Component, HostBinding, OnInit} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {AbstractControl, EmailValidator, FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  roles = [
    {value: 'standard'},
    {value: 'admin'},
    {value: 'sales'},
  ]

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  setData(data: any): void {
  }

  submit() {
    console.log(this.formGroup.value)
  }

  getControlErrorMessage(controlName: string): string | null {
    const control = this.formGroup.get(controlName) as AbstractControl;
    return getErrorMessage(control);
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.NAME]: ['',valueRequired(FormControlNames.NAME)],
      [FormControlNames.USERNAME]: ['',valueRequired(FormControlNames.USERNAME)],
      [FormControlNames.EMAIL]: ['',[valueRequired(FormControlNames.EMAIL),emailValidator]],
      [FormControlNames.ROLE]: ['',valueRequired(FormControlNames.ROLE)],
      [FormControlNames.PASSWORD]: ['',valueRequired(FormControlNames.PASSWORD)],
      [FormControlNames.PASSWORD_CONFIRMATION]: ['',valueRequired(FormControlNames.PASSWORD_CONFIRMATION)]
    }, {validators: matchingValuesValidator(FormControlNames.PASSWORD,FormControlNames.PASSWORD_CONFIRMATION)}
    )
  }
}
