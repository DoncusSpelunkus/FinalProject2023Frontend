import { Product } from "src/entities/Product";

export class establishConnection {
    static readonly type = '[Product] Establish connection'
    constructor() { }
}

export class getProducts {
    static readonly type = '[Product] Get products'
    constructor() { }
}

export class getProductLocations {
    static readonly type = '[Product] Get product locations'
    constructor() { }
}

export class getLocations {
    static readonly type = '[Product] Get locationS'
    constructor() { }
}