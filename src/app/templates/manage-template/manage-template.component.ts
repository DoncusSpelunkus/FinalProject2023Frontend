import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {FormBuilding} from "../../../interfaces/component-interfaces";

@Component({
  selector: 'app-manage-template',
  templateUrl: './manage-template.component.html'
})
export class ManageTemplateComponent implements FormBuilding{

  tableFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initializeFormGroup();
  }

  private initializeFormGroup() {
    this.tableFormGroup = this.formBuilder.group({
      [FormControlNames.FILTER]: [''],
      [FormControlNames.PAGE]: [''],
      [FormControlNames.ITEMS_PER_PAGE]: ['']
    })
  }
}
