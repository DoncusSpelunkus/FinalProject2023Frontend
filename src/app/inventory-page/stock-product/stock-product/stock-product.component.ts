import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../../constants/input-field-constants";
import {numberOnly, valueRequired} from "../../../../util/form-control-validators";
import {Observable, Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DynamicDialogComponent} from "../../../util/dynamic-dialog/dynamic-dialog.component";
import {
  LocationSingleCreateComponent
} from "../../../locations-page/location-single-create/location-single-create.component";
import {Select} from "@ngxs/store";
import {ProductSelector} from "../../../states/inventory/product-selector";
import {Location, Product} from "../../../../entities/Inventory";
import {CreateProductComponent} from "../../../manage-products/create-product/create-product.component";

@Component({
  selector: 'app-stock-product',
  templateUrl: './stock-product.component.html'
})
export class StockProductComponent extends FormBuilding implements LoadableComponent, OnInit, OnDestroy{

  @Output() isValidEmitter = new EventEmitter<any>;

  @Select(ProductSelector.getLocations) locations$!: Observable<Location[]>; // Will get the products from the store
  locations: Location[];
  @Select(ProductSelector.getProducts) products$!: Observable<Product[]>; // Will get the products from the store
  products: Product[];

  formGroup: FormGroup;

  private isFormValidSubscription: Subscription;

  constructor(private _formBuilder: FormBuilder,

              private matDialog: MatDialog) {
    super();
  }
  ngOnInit(): void {
    this.initializeFormGroups();
    this.initializeSubscriptions();
    this.initializeData();
  }

  ngOnDestroy(): void {
    if (this.isFormValidSubscription) {
      this.isFormValidSubscription.unsubscribe();
    }
  }
  setData(data: any): void {
  }

  submit(): void {
    console.log(this.formGroup.value);
  }

  isLinear = false;

  private initializeFormGroups() {
    this.formGroup = this._formBuilder.group({
      [FormControlNames.SKU]: ['',valueRequired(FormControlNames.SKU)],
      [FormControlNames.PRODUCT_LOCATION]: ['',valueRequired(FormControlNames.PRODUCT_LOCATION)],
      [FormControlNames.QUANTITY]: ['',[valueRequired(FormControlNames.QUANTITY),numberOnly(FormControlNames.QUANTITY)]]
    })
  }

  private initializeSubscriptions() {
    this.isFormValidSubscription = this.formGroup.statusChanges.subscribe(status => {
      switch (status) {
        case "VALID":
          this.isValidEmitter.emit(true);
          break;
        case "DISABLED":
          this.isValidEmitter.emit(false);
          break;
        case "INVALID":
          this.isValidEmitter.emit(false);
          break;
        case "PENDING":
          this.isValidEmitter.emit(false);
          break;
      }
    })
  }

  private initializeData() {
    this.locations$.subscribe((locations: Location[]) => {
      this.locations = locations;
    })

    this.products$.subscribe((products: Product[]) => {
      this.products = products
    })

  }

  handleOpenCreateLocationWindow() {
    this.matDialog.open(DynamicDialogComponent, {
      width: '75%', // Set the width
      height: '30%', // Set the height
      data: {
        component: LocationSingleCreateComponent,
        inputs: null // No dependent data to pass
      }
    });
  }

  handleOpenCreateProductWindow() {
    this.matDialog.open(DynamicDialogComponent, {
      width: '75%', // Set the width
      height: '30%', // Set the height
      data: {
        component: CreateProductComponent,
        inputs: null // No dependent data to pass
      }
    });
  }
}
