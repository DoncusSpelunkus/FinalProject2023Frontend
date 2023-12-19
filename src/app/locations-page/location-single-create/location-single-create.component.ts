import {Component, EventEmitter} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";

@Component({
  selector: 'app-location-single-create',
  templateUrl: './location-single-create.component.html'
})
export class LocationSingleCreateComponent extends FormBuilding implements LoadableComponent{

  isValidEmitter = new EventEmitter<boolean>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.initializeFormGroup();
  }

  setData(data: any): void {
  }

  submit(): void {
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.AISLE]: ['',valueRequired(FormControlNames.AISLE)],
      [FormControlNames.RACK]: ['',valueRequired(FormControlNames.AISLE)],
      [FormControlNames.SHELF]: ['',valueRequired(FormControlNames.AISLE)],
      [FormControlNames.BIN]: ['',valueRequired(FormControlNames.AISLE)],
    })
  }
}
