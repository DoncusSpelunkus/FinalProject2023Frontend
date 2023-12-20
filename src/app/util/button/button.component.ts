import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRoles } from "../../dashboard/dashboard.component";
import { Select } from '@ngxs/store';
import { AuthSelectors } from 'src/app/states/auth/auth-selector';
import { Observable } from 'rxjs';
import { User } from 'src/entities/User';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  @Input() displayText: string;
  @Input() icon: string;
  @Input() role: UserRoles;
  @Input() color: 'green' | 'red' = 'green';
  @Input() outline: boolean = false;
  @Input() disabledCheck: () => boolean = () => false;

  @Output() buttonClickEmitter = new EventEmitter<any>();
  constructor() {
  }

  @Select(AuthSelectors.getMe) userObservable$: Observable<User>;

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
      this.userObservable$.subscribe(user => {
        return user.role === this.role;
      });
    }
    return false;
  }
}
