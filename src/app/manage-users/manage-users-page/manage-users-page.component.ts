import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";

@Component({
  selector: 'app-manage-users-page',
  templateUrl: './manage-users-page.component.html'
})
export class ManageUsersPageComponent implements OnInit{

  formGroup: FormGroup;
  displayedColumns: string[] = ['name', 'lastName'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  FormControlNames = FormControlNames

  users: any[] = [
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeFormGroup();
    this.dataSource.data = this.users;
    this.dataSource.paginator = this.paginator;
  }

  private fetchUsers() {
  }

  get filterValue(): string {
    return this.formGroup?.get(FormControlNames.FILTER)?.value;
  }

  private initializeFormGroup() {
    this.formGroup = this.fb.group({
      filter: ['']
    });
  }

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'
}
