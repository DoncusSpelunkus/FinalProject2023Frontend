import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { AuthSocket } from "src/services/SocketServices/authSocket";
import { ClearUser, Login, UpdatePassword, getMe, getUserConnection } from "./auth-action";
import { LoginService } from "src/services/HttpRequestSevices/login.service";
import { User } from "src/entities/User";
import { Route, Router } from "@angular/router";
import { terminateConnection } from "../crossStateAction";
import { ChangePasswordDTO } from "src/entities/ChangePasswordDTO";



export interface AuthStateModel {
    token: String;
    user: User;
}

@State<AuthStateModel>({
    name: 'Auth',
    defaults: {
        user: null,
        token: null
    }
})
@Injectable()
export class AuthState {
    constructor(private socket: AuthSocket, private loginService: LoginService, private store: Store, private router: Router) { }


    @Action(getUserConnection)
    async getUserConnection({ }: StateContext<AuthStateModel>, {token}: getUserConnection) {
        this.socket.getUserConnection(token);
    }

    @Action(getMe)
    getLogs(ctx: StateContext<AuthStateModel>) {
        this.socket.getMe().subscribe((data) => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                user: data
            })
            console.log(data)
        })
    }


    @Action(Login)
    async login(ctx: StateContext<AuthStateModel>, {username, password}: Login) {
        let token = await this.loginService.login(username, password);
        const state = ctx.getState();
        ctx.setState({
            ...state,
            token: token
        })
    }

    @Action(ClearUser)
    clearUser(ctx: StateContext<AuthStateModel>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            user: null,
            token: null
        })
        this.store.dispatch(new terminateConnection());
        this.router.navigate(['/login']);

    }

    @Action(UpdatePassword)
    async updatePassword({ }: StateContext<AuthStateModel>,{dto}: UpdatePassword) {
        await this.loginService.UpdatePassword(dto);
    }


    @Action(terminateConnection)
    async terminateConnection({ }: StateContext<AuthStateModel>) {
        this.socket.terminateConnection();
    }


}
