import {Injectable} from '@angular/core';
import {formatLocation} from "../../util/display-value-strategies";
import {FormControlNames} from "../../constants/input-field-constants";
import {Select} from "@ngxs/store";
import {ProductSelector} from "../../app/states/inventory/product-selector";
import {Observable} from "rxjs";
import {Location} from "../../entities/Inventory";

@Injectable({
  providedIn: 'root'
})
export class DisplayValueService {

  @Select(ProductSelector.getLocations) locations$!: Observable<Location[]>; // Will get the products from the store
  locations: Location[];

  private displayValueStrategies = new Map<FormControlNames, (option: any) => string>([
    [FormControlNames.LOCATION, this.getLocationDisplayValue.bind(this)],
    [FormControlNames.PRODUCT_LOCATION,this.getProductLocationDisplayValue.bind(this)]
  ]);

  constructor() {
    this.initializeData();
  }

  private getLocationDisplayValue(option: any): string {
    return formatLocation(option);
  }

  private getProductLocationDisplayValue(option: any): string {
    const matchingLocation = this.locations.find(location => location.locationId === option.locationId);
    return formatLocation(matchingLocation);
  }

  getDisplayValue(option: any, formControlName: FormControlNames, displayValueProperty: string): string {
    const strategy = this.displayValueStrategies.get(formControlName);

    if (strategy) {
      return strategy(option);
    } else {
      return option[displayValueProperty];
    }
  }

  private initializeData() {
    this.locations$.subscribe(locations => this.locations = locations);
  }
}
