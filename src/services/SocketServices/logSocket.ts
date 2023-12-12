import { Injectable } from "@angular/core";
import { environment } from "src/enviroment";
import * as signalR from "@aspnet/signalr";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LogSocket {

    private hubConnection: signalR.HubConnection;

    private logsSubject = new Subject<any>();
    private connectionEstablished = false;


    constructor() {
        this.establishConnection();
    }

    public async establishConnection() { // We establish a connection with a socket defined by our enbironment file
        if (localStorage.getItem("auth") != null) {
            try {
                if (this.connectionEstablished == true) { return; }
                this.hubConnection = new signalR.HubConnectionBuilder()
                    .withUrl(environment.logsSocketUrl, {
                        accessTokenFactory: () => {
                            return localStorage.getItem("auth") || '';
                        }
                    })
                    .build();
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
                    console.log("log")
                    this.logsSubject.next(data);
                    console.log(data + "log")
                });

            }
            catch (error) {
                console.log(error)
            }
        }
    }

    public terminateConnection() {
        this.hubConnection.stop();
        this.connectionEstablished = false;
    }

    // We return the subject as an observable so we can subscribe to it
    public getLogs() {
        return this.logsSubject.asObservable();
    }
}