import { Selector } from "@ngxs/store";
import { LogState, LogStateModel } from "./log-state";
import { Log } from "src/entities/Log";

export class LogSelectors {
    @Selector([LogState])
    static getLogs(state: LogStateModel): Log[] {
        return state.logs;
    }
}