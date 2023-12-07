import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { User } from "src/entities/User";
import { UserManagementService } from "src/services/HttpRequestSevices/userManagement.service";
import { UserManagementSocket } from "src/services/SocketServices/UserManagementSocket";
import { createUser, getUsers } from "./user-actions";
import { establishConnection } from "../crossStateAction";

export interface UserManagementStateModel {
    users: User[];
}

@State<UserManagementStateModel>
    ({
        name: 'UserManagement',
        defaults: {
            users: []
        }
    })
@Injectable()
export class UserManagementState {
    constructor(
        private userManagementSocket: UserManagementSocket,
        private userManagementService: UserManagementService) {}
    
    @Action(establishConnection)
    async establishConnection({ }: StateContext<UserManagementStateModel>) {
        this.userManagementSocket.establishConnection();
    }

    @Action(getUsers)
    getUsers({ getState, patchState }: StateContext<UserManagementStateModel>) {
        this.userManagementSocket.getUsers().subscribe((data) => {
            patchState({
                users: [...getState().users, data]
            })
        })
    }

    @Action(createUser)
    createUser({}: StateContext<UserManagementStateModel>,{payload}: createUser) {
        this.userManagementService.createUser(payload)
    }




    
}