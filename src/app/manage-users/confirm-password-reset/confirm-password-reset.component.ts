import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {User} from "../../../entities/User";
import {Store} from "@ngxs/store";
import {changePassword, deleteUser} from "../../states/userManagement/user-actions";
import {UserManagementService} from "../../../services/HttpRequestSevices/userManagement.service";

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html'
})
export class ConfirmPasswordResetComponent implements LoadableComponent{
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  @Output() isValidEmitter = new EventEmitter<boolean>();

  selectedUser: User;
  constructor(private store: Store) {
  }
  setData(data: any): void {
    this.selectedUser = data;
  }

  submit(): void {
    // this.store.dispatch(new changePassword(this.selectedUser.email));
    // this.store.dispatch(new reset)
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getUserDisplayName() {
    return this.selectedUser.username
  }

  get getUserEmail() {
    return this.selectedUser.email;
  }
}
