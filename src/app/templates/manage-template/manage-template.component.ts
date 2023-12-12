import {Component, Host, HostBinding} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {FormBuilding} from "../../../interfaces/component-interfaces";
import {getFormControl} from "../../../util/form-control-validators";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../entities/User";

@Component({
  selector: 'app-manage-template',
  templateUrl: './manage-template.component.html'
})
export class ManageTemplateComponent extends FormBuilding{

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';

  tableFormGroup: FormGroup;
  dataSource = new MatTableDataSource<SimpleDummyData>();


  displayedColumns = ['name'];
  constructor(private formBuilder: FormBuilder) {
    super();
    this.initializeFormGroup();
    this.initializeSourceData();//TODO REMOVE
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


  private initializeSourceData(): void {
    const values: SimpleDummyData[] = [
      {name: 'Bob'},
      {name: 'bin'},
      {name: 'bon'},
      {name: 'Van'},
      {name: 'Helsing'},
      {name: 'John'},
      {name: 'Alex'},
      {name: 'Tiffany'},
      {name: 'JAke'},
      {name: 'Alex'},
      {name: 'Twink'},
    ]
    this.dataSource.data = values;
  }
}

export interface SimpleDummyData {
  name: string;
}
