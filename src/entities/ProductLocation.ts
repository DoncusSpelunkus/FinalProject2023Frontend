export class ProductLocation{
    ProductLocationId?: number;
    ProductSKU?: string;
    LocationId?: number;
    Quantity?: number;
    LastUpdated?: Date;
    WarehouseId?: number;
}

export class ProductLocationDisplayed {
  ProductLocationId?: number;
  ProductSKU?: string;
  LocationId?: number;
  Quantity?: number;
  LastUpdated?: Date;
  WarehouseId?: number;
  ProductName: string;
}
