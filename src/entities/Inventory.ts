export class Brand {
    BrandId: number;
    Name: string;
    WarehouseId: number;
}

export class CreateBrandDTO {
    Name: string;
}

export class Type {
    typeId?: number;
    name?: string;
}

export class CreateTypeDTO {
    Name: string;
}

export class ProductLocation {
    ProductLocationId?: number;
    ProductSKU?: string;
    LocationId?: number;
    Quantity?: number;
    LastUpdated?: Date;
    WarehouseId?: number;
}

export class Location {
    locationId?: number;
    aisle?: string;
    rack?: string;
    shelf?: string;
    bin?: string;
    warehouseId?: number;
}

export class Product {
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
    SupplierContact?: string;
    BrandId?: number;
    TypeId?: number;
    WarehouseId?: number;
}
