import { Selector } from "@ngxs/store";
import { ShipmentState, ShipmentStateModel } from "./shipment-state";

export class ShipmentSelector {

    @Selector([ShipmentState])
    static getShipments(state: ShipmentStateModel) {
        return state.shipments;
    }

    @Selector([ShipmentState])
    static getSelectedShipment(state: ShipmentStateModel) {
        return state.selectedShipment;
    }
    
}