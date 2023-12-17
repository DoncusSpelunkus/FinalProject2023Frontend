import {ShipmentDetailsDTO} from "./ShipmentDetailsDTO";

export class ShipmentDTO {
  WarehouseId: number;
  ShippedByEmployeeId: number;
  DateShipped: Date;
  ShipmentDetails: ShipmentDetailsDTO[];
}
