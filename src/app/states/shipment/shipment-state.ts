import { Injectable } from "@angular/core";
import {Action, State, StateContext} from "@ngxs/store";
import { ShipmentSocket } from "src/services/SocketServices/shipmentSocket";
import { establishConnection, terminateConnection } from "../crossStateAction";
import { Shipment } from "src/entities/Shipment";
import { addToShipment, changeQuantity, createShipments, deleteShipment, getShipment, removeFromShipment } from "./shipment-actions";
import { ShipmentService } from "src/services/HttpRequestSevices/shipment.service";

export interface ShipmentStateModel {
    shipments: Shipment[];
    selectedShipment: Shipment;
}

@State<ShipmentStateModel>
    ({
        name: 'UserManagement',
        defaults: {
            shipments: [],
            selectedShipment: null
        }
    })
@Injectable()
export class ShipmentState {
    constructor(private shipmentSocket: ShipmentSocket,
        private shipmentService: ShipmentService) {}

    @Action(createShipments)
    createShipments({}: StateContext<ShipmentStateModel>, {payload}: createShipments) {
        this.shipmentService.createShipment(payload)
    }


    @Action(changeQuantity)
    changeQuantity({}: StateContext<ShipmentStateModel>, {shipmentId, detailId, quantity}: changeQuantity) {
        this.shipmentService.changeQuantity(shipmentId, detailId, quantity)
    }

    @Action(addToShipment)
    addToShipment({}: StateContext<ShipmentStateModel>, {id, payload}: addToShipment) {
        this.shipmentService.addToShipment(id, payload)
    }

    @Action(removeFromShipment)
    removeFromShipment({}: StateContext<ShipmentStateModel>, {shipmentId, detailId}: removeFromShipment) {
        this.shipmentService.removeFromShipment(shipmentId, detailId)
    }

    @Action(deleteShipment)
    deleteShipment({}: StateContext<ShipmentStateModel>, {id}: deleteShipment) {
        this.shipmentService.deleteShipment(id)
    }

    @Action(getShipment)
    getShipment({}: StateContext<ShipmentStateModel>, {id}: getShipment) {
        this.shipmentService.getShipment(id)
    }
    

    @Action(establishConnection)
    async establishConnection({ }: StateContext<ShipmentStateModel>) {
        this.shipmentSocket.establishConnection();
    }

    @Action(terminateConnection)
    async terminateConnection({ }: StateContext<ShipmentStateModel>) {
        this.shipmentSocket.terminateConnection();
    }


}