import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {Location} from "../../../entities/Inventory";
import { Store } from '@ngxs/store';
import { EntityTypes } from 'src/constants/product-types';
import { deleteItem } from 'src/app/states/inventory/product-actions';


@Component({
  selector: 'app-delete-location',
  templateUrl: './delete-location.component.html'
})
export class DeleteLocationComponent implements LoadableComponent{

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  @Output() isValidEmitter = new EventEmitter<boolean>();

  location: Location;
  constructor(private store: Store) {
  }
  setData(data: any): void {
    this.location = data;
    console.log(data)
  }

  submit(): void {
    this.store.dispatch(new deleteItem(this.location.locationId,  EntityTypes[3]));
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getLocationId() {
    const location = this.location;
    return `${location.aisle}-${location.rack}-${location.shelf}-${location.bin}`

  };
}
