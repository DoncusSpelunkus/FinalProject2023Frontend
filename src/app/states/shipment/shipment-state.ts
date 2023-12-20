import { Injectable } from "@angular/core";
import {Action, State, StateContext} from "@ngxs/store";
import { ShipmentSocket } from "src/services/SocketServices/shipmentSocket";
import { establishConnection, terminateConnection } from "../crossStateAction";
import { Shipment } from "src/entities/Shipment";

export interface ShipmentStateModel {
    shipments: Shipment[];
}

@State<ShipmentStateModel>
    ({
        name: 'UserManagement',
        defaults: {
            shipments: []
        }
    })
@Injectable()
export class ShipmentState {
    constructor(private shipmentSocket: ShipmentSocket) {}

    @Action(establishConnection)
    async establishConnection({ }: StateContext<ShipmentStateModel>) {
        this.shipmentSocket.establishConnection();
    }

    @Action(terminateConnection)
    async terminateConnection({ }: StateContext<ShipmentStateModel>) {
        this.shipmentSocket.terminateConnection();
    }
}