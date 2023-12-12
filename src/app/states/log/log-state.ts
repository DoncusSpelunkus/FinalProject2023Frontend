import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Log } from "src/entities/Log";
import { getLogs } from "./log-actions";
import { LogSocket } from "src/services/SocketServices/logSocket";
import { establishConnection } from "../crossStateAction";

export interface LogStateModel {
    logs: Log[];
}

@State<LogStateModel>
    ({
        name: 'Log',
        defaults: {
            logs: []
        }
    })
@Injectable()
export class LogState {
    constructor(private logSocket: LogSocket) {

    }


    @Action(getLogs)
    getLogs(ctx: StateContext<LogStateModel>) {
        this.logSocket.getLogs().subscribe((data) => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                logs: data
            })
        })
    }

    @Action(establishConnection)
    async establishConnection({ }: StateContext<LogStateModel>) {
        this.logSocket.establishConnection();
    }

}