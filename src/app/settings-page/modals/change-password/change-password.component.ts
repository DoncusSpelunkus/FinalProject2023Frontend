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
import {UserManagementService} from "../../../../services/HttpRequestSevices/userManagement.service";
import {ChangePasswordDTO} from "../../../../entities/PasswordConfirmation";
import {UserObservable} from "../../../../services/HelperSevices/userObservable";

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
              private userService: UserManagementService,
              private userObservable: UserObservable) {
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
    this.userService.changeUserPassword(dto);
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.PASSWORD]: ['',[valueRequired(FormControlNames.PASSWORD),passwordStrengthValidator()]],
      [FormControlNames.PASSWORD_CONFIRMATION]: ['',[valueRequired(FormControlNames.PASSWORD_CONFIRMATION),passwordStrengthValidator()]],
    }, {validators: matchingValuesValidator(FormControlNames.PASSWORD,FormControlNames.PASSWORD_CONFIRMATION)})
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
      password: getFormControl(FormControlNames.PASSWORD,this.formGroup).value,
      passwordConfirmation: getFormControl(FormControlNames.PASSWORD_CONFIRMATION,this.formGroup).value,
      employeeId: this.userObservable.getUserSynchronously().employeeId
    }
    return dto;
  }
}
