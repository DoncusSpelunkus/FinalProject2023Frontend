import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { createItem, deleteItem, updateItem, getItems } from "./product-actions";
import { InventorySocket } from "src/services/SocketServices/inventorySocket";
import { InventoryService } from "src/services/HttpRequestSevices/inventory.service";
import { establishConnection } from "../crossStateAction";
import { Brand, Type, Product, ProductLocation, Location } from "src/entities/Inventory";

export interface InventoryStateModel {
    products: Product[];
    productLocations: ProductLocation[];
    location: Location[];
    brand : Brand[];
    type : Type[];
}

@State<InventoryStateModel>
    ({
        name: 'Product',
        defaults: {
            products: [],
            location: [],
            productLocations: [],
            brand : [],
            type : []
        }
    })
@Injectable()
export class InventoryState {
    constructor(private inventorySocket: InventorySocket,
        private inventoryService: InventoryService) {
    }

    @Action(getItems)
    getItems(ctx: StateContext<InventoryStateModel>, { entityType }: getItems) {
        switch (entityType) {
            case "Product":
                this.inventorySocket.getProducts().subscribe((data) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        products: data
                    })
                })
                break;
            case "ProductLocation":
                this.inventorySocket.getProductLocations().subscribe((data) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        productLocations: data
                    })
                })
                break;
            case "Location":
                this.inventorySocket.getLocations().subscribe((data) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        location: data
                    })
                })
                break;
            case "Brand":
                this.inventorySocket.getBrands().subscribe((data) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        brand: data
                    })
                })
                break;
            case "Type":
                this.inventorySocket.getTypes().subscribe((data) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        type: data
                    })
                })
                break;
        }
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