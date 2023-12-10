import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FormBuilding} from "../../../interfaces/component-interfaces";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html'
})
export class TextInputComponent extends FormBuilding{

  @Input() inputFormControlName: string;
  @Input() inputFormGroup: FormGroup;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() icon: string;


}
