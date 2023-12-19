import { FormControlNames } from "../constants/input-field-constants";

const getLocationDisplayValue = (option: any): string => {
  return `${option.aisle}-${option.rack}-${option.shelf}-${option.bin}`;
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
