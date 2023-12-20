import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {User} from "../../../entities/User";
import {ShipmentService} from "../../../services/HttpRequestSevices/shipment.service";
import {Shipment} from "../../../entities/Shipment";

@Component({
  selector: 'app-delete-shipment',
  templateUrl: './delete-shipment.component.html'
})
export class DeleteShipmentComponent implements LoadableComponent{

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  @Output() isValidEmitter = new EventEmitter<boolean>();

  selectedShipment: Shipment;
  constructor(private shipmentService: ShipmentService) {
  }

  setData(data: any): void {
    this.selectedShipment = data;
  }

  submit(): void {
    this.shipmentService.deleteShipment(this.selectedShipment.shipmentId);
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getUserDisplayName() {
    return this.selectedShipment.shipmentId
  }
}
