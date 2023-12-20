export class ShipmentDetails {
  ProductSKU: string;
  Quantity: number;
}

export class Shipment {
  WarehouseId: number;
  ShippedByEmployeeId: number;
  DateShipped: Date;
  ShipmentDetails: ShipmentDetails[];
}
