import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShipmentDetails} from "../../../entities/Shipment";
import {MatDialog} from "@angular/material/dialog";
import {MatSelectionListChange} from "@angular/material/list";
import {FormControlNames} from "../../../constants/input-field-constants";
import {nonEmptyListValidator, numberOnly, valueRequired} from "../../../util/form-control-validators";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {DynamicDialogComponent} from "../../util/dynamic-dialog/dynamic-dialog.component";
import {CreateProductComponent} from "../../manage-products/create-product/create-product.component";

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
  details: ShipmentDetails[] = [];
  productSKUs: any[] = [
    {value: '21-124'},
    {value: '21-gds'},
    {value: '21-12312'},
    {value: '21-FDSF-ewg'},
  ];

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.initializeFormGroups();
    this.initializeSubscriptions();
  }

  setData(data: any): void {
  }

  submit(): void {
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
    const shipmentDetailsDTO: ShipmentDetails = {
      ProductSKU: this.shipmentDetailCreationFormGroup.get(FormControlNames.SKU).value,
      Quantity: this.shipmentDetailCreationFormGroup.get(FormControlNames.QUANTITY).value
    }
    let currentListValue = this.getShipmentDetailsList;
    currentListValue.push(shipmentDetailsDTO);
    this.shipmentCreationFormGroup.get(FormControlNames.SHIPMENT_DETAIL_LIST).setValue(currentListValue);
  }

  private initializeSubscriptions() {
    this.formDetailsListSubscription = getCombinedFormGroupValiditySubscription([this.shipmentCreationFormGroup],this.isValidEmitter);
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

