import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserRoles} from "../../dashboard/dashboard.component";
import {UserObservable} from "../../../services/HelperSevices/userObservable";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  @Input() displayText: string;
  @Input() icon: string;
  @Input() role: UserRoles;
  @Input() disabledCheck: () => boolean = () => false;

  @Output() buttonClickEmitter = new EventEmitter<any>();
  constructor(private userObservable: UserObservable) {
  }

  /**
   * Check if the button should be disabled by the function provided
   * false by default
   */
  get isDisabled(): boolean {
    return this.disabledCheck();
  }

  /**
   * Emit a click event to the parent if the button is not disabled
   */
  onButtonClick() {
    if (!this.isDisabled) {
      this.buttonClickEmitter.emit();
    }
  }

  get roleMatchesUser(): boolean {
    if (!this.role) {
      return true;
    } else {
      return this.userObservable.getUserSynchronously().role === this.role;
    }
  }
}
