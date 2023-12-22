import { AfterViewInit, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormControlNames } from "../../../constants/input-field-constants";
import { debounceTime, Observable, Subject, Subscription, take } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { setupDistinctControlSubscription } from "../../../util/subscription-setup";
import { User } from 'src/entities/User';
import { ActivityService } from 'src/services/HelperSevices/activityService';
import { MatDialog } from "@angular/material/dialog";
import { DynamicDialogComponent } from "../../util/dynamic-dialog/dynamic-dialog.component";
import { CreateUserComponent } from "../create-user/create-user.component";
import { DeleteUserConfirmationComponent } from "../delete-user-confirmation/delete-user-confirmation.component";
import { Select } from "@ngxs/store";
import { UserSelector } from 'src/app/states/userManagement/user-selectors';
import {UserOverviewComponent} from "../user-overview/user-overview.component";




//TODO clean up subscriptions, iplement loading and actions in table
@Component({
  selector: 'app-manage-users-page',
  templateUrl: './manage-users-page.component.html'
})
export class ManageUsersPageComponent implements OnInit, AfterViewInit, OnDestroy {

  formGroup: FormGroup;
  dataSource = new MatTableDataSource<User>();

  @Select(UserSelector.getUsers) users$!: Observable<User[]>; // Will get the products from the store
  private subscription: Subscription = new Subscription();

  private filterSubscription: Subscription;
  private paginationSubscription: Subscription;
  private itemCountPerPageSubscription: Subscription;


  private routeParamsSubject = new Subject<{ [param: string]: any }>();
  private queryParamSubscription: Subscription;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  optionsPerPage = [3, 5, 10, 15, 25]

  displayedColumns: string[] = ['name', 'email', 'delete', 'edit','password-reset','Overview'];
  FormControlNames = FormControlNames
  warehouseId: number | undefined;

  users: User[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private activityMonitor: ActivityService,
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


  async ngOnInit() {
    await this.fetchUsers();
    this.initializeFormControl();
    this.bindRouteValues();
    this.initializeDataSource();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe(event => {
        this.formGroup.patchValue({
          [FormControlNames.PAGE]: event.pageIndex,
        }, { emitEvent: true }); // Avoid emitting an event to prevent a feedback loop
      });
    }
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  private async fetchUsers() {
    this.subscription.add(
      this.users$.subscribe(
        (users: User[]) => {
          this.dataSource.data = users;
        })
    );
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
        inputs: null // No dependent data to pass
      }
    });
  }

  openDeleteUserDialog(user: any) {
    this.dialog.open(DynamicDialogComponent, {
      width: '50%', // Set the width
      height: '35%', // Set the height
      data: {
        component: DeleteUserConfirmationComponent,
        inputs: user   // No dependent data to pass
      }
    });
  }

  private destroySubscriptions() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.paginationSubscription) {
      this.paginationSubscription.unsubscribe();
    }
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
    }
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
    }
  }

  openEditUserDialog(user: any) {
    this.dialog.open(DynamicDialogComponent, {
      width: '60%', // Set the width
      height: '60%', // Set the height
      data: {
        component: CreateUserComponent,
        inputs: user
      }
    });
  }

  openResetPasswordWindow(user) {
    this.dialog.open(DynamicDialogComponent, {
      width: '60%', // Set the width
      height: '60%', // Set the height
      data: {
        component: CreateUserComponent,
        inputs: user
      }
    });
  }

  openUserOverviewWindow(user) {
    this.dialog.open(DynamicDialogComponent, {
      width: '60%', // Set the width
      height: '60%', // Set the height
      data: {
        component: UserOverviewComponent,
        inputs: user
      }
    });
  }
}
