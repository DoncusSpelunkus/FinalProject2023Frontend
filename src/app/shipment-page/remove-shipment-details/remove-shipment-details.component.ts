import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {Shipment, ShipmentDetail} from "../../../entities/Shipment";
import {ShipmentService} from "../../../services/HttpRequestSevices/shipment.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {nonEmptyListValidator, valueRequired} from "../../../util/form-control-validators";
import {MatSelectionListChange} from "@angular/material/list";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {Subscription} from "rxjs";
import {Store} from "@ngxs/store";
import {removeFromShipment} from "../../states/shipment/shipment-actions";

@Component({
  selector: 'app-remove-shipment-details',
  templateUrl: './remove-shipment-details.component.html'
})
export class RemoveShipmentDetailsComponent implements LoadableComponent, OnInit, OnDestroy{


  isValidEmitter = new EventEmitter<boolean>();

  shipmentDetailFormGroup: FormGroup

  shipment: Shipment
  private formGroupStateSubscription: Subscription;

  constructor(private shipmentService: ShipmentService,
              private formBuilder: FormBuilder,
              private store: Store) {
  }
  ngOnInit(): void {
    this.initializeFormGroup();
    this.initializeSubscriptions();
  }

  ngOnDestroy(): void {
    if (this.formGroupStateSubscription) {
      this.formGroupStateSubscription.unsubscribe();
    }
  }

  setData(data: any): void {
    this.shipmentService.getShipment(data.shipmentId).then(shipment => {
      this.shipment = shipment;
    })
  }

  submit(): void {
    this.store.dispatch(new removeFromShipment(this.shipment.shipmentId,this.getSelectedShipmentIds()))
  }

  handleDeleteDetailsClick() {

  }


  get getShipmentDetailsList(): ShipmentDetail[]{
    return this.shipmentDetailFormGroup.get(FormControlNames.SHIPMENT_DETAIL_LIST).value
  }

  private initializeFormGroup() {
    this.shipmentDetailFormGroup = this.formBuilder.group({
      [FormControlNames.SHIPMENT_DETAIL_LIST]: [[],nonEmptyListValidator(FormControlNames.SHIPMENT_DETAIL_LIST)]
    })
  }

  onSelectionChange(event: MatSelectionListChange) {
    const selectedOptionsArray = Array.from(event.source.selectedOptions.selected);
    const selectedDetails = selectedOptionsArray.map(option => option.value.detail);
    this.shipmentDetailFormGroup.get(FormControlNames.SHIPMENT_DETAIL_LIST).setValue(selectedDetails);
  }

  private initializeSubscriptions() {
    this.formGroupStateSubscription = getCombinedFormGroupValiditySubscription([this.shipmentDetailFormGroup],this.isValidEmitter)
  }

  private getSelectedShipmentIds(): number[] {
    const shipmentDetails: any[] = this.shipmentDetailFormGroup.get(FormControlNames.SHIPMENT_DETAIL_LIST).value;
    return shipmentDetails.map(detail => detail.shipmentDetailId);
  }

}
