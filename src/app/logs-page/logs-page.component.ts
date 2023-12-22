import { AfterViewInit, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormBuilding } from "../../interfaces/component-interfaces";
import { MatPaginator } from "@angular/material/paginator";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControlNames } from "../../constants/input-field-constants";
import { getFormControl } from "../../util/form-control-validators";
import { Observable, Subscription, debounceTime } from "rxjs";
import { Select } from '@ngxs/store';
import { LogSelectors } from '../states/log/logs-selector';
import {DynamicDialogComponent} from "../util/dynamic-dialog/dynamic-dialog.component";
import {CreateUserComponent} from "../manage-users/create-user/create-user.component";
import {MatDialog} from "@angular/material/dialog";
import {LogOverviewComponent} from "./log-overview/log-overview.component";
import {Log} from "../../entities/Log";

@Component({
  selector: 'app-logs-page',
  templateUrl: './logs-page.component.html'
})
export class LogsPageComponent extends FormBuilding implements OnInit, AfterViewInit {

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  tableFormGroup: FormGroup;
  dataSource = new MatTableDataSource<Log>();

  @Select(LogSelectors.getLogs) logs$!: Observable<Log[]>; // Will get the types from the store
  private subscription: Subscription = new Subscription();

  displayedColumns = ['productSKU','quantity','time','info'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
    super();
    this.initializeFormGroup();
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.initializeSourceData();//TODO REMOVE
    this.bindControlsToElements();
    this.setInitialValuesFromQueryParams();
    this.bindElementsToControls()
  }

  private initializeFormGroup() {
    this.tableFormGroup = this.formBuilder.group({
      [FormControlNames.FILTER]: [''],
      [FormControlNames.PAGE]: [''],
      [FormControlNames.ITEMS_PER_PAGE]: ['']
    })
  }


  get filterValue(): string {
    return getFormControl(FormControlNames.FILTER, this.tableFormGroup).value;
  }

  clearFilterValue() {
    getFormControl(FormControlNames.FILTER, this.tableFormGroup).reset();
  }

  private initializeSourceData(): void {
    this.subscription.add(this.logs$.subscribe((logs) => {
      this.dataSource.data = logs;
      console.log(logs)
    }));
  }

  private setInitialValuesFromQueryParams() {
    const currentParams = this.route.snapshot.queryParams;

    getFormControl(FormControlNames.FILTER, this.tableFormGroup)
      .setValue(currentParams[FormControlNames.FILTER] || '', { emitEvent: true });

    getFormControl(FormControlNames.PAGE, this.tableFormGroup)
      .setValue(currentParams[FormControlNames.PAGE] || '', { emitEvent: true });

    getFormControl(FormControlNames.ITEMS_PER_PAGE, this.tableFormGroup)
      .setValue(currentParams[FormControlNames.ITEMS_PER_PAGE] || '', { emitEvent: true });
  }

  private bindControlsToElements() {
    getFormControl(FormControlNames.ITEMS_PER_PAGE, this.tableFormGroup).valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        const pageSize = Number(value) || 0;
        this.paginator.pageSize = pageSize;
        this.updateRouteParams(FormControlNames.ITEMS_PER_PAGE, value);
      });

    getFormControl(FormControlNames.PAGE, this.tableFormGroup).valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        const pageIndex = Number(value) || 0;
        this.paginator.pageIndex = pageIndex;
        this.updateRouteParams(FormControlNames.PAGE, value);
      });

    getFormControl(FormControlNames.FILTER, this.tableFormGroup).valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        const query = value?.toString() || '';
        this.dataSource.filter = query.trim().toLowerCase();
        this.updateRouteParams(FormControlNames.FILTER, value);
      });


  }

  private bindElementsToControls() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page.subscribe((page) => {
      getFormControl(FormControlNames.PAGE, this.tableFormGroup).setValue(page.pageIndex, { emitEvent: true });
      getFormControl(FormControlNames.ITEMS_PER_PAGE, this.tableFormGroup).setValue(page.pageSize, { emitEvent: true });
    })
  }

  private updateRouteParams(paramName: FormControlNames, value: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [paramName]: value || null },
      queryParamsHandling: 'merge', // preserve other query params
    });
  }

  handleRefreshData() {
    console.error('not implemented')
  }

  openViewInfoWindow(log) {
    this.dialog.open(DynamicDialogComponent, {
      width: '60%', // Set the width
      height: '60%', // Set the height
      data: {
        component: LogOverviewComponent,
        inputs: log,
        needsActions: false
      }
    });
  }
}

export interface SimpleDummyData {
  name: string;
}
