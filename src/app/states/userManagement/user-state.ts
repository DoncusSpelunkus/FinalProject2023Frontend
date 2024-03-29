import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { User } from "src/entities/User";
import { UserManagementService } from "src/services/HttpRequestSevices/userManagement.service";
import { UserManagementSocket } from "src/services/SocketServices/UserManagementSocket";
import {contactSupport, createUser, deleteUser, getUsers, resetUserPassword, updateUser} from "./user-actions";
import { establishConnection, terminateConnection } from "../crossStateAction";
import {SupportEmail} from "../../../entities/SupportEmail";

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
        private userManagementService: UserManagementService) {

        }

    @Action(establishConnection)
    async establishConnection({ }: StateContext<UserManagementStateModel>) {
        this.userManagementSocket.establishConnection();
    }

    @Action(getUsers)
    getUsers(ctx: StateContext<UserManagementStateModel>) {
        this.userManagementSocket.getUsers().subscribe((data) => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                users: data
            })
        })
    }

    @Action(createUser)
    createUser({}: StateContext<UserManagementStateModel>,{payload}: createUser) {
        this.userManagementService.createUser(payload)
    }

    @Action(updateUser)
    updateUser({}: StateContext<UserManagementStateModel>,{payload}: updateUser) {
        this.userManagementService.updateEmployee(payload)
    }

    @Action(deleteUser)
    deleteUser({}: StateContext<UserManagementStateModel>,{payload}: deleteUser) {
        this.userManagementService.deleteEmployee(payload)
    }

    @Action(terminateConnection)
    async terminateConnection({ }: StateContext<UserManagementStateModel>) {
        this.userManagementSocket.terminateConnection();
    }

    @Action(resetUserPassword)
    async ResetPassword({ }: StateContext<UserManagementStateModel>, {email}: resetUserPassword) {
        this.userManagementService.ResetUserPassword(email)
    }

    @Action(contactSupport)
    async ContactSupport({ }: StateContext<UserManagementStateModel>, {dto}: contactSupport) {
      this.userManagementService.ContactSupport(dto)
    }

}
