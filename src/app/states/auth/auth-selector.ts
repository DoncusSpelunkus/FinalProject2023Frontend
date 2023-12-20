import { Selector } from "@ngxs/store";
import { AuthState, AuthStateModel } from "./auth-state";
import { User } from "src/entities/User";

export class AuthSelectors {
    @Selector([AuthState])
    static getMe(state: AuthStateModel): User {
        return state.user;
    }

    @Selector([AuthState])
    static getToken(state: AuthStateModel): String {
        return state.token;
    }
}

export function getToken(getToken: any): (target: import("../../../services/SocketServices/authSocket").AuthSocket, propertyKey: "token$") => void {
    throw new Error("Function not implemented.");
}
