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
import {UserObservable} from "../../../services/userObservable";
import {UserService} from "../../../services/user.service";

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

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private userObservable: UserObservable) {
  }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.initializeSubscriptions();
  }

  setData(data: any): void {
  }

  async submit() {
    const createUserDTO: CreateUserDTO = this.getRequestBody();
    await this.userService.createUser(createUserDTO);
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

  private getRequestBody(): CreateUserDTO {
    return {
      email: this.formGroup.get(FormControlNames.EMAIL)?.value,
      name: this.formGroup.get(FormControlNames.NAME)?.value,
      password: this.formGroup.get(FormControlNames.PASSWORD)?.value,
      role: this.formGroup.get(FormControlNames.ROLE)?.value,
      username: this.formGroup.get(FormControlNames.USERNAME)?.value,
      warehouseId: this.userObservable.getCurrentUserSynchronously()?.warehouseId
    };
  }
}
