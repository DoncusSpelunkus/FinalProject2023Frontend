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
    static readonly type = '[Product] Get locations'
    constructor() { }
}

export class createItem {
    static readonly type = '[Product] ¨Create item'
    constructor(public payload: Object, public entityType: String) { }
}

export class deleteItem {
    static readonly type = '[Product] Delete item';
    constructor(public payload: number, public entityType: string) { }
}

export class updateItem {
    static readonly type = '[Product] Update item'
    constructor(public payload: Object, public entityType: String) { }
}