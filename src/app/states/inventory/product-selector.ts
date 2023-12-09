import { Selector } from "@ngxs/store";
import { InventoryState, InventoryStateModel } from "./product-state";
import { Product } from "src/entities/Product";
import { ProductLocation } from "src/entities/ProductLocation";

export class ProductSelector {
    @Selector([InventoryState])
    static getProducts(state: InventoryStateModel): Product[] {
        return state.products;
    }

    @Selector([InventoryState])
    static getProductLocations(state: InventoryStateModel): ProductLocation[] {
        return state.productLocations;
    }

    @Selector([InventoryState])
    static getLocations(state: InventoryStateModel): Location[] {
        return state.location;
    }
}

