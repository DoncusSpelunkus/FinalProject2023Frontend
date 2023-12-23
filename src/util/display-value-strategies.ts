import { FormControlNames } from "../constants/input-field-constants";
import {Location} from "../entities/Inventory";

export const formatLocation = (location: Location) => {
  return location ? `${location.aisle}-${location.rack}-${location.shelf}-${location.bin}` : 'N/A';
}
