import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-manage-users-page',
  templateUrl: './manage-users-page.component.html'
})
export class ManageUsersPageComponent implements OnInit{

  displayedColumns: string[] = ['name', 'lastName'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  users: any[] = [
    {name: 'Alice', lastName:'Anderson'},
    {name: 'Brian', lastName:'Barnes'},
    {name: 'Charlie', lastName:'Campbell'},
    {name: 'David', lastName:'Davis'},
    {name: 'Eve', lastName:'Evans'},
    {name: 'Frank', lastName:'Foster'}
  ];

  ngOnInit() {
    this.dataSource.data = this.users;
    this.dataSource.paginator = this.paginator;
  }

  private fetchUsers() {

  }

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'
}
