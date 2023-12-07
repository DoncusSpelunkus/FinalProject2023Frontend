import { Selector } from "@ngxs/store";
import { UserManagementState, UserManagementStateModel } from "./user-state";
import { User } from "src/entities/User";

export class UserSelector {
    @Selector([UserManagementState])
    static getProducts(state: UserManagementStateModel): User[] {
        return state.users;
    }
}