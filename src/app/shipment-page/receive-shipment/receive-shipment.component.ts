import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {MatSelectionListChange} from "@angular/material/list";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {nonEmptyListValidator, numberOnly, valueRequired} from "../../../util/form-control-validators";
import {Shipment, ShipmentDetail} from "../../../entities/Shipment";
import {Observable, Subscription} from "rxjs";
import {DynamicDialogComponent} from "../../util/dynamic-dialog/dynamic-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateProductComponent} from "../../manage-products/create-product/create-product.component";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {Select} from "@ngxs/store";
import {ProductSelector} from "../../states/inventory/product-selector";
import {Product} from "../../../entities/Inventory";
import {ShipmentService} from "../../../services/HttpRequestSevices/shipment.service";

@Component({
  selector: 'app-receive-shipment',
  templateUrl: './receive-shipment.component.html'
})
export class ReceiveShipmentComponent extends FormBuilding implements LoadableComponent, OnInit, OnDestroy{

  formDetailsListSubscription: Subscription;

  isValidEmitter = new EventEmitter<boolean>();
  shipmentDetailCreationFormGroup: FormGroup;

  shipmentCreationFormGroup: FormGroup;
  selectedFormDetailIndices: any[];
  details: ShipmentDetail[] = [];

  @Select(ProductSelector.getProducts) products$!: Observable<Product[]>; // Will get the products from the store
  products: Product[];

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private shipmentService: ShipmentService
              ) {
    super();
  }

  ngOnInit(): void {
    this.initializeFormGroups();
    this.initializeSubscriptions();
  }

  setData(data: any): void {
  }

  submit(): void {
    const shipmentDTO: Shipment = this.getDTO();
    this.shipmentService.createShipment(shipmentDTO);
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
      [FormControlNames.SHIPMENT_DETAIL_LIST]: [[], nonEmptyListValidator(FormControlNames.SHIPMENT_DETAIL_LIST)],
      [FormControlNames.DATE_RECEIVED]: ['', valueRequired(FormControlNames.DATE_RECEIVED)]
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
      quantity: this.shipmentDetailCreationFormGroup.get(FormControlNames.QUANTITY).value
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

  private getDTO(): Shipment {
    return {
      dateShipped: this.shipmentCreationFormGroup.get(FormControlNames.DATE_RECEIVED).value,
      shipmentDetails: this.getShipmentDetailsList
    }
  }
}
