import {Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {
  emailValidator,
  getErrorMessage,
  matchingValuesValidator,
  passwordStrengthValidator,
  valueRequired
} from "../../../util/form-control-validators";
import {Subscription} from "rxjs";
import {CreateUserDTO} from "../../../entities/User";
import {UserObservable} from "../../../services/HelperSevices/userObservable";
import {UserManagementService} from "../../../services/HttpRequestSevices/userManagement.service";
import {UserRoles} from "../../dashboard/dashboard.component";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent implements LoadableComponent,OnInit{
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  FormControlNames = FormControlNames;
  formGroup: FormGroup;

  private isUpdatingEmployee: boolean;
  @Output() isValidEmitter = new EventEmitter<boolean>();

  private formGroupStatusSubscription: Subscription;
  hidePassword = true;
  hideConfirmPassword = true;
  roles: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private userService: UserManagementService,
              private userObservable: UserObservable) {
    this.roles = this.mapEnumToArray(UserRoles);
  }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.initializeSubscriptions();
  }

  setData(data: any): void {
    setTimeout(() => {
      this.formGroup.patchValue({
        [FormControlNames.NAME]: data.name,
        [FormControlNames.USERNAME]: data.username,
        [FormControlNames.EMAIL]: data.email,
        [FormControlNames.ROLE]: data.role // User has to be created through ui for this to work, value has to match existing option
      });
    }, 0);
    this.isUpdatingEmployee = true;
  }

  async submit() {
    const createUserDTO: CreateUserDTO = this.getRequestBody();
    if (this.isUpdatingEmployee) {
      await this.userService.updateEmployee(createUserDTO);
    } else {
      await this.userService.createUser(createUserDTO);
    }
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
    this.formGroupStatusSubscription = getCombinedFormGroupValiditySubscription([this.formGroup],this.isValidEmitter);
  }

  private getRequestBody(): CreateUserDTO {
    return {
      email: this.formGroup.get(FormControlNames.EMAIL)?.value,
      name: this.formGroup.get(FormControlNames.NAME)?.value,
      password: this.formGroup.get(FormControlNames.PASSWORD)?.value,
      role: this.formGroup.get(FormControlNames.ROLE)?.value,
      username: this.formGroup.get(FormControlNames.USERNAME)?.value,
      warehouseId: this.userObservable.getUserSynchronously().warehouseId
    };
  }
  private mapEnumToArray(enumObj: any): any[] {
    return Object.keys(enumObj).map(key => ({ value: enumObj[key] }));
  }

}
