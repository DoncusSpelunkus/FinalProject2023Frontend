import { Injectable } from "@angular/core";
import {Action, State, StateContext} from "@ngxs/store";
import { ShipmentSocket } from "src/services/SocketServices/shipmentSocket";
import { establishConnection, terminateConnection } from "../crossStateAction";
import { Shipment } from "src/entities/Shipment";
import { addToShipment, changeQuantity, createShipments, deleteShipment, getShipment, getShipments, removeFromShipment } from "./shipment-actions";
import { ShipmentService } from "src/services/HttpRequestSevices/shipment.service";

export interface ShipmentStateModel {
    shipments: Shipment[];
    selectedShipment: Shipment;
}

@State<ShipmentStateModel>
    ({
        name: 'ShipmentState',
        defaults: {
            shipments: [],
            selectedShipment: null
        }
    })
@Injectable()
export class ShipmentState {
    constructor(private shipmentSocket: ShipmentSocket,
        private shipmentService: ShipmentService) {}


    @Action(getShipments)
    getShipments(ctx: StateContext<ShipmentStateModel>) {
        this.shipmentSocket.getShipments().subscribe((data) => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                shipments: data
            })
        })
    }
    
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
    async getShipment(ctx: StateContext<ShipmentStateModel>, {id}: getShipment) {
        let thisShipment = await this.shipmentService.getShipment(id)
        const state = ctx.getState();
        ctx.setState({
            ...state,
            selectedShipment: thisShipment
        })
    }
    

    @Action(establishConnection)
    async establishConnection({ }: StateContext<ShipmentStateModel>) {
        console.log("hit")
        this.shipmentSocket.establishConnection();
    }

    @Action(terminateConnection)
    async terminateConnection({ }: StateContext<ShipmentStateModel>) {
        this.shipmentSocket.terminateConnection();
    }


}