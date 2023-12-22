import { FormControlNames } from "../constants/input-field-constants";
import {Location} from "../entities/Inventory";

export const formatLocation = (location: Location) => {
  return location ? `${location.aisle}-${location.rack}-${location.shelf}-${location.bin}` : 'N/A';
}

const getLocationDisplayValue = (option: any): string => {
  return formatLocation(option);
};

const displayValueStrategies = new Map<FormControlNames, (option: any) => string>([
  [FormControlNames.PRODUCT_LOCATION, getLocationDisplayValue],
]);

export const getDisplayValue = (option: any, formControlName: FormControlNames, displayValueProperty: string): string => {
  const strategy = displayValueStrategies.get(formControlName);

  if (strategy) {
    return strategy(option);
  } else {
    return option[displayValueProperty];
  }
};
