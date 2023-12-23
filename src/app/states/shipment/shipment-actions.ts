import {AddToShipmentDetails, Shipment, ShipmentDetail} from "src/entities/Shipment";

export class getShipments {
    static readonly type = '[Shipment] Get shipments'
    constructor() { }
}

export class createShipments {
    static readonly type = '[Shipment] Create shipment'
    constructor(public payload: Shipment) { }
}

export class changeQuantity {
    static readonly type = '[Shipment] Change quantity'
    constructor(public shipmentId: number, public detailId: number, public quantity: number) { }
}

export class addToShipment {
    static readonly type = '[Shipment] Add to shipment'
    constructor(public id: number, public payload: AddToShipmentDetails) { }
}

export class removeFromShipment {
    static readonly type = '[Shipment] Remove from shipment'
    constructor(public shipmentId: number, public detailId: number) { }
}

export class deleteShipment {
    static readonly type = '[Shipment] Delete shipment'
    constructor(public id: number) { }
}

export class getShipment {
    static readonly type = '[Shipment] Get shipment'
    constructor(public id: number) { }
}
