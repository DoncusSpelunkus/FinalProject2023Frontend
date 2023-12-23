import {Component, EventEmitter, HostBinding, OnDestroy, Output} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../../constants/input-field-constants";
import {
  getFormControl,
  matchingValuesValidator,
  passwordStrengthValidator,
  valueRequired
} from "../../../../util/form-control-validators";
import {Subscription} from "rxjs";
import {ChangePasswordDTO} from "../../../../entities/PasswordConfirmation";
import { Store } from '@ngxs/store';
import { UpdatePassword } from 'src/app/states/auth/auth-action';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent extends FormBuilding implements LoadableComponent, OnDestroy{
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  @Output() isValidEmitter = new EventEmitter<boolean>();

  formGroup: FormGroup

  private formGroupStatusSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
) {
    super();
    this.initializeFormGroup();
    this.initializeSubscriptions();
  }

  ngOnDestroy(): void {
    if (this.formGroupStatusSubscription) {
      this.formGroupStatusSubscription.unsubscribe();
    }
  }

  setData(data: any): void {
  }


  submit(): void {
    const dto = this.getDTO();
    this.store.dispatch(new UpdatePassword(dto));
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.CURRENT_PASSWORD]: ['',[valueRequired(FormControlNames.CURRENT_PASSWORD)]],
      [FormControlNames.NEW_PASSWORD]: ['',[valueRequired(FormControlNames.NEW_PASSWORD),passwordStrengthValidator()]],
    })
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

  private getDTO() {
    const dto: ChangePasswordDTO = {
      newPassword: getFormControl(FormControlNames.NEW_PASSWORD,this.formGroup).value,
      oldPassword: getFormControl(FormControlNames.CURRENT_PASSWORD,this.formGroup).value
    }
    return dto;
  }
}
