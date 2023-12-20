import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {Brand} from "../../../entities/Inventory";
import { Store } from '@ngxs/store';
import { EntityTypes } from 'src/constants/product-types';
import { createItem, deleteItem } from 'src/app/states/inventory/product-actions';

@Component({
  selector: 'app-delete-brand',
  templateUrl: './delete-brand.component.html'
})
export class DeleteBrandComponent implements LoadableComponent{

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  @Output() isValidEmitter = new EventEmitter<boolean>();

  selectedBrand: Brand;
  constructor(private store: Store) {
  }

  setData(data: any): void {
    this.selectedBrand = data;
  }

  submit(): void {
    console.log(this.selectedBrand.BrandId);
    this.store.dispatch(new deleteItem(this.selectedBrand.BrandId, EntityTypes[4]));
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getBrandName() {
    return this.selectedBrand.Name
  }
}

