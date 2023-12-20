import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {User} from "../../../entities/User";
import {ShipmentService} from "../../../services/HttpRequestSevices/shipment.service";

@Component({
  selector: 'app-delete-shipment',
  templateUrl: './delete-shipment.component.html'
})
export class DeleteShipmentComponent implements LoadableComponent{

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  @Output() isValidEmitter = new EventEmitter<boolean>();

  selectedUser: User;
  constructor(private shipmentService: ShipmentService) {
  }

  setData(data: any): void {
    this.selectedUser = data;
  }

  submit(): void {
    this.shipmentService.deleteEmployee(this.selectedUser.employeeId);
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getUserDisplayName() {
    console.error('need to get shipment object')
    return this.selectedUser.username
  }
}
