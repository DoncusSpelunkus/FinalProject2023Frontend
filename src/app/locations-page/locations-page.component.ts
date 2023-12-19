import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {FormBuilding} from "../../interfaces/component-interfaces";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControlNames} from "../../constants/input-field-constants";
import {getFormControl} from "../../util/form-control-validators";
import {Observable, Subscription, debounceTime} from "rxjs";
import {SimpleDummyData} from "../templates/manage-template/manage-template.component";
import { Brand } from 'src/entities/Inventory';
import { Select } from '@ngxs/store';
import { ProductSelector } from '../states/inventory/product-selector';
import {DynamicDialogComponent} from "../util/dynamic-dialog/dynamic-dialog.component";
import {CreateUserComponent} from "../manage-users/create-user/create-user.component";
import {MatDialog} from "@angular/material/dialog";
import {LocationSingleCreateComponent} from "./location-single-create/location-single-create.component";
import {LocationBatchCreateComponent} from "./location-batch-create/location-batch-create.component";

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html'
})
export class LocationsPageComponent extends FormBuilding implements OnInit, AfterViewInit{

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  tableFormGroup: FormGroup;
  dataSource = new MatTableDataSource<Location>();

  displayedColumns = ['Location id'];

  @Select(ProductSelector.getLocations) locations$!: Observable<Location[]>; // Will get the types from the store
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog) {
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
    return getFormControl(FormControlNames.FILTER,this.tableFormGroup).value;
  }

  clearFilterValue() {
    getFormControl(FormControlNames.FILTER,this.tableFormGroup).reset();
  }

  private initializeSourceData(): void {
    this.subscription.add(
      this.locations$.subscribe(
        (locations: Location[]) => {
          this.dataSource.data = locations;
        })
    );
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
      getFormControl(FormControlNames.PAGE,this.tableFormGroup).setValue(page.pageIndex,{emitEvent:true});
      getFormControl(FormControlNames.ITEMS_PER_PAGE,this.tableFormGroup).setValue(page.pageSize,{emitEvent:true});
    })
  }

  private updateRouteParams(paramName: FormControlNames, value: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [paramName]: value || null },
      queryParamsHandling: 'merge', // preserve other query params
    });
  }

  handleOpenCreateSingleLocationWindow() {
    this.matDialog.open(DynamicDialogComponent, {
      width: '60%', // Set the width
      height: '30%', // Set the height
      data: {
        component: LocationSingleCreateComponent,
        inputs: null // No dependent data to pass
      }
    });
  }

  handleOpenBatchCreateLocationWindow() {
    this.matDialog.open(DynamicDialogComponent, {
      width: '60%', // Set the width
      height: '30%', // Set the height
      data: {
        component: LocationBatchCreateComponent,
        inputs: null // No dependent data to pass
      }
    });
  }
}
