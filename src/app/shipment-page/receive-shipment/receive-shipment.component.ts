import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {MatSelectionListChange} from "@angular/material/list";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {nonEmptyListValidator, numberOnly, valueRequired} from "../../../util/form-control-validators";
import {ShipmentDetailsDTO} from "../../../entities/ShipmentDetailsDTO";
import {getFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {Subscription} from "rxjs";

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
  details: ShipmentDetailsDTO[] = [];
  productSKUs: any[] = [
    {value: '21-124'},
    {value: '21-gds'},
    {value: '21-12312'},
    {value: '21-FDSF-ewg'},
  ];

  constructor(private formBuilder: FormBuilder) {
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
    const shipmentDetailsDTO: ShipmentDetailsDTO = {
      ProductSKU: this.shipmentDetailCreationFormGroup.get(FormControlNames.SKU).value,
      Quantity: this.shipmentDetailCreationFormGroup.get(FormControlNames.QUANTITY).value
    }
    let currentListValue = this.getShipmentDetailsList;
    currentListValue.push(shipmentDetailsDTO);
    this.shipmentCreationFormGroup.get(FormControlNames.SHIPMENT_DETAIL_LIST).setValue(currentListValue);
  }

  private initializeSubscriptions() {
    this.formDetailsListSubscription = getFormGroupValiditySubscription(this.shipmentCreationFormGroup,this.isValidEmitter);
  }

  ngOnDestroy(): void {
    if (this.formDetailsListSubscription) {
      this.formDetailsListSubscription.unsubscribe();
    }
  }

  get getShipmentDetailsList() {
    return this.shipmentCreationFormGroup.get(FormControlNames.SHIPMENT_DETAIL_LIST).value
  }
}
