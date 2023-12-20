import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {FormBuilding} from "../../interfaces/component-interfaces";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControlNames} from "../../constants/input-field-constants";
import {getFormControl} from "../../util/form-control-validators";
import {Observable, Subscription, debounceTime} from "rxjs";
import {DynamicDialogComponent} from "../util/dynamic-dialog/dynamic-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateProductComponent} from "./create-product/create-product.component";
import { Select } from '@ngxs/store';
import { ProductSelector } from '../states/inventory/product-selector';
import { Product } from 'src/entities/Inventory';
import {DeleteProductsComponent} from "./delete-products/delete-products.component";
import {DeleteShipmentComponent} from "../shipment-page/delete-shipment/delete-shipment.component";

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html'
})
export class ManageProductsComponent extends FormBuilding implements AfterViewInit{

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Select(ProductSelector.getProducts) products$!: Observable<Product[]>; // Will get the types from the store
  private subscription: Subscription = new Subscription();


  tableFormGroup: FormGroup;
  dataSource = new MatTableDataSource<Product>();

  displayedColumns = ['name','delete','update'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
    super();
    this.initializeFormGroup();
  }

  ngAfterViewInit(): void {
    this.initializeSourceData();
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
      this.products$.subscribe(
        (products: Product[]) => {
          this.dataSource.data = products;
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

  handleOpenCreateProductModal(product?) {
    this.dialog.open(DynamicDialogComponent, {
      width: '70%', // Set the width
      height: '70%', // Set the height
      data: {
        component: CreateProductComponent,
        inputs: product // No dependent data to pass
      }
    });
  }

  handleOpenDeleteProductWindow(product) {
    this.dialog.open(DynamicDialogComponent, {
      width: '50%', // Set the width
      height: '35%', // Set the height
      data: {
        component: DeleteProductsComponent,
        inputs: product // No dependent data to pass
      }
    });
  }
}

export interface SimpleDummyData {
  name: string;
}
