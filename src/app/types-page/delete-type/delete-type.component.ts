import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {Type} from "../../../entities/Inventory";
import { Store } from '@ngxs/store';
import { deleteItem } from 'src/app/states/inventory/product-actions';
import { EntityTypes } from 'src/constants/product-types';

@Component({
  selector: 'app-delete-type',
  templateUrl: './delete-type.component.html'
})
export class DeleteTypeComponent implements LoadableComponent{

@HostBinding('style.width') width = '100%'
@HostBinding('style.width') height = '100%'

@Output() isValidEmitter = new EventEmitter<boolean>();

  selectedType: Type;
  constructor(private store: Store) {
  }

  setData(data: any): void {
    this.selectedType = data;
  }

  submit(): void {
    this.store.dispatch(new deleteItem(this.selectedType.typeId, EntityTypes[5]));
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getBrandName() {
    return this.selectedType.name
  }
}
