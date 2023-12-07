import { Selector } from "@ngxs/store";
import { ProductState, ProductStateModel } from "./product-state";
import { Product } from "src/entities/Product";
import { ProductLocation } from "src/entities/ProductLocation";

export class ProductSelector {
    @Selector([ProductState])
    static getProducts(state: ProductStateModel): Product[] {
        return state.products;
    }

    @Selector([ProductState])
    static getProductLocations(state: ProductStateModel): ProductLocation[] {
        return state.productLocations;
    }

    @Selector([ProductState])
    static getLocations(state: ProductStateModel): Location[] {
        return state.location;
    }
}

