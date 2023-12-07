import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {UserService} from "../../../services/HttpRequestSevices/user.service";
import {User} from "../../../entities/User";

@Component({
  selector: 'app-delete-user-confirmation',
  templateUrl: './delete-user-confirmation.component.html'
})
export class DeleteUserConfirmationComponent implements LoadableComponent{
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  @Output() isValidEmitter = new EventEmitter<boolean>();

  selectedUser: User;
  constructor(private userService: UserService) {
  }

  setData(data: any): void {
    this.selectedUser = data;
  }

  submit(): void {
    this.userService.deleteEmployee(this.selectedUser.employeeId);
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getUserDisplayName() {
    return this.selectedUser.username
  }
}
