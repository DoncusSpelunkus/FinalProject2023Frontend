import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DynamicDialogComponent} from "../util/dynamic-dialog/dynamic-dialog.component";
import {StockProductComponent} from "./stock-product/stock-product/stock-product.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../constants/input-field-constants";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ProductLocationDisplayed} from "../../entities/ProductLocation";

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html'
})
export class InventoryPageComponent implements OnInit, AfterViewInit{
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  @ViewChild(MatPaginator) paginator: MatPaginator;

  FormControlNames = FormControlNames;
  displayedColumns = ['Product name','Location','Relocate','Adjust quantity'];

  formGroup: FormGroup;
  dataSource = new MatTableDataSource<any>();

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
      width: '60%', // Set the width
      height: '60%', // Set the height
      data: {
        component: StockProductComponent,
        inputs: {} // No dependent data to pass
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
    this.dataSource.data = productLocations;
    this.dataSource.paginator = this.paginator;
  }
}

const productLocations: ProductLocationDisplayed[] = [
  {
    ProductLocationId: 1,
    ProductSKU: "SKU001",
    LocationId: 101,
    Quantity: 50,
    LastUpdated: new Date("2023-01-01"),
    WarehouseId: 201,
    ProductName: "Product A"
  },
  {
    ProductLocationId: 2,
    ProductSKU: "SKU002",
    LocationId: 102,
    Quantity: 60,
    LastUpdated: new Date("2023-02-01"),
    WarehouseId: 202,
    ProductName: "Product B"
  },
  // ... add more objects here ...
  {
    ProductLocationId: 10,
    ProductSKU: "SKU010",
    LocationId: 110,
    Quantity: 30,
    LastUpdated: new Date("2023-10-01"),
    WarehouseId: 210,
    ProductName: "Product J"
  }
];
