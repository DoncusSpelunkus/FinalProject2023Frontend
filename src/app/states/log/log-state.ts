import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Log } from "src/entities/Log";
import { getLogs } from "./log-actions";

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
    constructor() { }


    @Action(getLogs)
    getLogs({ getState, patchState }: StateContext<LogStateModel>, { payload }: getLogs) {
        const state = getState();
        patchState({
            logs: [...state.logs, payload]
        })
    }
    
}