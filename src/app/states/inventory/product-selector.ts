import { Selector } from "@ngxs/store";
import { InventoryState, InventoryStateModel } from "./product-state";
import { Product, ProductLocation, Location, Brand, Type } from "src/entities/Inventory";


export class ProductSelector {
    @Selector([InventoryState])
    static getProducts(state: InventoryStateModel): Product[] {
        return state.products;
        }
    

    @Selector([InventoryState])
    static getLocations(state: InventoryStateModel): Location[] {
        return state.location;
    }

    @Selector([InventoryState])
    static getBrands(state: InventoryStateModel): Brand[] {
        return state.brand;
    }

    @Selector([InventoryState])
    static getTypes(state: InventoryStateModel): Type[] {
        return state.type;
    }

    @Selector([InventoryState])
    static getProductLocations(state: InventoryStateModel): ProductLocation[] {
        return state.productLocations;
    }


}