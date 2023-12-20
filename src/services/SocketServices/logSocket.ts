import { Injectable } from "@angular/core";
import { environment } from "src/enviroment";
import * as signalR from "@aspnet/signalr";
import { Observable, Subject } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { AuthSelectors } from "src/app/states/auth/auth-selector";
import { getLogs } from "src/app/states/log/log-actions";

@Injectable({
    providedIn: 'root'
})
export class LogSocket {

    private hubConnection: signalR.HubConnection;

    private logsSubject = new Subject<any>();
    private connectionEstablished = false;

    @Select(AuthSelectors.getToken) token$: Observable<string>;


    constructor(private store: Store) {
        this.establishConnection();
    }

    public async establishConnection() { // We establish a connection with a socket defined by our enbironment file
        try {
            if (this.connectionEstablished == true) { return; }
            let token = "";
            await this.token$.subscribe((data) => { // I dunno but this is the only way I could get the token from the store
                token = data;
            })
            try {
                this.hubConnection = new signalR.HubConnectionBuilder()
                    .withUrl(environment.logsSocketUrl, {
                        accessTokenFactory: () => {
                            return token;
                        }
                    })
                    .build();
            }
            catch (error) {
                console.log(error)
            }
            try {
                this.connectionEstablished = true;
                await this.hubConnection.start();
            }
            catch (error) {
                console.log(error)
                this.connectionEstablished = false;
                return
            }
            // we describe the event we want to listen to and what we want to do when we get the event
            this.hubConnection.on("LogsListUpdate", (data) => {
                this.logsSubject.next(data);
            });

        }
        catch (error) {
            console.log(error)
        }
        this.initialize();
        

    }

    public terminateConnection() {
        this.hubConnection.stop();
        this.connectionEstablished = false;
    }

    private initialize(){
        this.store.dispatch(new getLogs());
        this.hubConnection.invoke("RequestLogs")
    }

    // We return the subject as an observable so we can subscribe to it
    public getLogs() {
        return this.logsSubject.asObservable();
    }
}