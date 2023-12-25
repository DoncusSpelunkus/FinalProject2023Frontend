import {ChangeQuantityDTO, Location, MoveQuantityDTO} from "src/entities/Inventory";

export class getItems {
    static readonly type = '[Product] Get items'
    constructor(public entityType: string) { }

}

export class createItem {
    static readonly type = '[Product] ¨Create item'
    constructor(public payload: Object, public entityType: String) { }
}

export class deleteItem {
    static readonly type = '[Product] Delete item';
    constructor(public payload: any, public entityType: string) { }
}

export class updateItem {
    static readonly type = '[Product] Update item'
    constructor(public payload: Object, public entityType: String) { }
}

export class createLocationBatch {
    static readonly type = '[Location] Create batch'
    constructor(public payload: Location) { }
}

export class moveQuantity {
  static readonly type = '[Product] ¨Move Quantity'
  constructor(public payload: MoveQuantityDTO) { }
}

export class changeQuantity {
  static readonly type = '[Product] ¨Change Quantity'
  constructor(public payload: ChangeQuantityDTO) { }
}
