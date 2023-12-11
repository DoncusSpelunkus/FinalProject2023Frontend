import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilding} from "../../../interfaces/component-interfaces";
import {FormGroup} from "@angular/forms";
import {getFormControl} from "../../../util/form-control-validators";

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html'
})
export class SelectInputComponent extends FormBuilding {

  @Output() iconClickEmitter = new EventEmitter<any>();

  @Input() inputFormControlName: string;
  @Input() inputFormGroup: FormGroup;
  @Input() list: any[]
  @Input() showLabel = true;
  @Input() placeholder: string;

  @Input() showIcon = false;

  @Input() displayValue: string


  emitIconClickEvent() {
    this.iconClickEmitter.emit();
  }

  get getCurrentFormControl() {
    return getFormControl(this.inputFormControlName,this.inputFormGroup);
  }
}
