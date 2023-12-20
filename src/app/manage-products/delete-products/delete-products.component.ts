import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {Brand, Product} from "../../../entities/Inventory";
import {Store} from "@ngxs/store";
import {deleteItem} from "../../states/inventory/product-actions";
import {EntityTypes} from "../../../constants/product-types";

@Component({
  selector: 'app-delete-products',
  templateUrl: './delete-products.component.html'
})
export class DeleteProductsComponent  implements LoadableComponent{

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  @Output() isValidEmitter = new EventEmitter<boolean>();

  selectedProduct: Product;
  constructor(private store: Store) {
  }

  setData(data: any): void {
    this.selectedProduct = data;
  }

  submit(): void {
    this.store.dispatch(new deleteItem(this.selectedProduct.sku, EntityTypes[1]));
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getProductName() {
    return this.selectedProduct.name
  }
}
