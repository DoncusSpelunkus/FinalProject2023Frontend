export class ShipmentDetail {
  productSKU?: string;
  quantity?: number;
}

export class Shipment {
  warehouseId?: number;
  shippedByEmployeeId?: number;
  dateShipped?: Date;
  shipmentDetails?: ShipmentDetail[];
}
