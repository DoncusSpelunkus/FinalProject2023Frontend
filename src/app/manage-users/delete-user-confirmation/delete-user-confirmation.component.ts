import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {User} from "../../../entities/User";
import { Store } from '@ngxs/store';
import { deleteUser } from 'src/app/states/userManagement/user-actions';

@Component({
  selector: 'app-delete-user-confirmation',
  templateUrl: './delete-user-confirmation.component.html'
})
export class DeleteUserConfirmationComponent implements LoadableComponent{
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
    this.store.dispatch(new deleteUser(this.selectedUser.employeeId));
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getUserDisplayName() {
    return this.selectedUser.username
  }
}
