import {Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {AbstractControl, EmailValidator, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {
  emailValidator,
  getErrorMessage,
  matchingValuesValidator, passwordStrengthValidator,
  valueRequired
} from "../../../util/form-control-validators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent implements LoadableComponent,OnInit{
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  FormControlNames = FormControlNames;
  formGroup: FormGroup;

  @Output() isValidEmitter = new EventEmitter<boolean>();
  private formGroupStatusSubscription: Subscription;

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
    this.initializeSubscriptions()
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
      [FormControlNames.PASSWORD]: ['',[valueRequired(FormControlNames.PASSWORD), passwordStrengthValidator()]],
      [FormControlNames.PASSWORD_CONFIRMATION]: ['',valueRequired(FormControlNames.PASSWORD_CONFIRMATION)]
    }, {validators: matchingValuesValidator(FormControlNames.PASSWORD,FormControlNames.PASSWORD_CONFIRMATION)}
    )
  }

  private initializeSubscriptions() {
    this.formGroupStatusSubscription = this.formGroup.statusChanges.subscribe(status => {
      switch (status) {
        case "VALID":
          this.isValidEmitter.emit(true);
          break;
        case "DISABLED":
          this.isValidEmitter.emit(false);
          break;
        case "INVALID":
          this.isValidEmitter.emit(false);
          break;
        case "PENDING":
          this.isValidEmitter.emit(false);
          break;
      }
    })
  }
}
