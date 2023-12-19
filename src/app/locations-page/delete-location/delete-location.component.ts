import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {Brand} from "../../../entities/Brand";
import {BrandService} from "../../../services/HttpRequestSevices/brand.service";
import {Location} from "../../../entities/Inventory";
import {LocationService} from "../../../services/HttpRequestSevices/location.service";

@Component({
  selector: 'app-delete-location',
  templateUrl: './delete-location.component.html'
})
export class DeleteLocationComponent implements LoadableComponent{

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  @Output() isValidEmitter = new EventEmitter<boolean>();

  location: Location;
  constructor(private locationService: LocationService) {
  }
  setData(data: any): void {
    this.location = data;
    console.log(data)
  }

  submit(): void {
    this.locationService.deleteLocation(this.location.locationId) //TODO fix
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getLocationId() {
    const location = this.location;
    return `${location.aisle}-${location.rack}-${location.shelf}-${location.bin}`

  };
}
