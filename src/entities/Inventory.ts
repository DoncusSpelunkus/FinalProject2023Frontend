export class Brand {
    BrandId?: number;
    Name?: string;
}

export class Type {
    typeId?: number;
    name?: string;
}

export class CreateTypeDTO {
  Name: string;
  WarehouseId: number;
}

export class ProductLocation{
    ProductLocationId?: number;
    ProductSKU?: string;
    LocationId?: number;
    Quantity?: number;
    LastUpdated?: Date;
    WarehouseId?: number;
}

export class Location{
    LocationId?: number;
    Aisle?: string;
    Rack?: string;
    Shelf?: string;
    Bin?: string;
    WarehouseId?: number;
}

export class Product{
    sku?: string;
    name?: string;
    Description?: string;
    Category?: string;
    Weight?: number;
    Price?: number;
    Length?: number;
    Width?: number;
    Height?: number;
    SupplierName?: string;
    ExpireDateTime?: Date;
    MinimumCapacity?: number;
    SupplierContact?: string;
    BrandId?: number;
    TypeId?: number;
    WarehouseId?: number;
}
