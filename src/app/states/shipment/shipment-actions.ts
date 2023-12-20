import { Shipment } from "src/entities/Shipment";

export class createShipments {
    static readonly type = '[Shipment] Create shipment'
    constructor(public entityType: Shipment) { }

}

export class updateShipments {
    static readonly type = '[Shipment] Update shipment'
    constructor(public entityType: Shipment) { }
}