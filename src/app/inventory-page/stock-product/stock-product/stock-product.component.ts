import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormControlNames} from "../../../../constants/input-field-constants";
import {getControlErrorMessage, numberOnly, valueRequired} from "../../../../util/form-control-validators";
import {Observable, Subscription} from "rxjs";
import {LocationService} from "../../../../services/HttpRequestSevices/location.service";
import {MatDialog} from "@angular/material/dialog";
import {DynamicDialogComponent} from "../../../util/dynamic-dialog/dynamic-dialog.component";
import {
  LocationSingleCreateComponent
} from "../../../locations-page/location-single-create/location-single-create.component";
import {Select} from "@ngxs/store";
import {ProductSelector} from "../../../states/inventory/product-selector";
import {Location} from "../../../../entities/Inventory";

@Component({
  selector: 'app-stock-product',
  templateUrl: './stock-product.component.html'
})
export class StockProductComponent extends FormBuilding implements LoadableComponent, OnInit, OnDestroy{

  @Output() isValidEmitter = new EventEmitter<any>;

  @Select(ProductSelector.getLocations) locations$!: Observable<Location[]>; // Will get the products from the store
  locations: Location[];

  formGroup: FormGroup;

  private isFormValidSubscription: Subscription;

  constructor(private _formBuilder: FormBuilder,
              private locationService: LocationService,
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
      [FormControlNames.AISLE]: ['',valueRequired(FormControlNames.AISLE)],
      [FormControlNames.BIN]: ['',valueRequired(FormControlNames.BIN)],
      [FormControlNames.RACK]: ['',valueRequired(FormControlNames.RACK)],
      [FormControlNames.SHELF]: ['',valueRequired(FormControlNames.SHELF)],
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
    this.locations$.subscribe(locations => {
      this.locations = locations;
      console.log(locations)
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
}
