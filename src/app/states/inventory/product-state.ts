import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Product } from "src/entities/Product";
import { createItem, getLocations, getProductLocations, getProducts, deleteItem, updateItem } from "./product-actions";
import { ProductLocation } from "src/entities/ProductLocation";
import { InventorySocket } from "src/services/SocketServices/inventorySocket";
import { InventoryService } from "src/services/HttpRequestSevices/inventory.service";
import { establishConnection } from "../crossStateAction";

export interface InventoryStateModel {
    products: Product[];
    productLocations: ProductLocation[];
    location: Location[];
}

@State<InventoryStateModel>
    ({
        name: 'Product',
        defaults: {
            products: [],
            location: [],
            productLocations: []
        }
    })
@Injectable()
export class InventoryState {
    constructor(private inventorySocket: InventorySocket,
        private inventoryService: InventoryService) {
    }

    @Action(getProducts)
    getProducts({ getState, patchState }: StateContext<InventoryStateModel>) {
        this.inventorySocket.getProducts().subscribe((data) => {
            patchState({
                products: [...getState().products, data]
            })
        })
    }

    @Action(getProductLocations)
    getProductLocations({ getState, patchState }: StateContext<InventoryStateModel>) {
        this.inventorySocket.getProductLocations().subscribe((data) => {
            patchState({
                products: [...getState().productLocations, data]
            })
        })
    }

    @Action(getLocations)
    getLocations({ getState, patchState }: StateContext<InventoryStateModel>) {
        this.inventorySocket.getLocations().subscribe((data) => {
            patchState({
                products: [...getState().location, data]
            })
        })
    }

    @Action(establishConnection)
    async establishConnection({ }: StateContext<InventoryStateModel>) {
        this.inventorySocket.establishConnection();
    }

    // Using the entitype enum for types we create a homogenized way of creating, updating and deleting items

    @Action(createItem)
    createItem({ }: StateContext<InventoryStateModel>, { payload, entityType }: createItem) {
        this.inventoryService.createItem(payload, entityType);
    }

    @Action(deleteItem)
    deleteItem({ }: StateContext<InventoryStateModel>, { payload, entityType }: deleteItem) {
        this.inventoryService.deleteItem(payload, entityType);
    }

    @Action(updateItem)
    updateItem({ }: StateContext<InventoryStateModel>, { payload, entityType }: updateItem) {
        this.inventoryService.updateItem(payload, entityType);
    }


}