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

  users: { name: string; lastName: string }[] = [
    { name: 'Emma', lastName: 'Johnson' },
    { name: 'Noah', lastName: 'Williams' },
    { name: 'Olivia', lastName: 'Brown' },
    { name: 'Liam', lastName: 'Jones' },
    { name: 'Sophia', lastName: 'Garcia' },
    { name: 'Mason', lastName: 'Miller' },
    { name: 'Ava', lastName: 'Davis' },
    { name: 'Jacob', lastName: 'Rodriguez' },
    { name: 'William', lastName: 'Martinez' },
    { name: 'Isabella', lastName: 'Hernandez' },
    { name: 'Ethan', lastName: 'Lopez' },
    { name: 'James', lastName: 'Gonzalez' },
    { name: 'Mia', lastName: 'Wilson' },
    { name: 'Alexander', lastName: 'Anderson' },
    { name: 'Michael', lastName: 'Thomas' },
    { name: 'Charlotte', lastName: 'Taylor' },
    { name: 'Benjamin', lastName: 'Moore' },
    { name: 'Elijah', lastName: 'Jackson' },
    { name: 'Amelia', lastName: 'Martin' },
    { name: 'Oliver', lastName: 'Lee' },
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
