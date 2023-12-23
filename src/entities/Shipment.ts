export class ShipmentDetail {
  productSKU?: string;
  quantity?: number;
  shipmentId?: number;
}

export class Shipment {
  warehouseId?: number;
  shippedByEmployeeId?: number;
  dateShipped?: Date;
  shipmentDetails?: ShipmentDetail[];
  shipmentId?: number;
}

export class AddToShipmentDetails {
  shipmentDetails: ShipmentDetail[];
}
