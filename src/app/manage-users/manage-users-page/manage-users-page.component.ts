import { AfterViewInit, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormControlNames } from "../../../constants/input-field-constants";
import {debounceTime, Subject, Subscription, take} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {setupDistinctControlSubscription} from "../../../util/subscription-setup";

import { User } from 'src/entities/User';
import { ActivityService } from 'src/services/activityService';
import { UserService } from 'src/services/user.service';
import {MatDialog} from "@angular/material/dialog";
import {DynamicDialogComponent} from "../../util/dynamic-dialog/dynamic-dialog.component";
import {CreateUserComponent} from "../create-user/create-user.component";


@Component({
  selector: 'app-manage-users-page',
  templateUrl: './manage-users-page.component.html'
})
export class ManageUsersPageComponent implements OnInit, AfterViewInit, OnDestroy {

  formGroup: FormGroup;
  dataSource = new MatTableDataSource<User>();


  private filterSubscription: Subscription;
  private paginationSubscription: Subscription;
  private itemCountPerPageSubscription: Subscription;


  private routeParamsSubject = new Subject<{ [param: string]: any }>();
  private queryParamSubscription: Subscription;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  optionsPerPage = [3, 5, 10, 15, 25]

  displayedColumns: string[] = ['name', 'email', 'delete', 'edit'];
  FormControlNames = FormControlNames

  users: User[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private activityMonitor: ActivityService,
    private userService: UserService,
    private dialog: MatDialog

  ) {
    this.activityMonitor.startMonitoring();
    this.routeParamsSubject.pipe(
      debounceTime(300) // Debounce time in milliseconds
    ).subscribe(paramsToUpdate => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: paramsToUpdate,
        queryParamsHandling: 'merge'
      });
    });
  }


  ngOnInit() {
    this.initializeFormControl();
    this.bindRouteValues();
  }

  ngAfterViewInit(): void {
    this.paginator.pageSize = 3
    this.initializeDataSource();
    if (this.paginator) {
      this.paginator.page.subscribe(event => {
        this.formGroup.patchValue({
          [FormControlNames.PAGE]: event.pageIndex,
        }, { emitEvent: true }); // Avoid emitting an event to prevent a feedback loop
      });
    }
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

  /**
   * Initialize form group, form controls for search, pagination and page count
   * create subscriptions for each form control to bind the route and value
   * @private
   */
  private initializeFormControl() {
    this.initializeFormGroup();

    setupDistinctControlSubscription(
      this.formGroup,
      FormControlNames.FILTER,
      (value) => {
        this.updateRouteParams({ search: value });
        this.filterTable(value)
      }
    )

    setupDistinctControlSubscription(
      this.formGroup,
      FormControlNames.PAGE,
      (value) => {
        this.updateRouteParams({ page: value });
        this.paginator.pageIndex = value;
      }
    )
  }


  //TODO implement filtering
  filterTable(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
    this.paginator.pageIndex = 0;
  }

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  /**
   * Clear input field value on the filter
   */
  clearFilterValue() {
    this.formGroup.get(FormControlNames.FILTER)?.reset('');
  }


  /**
   * TODO subscribe to service data value changes and link them
   * Initialize data source data
   * @private
   */
  private initializeDataSource() {
    this.dataSource.data = this.users;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * This method should bind both ways the values of search query value
   * the page number, and item per page count to the route
   * so one will update the other
   * @private
   */
  private bindRouteValues() {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      const searchQuery = params['search'] || '';
      const page = +params['page'] || 0;

      this.formGroup.patchValue({
        [FormControlNames.FILTER]: searchQuery,
        [FormControlNames.PAGE]: page
      }, { emitEvent: true }
      )
    });
  }

  private updateRouteParams = (paramsToUpdate: { [param: string]: any }) => {
    this.routeParamsSubject.next(paramsToUpdate);
  }

  private initializeFormGroup() {
    this.formGroup = this.fb.group({
      [FormControlNames.PAGE]: [0],
      [FormControlNames.FILTER]: ['']
    });
  }

  openCreateUserDialog() {
    this.dialog.open(DynamicDialogComponent, {
      width: '60%', // Set the width
      height: '60%', // Set the height
      data: {
        component: CreateUserComponent,
        inputs: {} // No dependent data to pass
      }
    });
  }
}
