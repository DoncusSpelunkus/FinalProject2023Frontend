import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Product } from "src/entities/Product";
import { getLocations, getProductLocations, getProducts } from "./product-actions";
import { ProductSocket } from "src/services/SocketServices/ProductSocket";
import { ProductLocation } from "src/entities/ProductLocation";

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
    constructor(private productSocket: ProductSocket) {
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
    getProductLocations({ getState, patchState }: StateContext<ProductStateModel>){
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
    
}