import {Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DynamicDialogComponent} from "../util/dynamic-dialog/dynamic-dialog.component";
import {CreateUserComponent} from "../manage-users/create-user/create-user.component";
import {StockProductComponent} from "./stock-product/stock-product/stock-product.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../constants/input-field-constants";

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html'
})
export class InventoryPageComponent implements OnInit{
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  FormControlNames = FormControlNames;

  formGroup: FormGroup;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeFormGroup();
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

  clearFilterValue() {

  }

  get filterValue() {
    return this.formGroup.get(FormControlNames.FILTER)?.value;
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.FILTER]: ['']
    })
  }
}
