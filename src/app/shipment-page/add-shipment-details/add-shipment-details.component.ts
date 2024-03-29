import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {Observable, Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AddToShipmentDetails, Shipment, ShipmentDetail} from "../../../entities/Shipment";
import {MatDialog} from "@angular/material/dialog";
import {MatSelectionListChange} from "@angular/material/list";
import {FormControlNames} from "../../../constants/input-field-constants";
import {nonEmptyListValidator, numberOnly, valueRequired} from "../../../util/form-control-validators";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {DynamicDialogComponent} from "../../util/dynamic-dialog/dynamic-dialog.component";
import {CreateProductComponent} from "../../manage-products/create-product/create-product.component";
import {ProductSelector} from "../../states/inventory/product-selector";
import {Product} from "../../../entities/Inventory";
import { addToShipment } from 'src/app/states/shipment/shipment-actions';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-add-shipment-details',
  templateUrl: './add-shipment-details.component.html'
})
export class AddShipmentDetailsComponent extends FormBuilding implements LoadableComponent, OnInit, OnDestroy{

  formDetailsListSubscription: Subscription;

  isValidEmitter = new EventEmitter<boolean>();
  shipmentDetailCreationFormGroup: FormGroup;

  shipmentCreationFormGroup: FormGroup;
  selectedFormDetailIndices: any[];
  details: ShipmentDetail[] = [];

  shipment: Shipment;

  @Select(ProductSelector.getProducts) products$!: Observable<Product[]>; // Will get the products from the store
  products: Product[];

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.initializeFormGroups();
    this.initializeSubscriptions();
  }

  setData(data: any): void {
    this.shipment = data
  }

  submit(): void {
    const addtoShipment: AddToShipmentDetails = {shipmentDetails: this.getShipmentDetailsList}
    this.store.dispatch(new addToShipment(this.shipment.shipmentId, addtoShipment));
  }

  onSelectionChange(event: MatSelectionListChange) {
    const selectedOptions = event.source.selectedOptions.selected;
    this.selectedFormDetailIndices = selectedOptions.map(option => option.value.index);
  }

  private initializeFormGroups() {
    this.shipmentDetailCreationFormGroup = this.formBuilder.group({
      [FormControlNames.QUANTITY]: ['', [valueRequired(FormControlNames.QUANTITY), numberOnly(FormControlNames.QUANTITY)]],
      [FormControlNames.SKU]: ['', valueRequired(FormControlNames.SKU)],
    })

    this.shipmentCreationFormGroup = this.formBuilder.group({
      [FormControlNames.SHIPMENT_DETAIL_LIST]: [[], nonEmptyListValidator(FormControlNames.SHIPMENT_DETAIL_LIST)]
    })
  }

  isSelectedIndicesEmpty = () => {
    return !this.selectedFormDetailIndices || this.selectedFormDetailIndices.length === 0
  }
  isFormValid = () => {
    return !this.shipmentDetailCreationFormGroup.valid;
  };

  /**
   * Remove all details objects that are selected by sorting the ones that don't match an index
   *
   */
  handleDeleteDetailsClick() {
    const indicesSet = new Set(this.selectedFormDetailIndices);
    let currentListValue = this.getShipmentDetailsList;
    currentListValue = currentListValue.filter((_, index) => !indicesSet.has(index));
    this.shipmentCreationFormGroup.get(FormControlNames.SHIPMENT_DETAIL_LIST).setValue(currentListValue);
  }

  handleAddDetailsObject() {
    const shipmentDetailsDTO: ShipmentDetail = {
      productSKU: this.shipmentDetailCreationFormGroup.get(FormControlNames.SKU).value.sku,
      quantity: this.shipmentDetailCreationFormGroup.get(FormControlNames.QUANTITY).value,
      shipmentId: this.shipment.shipmentId
    }
    let currentListValue = this.getShipmentDetailsList;
    currentListValue.push(shipmentDetailsDTO);
    this.shipmentCreationFormGroup.get(FormControlNames.SHIPMENT_DETAIL_LIST).setValue(currentListValue);
  }

  private initializeSubscriptions() {
    this.formDetailsListSubscription = getCombinedFormGroupValiditySubscription([this.shipmentCreationFormGroup],this.isValidEmitter);
    this.products$.subscribe((products: Product[]) => {
      this.products = products;
    })
  }

  ngOnDestroy(): void {
    if (this.formDetailsListSubscription) {
      this.formDetailsListSubscription.unsubscribe();
    }
  }

  get getShipmentDetailsList() {
    return this.shipmentCreationFormGroup.get(FormControlNames.SHIPMENT_DETAIL_LIST).value
  }

  handleOpenCreateProductModal() {
    this.dialog.open(DynamicDialogComponent, {
      width: '70%', // Set the width
      height: '70%', // Set the height
      data: {
        component: CreateProductComponent,
        inputs: null // No dependent data to pass
      }
    });
  }
}

