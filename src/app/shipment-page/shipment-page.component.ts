import {AfterViewInit, Component, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilding} from "../../interfaces/component-interfaces";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControlNames} from "../../constants/input-field-constants";
import {getFormControl} from "../../util/form-control-validators";
import {debounceTime, Observable, Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DynamicDialogComponent} from "../util/dynamic-dialog/dynamic-dialog.component";
import {ReceiveShipmentComponent} from "./receive-shipment/receive-shipment.component";
import {DeleteShipmentComponent} from "./delete-shipment/delete-shipment.component";
import {ShipmentInfoComponent} from "./shipment-info/shipment-info.component";
import {RemoveShipmentDetailsComponent} from "./remove-shipment-details/remove-shipment-details.component";
import {AddShipmentDetailsComponent} from "./add-shipment-details/add-shipment-details.component";
import {Select} from "@ngxs/store";
import {ShipmentSelector} from "../states/shipment/shipment-selectors";
import {Shipment} from "../../entities/Shipment";

@Component({
  selector: 'app-shipment-page',
  templateUrl: './shipment-page.component.html'
})
export class ShipmentPageComponent extends FormBuilding implements OnInit, AfterViewInit, OnDestroy{

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Select(ShipmentSelector.getShipments) shipments$!: Observable<Shipment[]>; // Will get the products from the store
  private shipmentSubscription: Subscription;

  tableFormGroup: FormGroup;

  dataSource = new MatTableDataSource<Shipment>();
  displayedColumns = ['dateShipped','addShipmentDetail','removeShipmentDetail','info','delete'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,) {
    super();
    this.initializeFormGroup();
    this.initializeSourceData();
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
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
    this.shipmentSubscription = this.shipments$.subscribe((shipments: Shipment[]) => {
      this.dataSource.data = shipments;
    })
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

  handleOpenReceiveShipmentModal() {
    this.dialog.open(DynamicDialogComponent, {
      width: '75%', // Set the width
      height: '70%', // Set the height
      data: {
        component: ReceiveShipmentComponent,
        inputs: null // No dependent data to pass
      }
    });
  }

  handleOpenDeleteShipmentDialog(shipment) {
    this.dialog.open(DynamicDialogComponent, {
      width: '45%', // Set the width
      height: '30%', // Set the height
      data: {
        component: DeleteShipmentComponent,
        inputs: shipment // No dependent data to pass
      }
    });
  }

  handleOpenShipmentInfoDialog(shipment) {
    this.dialog.open(DynamicDialogComponent, {
      width: '50%', // Set the width
      height: '60%', // Set the height
      data: {
        component: ShipmentInfoComponent,
        inputs: shipment
      }
    });
  }

  handleOpenRemoveDetailsDialog(shipment) {
    this.dialog.open(DynamicDialogComponent, {
      width: '50%', // Set the width
      height: '50%', // Set the height
      data: {
        component: RemoveShipmentDetailsComponent,
        inputs: shipment
      }
    });
  }

  handleOpenAddDetailsDialog(shipment) {
    this.dialog.open(DynamicDialogComponent, {
      width: '75%', // Set the width
      height: '50%', // Set the height
      data: {
        component: AddShipmentDetailsComponent,
        inputs: shipment // No dependent data to pass
      }
    });
  }

  ngOnDestroy(): void {
    if (this.shipmentSubscription) {
      this.shipmentSubscription.unsubscribe();
    }
  }
}
