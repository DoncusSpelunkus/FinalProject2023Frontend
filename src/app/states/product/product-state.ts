import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Product } from "src/entities/Product";
import { createItem, establishConnection, getLocations, getProductLocations, getProducts, deleteItem, updateItem } from "./product-actions";
import { ProductSocket } from "src/services/SocketServices/productService.service";
import { ProductLocation } from "src/entities/ProductLocation";
import { ProductService } from "src/services/HttpRequestSevices/product.service";

export interface ProductStateModel {
    products: Product[];
    productLocations: ProductLocation[];
    location: Location[];
}

@State<ProductStateModel>
    ({
        name: 'Product',
        defaults: {
            products: [],
            location: [],
            productLocations: []
        }
    })
@Injectable()
export class ProductState {
    constructor(private productSocket: ProductSocket,
        private productService: ProductService) {
    }

    @Action(getProducts)
    getProducts({ getState, patchState }: StateContext<ProductStateModel>) {
        this.productSocket.getProducts().subscribe((data) => {
            patchState({
                products: [...getState().products, data]
            })
        })
    }

    @Action(getProductLocations)
    getProductLocations({ getState, patchState }: StateContext<ProductStateModel>) {
        this.productSocket.getProductLocations().subscribe((data) => {
            patchState({
                products: [...getState().productLocations, data]
            })
        })
    }

    @Action(getLocations)
    getLocations({ getState, patchState }: StateContext<ProductStateModel>) {
        this.productSocket.getLocations().subscribe((data) => {
            patchState({
                products: [...getState().location, data]
            })
        })
    }

    @Action(establishConnection)
    establishConnection({ }: StateContext<ProductStateModel>) {
        this.productSocket.establishConnection();
    }

    // Using enum for types we create a homogenized way of creating, updating and deleting items

    @Action(createItem)
    createItem({ }: StateContext<ProductStateModel>, { payload, entityType }: createItem) {
        this.productService.createItem(payload, entityType);
    }

    @Action(deleteItem)
    deleteItem({ }: StateContext<ProductStateModel>, { payload, entityType }: deleteItem) {
        this.productService.deleteItem(payload, entityType);
    }

    @Action(updateItem)
    updateItem({ }: StateContext<ProductStateModel>, { payload, entityType }: updateItem) {
        this.productService.updateItem(payload, entityType);
    }


}