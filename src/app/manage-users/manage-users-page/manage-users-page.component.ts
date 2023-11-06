import {ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {debounce, Subscription} from "rxjs";
import { ActivityService } from 'src/services/activityService';
import { Router } from '@angular/router';
import { User } from 'src/entities/User';

@Component({
  selector: 'app-manage-users-page',
  templateUrl: './manage-users-page.component.html'
})
export class ManageUsersPageComponent implements OnInit, OnDestroy{

  formGroup: FormGroup;
  dataSource = new MatTableDataSource<User>();
  filterSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'email','delete','edit'];
  FormControlNames = FormControlNames

  users:  User[] = [];

  constructor(private fb: FormBuilder, private activityMonitor: ActivityService, private userService: UserService) {
  }


  async ngOnInit() {
    this.activityMonitor.startMonitoring();
    await this.fetchUsers();

    this.initializeSearch();
    this.dataSource.data = this.users;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }

  private async fetchUsers() {
    this.users = await this.userService.getAllByWarehouse(1); // TODO: get warehouse id from? We need to get the warehouse id from somewhere
    console.log(this.users);
  }

  get filterValue(): string {
    return this.formGroup?.get(FormControlNames.FILTER)?.value;
  }

  private initializeSearch() {
    this.formGroup = this.fb.group({
      [FormControlNames.FILTER]: ['']
    });

    this.filterSubscription = this.formGroup.get(FormControlNames.FILTER)!.valueChanges.subscribe(value => {
      this.filterTable(value);
    });
  }


  //TODO implement filtering
  filterTable(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  /**
   * Clear input field value on the filter
   */
  clearFilterValue() {
    this.formGroup.get(FormControlNames.FILTER)?.reset('');
  }
}
