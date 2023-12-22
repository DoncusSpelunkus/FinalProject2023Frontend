import {Component, EventEmitter} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html'
})
export class ConfirmPasswordResetComponent implements LoadableComponent{

  isValidEmitter = new EventEmitter<boolean>();

  setData(data: any): void {
  }

  submit(): void {
  }

}
