import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {Shipment} from "../../../entities/Shipment";
import {ShipmentService} from "../../../services/HttpRequestSevices/shipment.service";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-delete-product-location',
  templateUrl: './delete-product-location.component.html'
})
export class DeleteProductLocationComponent implements LoadableComponent{

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  @Output() isValidEmitter = new EventEmitter<boolean>();

  selectedShipment: Shipment;
  constructor(private store: Store) {
  }

  setData(data: any): void {
    this.selectedShipment = data;
  }

  submit(): void {
    console.error('not implemented')
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getUserDisplayName() {
    return this.selectedShipment.shipmentId
  }
}
