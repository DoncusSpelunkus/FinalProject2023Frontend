import {EventEmitter} from "@angular/core";
import {FormControlNames} from "../constants/input-field-constants";
import {getControlErrorMessage, getFormControl} from "../util/form-control-validators";

export interface LoadableComponent {
  setData(data: any): void;
  submit(): void;
  isValidEmitter: EventEmitter<boolean>;
}

export class FormBuilding {
  protected readonly FormControlNames = FormControlNames;
  protected readonly getControlErrorMessage = getControlErrorMessage;
  protected readonly getFormControl = getFormControl;
}
