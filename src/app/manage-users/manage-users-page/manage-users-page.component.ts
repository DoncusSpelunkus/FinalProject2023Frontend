import {ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {debounce, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-manage-users-page',
  templateUrl: './manage-users-page.component.html'
})
export class ManageUsersPageComponent implements OnInit, OnDestroy{

  formGroup: FormGroup;
  dataSource = new MatTableDataSource<any>();


  private filterSubscription: Subscription;
  private queryParamSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'lastName','delete','edit'];
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.initializeSearch();
    this.initializeDataSource();
    this.bindRouteValues();
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }

  private fetchUsers() {
  }

  get filterValue(): string {
    return this.formGroup?.get(FormControlNames.FILTER)?.value;
  }

  /**
   * Initialize form group, formcontrol for search query
   * and subscribe to it's value change
   * @private
   */
  private initializeSearch() {
    this.formGroup = this.fb.group({
      [FormControlNames.FILTER]: ['']
    });

    this.filterSubscription = this.formGroup.get(FormControlNames.FILTER)!.valueChanges.subscribe(value => {
      this.filterTable(value);
      this.updateRouteParams({ search: value });
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
    this.queryParamSubscription = this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'] || '';
      if (this.formGroup.get(FormControlNames.FILTER)?.value !== searchQuery) {
        this.formGroup.get(FormControlNames.FILTER)?.setValue(searchQuery); // Prevent the emission of the event
      }
    });
  }

  private updateRouteParams(paramsToUpdate: {[param: string]: any}) {
    // Update the route params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: paramsToUpdate,
      queryParamsHandling: 'merge' // Merge with the existing query params
    });
  }
}
