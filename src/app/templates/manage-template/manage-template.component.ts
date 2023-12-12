import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {FormBuilding} from "../../../interfaces/component-interfaces";
import {getFormControl} from "../../../util/form-control-validators";

@Component({
  selector: 'app-manage-template',
  templateUrl: './manage-template.component.html'
})
export class ManageTemplateComponent extends FormBuilding{

  tableFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    super();
    this.initializeFormGroup();
  }

  private initializeFormGroup() {
    this.tableFormGroup = this.formBuilder.group({
      [FormControlNames.FILTER]: [''],
      [FormControlNames.PAGE]: [''],
      [FormControlNames.ITEMS_PER_PAGE]: ['']
    })
  }

  get filterValue(): string {
    return getFormControl(FormControlNames.FILTER,this.tableFormGroup).value;
  }

  clearFilterValue() {
    getFormControl(FormControlNames.FILTER,this.tableFormGroup).reset();
  }
}
