import { AfterViewInit, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DynamicDialogComponent } from "../util/dynamic-dialog/dynamic-dialog.component";
import { StockProductComponent } from "./stock-product/stock-product/stock-product.component";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormControlNames } from "../../constants/input-field-constants";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

import { Select } from '@ngxs/store';
import { ProductSelector } from '../states/inventory/product-selector';
import { Observable, Subscription } from 'rxjs';
import { Product, ProductLocation } from 'src/entities/Inventory';
import {FormBuilding} from "../../interfaces/component-interfaces";
import {CreateProductComponent} from "../manage-products/create-product/create-product.component";


@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html'
})
export class InventoryPageComponent implements OnInit, AfterViewInit {
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Select(ProductSelector.getProductLocations) simpleItems$!: Observable<ProductLocation[]>; // Will get the products from the store
  private subscription: Subscription = new Subscription();


  ExpandedRowType = ExpandedRowType;
  FormControlNames = FormControlNames;
  displayedColumns = ['SKU', 'Location', 'Relocate', 'Adjust quantity'];

  formGroup: FormGroup;
  dataSource = new MatTableDataSource<any>();
  isExpandedRow = (productLocationIndex: number) => {
    return this.dataSource.data[productLocationIndex].isExpanded;
  }/* your condition to identify the row */;
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  ngAfterViewInit(): void {
    this.initializeDataSource();
  }

  openStockProductsWindow() {
    this.dialog.open(DynamicDialogComponent, {
      width: '75%', // Set the width
      height: '80%', // Set the height
      data: {
        component: StockProductComponent,
        inputs: null // No dependent data to pass
      }
    });
  }

  clearFilterValue() {

  }

  get filterValue() {
    return this.formGroup.get(FormControlNames.FILTER)?.value;
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.FILTER]: ['']
    })
  }

  /**
   * TODO subscribe to service data value changes and link them
   * Initialize data source data
   * @private
   */
  private initializeDataSource() {
    this.subscription.add(
      this.simpleItems$.subscribe(
        (productLocations: ProductLocation[]) => {
          this.dataSource.data = productLocations;
        })
    );
    this.dataSource.paginator = this.paginator;
  }

  toggleRow(productLocation: any, rowType: ExpandedRowType) {
    if (productLocation.expandedRow === rowType) {
      productLocation.expandedRow = undefined;
    } else {
      productLocation.expandedRow = rowType;
    }
  }
}

export enum ExpandedRowType {
  RELOCATE = "RELOCATE",
  QUANTITY = "QUANTITY"
}
