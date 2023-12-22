export class Brand {
    brandId: number;
    name: string;
    warehouseId: number;
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
    productLocationId?: number;
    productSKU?: string;
    locationId?: string;
    quantity?: number;
    lastUpdated?: Date;
    warehouseId?: number;
}

export class Location {
    locationId?: string;
    aisle?: string;
    rack?: string;
    shelf?: string;
    bin?: string;
    warehouseId?: number;
}

export class Product {
    sku?: string;
    name?: string;
    description?: string;
    category?: string;
    weight?: number;
    price?: number;
    length?: number;
    width?: number;
    height?: number;
    supplierName?: string;
    expireDateTime?: Date;
    minimumCapacity?: number;
    supplierContact?: string;
    brandId?: number;
    typeId?: number;
    warehouseId?: number;
}
