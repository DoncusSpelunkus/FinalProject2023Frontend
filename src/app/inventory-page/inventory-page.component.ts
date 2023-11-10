import {Component, HostBinding} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DynamicDialogComponent} from "../util/dynamic-dialog/dynamic-dialog.component";
import {CreateUserComponent} from "../manage-users/create-user/create-user.component";
import {StockProductComponent} from "./stock-product/stock-product/stock-product.component";

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html'
})
export class InventoryPageComponent {
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  constructor(private dialog: MatDialog) {
  }

  openStockProductsWindow() {
    this.dialog.open(DynamicDialogComponent, {
      width: '60%', // Set the width
      height: '60%', // Set the height
      data: {
        component: StockProductComponent,
        inputs: {} // No dependent data to pass
      }
    });
  }
}
