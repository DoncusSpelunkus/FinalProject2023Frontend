import {Component, EventEmitter, OnInit} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Shipment, ShipmentDetail} from "../../../entities/Shipment";
import {MatSelectionListChange} from "@angular/material/list";
import {ShipmentService} from "../../../services/HttpRequestSevices/shipment.service";
import {UserManagementService} from "../../../services/HttpRequestSevices/userManagement.service";
import {User} from "../../../entities/User";
import {DynamicDialogComponent} from "../../util/dynamic-dialog/dynamic-dialog.component";
import {RemoveShipmentDetailsComponent} from "../remove-shipment-details/remove-shipment-details.component";
import {StockProductComponent} from "../../inventory-page/stock-product/stock-product/stock-product.component";

@Component({
  selector: 'app-shipment-info',
  templateUrl: './shipment-info.component.html'
})
export class ShipmentInfoComponent implements LoadableComponent{

  isValidEmitter = new EventEmitter<boolean>();

  employeeCreatedBy: User;
  selectedProductDetail: ShipmentDetail
  selectedShipment: Shipment;

  constructor(
              private router: Router,
              private dialog: MatDialog,
              private shipmentService: ShipmentService,
              private userService: UserManagementService) {
  }

  setData(data: any): void {
    const shipment = data as Shipment
    this.shipmentService.getShipment(shipment.shipmentId).then(shipment => {
      this.selectedShipment = shipment;
      this.userService.getByEmployeeId(this.selectedShipment.shippedByEmployeeId)
        .then((user: User) => {
          this.employeeCreatedBy = user;
        })
    })
  }

  submit(): void {
  }

  handleFindUser() {
    this.dialog.closeAll();
    this.router.navigate(['userManagement'], { queryParams: { search: this.employeeCreatedBy.name } });
  }

  onSelectionChange(event: MatSelectionListChange) {
    const selectedOption = event.source.selectedOptions.selected[0].value.detail || null;
    this.selectedProductDetail = selectedOption;
  }

  handleOpenStockProductWindow() {
    this.dialog.open(DynamicDialogComponent, {
      width: '50%', // Set the width
      height: '50%', // Set the height
      data: {
        component: StockProductComponent,
        inputs: this.selectedProductDetail
      }
    });
  }
}
